import { Notifications, Permissions } from 'expo'
import { AsyncStorage } from 'react-native'

export class NotificationStore {

    grantPermission = async () => {
        const {
            status
        } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
        return status === "granted"
    }

    schedule = async () => {
        const ret = await Notifications.scheduleLocalNotificationAsync({

        }, {
            time: new Date(),
            repeat: 'day'
        })
    }

    cancel = () => {
        Notifications.cancelScheduledNotificationAsync()
    }

}