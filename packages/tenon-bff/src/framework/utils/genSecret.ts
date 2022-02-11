const fs = require('fs');
const uuid = require('uuid');
import path from "path";

const secretPool: string[] = [];

for (var i = 0; i < 1024; i++) {
    secretPool.push(uuid.v4().replace(/-/g, ""));
}

fs.writeFile(path.resolve(__dirname, './secret.json'), JSON.stringify(secretPool), function (err, data) {
    if (err) {
        console.error('生成密钥失败：', err);
        return;
    }
    console.log("密钥已更新");
});