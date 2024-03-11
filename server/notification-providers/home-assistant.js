const NotificationProvider = require("./notification-provider");
const axios = require("axios");

const defaultNotificationService = "notify";

class HomeAssistant extends NotificationProvider {
    name = "HomeAssistant";

    /**
     * @inheritdoc
     */
    async send(notification, message, monitor = null, heartbeat = null) {
        const notificationService = notification?.notificationService || defaultNotificationService;

        try {
            await axios.post(
                `${notification.homeAssistantUrl.trim().replace(/\/*$/, "")}/api/services/notify/${notificationService}`,
                {
                    title: "Uptime Kuma",
                    message,
                    ...(notificationService !== "persistent_notification" && { data: {
                        name: monitor?.name,
                        status: heartbeat?.status,
                        channel: "uptime-kuma",
                        icon_url: "https://github.com/louislam/uptime-kuma/blob/master/public/icon-192x192.png?raw=true"
                    } }),
                },
                {
                    headers: {
                        Authorization: `Bearer ${notification.longLivedAccessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            return "Sent Successfully.";
        } catch (error) {
            this.throwGeneralAxiosError(error);
        }
    }
}

module.exports = HomeAssistant;
