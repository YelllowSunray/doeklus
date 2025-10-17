import { setOrUpdateDocument } from '@/lib/firebase/firestore';

interface NotificationData {
  userId: string;
  type: 'bid_received' | 'bid_accepted' | 'task_completed';
  title: string;
  message: string;
  data?: any;
}

export async function createNotification(notificationData: NotificationData) {
  try {
    const notification = {
      ...notificationData,
      read: false,
      createdAt: new Date().toISOString()
    };

    await setOrUpdateDocument('notifications', undefined, notification);
    console.log('Notification created successfully:', notification);
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
}

export async function createBidNotification(
  taskOwnerId: string,
  bidderName: string,
  taskTitle: string,
  bidAmount: number,
  taskId: string
) {
  return createNotification({
    userId: taskOwnerId,
    type: 'bid_received',
    title: '🎉 Nieuwe bieding ontvangen!',
    message: `${bidderName} heeft €${bidAmount} geboden op "${taskTitle}"`,
    data: {
      taskId,
      bidderName,
      bidAmount,
      taskTitle
    }
  });
}

export async function createBidAcceptedNotification(
  klusserId: string,
  customerName: string,
  taskTitle: string,
  bidAmount: number,
  taskId: string
) {
  return createNotification({
    userId: klusserId,
    type: 'bid_accepted',
    title: '✅ Jouw bieding is geaccepteerd!',
    message: `${customerName} heeft jouw bieding van €${bidAmount} geaccepteerd voor "${taskTitle}"`,
    data: {
      taskId,
      customerName,
      bidAmount,
      taskTitle
    }
  });
}
