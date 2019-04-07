import { Notifications, Permissions } from 'expo'
import { AsyncStorage } from 'react-native'
const NOTIFICATION_KEY = 'MobileFlashcards:notifications'

export class NotificationStore {
    grantPermission = async () => {
        const {
            status
        } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
        return status === "granted"
    }

    setLocalNotification = async () => {
      AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then(async (data) => {
          if (data === null) {
            const permissionGranted = await this.grantPermission()
            if (permissionGranted) {
              Notifications.cancelAllScheduledNotificationsAsync()
              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(tomorrow.getHours())
              tomorrow.setMinutes(0)
              Notifications.scheduleLocalNotificationAsync(
                this.createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )
              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          }
        })
      }

    createNotification = () => {
        return {
            title: 'Hey! Your flashcards are waiting.',
            body: "👋 don't forget to study today!",
            ios: {
              sound: true,
            },
            android: {
              sound: true,
              priority: 'high',
              sticky: false,
              vibrate: true,
            }
        }
    }
    cancelNotifications = async () => {
      return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
    }
}