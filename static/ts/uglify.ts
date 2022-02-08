/**
 * @description 压缩前端js文件，无需求勿改
 */
import UglifyJS from "uglify-js";
import fs from "fs-extra";
import { resolve } from "path";
console.log(resolve(__dirname, "../js"));

const autoUglify = (path = "../js") => {
    const routeList = fs.readdirSync(resolve(__dirname, path)).filter((item) => {
        return item.indexOf(".min.js") === -1;
    });
    for (const key of routeList) {
        if (fs.statSync(resolve(__dirname, path, key)).isDirectory()) {
            autoUglify(resolve(__dirname, path, key));
        } else {
            uglify(resolve(__dirname, path, key));
        }
    }
};

const uglify = (path: string) => {
    const index = path.lastIndexOf(".");
    if (index < 0) return;
    if (path.substring(index + 1) !== "js") return;
    if (path.indexOf(".min.js") !== -1) return;
    const pathArr = path.split("\\");
    const key = pathArr[pathArr.length - 1];
    const res = UglifyJS.minify(fs.readFileSync(path, "utf8"), {
        sourceMap: {
            filename: key.replace(".js", ".min.js"),
            url: key.replace(".js", ".min.map"),
        },
    });
    if (res.error) return;
    fs.writeFileSync(path.replace(".js", ".min.js"), res.code);
    fs.writeFileSync(path.replace(".js", ".min.map"), res.map);
};
autoUglify();
let lastUpdateTime = 0;
fs.watch(
    resolve(__dirname, "../js"),
    {
        recursive: true, //是否连同其子文件一起监视
    },
    (eventType, filename) => {
        const diff = Date.now() - lastUpdateTime;
        lastUpdateTime = Date.now();
        if (diff < 100) return;
        uglify(resolve(__dirname, "../js", filename));
    }
);
