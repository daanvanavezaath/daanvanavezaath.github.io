class Canvas {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        console.log('in canvas constructor');
    }
    Clear() {
        this.ctx.clearRect(0, 0, this.getWidth(), this.getHeight());
    }
    writeTextToCanvas(aText, aFontSize, aXpos, aYpos, aColor = "white", aAlignment = "center") {
        this.ctx.font = `${aFontSize}px Walkway`;
        this.ctx.fillStyle = aColor;
        this.ctx.textAlign = aAlignment;
        this.ctx.fillText(aText, aXpos, aYpos);
    }
    getWidth() {
        return this.canvas.width;
    }
    getHeight() {
        return this.canvas.height;
    }
    writeImageFromFileToCanvas(aSrc, aXpos, aYpos, width, heigth) {
        let image = new Image();
        image.addEventListener('load', () => {
            this.ctx.drawImage(image, aXpos, aYpos, width, heigth);
        });
        image.src = aSrc;
    }
    drawRectangleToCanvas(color, aXpos, aYpos, width, height) {
        this.ctx.fillStyle = color;
        this.ctx.rect(aXpos, aYpos, width, height);
        this.ctx.fill();
    }
    writeNameToRectangle(text, aXpos, aYpos, maxWidth, fontSize) {
        this.ctx.fillStyle = "#fff";
        this.ctx.font = `${fontSize}px Walkway`;
        this.ctx.fillText(`ikReis | ${text}`, aXpos, aYpos, maxWidth);
    }
    writeButtonToCanvas(src, aXpos, aYpos, width, heigth) {
        const horizontalCenter = aXpos;
        const verticalCenter = aYpos;
        let buttonElement = new Image;
        buttonElement.src = src;
        buttonElement.addEventListener("load", () => {
            this.ctx.drawImage(buttonElement, horizontalCenter, verticalCenter, width, heigth);
            this.writeTextToCanvas("Test", 15, horizontalCenter + 50, verticalCenter + 245, "#6597CF");
        });
        this.canvas.addEventListener("click", (event) => {
            if (event.x > horizontalCenter - 35 && event.x < horizontalCenter + 35) {
                this.Clear();
                var videlem = document.getElementById("video");
                videlem.style.display = "initial";
                alert("hideVideo");
                this.removeVideo();
            }
        });
    }
    removeVideo() {
        var videoElement = document.getElementById('video');
        videoElement.parentNode.removeChild(videoElement);
    }
    writeVideoToCanvas(src, text) {
        const horizontalCenter = this.canvas.width / 2;
        const verticalCenter = this.canvas.height / 2;
        let image = new Image;
        image.src = src;
        image.addEventListener("load", () => {
            this.ctx.drawImage(image, horizontalCenter - 111, verticalCenter + 219);
            this.writeTextToCanvas(text, 15, horizontalCenter, verticalCenter + 245, "#6597CF");
        });
        this.canvas.addEventListener("click", (event) => {
            if (event.x > horizontalCenter - 111 && event.x < horizontalCenter + 111) {
                if (event.y > verticalCenter + 219 && event.y < verticalCenter + 259) {
                    this.Clear();
                    const newScreen = new Video;
                }
            }
        });
    }
}
class Game {
    constructor() {
        const canvasElement = document.getElementById('canvas');
        this.canvas = new Canvas(canvasElement);
        this.draw();
    }
    askForName() {
        var person = prompt("Wat is je naam?", "");
        return person;
    }
    draw() {
        this.canvas.Clear();
        this.canvas.drawRectangleToCanvas("#6597cf", 0, 0, this.canvas.getWidth(), 100);
        this.canvas.writeNameToRectangle(this.askForName(), 50, 60, this.canvas.getWidth(), 30);
        this.canvas.writeImageFromFileToCanvas('assets/images/france/monsieur.png', 50, this.canvas.getHeight() - 250, 350, 350);
        this.canvas.writeVideoToCanvas("./assets/images/buttonBlue.png", "Start Video");
    }
}
window.addEventListener('load', init);
function init() {
    const ikReis = new Game();
}
class Video {
    constructor() {
        this.urlFR = "./assets/video/Frankrijk.mp4";
        this.urlNL = "Video URL van Nederland";
        this.urlBE = "Video URL van België";
        this.urlDU = "Video URL van Duitsland";
        const canvasElement = document.getElementById('canvas');
        this.canvas = new Canvas(canvasElement);
        this.draw();
    }
    draw() {
        this.canvas.Clear();
        this.videoScreen();
    }
    videoScreen() {
        this.canvas.writeTextToCanvas(`Bekijk de onderstaande video over Frankrijk`, 50, this.canvas.getWidth() / 2, this.canvas.getHeight() / 2 - 220, "#6597CF");
        this.canvas.writeButtonToCanvas("./assets/images/closeButton.png", 995, 75, 30, 30);
        var videlem = document.getElementById("video");
        var sourceMP4 = document.createElement("source");
        sourceMP4.type = "video/mp4";
        sourceMP4.src = this.urlFR;
        videlem.appendChild(sourceMP4);
        videlem.id = "video";
        this.hideVideo();
    }
    hideVideo() {
        var videlem = document.getElementById("video");
        videlem.style.display = "initial";
    }
    showVideo() {
        var videlem = document.getElementById("video");
        videlem.style.display = "none";
    }
    removeTheVideo() {
        var video = document.getElementById("video");
        video.remove();
    }
}
//# sourceMappingURL=app.js.map