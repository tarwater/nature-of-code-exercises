import p5 from 'p5';

let width;
let height;
let walker;

width = window.innerWidth;
height = window.innerHeight;

let randos = {};

window.setup = function () {
    createCanvas(width, height);
    background(255);

    // walker = new Walker();

};

window.draw = function () {
    // walker.step();
    // walker.display();

    let random = Math.floor(Math.random() * 20);
    randos[random] = ~~randos[random] + 1;
    stroke(0);
    fill(175);

    let w = width / 20;

    for(let i = 0; i < 20; i++){
        rect(w * i, 0, w, randos[i]);

        // rect(w * i, height - randos[i], w, randos[i]);
    }
};

class Walker {
    constructor() {
        this.x = width / 2;
        this.y = height / 2;
    }

    display() {
        stroke(0);
        point(this.x, this.y);
    }

    step() {
        let dx = Math.floor(Math.random() * 3) - 1;
        let dy = Math.floor(Math.random() * 3) - 1;

        this.x += dx;
        this.y += dy;

    }
}