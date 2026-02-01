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
```

### Cara Baru (Clean):
```javascript
const card = $.div(
	{
		className: 'card'
	},
	$.h2({}, 'Hello World'),
	$.p({}, 'This is a paragraph')
);

mount('body', card);
```

## 📚 Penggunaan

### 1. Basic Elements

```javascript
// Div dengan class dan children
const container = $.div(
	{
		className: 'container'
	},
	$.h1({}, 'Judul Halaman'),
	$.p({}, 'Ini adalah paragraf')
);

// Button dengan event handler
const button = $.button(
	{
		className: 'btn btn-primary',
		onClick: () => alert('Clicked!')
	},
	'Click Me'
);
```

### 2. Inline Styling

```javascript
const styledDiv = $.div(
	{
		style: {
			padding: '20px',
			background: '#f0f0f0',
			borderRadius: '8px'
		}
	},
	'Content here'
);
```

### 3. Event Handlers

```javascript
const form = $.form(
	{
		onSubmit: (e) => {
			e.preventDefault();
			console.log('Form submitted!');
		}
	},
	$.input({
		type: 'text', name: 'username'
	}),
	$.button({
		type: 'submit'
	}, 'Submit')
);
```

### 4. Data Attributes

```javascript
const element = $.div(
	{
		dataset: {
			userId: '123',
			role: 'admin',
			active: 'true'
		}
	},
	'User Info'
);
// Menghasilkan: data-user-id="123" data-role="admin" data-active="true"
```

### 5. Nested Children

```javascript
const nav = $.nav(
	{
		className: 'navbar'
	},
	$.ul(
		{},
		$.li({}, $.a({
			href: '#home'
		}, 'Home')),
		$.li({}, $.a({
			href: '#about'
		}, 'About')),
		$.li({}, $.a({
			href: '#contact'
		}, 'Contact'))
	)
);
```

### 6. Dynamic Lists

```javascript
const items = ['Apple', 'Banana', 'Orange'];

const list = $.ul(
	{
		className: 'fruit-list'
	},
	...items.map(item =>
		$.li({}, item)
	)
);
```

### 7. Conditional Rendering

```javascript
const isLoggedIn = true;

const header = $.header(
	{},
	$.h1({}, 'My App'),
	isLoggedIn
	? $.button({
		onClick: logout
	}, 'Logout'): $.button({
		onClick: login
	}, 'Login')
);
```

### 8. Complex Example

```javascript
const userCard = (user) => $.div(
	{
		className: 'user-card',
		dataset: {
			userId: user.id
		}
	},
	$.img({
		src: user.avatar,
		alt: user.name,
		style: {
			width: '100px', borderRadius: '50%'
		}
	}),
	$.div(
		{
			className: 'user-info'
		},
		$.h3({}, user.name),
		$.p({
			style: {
				color: '#666'
			}
		}, user.email),
		$.div(
			{
				className: 'actions'
			},
			$.button(
				{
					className: 'btn-follow',
					onClick: () => followUser(user.id)
				},
				'Follow'
			),
			$.button(
				{
					className: 'btn-message',
					onClick: () => messageUser(user.id)
				},
				'Message'
			)
		)
	)
);

// Gunakan
const user = {
	id: 1,
	name: 'John Doe',
	email: 'john@example.com',
	avatar: 'https://example.com/avatar.jpg'
};

mount('#app', userCard(user));
```

## 🎯 API Reference

### createElement(tag, props, ...children)

Fungsi utama untuk membuat element.

**Parameters:**
- `tag` (string): HTML tag name
- `props` (object): Properties dan attributes
- `children` (Node|string|Array): Child elements

**Returns:** HTMLElement

### $ Object

Shorthand functions untuk tags umum:

**Containers:** `div`, `span`, `section`, `article`, `main`, `header`, `footer`, `nav`

**Text:** `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `p`, `strong`, `em`, `small`

**Lists:** `ul`, `ol`, `li`

**Forms:** `form`, `input`, `textarea`, `select`, `option`, `label`, `button`

**Media:** `img`, `video`, `audio`, `canvas`

**Links:** `a`

**Table:** `table`, `thead`, `tbody`, `tr`, `th`, `td`

**Generic:** `el` (alias untuk createElement)

### mount(parent, ...children)

Append elements ke DOM.

**Parameters:**
- `parent` (HTMLElement|string): Parent element atau CSS selector
- `children` (HTMLElement): Elements yang akan di-append

**Returns:** Parent element

### fragment(...children)

Buat DocumentFragment dengan multiple children.

**Parameters:**
- `children` (HTMLElement): Elements untuk fragment

**Returns:** DocumentFragment

## 💡 Tips & Best Practices

1. **Component Pattern**: Buat reusable components sebagai functions
```javascript
const Button = (text, onClick) =>
$.button({
	className: 'btn', onClick
}, text);
```

2. **Props Spreading**: Gunakan object untuk props yang kompleks
```javascript
const buttonProps = {
	className: 'btn btn-primary',
	onClick: handleClick,
	disabled: false
};
const btn = $.button(buttonProps, 'Click Me');
```

3. **Fragment untuk Multiple Elements**: Gunakan fragment saat return multiple elements
```javascript
const createCards = () => fragment(
	$.div({
		className: 'card'
	}, 'Card 1'),
	$.div({
		className: 'card'
	}, 'Card 2'),
	$.div({
		className: 'card'
	}, 'Card 3')
);
```

## 🔧 Customization

Tambahkan custom tag jika diperlukan:

```javascript
// Tambahkan ke object $
$.customTag = (props, ...children) =>
createElement('custom-tag', props, ...children);
```

## 📝 License

Free to use. No attribution required.

## 🤝 Contributing

Feel free to extend dan customize sesuai kebutuhan project anda!