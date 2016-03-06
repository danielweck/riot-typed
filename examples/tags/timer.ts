import * as riot from 'riot';
import {tag, Tag} from 'riot-typed';

export interface TimerOpts {
  initial: number;
}

let timerCount = 0;

@tag('timer', `
<p>timer {id} - { count }</p>
`)
export default class Timer extends Tag<TimerOpts> {
  id = ++timerCount;
  count: number = 0;
  timerId: number;
  constructor() {
    super();
    this.on('mount', () => {
      console.log(`${this.id}`, this.opts);
      this.count = this.opts.initial;

      this.timerId = setInterval(() => {
        this.count++;
        this.update();
        console.log(`${this.id} updating`);
      }, 1000);
    });
  }

  dispose() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }
}
