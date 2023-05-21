const NotificationProvider = require("./notification-provider");
const axios = require("axios");

const defaultNotificationService = "notify";

class HomeAssistant extends NotificationProvider {
    name = "HomeAssistant";

    async send(notification, msg, monitorJSON = null, heartbeatJSON = null) {
        const okMsg = "Sent Successfully.";

        const notificationService = notification?.notificationService || defaultNotificationService;

        try {
            await axios.post(
                `${notification.homeAssistantUrl}/api/services/notify/${notificationService}`,
                {
                    title: "Uptime Kuma",
                    message: msg,
                    ...(notificationService !== "persistent_notification" && { data: {
                        name: monitorJSON?.name,
                        status: heartbeatJSON?.status,
                    } }),
                },
                {
                    headers: {
                        Authorization: `Bearer ${notification.longLivedAccessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            return okMsg;
        } catch (error) {
            this.throwGeneralAxiosError(error);
        }
    }
}

module.exports = HomeAssistant;
