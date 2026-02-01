/**
* DOM Builder - Utility functions untuk membuat HTML elements dengan mudah
* Tidak perlu lagi document.createElement dan appendChild berulang-ulang
*/

/**
* Fungsi utama untuk membuat element
* @param {string} tag - Tag HTML (div, span, button, dll)
* @param {Object} props - Properties dan attributes
* @param {...(Node|string)} children - Child elements atau text
* @returns {HTMLElement}
*/
function createElement(tag, props = {}, ...children) {
	const element = document.createElement(tag);

	// Set properties dan attributes
	Object.entries(props).forEach(([key, value]) => {
		if (key === 'className') {
			element.className = value;
		} else if (key === 'style' && typeof value === 'object') {
			Object.assign(element.style, value);
		} else if (key.startsWith('on') && typeof value === 'function') {
			// Event listeners (onClick, onSubmit, dll)
			const eventName = key.substring(2).toLowerCase();
			element.addEventListener(eventName, value);
		} else if (key === 'dataset' && typeof value === 'object') {
			// Data attributes
			Object.entries(value).forEach(([dataKey, dataValue]) => {
				element.dataset[dataKey] = dataValue;
			});
		} else {
			element.setAttribute(key, value);
		}
	});

	// Append children
	children.forEach(child => {
		if (child !== null && child !== undefined) {
			if (typeof child === 'string' || typeof child === 'number') {
				element.appendChild(document.createTextNode(child));
			} else if (child instanceof Node) {
				element.appendChild(child);
			} else if (Array.isArray(child)) {
				child.forEach(c => {
					if (c instanceof Node) element.appendChild(c);
				});
			}
		}
	});

	return element;
}

/**
* Shorthand functions untuk tag-tag umum
*/
const $ = {
	// Containers
	div: (props, ...children) => createElement('div', props, ...children),
	span: (props, ...children) => createElement('span', props, ...children),
	section: (props, ...children) => createElement('section', props, ...children),
	article: (props, ...children) => createElement('article', props, ...children),
	main: (props, ...children) => createElement('main', props, ...children),
	header: (props, ...children) => createElement('header', props, ...children),
	footer: (props, ...children) => createElement('footer', props, ...children),
	nav: (props, ...children) => createElement('nav', props, ...children),
	br: (props, ...children) => createElement('br', props, ...children),

	// Text
	h1: (props, ...children) => createElement('h1', props, ...children),
	h2: (props, ...children) => createElement('h2', props, ...children),
	h3: (props, ...children) => createElement('h3', props, ...children),
	h4: (props, ...children) => createElement('h4', props, ...children),
	h5: (props, ...children) => createElement('h5', props, ...children),
	h6: (props, ...children) => createElement('h6', props, ...children),
	p: (props, ...children) => createElement('p', props, ...children),
	strong: (props, ...children) => createElement('strong', props, ...children),
	em: (props, ...children) => createElement('em', props, ...children),
	small: (props, ...children) => createElement('small', props, ...children),

	// Lists
	ul: (props, ...children) => createElement('ul', props, ...children),
	ol: (props, ...children) => createElement('ol', props, ...children),
	li: (props, ...children) => createElement('li', props, ...children),

	// Forms
	form: (props, ...children) => createElement('form', props, ...children),
	input: (props) => createElement('input', props),
	textarea: (props, ...children) => createElement('textarea', props, ...children),
	select: (props, ...children) => createElement('select', props, ...children),
	option: (props, ...children) => createElement('option', props, ...children),
	label: (props, ...children) => createElement('label', props, ...children),
	button: (props, ...children) => createElement('button', props, ...children),

	// Media
	img: (props) => createElement('img', props),
	video: (props, ...children) => createElement('video', props, ...children),
	audio: (props, ...children) => createElement('audio', props, ...children),
	canvas: (props) => createElement('canvas', props),

	// Links
	a: (props, ...children) => createElement('a', props, ...children),

	// Table
	table: (props, ...children) => createElement('table', props, ...children),
	thead: (props, ...children) => createElement('thead', props, ...children),
	tbody: (props, ...children) => createElement('tbody', props, ...children),
	tr: (props, ...children) => createElement('tr', props, ...children),
	th: (props, ...children) => createElement('th', props, ...children),
	td: (props, ...children) => createElement('td', props, ...children),

	// Generic
	el: createElement
};

/**
* Helper untuk append ke DOM
* @param {HTMLElement|string} parent - Parent element atau selector
* @param {...HTMLElement} children - Elements yang akan di-append
*/
function mount(parent, ...children) {
	const parentEl = typeof parent === 'string'
	? document.querySelector(parent): parent;

	if (!parentEl) {
		console.error('Parent element not found');
		return;
	}

	children.forEach(child => {
		if (child instanceof Node) {
			parentEl.appendChild(child);
		}
	});

	return parentEl;
}

/**
* Helper untuk create fragment dengan multiple children
* @param {...HTMLElement} children
* @returns {DocumentFragment}
*/
function fragment(...children) {
	const frag = document.createDocumentFragment();
	children.forEach(child => {
		if (child instanceof Node) {
			frag.appendChild(child);
		}
	});
	return frag;
}


export { createElement, $, mount, fragment }