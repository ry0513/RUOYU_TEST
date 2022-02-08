import { Router } from "express";
import fs from "fs-extra";
import { needLogin } from "../core/permission";
import RUOYU from "../core/ruoyu";
const router = Router();

router.get("/", (req, res) => {
    needLogin(
        10,
        req,
        res,
        () => {
            res.locals = {
                user: req.session.account,
            };
            res.render("home");
        },
        () => {
            res.render("login");
        }
    );
});

router.get("/login", (req, res) => {
    needLogin(
        10,
        req,
        res,
        () => {
            res.redirect("/");
        },
        () => {
            res.render("login");
        }
    );
});

// 装载子路由;
const routeList = fs.readdirSync(RUOYU.path(__dirname)).filter((item) => {
    return item !== "index.js";
});
for (const key of routeList) {
    if (fs.statSync(RUOYU.path(__dirname, key)).isDirectory()) {
        import(RUOYU.path(__dirname, key, "./index")).then((item) => {
            router.use(`/${key}`, item.default);
        });
    } else {
        import(RUOYU.path(__dirname, key)).then((item) => {
            router.use(`/${key.split(".")[0]}`, item.default);
        });
    }
}

export default router;
