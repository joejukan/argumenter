import {Argumenter} from '../src';

describe(`Argument Optionality Tests`, () => {
    test(`Execute method with two optional arguments (string and/or number)`, () => {
        let method = function(...args){
            let arg = new Argumenter(args);
            switch(args.length){
                case 0: return true;
                case 1: return (arg.string === 'John' && arg.number === undefined) || (arg.number === 35 && arg.string === undefined);
                case 2: return arg.string === 'John' && arg.number === 35;
                default: return false;
            }
        }
        expect(method()).toBeTruthy();
        expect(method('John')).toBeTruthy();
        expect(method(35)).toBeTruthy();
        expect(method('John', 35)).toBeTruthy();
        expect(method(35, 'John')).toBeTruthy();
    });
});