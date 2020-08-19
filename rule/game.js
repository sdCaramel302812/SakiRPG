const events = require('events');

class game extends events.EventEmitter{
    constructor() {
        super();
        this.on('event', () => {
            console.log('event');
        });
    }

    run() {
        let x = 0;
        while(true){
            ++x;
            if (100000000 == x) {
                console.log('run');
            }
        }
    }
}



function test() {
    setTimeout(() => {
        console.log('timeout');
    }, 1000);

    var g = new game();
    g.run();
    g.emit('event');
}

test();