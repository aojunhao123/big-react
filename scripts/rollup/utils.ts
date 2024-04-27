import { resolve } from 'path';
import { readFileSync } from 'fs';
import ts from '@rollup/plugin-typescript';
import cjs from '@rollup/plugin-commonjs';
import { RollupTypescriptOptions } from '@rollup/plugin-typescript';

// packages目录
const pkgPath = resolve(__dirname, '../../packages/');
// 构建产物目录
const distPath = resolve(__dirname, '../../dist/node_modules');

// 获取packages目录下的指定包路径
const resolvePkgPath = (pkgName: string, isDist?: boolean) => {
	if (isDist) {
		return `${distPath}/${pkgName}`;
	}
	return `${pkgPath}/${pkgName}`;
};

// 获取指定包的package.json信息
const getPkgJson = (pkgName: string) => {
	const path = `${resolvePkgPath(pkgName)}/package.json`;
	const str = readFileSync(path, 'utf-8');
	return JSON.parse(str);
};

const getBasePlugins = (tsOptions?: RollupTypescriptOptions) => {
	return [cjs(), ts(tsOptions)];
};

export { getPkgJson, resolvePkgPath, getBasePlugins };
