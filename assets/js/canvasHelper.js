class CanvasHelper {
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
        this.ctx.font = `${aFontSize}px Minecraft`;
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
    writeImageFromFileToCanvas(aSrc, aXpos, aYpos) {
        let image = new Image();
        image.addEventListener('load', () => {
            this.ctx.drawImage(image, aXpos, aYpos);
        });
        image.src = aSrc;
    }
    loopImage(image, aXpos, aYpos) {
        this.ctx.drawImage(image, aXpos, aYpos);
    }
}