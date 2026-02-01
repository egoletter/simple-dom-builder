# DOM Builder - JavaScript Utility

Wrapper function untuk membuat HTML elements dengan mudah tanpa perlu menggunakan `document.createElement`, `appendChild`, dan API DOM repetitif lainnya.

## 🌟 Fitur

- ✅ Syntax yang clean dan mudah dibaca
- ✅ Support semua HTML tags umum
- ✅ Event handlers langsung di props
- ✅ Inline styling dengan object
- ✅ Data attributes support
- ✅ Nested children unlimited
- ✅ Array children support
- ✅ **Shortcuts untuk querySelector, querySelectorAll, getElementById, dll**
- ✅ **DOM manipulation helpers (insert, remove, replace, clone)**
- ✅ **Class, attribute, dan style manipulation**
- ✅ **Event listener helpers dengan delegation**
- ✅ Type-safe (bisa ditambahkan TypeScript)

## 📦 Instalasi

Cukup include file `dom-builder.js` di HTML anda:

```html
<script src="dom-builder.js"></script>
```

## 🚀 Quick Start

### Cara Lama (Repetitif):
```javascript
const div = document.createElement('div');
div.className = 'card';

const h2 = document.createElement('h2');
h2.textContent = 'Hello World';

const p = document.createElement('p');
p.textContent = 'This is a paragraph';

div.appendChild(h2);
div.appendChild(p);
document.body.appendChild(div);

// Query selector
const element = document.querySelector('.card');
element.classList.add('active');
```

### Cara Baru (Clean):
```javascript
const card = $.div(
  { className: 'card' },
  $.h2({}, 'Hello World'),
  $.p({}, 'This is a paragraph')
);

mount('body', card);

// Query selector
css.add('.card', 'active');
```

## 📚 API Reference

### 🏗️ Element Creation

#### createElement(tag, props, ...children)
Fungsi utama untuk membuat element.

```javascript
const div = createElement('div', { className: 'container' }, 'Hello');
```

#### $ Object
Shorthand functions untuk tags umum:

```javascript
$.div({ className: 'box' }, 'Content');
$.button({ onClick: handleClick }, 'Click');
$.input({ type: 'text', placeholder: 'Name' });
```

**Available tags:**
- **Containers:** div, span, section, article, main, header, footer, nav
- **Text:** h1-h6, p, strong, em, small
- **Lists:** ul, ol, li
- **Forms:** form, input, textarea, select, option, label, button
- **Media:** img, video, audio, canvas
- **Links:** a
- **Table:** table, thead, tbody, tr, th, td

---

### 🔍 DOM Selection

#### qs(selector, context?)
Shortcut untuk `querySelector`. Returns HTMLElement atau null.

```javascript
const element = qs('.my-class');
const nested = qs('.child', parentElement);
```

#### qsa(selector, context?)
Shortcut untuk `querySelectorAll`. Returns **Array** (bukan NodeList).

```javascript
const items = qsa('.item');
items.forEach(item => console.log(item));
```

#### byId(id)
Shortcut untuk `getElementById`.

```javascript
const header = byId('main-header');
```

#### byClass(className, context?)
Shortcut untuk `getElementsByClassName`. Returns **Array**.

```javascript
const buttons = byClass('btn');
```

#### byTag(tagName, context?)
Shortcut untuk `getElementsByTagName`. Returns **Array**.

```javascript
const allDivs = byTag('div');
```

---

### ✂️ DOM Manipulation

#### mount(parent, ...children)
Append elements ke parent.

```javascript
mount('#app', element1, element2, element3);
mount(parentElement, childElement);
```

#### prepend(parent, ...children)
Insert elements di awal (first child).

```javascript
prepend('#list', newItem);
```

#### remove(element)
Remove element dari DOM.

```javascript
remove('#old-element');
remove(elementReference);
```

#### empty(element)
Remove semua children dari element.

```javascript
empty('#container');
```

#### clone(element, deep?)
Clone element. Default deep = true.

```javascript
const copy = clone('#original');
const shallowCopy = clone('#original', false);
```

#### replace(parent, newChild, oldChild)
Replace child element.

```javascript
replace('#parent', newElement, oldElement);
```

#### before(reference, newElement)
Insert element before reference.

```javascript
before('#reference', newElement);
```

#### after(reference, newElement)
Insert element after reference.

```javascript
after('#reference', newElement);
```

---

### 📌 Insert Adjacent

#### insertEl(element, position, newElement)
Insert element adjacent to target.

**Positions:**
- `'beforebegin'` - Before the element
- `'afterbegin'` - First child of element
- `'beforeend'` - Last child of element
- `'afterend'` - After the element

```javascript
insertEl('#target', 'beforebegin', newElement);
insertEl('#target', 'afterbegin', newElement);
```

#### insertHTML(element, position, html)
Insert HTML string atau element.

```javascript
insertHTML('#target', 'beforeend', '<p>New paragraph</p>');
insertHTML('#target', 'afterbegin', newElement);
```

---

### 🎨 Class Manipulation

#### css.add(element, ...classes)
Add classes ke element.

```javascript
css.add('#box', 'active');
css.add('#box', 'active', 'highlight', 'animated');
```

#### css.remove(element, ...classes)
Remove classes dari element.

```javascript
css.remove('#box', 'active');
```

#### css.toggle(element, className, force?)
Toggle class.

```javascript
css.toggle('#box', 'active');
css.toggle('#box', 'active', true);  // force add
```

#### css.has(element, className)
Check apakah element punya class.

```javascript
if (css.has('#box', 'active')) {
  console.log('Is active!');
}
```

#### css.replace(element, oldClass, newClass)
Replace class.

```javascript
css.replace('#box', 'old-style', 'new-style');
```

---

### 🏷️ Attribute Manipulation

#### attr.set(element, name, value)
Set attribute.

```javascript
attr.set('#link', 'href', 'https://example.com');
attr.set('#input', 'placeholder', 'Enter name');
```

#### attr.get(element, name)
Get attribute value.

```javascript
const href = attr.get('#link', 'href');
```

#### attr.remove(element, name)
Remove attribute.

```javascript
attr.remove('#input', 'disabled');
```

#### attr.has(element, name)
Check apakah element punya attribute.

```javascript
if (attr.has('#input', 'required')) {
  console.log('Is required!');
}
```

#### attr.toggle(element, name, force?)
Toggle attribute.

```javascript
attr.toggle('#input', 'disabled');
```

---

### 📊 Data Attributes

#### data.set(element, key, value)
Set data attribute.

```javascript
data.set('#user', 'id', '123');
data.set('#user', 'role', 'admin');
// Sets data-id="123" data-role="admin"
```

#### data.get(element, key)
Get data attribute value.

```javascript
const userId = data.get('#user', 'id');
```

#### data.remove(element, key)
Remove data attribute.

```javascript
data.remove('#user', 'temp');
```

#### data.has(element, key)
Check apakah element punya data attribute.

```javascript
if (data.has('#user', 'verified')) {
  console.log('User is verified!');
}
```

---

### 🎨 Style Manipulation

#### style(element, styles, value?)
Set atau get styles.

**Set multiple styles:**
```javascript
style('#box', {
  color: 'red',
  fontSize: '20px',
  backgroundColor: '#f0f0f0'
});
```

**Set single style:**
```javascript
style('#box', 'color', 'blue');
```

**Get style:**
```javascript
const color = style('#box', 'color');
```

---

### ⚡ Event Listeners

#### on.add(element, event, handler, options?)
Add event listener.

```javascript
on.add('#button', 'click', () => console.log('Clicked!'));
on.add('#form', 'submit', handleSubmit, { passive: true });
```

#### on.remove(element, event, handler)
Remove event listener.

```javascript
on.remove('#button', 'click', clickHandler);
```

#### on.once(element, event, handler)
Add one-time event listener (auto-remove setelah 1x trigger).

```javascript
on.once('#splash', 'click', () => {
  console.log('This runs only once!');
});
```

#### on.delegate(parent, event, selector, handler)
Event delegation untuk dynamic elements.

```javascript
on.delegate('#list', 'click', '.item', function(e) {
  console.log('Clicked item:', this.textContent);
});
```

---

### 🛠️ Utility Functions

#### fragment(...children)
Create DocumentFragment.

```javascript
const frag = fragment(
  $.div({}, 'Item 1'),
  $.div({}, 'Item 2'),
  $.div({}, 'Item 3')
);
mount('#container', frag);
```

#### ready(callback)
Execute callback when DOM is ready.

```javascript
ready(() => {
  console.log('DOM is ready!');
  mount('#app', myComponent);
});
```

#### text(content)
Create text node.

```javascript
const textNode = text('Hello World');
mount('#container', textNode);
```

---

## 💡 Usage Examples

### Complex Component

```javascript
const UserCard = (user) => {
  return $.div(
    { 
      className: 'user-card',
      dataset: { userId: user.id }
    },
    $.img({ src: user.avatar, alt: user.name }),
    $.div(
      { className: 'user-info' },
      $.h3({}, user.name),
      $.p({}, user.email),
      $.button(
        {
          className: 'btn btn-primary',
          onClick: () => followUser(user.id)
        },
        'Follow'
      )
    )
  );
};

mount('#app', UserCard({ 
  id: 1, 
  name: 'John', 
  email: 'john@example.com',
  avatar: 'avatar.jpg'
}));
```

### Dynamic List with Event Delegation

```javascript
const todoList = $.ul({ id: 'todo-list' });

// Event delegation untuk handle clicks pada semua items
on.delegate('#todo-list', 'click', '.delete-btn', function() {
  remove(this.closest('li'));
});

// Add items dynamically
function addTodo(text) {
  const item = $.li(
    { className: 'todo-item' },
    $.span({}, text),
    $.button({ className: 'delete-btn btn-danger' }, '✕')
  );
  mount(todoList, item);
}

mount('#app', todoList);
addTodo('Buy groceries');
addTodo('Walk the dog');
```

### Conditional Rendering & State

```javascript
let isLoggedIn = false;

function renderHeader() {
  const header = byId('header');
  empty(header);
  
  mount(
    header,
    $.nav(
      {},
      $.h1({}, 'My App'),
      isLoggedIn 
        ? $.div(
            {},
            $.span({}, 'Welcome back!'),
            $.button(
              { onClick: logout, className: 'btn' },
              'Logout'
            )
          )
        : $.button(
            { onClick: login, className: 'btn' },
            'Login'
          )
    )
  );
}

function login() {
  isLoggedIn = true;
  renderHeader();
}

function logout() {
  isLoggedIn = false;
  renderHeader();
}
```

### Animated List

```javascript
function createAnimatedItem(text) {
  const item = $.div(
    { 
      className: 'item',
      style: {
        opacity: '0',
        transform: 'translateY(-20px)',
        transition: 'all 0.3s'
      }
    },
    text
  );
  
  mount('#list', item);
  
  // Trigger animation
  setTimeout(() => {
    style(item, {
      opacity: '1',
      transform: 'translateY(0)'
    });
  }, 10);
  
  return item;
}
```

### Form Handling

```javascript
const form = $.form(
  {
    onSubmit: (e) => {
      e.preventDefault();
      
      const formData = {
        name: qs('#name').value,
        email: qs('#email').value
      };
      
      // Validate
      if (!formData.name) {
        css.add('#name', 'error');
        return;
      }
      
      console.log('Form data:', formData);
      empty(form);
      mount(form, $.p({ className: 'success' }, '✓ Submitted!'));
    }
  },
  $.input({ id: 'name', type: 'text', placeholder: 'Name' }),
  $.input({ id: 'email', type: 'email', placeholder: 'Email' }),
  $.button({ type: 'submit' }, 'Submit')
);
```

---

## 🎯 Tips & Best Practices

### 1. Component Pattern
```javascript
const Button = (text, onClick, variant = 'primary') => 
  $.button({ className: `btn btn-${variant}`, onClick }, text);

const Card = (title, content) =>
  $.div(
    { className: 'card' },
    $.h3({}, title),
    $.p({}, content)
  );
```

### 2. Reusable Selectors
```javascript
// Cache selectors yang sering digunakan
const $app = byId('app');
const $items = () => qsa('.item'); // Function untuk fresh query
```

### 3. Chaining dengan Return Values
```javascript
// Kebanyakan functions return element, bisa di-chain
const box = style(
  css.add(
    attr.set('#box', 'title', 'Hello'),
    'active'
  ),
  { padding: '20px' }
);
```

### 4. Event Delegation untuk Dynamic Content
```javascript
// Lebih efisien daripada attach listener ke setiap item
on.delegate('#parent', 'click', '.dynamic-item', handler);
```

### 5. Fragment untuk Multiple Elements
```javascript
// Lebih efficient daripada multiple mount calls
const items = fragment(
  $.div({}, 'Item 1'),
  $.div({}, 'Item 2'),
  $.div({}, 'Item 3')
);
mount('#container', items);
```

---

## 📝 License

Free to use. No attribution required.

## 🤝 Contributing

Feel free to extend dan customize sesuai kebutuhan project anda!
