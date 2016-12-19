import * as riot from 'riot';
import {tag, Tag} from 'riot-typed';

@tag('logger',{ template: '<p class="red" each="{ item in logs }">{ item }</p>', css: '.red{color:red;}' })
export default class Logger extends Tag<any>{
    logs: string[];

    constructor(){
        super();

        this.logs = ['line 1', 'line 2'];
    }
}