# DOM Builder - Quick Reference

## 🏗️ Element Creation
```javascript
// Basic
$.div({}, 'Content')
$.p({ className: 'text' }, 'Paragraph')
$.button({ onClick: handler }, 'Click')

// With props
$.div({
  className: 'box',
  id: 'main',
  style: { color: 'red' },
  onClick: handler,
  dataset: { id: '123' }
}, 'Content')
```

## 🔍 Selection
```javascript
qs('.class')              // querySelector
qsa('.class')             // querySelectorAll (array)
byId('id')                // getElementById
byClass('class')          // getElementsByClassName (array)
byTag('div')              // getElementsByTagName (array)
```

## ✂️ Manipulation
```javascript
mount('#parent', el)      // append
prepend('#parent', el)    // insert at start
remove('#el')             // remove element
empty('#parent')          // clear children
clone('#el', true)        // clone element
replace('#p', new, old)   // replace child
before('#ref', el)        // insert before
after('#ref', el)         // insert after
```

## 📌 Insert Adjacent
```javascript
insertEl('#ref', 'beforebegin', el)  // before element
insertEl('#ref', 'afterbegin', el)   // first child
insertEl('#ref', 'beforeend', el)    // last child
insertEl('#ref', 'afterend', el)     // after element
insertHTML('#ref', position, html)   // insert HTML
```

## 🎨 Classes
```javascript
css.add('#el', 'class1', 'class2')   // add
css.remove('#el', 'class')           // remove
css.toggle('#el', 'class')           // toggle
css.has('#el', 'class')              // check
css.replace('#el', 'old', 'new')    // replace
```

## 🏷️ Attributes
```javascript
attr.set('#el', 'href', 'url')       // set
attr.get('#el', 'href')              // get
attr.remove('#el', 'disabled')       // remove
attr.has('#el', 'required')          // check
attr.toggle('#el', 'disabled')       // toggle
```

## 📊 Data Attributes
```javascript
data.set('#el', 'id', '123')         // set data-id
data.get('#el', 'id')                // get data-id
data.remove('#el', 'id')             // remove data-id
data.has('#el', 'id')                // check data-id
```

## 🎨 Styles
```javascript
// Set multiple
style('#el', { 
  color: 'red', 
  fontSize: '20px' 
})

// Set single
style('#el', 'color', 'blue')

// Get
style('#el', 'color')
```

## ⚡ Events
```javascript
on.add('#el', 'click', handler)           // add
on.remove('#el', 'click', handler)        // remove
on.once('#el', 'click', handler)          // one-time
on.delegate('#p', 'click', '.c', handler) // delegation
```

## 🛠️ Utilities
```javascript
fragment(el1, el2, el3)   // create fragment
ready(callback)           // DOM ready
text('content')           // create text node
```

## 📝 Complete Example
```javascript
// Create component
const Card = (user) => $.div(
  { 
    className: 'card',
    dataset: { userId: user.id }
  },
  $.h3({}, user.name),
  $.p({}, user.email),
  $.button(
    { 
      className: 'btn',
      onClick: () => alert(user.name)
    },
    'Click'
  )
);

// Mount & manipulate
ready(() => {
  const card = Card({ 
    id: 1, 
    name: 'John', 
    email: 'john@example.com' 
  });
  
  mount('#app', card);
  css.add(card, 'fade-in');
  style(card, { marginTop: '20px' });
});

// Query & modify
const el = qs('.card');
css.toggle(el, 'active');
attr.set(el, 'title', 'User Card');
data.set(el, 'loaded', 'true');

// Events with delegation
on.delegate('#app', 'click', '.btn', function() {
  alert(this.textContent);
});
```

## 🔥 Common Patterns

### Dynamic List
```javascript
const items = ['A', 'B', 'C'];
const list = $.ul(
  {},
  ...items.map(item => $.li({}, item))
);
```

### Conditional Render
```javascript
const render = (isActive) => $.div(
  {},
  isActive 
    ? $.span({}, 'Active')
    : $.span({}, 'Inactive')
);
```

### State Management
```javascript
let state = { count: 0 };

function render() {
  empty('#app');
  mount('#app', 
    $.div({}, `Count: ${state.count}`),
    $.button({ 
      onClick: () => {
        state.count++;
        render();
      }
    }, '+')
  );
}
```

### Animation
```javascript
const el = $.div({ 
  style: { 
    opacity: '0',
    transition: 'all 0.3s'
  }
}, 'Fade In');

mount('#app', el);
setTimeout(() => style(el, 'opacity', '1'), 10);
```

### Form Handling
```javascript
const form = $.form(
  {
    onSubmit: (e) => {
      e.preventDefault();
      const name = qs('#name').value;
      alert(`Hello ${name}`);
    }
  },
  $.input({ id: 'name', type: 'text' }),
  $.button({ type: 'submit' }, 'Submit')
);
```
