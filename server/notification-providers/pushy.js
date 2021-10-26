const NotificationProvider = require("./notification-provider");
const axios = require("axios");

class Pushy extends NotificationProvider {

    name = "pushy";

    async send(notification, msg, monitorJSON = null, heartbeatJSON = null) {

        try {
            await axios.post(`https://api.pushy.me/push?api_key=${notification.pushyAPIKey}`, {
                "to": notification.pushyToken,
                "data": {
                    "message": "Uptime-Kuma"
                },
                "notification": {
                    "body": msg,
                    "badge": 1,
                    "sound": "ping.aiff"
                }
            });
            return this.sendSuccess;
        } catch (error) {
            this.throwGeneralAxiosError(error);
        }
    }
}

module.exports = Pushy;
