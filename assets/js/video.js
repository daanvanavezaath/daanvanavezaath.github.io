class Canvas {
    constructor(canvas) {
        this.d_canvas = canvas;
        this.d_context = this.d_canvas.getContext('2d');
        this.d_canvas.height = window.innerHeight;
        this.d_canvas.width = window.innerWidth;
    }
    Clear() {
        this.d_context.clearRect(0, 0, this.GetWidth(), this.GetHeight());
    }
    GetWidth() {
        return window.innerWidth;
    }
    GetHeight() {
        return window.innerHeight;
    }
    writeTextToCanvas(aText, aFontSize, aXpos, aYpos, aColor = "white", aAlignment = "center") {
        this.d_context.font = `${aFontSize}px Minecraft`;
        this.d_context.fillStyle = aColor;
        this.d_context.textAlign = aAlignment;
        this.d_context.fillText(aText, aXpos, aYpos);
    }
    writeImageFromFileToCanvas(aSrc, aXpos, aYpos) {
        let image = new Image();
        image.addEventListener('load', () => {
            this.d_context.drawImage(image, aXpos, aYpos);
        });
        image.src = aSrc;
    }
    loopImage(image, aXpos, aYpos) {
        this.d_context.drawImage(image, aXpos, aYpos);
    }
}
class Game {
    constructor() {
        this.canvasElement = document.getElementById('canvas');
        this.d_canvas = new Canvas(this.canvasElement);
        this.d_name = "Frankrijk";
        this.d_player = "Ricardo";
        this.d_game_name = "ikReis";
        this.draw();
        console.log("In Game constructor!");
    }
    draw() {
        this.d_canvas.writeTextToCanvas(`Je bent in: ${this.d_name}`, 30, this.d_canvas.GetWidth() / 1.2 - 30, 50);
        this.d_canvas.writeTextToCanvas(`${this.d_game_name} | ${this.d_player} `, 30, this.d_canvas.GetWidth() / 8 - 30, 50);
    }
}
window.addEventListener('load', init);
function init() {
    const ikReis = new Game();
}


// document.addEventListener('DOMContentLoaded', function () {
//     var v = document.getElementById('v');
//     var canvas = document.getElementById('c');
//     var context = canvas.getContext('2d');

//     var cw = Math.floor(canvas.clientWidth / 100);
//     var ch = Math.floor(canvas.clientHeight / 100);
//     canvas.width = cw;
//     canvas.height = ch;

//     v.addEventListener('play', function () {
//         draw(this, context, cw, ch);
//     }, false);

// }, false);

// function draw(v, c, w, h) {
//     if (v.paused || v.ended) return false;
//     c.drawImage(v, 0, 0, w, h);
//     setTimeout(draw, 20, v, c, w, h);
// }