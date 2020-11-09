import {Argumenter} from '../src';

describe(`Functional Overload Tests`, () => {
    test(`Overload method with two arguments (string and number)`, () => {
        let method = function(...args){
            let argumenter = new Argumenter(args);
            return argumenter.string === 'John' && argumenter.number === 35;
        }
        expect(method('John', 35)).toBeTruthy();
        expect(method(35, 'John')).toBeTruthy();
    });

    test(`Overload method with two arguments (string and boolean)`, () => {
        let method = function(...args){
            let argumenter = new Argumenter(args);
            return argumenter.string === 'John' && argumenter.boolean === true;
        }
        expect(method('John', true)).toBeTruthy();
        expect(method(true, 'John')).toBeTruthy();
    });

    test(`Overload method with two arguments (object and string)`, () => {
        let method = function(...args){
            let arg = new Argumenter(args);
            let object: {name: string, age: number} = <any> arg.object;
            if(object){
                return object.name === 'John' && object.age === 35 && arg.string === 'John';
            }
            return false;
        }
        expect(method({name: 'John', age: 35}, 'John')).toBeTruthy();
        expect(method('John', {name: 'John', age: 35})).toBeTruthy();
    });

    test(`Overload method with two arguments (object and array)`, () => {
        let method = function(...args) {
            const a = new Argumenter(args);
            const { array } = a;
            const { object } = a;
            return Array.isArray(array) && object && !Array.isArray(object);
        }
        const array = [10, 20];
        const object = { age: 20 };
        expect(method(array, object)).toBeTruthy();
        expect(method(object, array)).toBeTruthy();
    });

    test(`Overload method with thre arguments (number, string and symbol)`, () => {
        let method = function(...args) {
            const a = new Argumenter(args);
            const { object } = a;
            const { symbol } = a;
            expect(object).toBeFalsy();
            expect(symbol).toBeDefined();
            expect(typeof symbol === 'symbol').toBeTruthy();
            expect(symbol.toString() === Symbol('Age').toString())
        }
        const symbol = Symbol('Age');
        method('Name', 40, symbol);
    });
});