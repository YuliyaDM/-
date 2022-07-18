const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

canvas.width = windowWidth;
canvas.height = windowHeight;

ctx.lineWidth = .25
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 5;
ctx.shadowBlur = 5;
ctx.shadowColor = 'rgba(0, 0, 0, .5)'

//ctx.lineWidth = 2;

ctx.globalCompositeOperation = 'destination-over';

function random(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

class Flower{
    constructor(x, y, size){
        this.x = x;
        this.y = y;
        this.size = size;
        this.max_size = this.size + Math.random() * 50;
        this.image = new Image();
        this.image.src = 'src/images/rose1.png';
        this.frame_x = Math.floor(Math.random() * 3);
        this.frame_y = Math.floor(Math.random() * 3);
        this.frameSize = 100;
        this.vs = Math.random() * 2.5;
        this.va = Math.random() - .5;
        this.angle = 0;
        this.size > 15 ? this.willDrawFlower = true: this.willDrawFlower = false;
    }
    grow(){
        if (this.size < this.max_size && this.willDrawFlower){
            this.size += this.vs;
            this.angle += this.va * .05;
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle)
            ctx.drawImage(this.image, this.frameSize * this.frame_x, this.frameSize * this.frame_y, 
            this.frameSize, this.frameSize, 0 - this.size / 2, 
            0 - this.size / 2, this.size, this.size);
            ctx.restore();
            requestAnimationFrame(this.grow.bind(this));
        }
    }
}

class Root{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.x_speed = Math.random() * 4 - 2;
        this.y_speed = Math.random() * 4 - 2;
        this.color = random(85, 140);
        this.size = Math.random() * 7.5 + 2;
        this.max_size = this.size * 2.5;
        this.random_size = Math.random() * .2 + .05;
        this.angle = Math.random() * 1.5;
        this.random_angle = Math.random() * 0.125;
        this.random_flower_size = Math.random() * 50;
        this.lightness = 10;
    }
    update(){
        this.x += this.x_speed + Math.cos(this.angle);
        this.y += this.y_speed + Math.cos(this.angle);
        this.size += this.random_size * 5;
        this.angle += this.random_angle;
        if (this.lightness < 80) this.lightness += 1;
        if (this.size < this.max_size){
            ctx.save();
            ctx.translate(this.x, this.y)
            ctx.rotate(this.angle);
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'white';
            ctx.strokeRect(0 - this.size * 4.5 / 2, 0 - this.size * 4.5 / 2, this.size * 3, this.size * 3);
            ctx.lineWidth = .25
            ctx.strokeStyle = 'hsl(240, 100%, 50%)';
            ctx.strokeRect(0 - this.size / 2.5, 0 - this.size / 2.5, this.size * 2, this.size * 2);
            ctx.fillStyle = 'hsl(183, 100%, 95%)';
            ctx.fillRect(0, 0, this.size, this.size);
            ctx.stroke();
            requestAnimationFrame(this.update.bind(this));
            ctx.restore();
        }
        /*
        if (this.size < this.max_size){
            ctx.beginPath();
            ctx.fillStyle = `hsl(${this.color}, 100%, ${this.lightness}%)`;
            ctx.arc(this.x, this.y, this.size / 1.5, 0, Math.PI * 2, false);
            ctx.fill();
            ctx.stroke();
            requestAnimationFrame(this.update.bind(this));
        }
        else{
            const my_flower = new Flower(this.x, this.y, this.random_flower_size);
            my_flower.grow();
        }
        */
    }
}

let boolean;

window.addEventListener('mousemove', (event) => {
    if (boolean){
        for (let i = 0; i < 10; i++){
            const effect = new Root(event.offsetX, event.offsetY);
            effect.update()
        }
    }
})

window.addEventListener('mouseup', (event) => {
    boolean = false;
    console.log('Goodbye, Canvas!')
})

window.addEventListener('mousedown', (event) => {
    boolean = true;
    for (let i = 0; i < 5; i++){
        const effect = new Root(event.offsetX, event.offsetY);
        effect.update()
    }
    console.log('Hello, Canvas!')
})

window.addEventListener('focus', () => {
    document.title = 'Deep-dive effect';
    document.querySelector('link').href = 'https://nationaltoday.com/wp-content/uploads/2020/02/National-Hedgehog-Day.jpg';
})

window.addEventListener('blur', () => {
    document.title = 'Повертайся назад, падло';
    document.querySelector('link').href = 'https://www.meme-arsenal.com/memes/b5a82f1cf1c70eeb542af44a8bf5cb09.jpg';
})