import sequelize from "./sequelize";
import RUOYU from "../core/ruoyu";
import Account from "./modles/Account";
import AppList from "./modles/AppList";

(async () => {
    RUOYU.info("MYSQL 模块: 准备初始化");
    await sequelize.sync({ force: false, alter: true });
    await Account.findOrCreate({
        where: {
            accountId: 10001,
        },
        defaults: {
            accountId: 10001,
            nickName: "超级管理员",
            password: "ruoyu",
            email: "ruoyu",
            status: 1000,
            avatar: "https://pica.zhimg.com/80/v2-d181474a2481c290898cf7d183b41a7e_720w.jpg?source=1940ef5c",
        },
    });
    await AppList.findOrCreate({
        where: {
            appId: 100,
        },
        defaults: {
            appId: 100,
            accountId: 10001,
            appName: "博客",
            appKey: "70ddda2aa064a16d18a2598ae6f8f1ff",
        },
    });
    RUOYU.info("MYSQL 模块: 结束初始化");
})();
