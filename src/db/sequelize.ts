import { Sequelize } from "sequelize-typescript";
import RUOYU from "../core/ruoyu";
const sequelize = new Sequelize(
    RUOYU.databaseDatabase,
    RUOYU.databaseUsername,
    RUOYU.databasePassword,
    {
        host: RUOYU.databaseHost,
        dialect: "mysql",
        timezone: "+08:00",
        pool: {
            max: 20,
            min: 0,
            idle: 10000,
        },
        logging: false,
        define: {
            // 字段以下划线（_）来分割（默认是驼峰命名风格）
            underscored: true,
        },
        models: [RUOYU.path(__dirname, "./modles/")],
    }
);

// 测试数据库能否正常使用
sequelize
    .authenticate()
    .then(() => {
        RUOYU.info("MYSQL 模块: 连接正常");
    })
    .catch((err) => {
        RUOYU.error("MYSQL 模块: 连接异常", err);
    });

export default sequelize;
