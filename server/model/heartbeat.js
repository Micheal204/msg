const { BeanModel } = require("redbean-node/dist/bean-model");

/**
 * status:
 *      0 = DOWN
 *      1 = UP
 *      2 = PENDING
 *      3 = MAINTENANCE
 * pingStatus:
 *      4 = SLOW
 *      5 = NOMINAL
 */
class Heartbeat extends BeanModel {

    /**
     * Return an object that ready to parse to JSON for public
     * Only show necessary data to public
     * @returns {object} Object ready to parse
     */
    toPublicJSON() {
        return {
            status: this.status,
            time: this.time,
            msg: "",        // Hide for public
            ping: this.ping,
        };
    }

    /**
     * Return an object that ready to parse to JSON
     * @returns {object} Object ready to parse
     */
    toJSON() {
        return {
            monitorID: this.monitor_id,
            status: this.status,
            time: this.time,
            msg: this.msg,
            ping: this.ping,
            important: this.important,
            duration: this.duration,
            pingThreshold: this.ping_threshold,
            pingStatus: this.ping_status,
            pingImportant: this.ping_important,
            pingMsg: this.ping_msg,
        };
    }

}

module.exports = Heartbeat;
