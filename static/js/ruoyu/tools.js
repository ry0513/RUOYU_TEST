"use strict";
/**
 * @description 工具类
 * @author RuoYu
 * @date 2021/12/31 09:40:31
 * @class Tools
 */
class Tools {
    /**
     * @description 获取url中键值对中的值
     * @param {string} key
     * @return {*}
     * @memberof Tools
     */
    getUrlValue(key) {
        const query = window.location.search.substring(1);
        const arr = query.split("&");
        for (const item of arr) {
            const pair = item.split("=");
            if (pair[0] === key) {
                return pair[1] || "";
            }
        }
        return undefined;
    }
    /**
     * @description 弹出层
     * @param {*} { description, closeTimeout = 2000, type = "success" }
     * @memberof Tools
     */
    notify({ description = "", closeTimeout = 2000, type = "success" }) {
        GrowlNotification.notify({
            description,
            closeTimeout,
            type,
            image: { visible: true },
        });
    }
    dayjs(date) {
        date = new Date(date);
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset()); // toJSON 的时区补偿
        return date.toJSON().substr(0, 19).replace(/[T]/, " ");
    }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const $ryTools = new Tools();
