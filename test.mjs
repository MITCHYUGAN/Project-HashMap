import HashMap from './hashmap.mjs'

const test = new HashMap()
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

// Overwriting values
test.set('apple', 'green');

// Exceeding load factor to force resizing
test.set('moon', 'silver');

console.log(test.entries()); // List of key-value pairs
console.log(test.keys());    // List of keys
console.log(test.values());  // List of values