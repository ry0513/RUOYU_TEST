import { logger } from "./log";
import fs from "fs-extra";
import { createHmac, createHash } from "crypto";
import { resolve } from "path";
import { Response } from "express";
import dayjs from "dayjs";

interface BaseConfig {
    databaseDialect: string;
    databaseHost: string;
    databaseDatabase: string;
    databaseUsername: string;
    databasePassword: string;
    httpPort: number;
    redisPort: number;
    redisHost: string;
    redisPassword: string;
    redisKey: string;
    redisSecret: string;
    sessionMaxAge: number;
    sessionName: string;
    cookieDomain: string;
    cdnUrl: string;
    md5Val: string;
    TXDT: {
        KEY: string;
        SK: string;
    };
}

interface ResponseFun {
    /**
     * @description 返回成功
     */
    success: (res: Response, obj?: object) => void;
    /**
     * @description 参数错误
     */
    parameter: (res: Response, obj?: object) => void;
    /**
     * @description 需要登录
     */
    needLogin: (res: Response, obj?: object) => void;
    /**
     * @description 权限不足
     */
    permission: (res: Response, obj?: object) => void;
    /**
     * @description 其他错误
     */
    error: (res: Response, obj?: object) => void;
}
interface BaseFun {
    info: (msg: string) => void;
    error: (msg: string, err?: { message: string }) => void;
    md5Pass: (value: string, md5Val?: string) => string;
    md5: (value: string) => string;
    path: (...path: string[]) => string;
    dayjs: (date?: Date, format?: string) => string;
    res: ResponseFun;
}
interface RUOYU extends BaseConfig, BaseFun {}

const configPath = resolve(__dirname, "../../config/config.json");
if (!fs.existsSync(configPath)) {
    logger.error("缺少配置文件：config.json");
}
const config: BaseConfig = JSON.parse(fs.readFileSync(configPath, "utf-8"));

const response: ResponseFun = {
    success: (res: Response, obj = {}) => {
        res.send({ code: 0, msg: "操作成功", ...obj });
    },

    parameter: (res: Response, obj = {}) => {
        res.send({ code: -1, msg: "请检查参数", ...obj });
    },

    needLogin: (res: Response, obj = {}) => {
        res.send({ code: -2, msg: "没有找到登录信息，未登录或登录过期", ...obj });
    },
    permission: (res: Response, obj = {}) => {
        res.send({ code: -3, msg: "权限不足", ...obj });
    },
    error: (res: Response, obj = {}) => {
        res.send({ code: -4, msg: "操作失败", ...obj });
    },
};

const BaseFun: BaseFun = {
    // 日志
    info: (msg) => {
        logger.info(msg);
    },
    error: (msg, err) => {
        logger.error(msg);
        err && logger.error(`原因: ${err.message}`);
    },

    // 加密
    md5Pass: (value, md5Val = config.md5Val) => {
        return createHmac("sha256", md5Val)
            .update(createHmac("sha256", md5Val).update(value).digest("hex") + value)
            .digest("hex");
    },
    md5: (value) => {
        return createHash("md5").update(value).digest("hex");
    },

    // 文件路径
    path: (dir, ...other) => {
        return resolve(dir, ...other);
    },

    // 时间格式
    dayjs: (date = new Date(), format = "YYYY-MM-DD HH:mm:ss") => {
        return dayjs(date).format(format);
    },

    res: response,
};

const RUOYU: RUOYU = {
    ...BaseFun,
    ...config,
};

export default RUOYU;
