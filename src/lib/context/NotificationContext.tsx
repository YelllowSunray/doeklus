"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getDocument, setOrUpdateDocument, queryDocuments } from '@/lib/firebase/firestore';
import { where, orderBy } from 'firebase/firestore';

interface Notification {
  id: string;
  userId: string;
  type: 'bid_received' | 'bid_accepted' | 'task_completed';
  title: string;
  message: string;
  data?: any;
  read: boolean;
  createdAt: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'userId' | 'read' | 'createdAt'>) => Promise<void>;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  loading: boolean;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  // Load notifications for current user
  useEffect(() => {
    const loadNotifications = async () => {
      if (!user) {
        setNotifications([]);
        setLoading(false);
        return;
      }

      try {
        const userNotifications = await queryDocuments('notifications', [
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        ]);
        setNotifications(userNotifications as Notification[]);
      } catch (error) {
        console.error('Error loading notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, [user]);

  const addNotification = async (notificationData: Omit<Notification, 'id' | 'userId' | 'read' | 'createdAt'>) => {
    if (!user) return;

    const newNotification: Omit<Notification, 'id'> = {
      ...notificationData,
      userId: user.uid,
      read: false,
      createdAt: new Date().toISOString()
    };

    try {
      const docRef = await setOrUpdateDocument('notifications', null, newNotification);
      const notificationWithId = { ...newNotification, id: docRef.id } as Notification;
      
      setNotifications(prev => [notificationWithId, ...prev]);
    } catch (error) {
      console.error('Error adding notification:', error);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      await setOrUpdateDocument('notifications', notificationId, { read: true });
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter(n => !n.read);
      
      // Update all unread notifications in Firestore
      await Promise.all(
        unreadNotifications.map(notification =>
          setOrUpdateDocument('notifications', notification.id, { read: true })
        )
      );

      // Update local state
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, read: true }))
      );
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    loading
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
