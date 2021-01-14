import {Subject} from 'rxjs';

const subject = new Subject();

let interval = null;
let milliseconds = 0;

export const timerStore = {

    init: () => subject.next(milliseconds),

    subscribe: setState => subject.subscribe(setState),

    tick: () => {
        if (interval) return;
        else {
            interval = setInterval(() => {
                milliseconds += 1000;
                subject.next(milliseconds);
            }, 1000)
        }
    },

    stop: () => {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
        milliseconds = 0;
        subject.next(milliseconds);
    },

    wait: () => {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    },

    resetTimer() {
        this.stop();
        this.tick();
    }

};