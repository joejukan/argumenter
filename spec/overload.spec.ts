import {Argumenter} from '../src';

describe(`Functional Overload Tests`, () => {
    it(`Overload method with two arguments (string and number)`, done => {
        let method = function(...args){
            let argumenter = new Argumenter(args);
            return argumenter.string === 'John' && argumenter.number === 35;
        }
        expect(method('John', 35)).toBeTruthy(`The overload function(string, number) was not successful`);
        expect(method(35, 'John')).toBeTruthy(`The overload function(number, string) was not successful`);
        done();
    });

    it(`Overload method with two arguments (string and boolean)`, done => {
        let method = function(...args){
            let argumenter = new Argumenter(args);
            return argumenter.string === 'John' && argumenter.boolean === true;
        }
        expect(method('John', true)).toBeTruthy(`The overload function(string, boolean) was not successful`);
        expect(method(true, 'John')).toBeTruthy(`The overload function(boolean, string) was not successful`);
        done();
    });

    it(`Overload method with two arguments (object and string)`, done => {
        let method = function(...args){
            let arg = new Argumenter(args);
            let object: {name: string, age: number} = <any> arg.object;
            if(object){
                return object.name === 'John' && object.age === 35 && arg.string === 'John';
            }
            return false;
        }
        expect(method({name: 'John', age: 35}, 'John')).toBeTruthy(`The overload function(object, string) was not successful`);
        expect(method('John', {name: 'John', age: 35})).toBeTruthy(`The overload function(string, object) was not successful`);
        done();
    });
});