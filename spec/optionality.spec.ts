import {Argumenter} from '../src';

describe(`Argument Optionality Tests`, () => {
    it(`Execute method with two optional arguments (string and/or number)`, done => {
        let method = function(...args){
            let arg = new Argumenter(args);
            switch(args.length){
                case 0: return true;
                case 1: return (arg.string === 'John' && arg.number === undefined) || (arg.number === 35 && arg.string === undefined);
                case 2: return arg.string === 'John' && arg.number === 35;
                default: return false;
            }
        }
        expect(method()).toBeTruthy(`The overload function() was not successful`);
        expect(method('John')).toBeTruthy(`The overload function(string) was not successful`);
        expect(method(35)).toBeTruthy(`The overload function(number) was not successful`);
        expect(method('John', 35)).toBeTruthy(`The overload function(string, number) was not successful`);
        expect(method(35, 'John')).toBeTruthy(`The overload function(string, number) was not successful`);
        done();
    });
});