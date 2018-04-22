/**
 * @author Joseph Eniojukan
 */
export class Argumenter {
    private args = [];
    constructor(args: Array<any>) {
        if (Array.isArray(args)) {
            for (let i = 0; i < args.length; i++) {
                let arg = args[i];
                this.args.push(arg);
            }
        }
    }
    
    public get number(): number {
        return this.getNative('number');
    }

    public get string(): string {
        return this.getNative('string');
    }

    public get boolean(): boolean {
        return this.getNative('boolean');
    }

    public get nil(): null{
        return this.getNative('null');
    }

    public get null(): null{
        return this.getNative('null');
    }

    public get object(): Object {
        return this.getNative('object');
    }

    public get function(): any {
        return this.getNative('function');;
    }

    public get array(): Array<any> {
        return this.getNative('array');
    }

    public instance<T>(type: { new (): T }): T {
        let args = this.args;
        let result;
        let remove = -1;
        for (let i = 0; i < args.length; i++) {
            let arg = args[i];
            if (arg instanceof type) {
                result = arg;
                remove = i;
                break;
            }
        }

        if (remove >= 0)
            args.splice(remove, 1);

        return result;
    }
    private screenArray(type: string, arg: any, arrayed: boolean) {
        if (type === 'object') {
            if (Array.isArray(arg))
                return arrayed;
        }

        return true;
    }

    private getNative(type: string) {
        let args = this.args;
        let result;
        let remove = -1;
        let arrayed = false;

        if (type === 'array') {
            type = 'object';
            arrayed = true;
        }
        for (let i = 0; i < args.length; i++) {
            let arg = args[i];
            if (typeof arg === type && this.screenArray(type, arg, arrayed)) {
                result = arg;
                remove = i;
                break;
            }
        }

        if (remove >= 0)
            args.splice(remove, 1);

        return result;
    }
}
