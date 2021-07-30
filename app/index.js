import p5 from 'p5';

let width;
let height;
let walker;

width = window.innerWidth;
height = window.innerHeight;

let bgColor = 255;

let raindrops = [];
let walkers = [];


window.setup = function () {
    createCanvas(width, height);
    // background(bgColor);
    background(255);
    // strokeWeight(2);

    walkers.push(new Walker());
    for(let i = 0; i < 100; i++){
        walkers.push(new Walker());
    }
};

window.draw = function () {
    clear();
    // for(let w of walkers){
    //     w.update();
    //     w.checkEdges();
        // w.display();
    // }
    if(raindrops.length < 6){
        raindrops.push(new Raindrop());
    }

    raindrops = raindrops.filter(r => {
        return r.growths < r.growthMax;
    });

    for (let drop of raindrops){
        drop.update();
        drop.display();
    }
};

class Raindrop {
    constructor() {
        this.location = this.getRandomLoc();
        this.diameter = random(5, 25);
        this.color = color(random(256), random(256), random(256));
        this.growths = 0;
        this.growthMax = random(15, 20);
        this.growthRate = 26;

        while(!this.isValidStart()){
            this.location = this.getRandomLoc();
        }
    }

    update(){
        this.diameter += this.growthRate;
        this.growths += 1;
        this.growthRate = this.growthRate * 0.95;
    }

    display(){
        stroke(this.color);
        fill(bgColor);
        circle(this.location.x, this.location.y, this.diameter);
    }

    erase(){
        // erase();
        // circle(this.location.x, this.location.y, this.diameter + 4);
        // noErase();

        stroke(bgColor);
        fill(bgColor);
        circle(this.location.x, this.location.y, this.diameter + 3);
    }

    isInside(other){
        let distSq = parseInt(Math.sqrt(((this.location.x - other.location.x) * (this.location.x - other.location.x)) +
            ((this.location.y - other.location.y) * (this.location.y - other.location.y))));

        return (distSq + other.diameter / 2) <= 390; // this.diameter / 2;
    }

    getRandomLoc(){
        return createVector(random(width), random(height));
    }

    isValidStart(){
        let good = true;

        for(let drop of raindrops){
            if(drop.isInside(this)){
                good = false;
                break;
            }
        }

        return good;
    }

}

class Walker {
    constructor() {
        this.location = createVector(random(width), random(height));
        this.velocity = createVector(random(-2, 2), random(-2, 2));
        // this.acceleration = createVector(-0.001, 0.01);
        this.topSpeed = 5;
        this.tx = 0;
        this.ty = 10000;
    }

    checkEdges(){
        if(this.location.x > width){
            this.location.x = 0;
        } else if(this.location.x < 0){
            this.location.x = width;
        }

        if(this.location.y > height){
            this.location.y = 0;
        } else if(this.location.y < 0){
            this.location.y = height;
        }
    }

    update(){
        // this.velocity.add(this.acceleration);
        // let acceleration = p5.Vector.random2D(); //createVector(random(-1, 1), random(-1, 1));
        // let acceleration = createVector(map(noise(this.tx), 0, 1, -1, 1), map(noise(this.ty), 0, 1, -1, 1));
        // console.log(acceleration);

        let mouse = createVector(mouseX, mouseY);
        let direction = p5.Vector.sub(mouse, this.location);
        let acceleration = direction.normalize();

        console.log(acceleration);

        this.velocity.add(acceleration);
        this.velocity.limit(this.topSpeed);
        this.location.add(this.velocity);
        this.tx += 0.01;
        this.ty += 0.01;
    }

    display() {
        stroke(0);
        fill(175);
        ellipse(this.location.x, this.location.y, 8, 8);
    }
}