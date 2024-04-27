import { defineConfig } from 'rollup';
import { getPkgJson, resolvePkgPath, getBasePlugins } from './utils';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const { name, module } = getPkgJson('react');
// 源码路径
const reactPath = resolvePkgPath(name);
// 产物路径
const reactDistPath = resolvePkgPath(name, true);

export default defineConfig([
	{
		input: `${reactPath}/${module}`,
		// react
		output: {
			file: `${reactDistPath}/index.js`,
			name: 'index.js',
			format: 'umd'
		},
		plugins: [
			...getBasePlugins(),
			generatePackageJson({
				inputFolder: reactPath,
				outputFolder: reactDistPath,
				baseContents: ({ name, version, description }) => ({
					name,
					version,
					description,
					main: 'index.js'
				})
			})
		]
	},
	{
		input: `${reactPath}/src/jsx.ts`,
		output: [
			// jsx-runtime.js
			{
				file: `${reactDistPath}/jsx-runtime.js`,
				name: 'jsx-runtime.js',
				format: 'umd'
			},
			// jsx-dev-runtime.js
			{
				file: `${reactDistPath}/jsx-dev-runtime.js`,
				name: 'jsx-dev-runtime.js',
				format: 'umd'
			}
		],
		plugins: getBasePlugins()
	}
]);
