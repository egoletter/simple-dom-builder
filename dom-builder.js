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
 * DOM Selection Shortcuts
 */

/**
 * querySelector shortcut
 * @param {string} selector - CSS selector
 * @param {HTMLElement} context - Parent element (default: document)
 * @returns {HTMLElement|null}
 */
function qs(selector, context = document) {
  return context.querySelector(selector);
}

/**
 * querySelectorAll shortcut (returns array, bukan NodeList)
 * @param {string} selector - CSS selector
 * @param {HTMLElement} context - Parent element (default: document)
 * @returns {Array<HTMLElement>}
 */
function qsa(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

/**
 * getElementById shortcut
 * @param {string} id - Element ID
 * @returns {HTMLElement|null}
 */
function byId(id) {
  return document.getElementById(id);
}

/**
 * getElementsByClassName shortcut (returns array)
 * @param {string} className - Class name
 * @param {HTMLElement} context - Parent element (default: document)
 * @returns {Array<HTMLElement>}
 */
function byClass(className, context = document) {
  return Array.from(context.getElementsByClassName(className));
}

/**
 * getElementsByTagName shortcut (returns array)
 * @param {string} tagName - Tag name
 * @param {HTMLElement} context - Parent element (default: document)
 * @returns {Array<HTMLElement>}
 */
function byTag(tagName, context = document) {
  return Array.from(context.getElementsByTagName(tagName));
}

/**
 * Helper untuk append ke DOM
 * @param {HTMLElement|string} parent - Parent element atau selector
 * @param {...HTMLElement} children - Elements yang akan di-append
 */
function mount(parent, ...children) {
  const parentEl = typeof parent === 'string' 
    ? document.querySelector(parent) 
    : parent;
  
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

/**
 * DOM Manipulation Helpers
 */

/**
 * Remove element dari DOM
 * @param {HTMLElement|string} element - Element atau selector
 */
function remove(element) {
  const el = typeof element === 'string' ? qs(element) : element;
  if (el && el.parentNode) {
    el.parentNode.removeChild(el);
  }
  return el;
}

/**
 * Replace child element
 * @param {HTMLElement|string} parent - Parent element atau selector
 * @param {HTMLElement} newChild - New child element
 * @param {HTMLElement} oldChild - Old child element
 */
function replace(parent, newChild, oldChild) {
  const parentEl = typeof parent === 'string' ? qs(parent) : parent;
  if (parentEl) {
    parentEl.replaceChild(newChild, oldChild);
  }
  return parentEl;
}

/**
 * Insert adjacent HTML
 * @param {HTMLElement|string} element - Target element atau selector
 * @param {string} position - 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend'
 * @param {string|HTMLElement} content - HTML string atau element
 */
function insertHTML(element, position, content) {
  const el = typeof element === 'string' ? qs(element) : element;
  if (!el) return null;
  
  if (typeof content === 'string') {
    el.insertAdjacentHTML(position, content);
  } else if (content instanceof Node) {
    el.insertAdjacentElement(position, content);
  }
  return el;
}

/**
 * Insert adjacent element (shortcut untuk insertAdjacentElement)
 * @param {HTMLElement|string} element - Target element atau selector
 * @param {string} position - 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend'
 * @param {HTMLElement} newElement - Element to insert
 */
function insertEl(element, position, newElement) {
  const el = typeof element === 'string' ? qs(element) : element;
  if (el && newElement instanceof Node) {
    el.insertAdjacentElement(position, newElement);
  }
  return el;
}

/**
 * Prepend children (insert di awal)
 * @param {HTMLElement|string} parent - Parent element atau selector
 * @param {...HTMLElement} children - Elements to prepend
 */
function prepend(parent, ...children) {
  const parentEl = typeof parent === 'string' ? qs(parent) : parent;
  if (!parentEl) return null;
  
  children.reverse().forEach(child => {
    if (child instanceof Node) {
      parentEl.insertBefore(child, parentEl.firstChild);
    }
  });
  return parentEl;
}

/**
 * Insert before element
 * @param {HTMLElement|string} reference - Reference element atau selector
 * @param {HTMLElement} newElement - New element to insert
 */
function before(reference, newElement) {
  const refEl = typeof reference === 'string' ? qs(reference) : reference;
  if (refEl && refEl.parentNode && newElement instanceof Node) {
    refEl.parentNode.insertBefore(newElement, refEl);
  }
  return refEl;
}

/**
 * Insert after element
 * @param {HTMLElement|string} reference - Reference element atau selector
 * @param {HTMLElement} newElement - New element to insert
 */
function after(reference, newElement) {
  const refEl = typeof reference === 'string' ? qs(reference) : reference;
  if (refEl && refEl.parentNode && newElement instanceof Node) {
    refEl.parentNode.insertBefore(newElement, refEl.nextSibling);
  }
  return refEl;
}

/**
 * Empty element (remove all children)
 * @param {HTMLElement|string} element - Element atau selector
 */
function empty(element) {
  const el = typeof element === 'string' ? qs(element) : element;
  if (el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }
  return el;
}

/**
 * Clone element
 * @param {HTMLElement|string} element - Element atau selector
 * @param {boolean} deep - Clone children juga (default: true)
 */
function clone(element, deep = true) {
  const el = typeof element === 'string' ? qs(element) : element;
  return el ? el.cloneNode(deep) : null;
}

/**
 * Class manipulation helpers
 */
const css = {
  /**
   * Add class(es)
   * @param {HTMLElement|string} element - Element atau selector
   * @param {...string} classes - Class names
   */
  add(element, ...classes) {
    const el = typeof element === 'string' ? qs(element) : element;
    if (el) el.classList.add(...classes);
    return el;
  },
  
  /**
   * Remove class(es)
   * @param {HTMLElement|string} element - Element atau selector
   * @param {...string} classes - Class names
   */
  remove(element, ...classes) {
    const el = typeof element === 'string' ? qs(element) : element;
    if (el) el.classList.remove(...classes);
    return el;
  },
  
  /**
   * Toggle class
   * @param {HTMLElement|string} element - Element atau selector
   * @param {string} className - Class name
   * @param {boolean} force - Force add/remove
   */
  toggle(element, className, force) {
    const el = typeof element === 'string' ? qs(element) : element;
    if (el) el.classList.toggle(className, force);
    return el;
  },
  
  /**
   * Check if has class
   * @param {HTMLElement|string} element - Element atau selector
   * @param {string} className - Class name
   */
  has(element, className) {
    const el = typeof element === 'string' ? qs(element) : element;
    return el ? el.classList.contains(className) : false;
  },
  
  /**
   * Replace class
   * @param {HTMLElement|string} element - Element atau selector
   * @param {string} oldClass - Old class name
   * @param {string} newClass - New class name
   */
  replace(element, oldClass, newClass) {
    const el = typeof element === 'string' ? qs(element) : element;
    if (el) el.classList.replace(oldClass, newClass);
    return el;
  }
};

/**
 * Attribute manipulation helpers
 */
const attr = {
  /**
   * Get attribute
   * @param {HTMLElement|string} element - Element atau selector
   * @param {string} name - Attribute name
   */
  get(element, name) {
    const el = typeof element === 'string' ? qs(element) : element;
    return el ? el.getAttribute(name) : null;
  },
  
  /**
   * Set attribute
   * @param {HTMLElement|string} element - Element atau selector
   * @param {string} name - Attribute name
   * @param {string} value - Attribute value
   */
  set(element, name, value) {
    const el = typeof element === 'string' ? qs(element) : element;
    if (el) el.setAttribute(name, value);
    return el;
  },
  
  /**
   * Remove attribute
   * @param {HTMLElement|string} element - Element atau selector
   * @param {string} name - Attribute name
   */
  remove(element, name) {
    const el = typeof element === 'string' ? qs(element) : element;
    if (el) el.removeAttribute(name);
    return el;
  },
  
  /**
   * Has attribute
   * @param {HTMLElement|string} element - Element atau selector
   * @param {string} name - Attribute name
   */
  has(element, name) {
    const el = typeof element === 'string' ? qs(element) : element;
    return el ? el.hasAttribute(name) : false;
  },
  
  /**
   * Toggle attribute
   * @param {HTMLElement|string} element - Element atau selector
   * @param {string} name - Attribute name
   * @param {boolean} force - Force add/remove
   */
  toggle(element, name, force) {
    const el = typeof element === 'string' ? qs(element) : element;
    if (el) el.toggleAttribute(name, force);
    return el;
  }
};

/**
 * Style manipulation helper
 * @param {HTMLElement|string} element - Element atau selector
 * @param {Object|string} styles - Style object atau property name
 * @param {string} value - Value (if styles is string)
 */
function style(element, styles, value) {
  const el = typeof element === 'string' ? qs(element) : element;
  if (!el) return null;
  
  if (typeof styles === 'object') {
    Object.assign(el.style, styles);
  } else if (typeof styles === 'string') {
    if (value !== undefined) {
      el.style[styles] = value;
    } else {
      return getComputedStyle(el)[styles];
    }
  }
  return el;
}

/**
 * Event listener helpers
 */
const on = {
  /**
   * Add event listener
   * @param {HTMLElement|string} element - Element atau selector
   * @param {string} event - Event name
   * @param {Function} handler - Event handler
   * @param {Object} options - Event options
   */
  add(element, event, handler, options) {
    const el = typeof element === 'string' ? qs(element) : element;
    if (el) el.addEventListener(event, handler, options);
    return el;
  },
  
  /**
   * Remove event listener
   * @param {HTMLElement|string} element - Element atau selector
   * @param {string} event - Event name
   * @param {Function} handler - Event handler
   */
  remove(element, event, handler) {
    const el = typeof element === 'string' ? qs(element) : element;
    if (el) el.removeEventListener(event, handler);
    return el;
  },
  
  /**
   * Add event listener yang auto-remove setelah 1x trigger
   * @param {HTMLElement|string} element - Element atau selector
   * @param {string} event - Event name
   * @param {Function} handler - Event handler
   */
  once(element, event, handler) {
    const el = typeof element === 'string' ? qs(element) : element;
    if (el) el.addEventListener(event, handler, { once: true });
    return el;
  },
  
  /**
   * Event delegation
   * @param {HTMLElement|string} parent - Parent element atau selector
   * @param {string} event - Event name
   * @param {string} selector - Child selector
   * @param {Function} handler - Event handler
   */
  delegate(parent, event, selector, handler) {
    const parentEl = typeof parent === 'string' ? qs(parent) : parent;
    if (!parentEl) return null;
    
    parentEl.addEventListener(event, (e) => {
      const target = e.target.closest(selector);
      if (target && parentEl.contains(target)) {
        handler.call(target, e);
      }
    });
    return parentEl;
  }
};

/**
 * Data attribute helpers
 */
const data = {
  /**
   * Get data attribute
   * @param {HTMLElement|string} element - Element atau selector
   * @param {string} key - Data key
   */
  get(element, key) {
    const el = typeof element === 'string' ? qs(element) : element;
    return el ? el.dataset[key] : undefined;
  },
  
  /**
   * Set data attribute
   * @param {HTMLElement|string} element - Element atau selector
   * @param {string} key - Data key
   * @param {string} value - Data value
   */
  set(element, key, value) {
    const el = typeof element === 'string' ? qs(element) : element;
    if (el) el.dataset[key] = value;
    return el;
  },
  
  /**
   * Remove data attribute
   * @param {HTMLElement|string} element - Element atau selector
   * @param {string} key - Data key
   */
  remove(element, key) {
    const el = typeof element === 'string' ? qs(element) : element;
    if (el) delete el.dataset[key];
    return el;
  },
  
  /**
   * Has data attribute
   * @param {HTMLElement|string} element - Element atau selector
   * @param {string} key - Data key
   */
  has(element, key) {
    const el = typeof element === 'string' ? qs(element) : element;
    return el ? key in el.dataset : false;
  }
};

/**
 * DOM ready helper
 * @param {Function} callback - Callback when DOM ready
 */
function ready(callback) {
  if (document.readyState !== 'loading') {
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }
}

/**
 * Create text node
 * @param {string} text - Text content
 */
function text(content) {
  return document.createTextNode(content);
}

// Export untuk ES6 modules (opsional)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { 
    // Core
    createElement, 
    $, 
    mount, 
    fragment,
    
    // Selection
    qs,
    qsa,
    byId,
    byClass,
    byTag,
    
    // Manipulation
    remove,
    replace,
    insertHTML,
    insertEl,
    prepend,
    before,
    after,
    empty,
    clone,
    
    // Helpers
    css,
    attr,
    style,
    on,
    data,
    ready,
    text
  };
}
