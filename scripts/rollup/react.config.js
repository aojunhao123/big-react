import { defineConfig } from 'rollup';
import { getPkgJson, resolvePkgPath } from './utils';

const { name, module } = getPkgJson('react');
const reactPath = resolvePkgPath(name);
const reactDistPath = resolvePkgPath(name, true);

export default defineConfig({
	input: `${reactPath}/${module}`,
	output: [
		{
			file: `${reactDistPath}/index.js`,
			name: 'index.js',
			format: 'umd'
		},
		{
			file: `${reactDistPath}/index.cjs.js`,
			name: 'index.js',
			format: 'umd'
		},
		{
			file: `${reactDistPath}/index.esm.js`,
			name: 'index.js',
			format: 'umd'
		}
	],
	plugins:[]
});
