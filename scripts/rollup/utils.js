import { resolve } from 'path';
import { readFileSync } from 'fs';

// packages目录
const pkgPath = resolve(__dirname, '../../packages/');
// 构建产物目录
const distPath = resolve(__dirname, '../../dist/node_modules');

// 获取packages目录下的指定包路径
const resolvePkgPath = (pkgName, isDist) => {
    if (isDist) {
        return `${distPath}/${pkgName}`
    }
    return `${pkgPath}/${pkgName}`
}

// 获取指定包的package.json
const getPkgJson = (pkgName) => {
    const path = `${resolvePkgPath(pkgName)}/package.json`;
    const str = readFileSync(path, 'utf-8');
    return JSON.parse(str);
}

export { getPkgJson, resolvePkgPath }