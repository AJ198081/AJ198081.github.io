/*import axios from "axios";
console.log('Hello, Quokka Console!');

fetch(`https://jsonplaceholder.typicode.com/posts/1`)
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error fetching products:', error));

axios.get(`https://jsonplaceholder.typicode.com/posts/12`)
.then(response => console.log(response.data))
.catch(error => console.error('Error fetching product:', error));*/

let myVariable: string = 'Hello, TypeScript!';

let age = 10;

let data = 'Data';

function outerFunction() {
    let age = 20;
    function innerFunction() {
        // age = 'Old';
        // console.log(age, input);
        return age++;
    }
    return innerFunction()
   // return innerFunction;
}


const createCounter = () => {
    let count = 0;
    console.log(count, 'count');
    const getNext =  () => {
        console.log(`Next count is being called${count}.`)
        return ++count;
    }
    const getPrevious = () => --count;
    const reset = () => count = 0;
    const getCurrent = () => count;

    return {getNext, getPrevious, reset, getCurrent};
}

const counterInstance = createCounter();

console.log(counterInstance.getNext());
console.log(counterInstance.getNext());
console.log(counterInstance.getCurrent());
console.log(counterInstance.getPrevious());
console.log(counterInstance.getPrevious());
console.log(counterInstance.getCurrent());

const newCounter = () => {
    let count = 0;
    console.log(count, 'count');
    const increment = () => {
        return ++count;
    }
   return increment();
}

console.log(newCounter());
console.log(newCounter());
console.log(newCounter());
console.log(newCounter());
console.log(newCounter());


