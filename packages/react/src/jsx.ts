 import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import type {
	Props,
	Type,
	Key,
	Ref,
	ReactElement,
	ElementType
} from 'shared/ReactTypes';

// React元素构造函数
const ReactElement = function (
	type: Type,
	key: Key,
	ref: Ref,
	props: Props
): ReactElement {
	const element = {
		$$typeof: REACT_ELEMENT_TYPE, // 用于区分 React 元素
		type, // DOM元素类型
		key,
		ref,
		props,
		__mark: 'ajh' // 用于区分官方React框架与自己实现的React框架
	};
	return element;
};

// jsx方法
export const jsx = (type: ElementType, config: any, ...children: any) => {
	let key = null;
	let ref = null;
	const props: any = {};
	const childrenLength = children.length;
	for (const prop in config) {
		const val = config[prop];
		if (prop === 'key') {
			if (val !== undefined) {
				key = '' + val;
				continue;
			}
		}
		if (prop === 'ref') {
			if (val !== undefined) {
				ref = val;
				continue;
			}
		}
		// 判断config对象上是否有prop属性（采用这种写法是避免config对象被修改或hasOwnProperty方法被重写）
		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}
	}
	if (childrenLength) {
		if (childrenLength === 1) {
			props.children = children[0];
		} else {
			props.children = children;
		}
	}
	return ReactElement(type, key, ref, props);
};

export default ReactElement;
export const jsxDEV = jsx;
