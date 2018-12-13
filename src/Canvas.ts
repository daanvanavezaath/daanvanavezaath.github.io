class Canvas {

    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        console.log('in canvas constructor');
    }

    public Clear(): void {
        // clear the screen
        this.ctx.clearRect(0, 0, this.getWidth(), this.getHeight());
    }

    /**
         * writeTextToCanvas
         * @AccessModifier {public}
         * Handles the internal redirection of the click event.
         * @param {string} text -
         * @param {number} fontSize -
         * @param {number} aXpos -
         * @param {number} aYpos -
         * @param {string} color -
         * @param {CanvasTextAlign} alignment -
         */

    public writeTextToCanvas(aText: any,
        aFontSize: number,
        aXpos: number,
        aYpos: number,
        aColor: string = "white",
        aAlignment: CanvasTextAlign = "center") {

        this.ctx.font = `${aFontSize}px Walkway`;
        this.ctx.fillStyle = aColor;
        this.ctx.textAlign = aAlignment;
        this.ctx.fillText(aText, aXpos, aYpos);
    }

    public getWidth() {
        return this.canvas.width;
    }

    public getHeight() {
        return this.canvas.height;
    }

    /**
    * writeTextToCanvas
    * @AccessModifier {public}
    * Handles the internal redirection of the click event.
    * @param {string} aSrc - the source of the resource
    * @param {number} aXpos - the x axis value of the coordinate
    * @param {number} aYpos - the y axis value of the coordinate
    */
    public writeImageFromFileToCanvas(aSrc: string,
        aXpos: number,
        aYpos: number,
        width: number,
        heigth: number) {

        let image = new Image();
        // add the listener so the waiting will not affect the change
        image.addEventListener('load', () => {
            //this.ctx.clip();
            this.ctx.drawImage(image, aXpos, aYpos, width, heigth);
        });
        // load the source in the image.
        image.src = aSrc;
    }

    public drawRectangleToCanvas(color: string, aXpos: number, aYpos: number, width: number, height: number) {
        this.ctx.fillStyle = color;
        this.ctx.rect(aXpos, aYpos, width, height);
        this.ctx.fill();
    }

    public writeNameToRectangle(text: string, aXpos: number, aYpos: number, maxWidth: number, fontSize: number) {
        this.ctx.fillStyle = "#fff";
        this.ctx.font = `${fontSize}px Walkway`;
        this.ctx.fillText(`ikReis | ${text}`, aXpos, aYpos, maxWidth);
    }

    public writeButtonToCanvas(src: string, aXpos: number, aYpos: number, width: number, heigth: number) {
        const horizontalCenter = aXpos;
        const verticalCenter = aYpos;

        let buttonElement = new Image;
        buttonElement.src = src;

        buttonElement.addEventListener("load", () => {
            this.ctx.drawImage(buttonElement, horizontalCenter, verticalCenter, width, heigth);
            this.writeTextToCanvas("Test", 15, horizontalCenter + 50, verticalCenter + 245, "#6597CF");
        });

        this.canvas.addEventListener("click", (event: MouseEvent) => {
            if (event.x > horizontalCenter - 35 && event.x < horizontalCenter + 35) {
                // if (event.y > verticalCenter + 35 && event.y < verticalCenter + 35) {
                this.Clear();
                var videlem = document.getElementById("video");
                videlem.style.display = "initial";
                alert("hideVideo")
                this.removeVideo()
                // var videlem = document.getElementById("video");
                // videlem.style.display = "initial";
            }
            // }
        });

    }

    // Functie om de video uit het canvas te kunnen verwijderen (niet in gebruik)
    public removeVideo() {
        var videoElement = document.getElementById('video');
        videoElement.parentNode.removeChild(videoElement);
    }

    public writeVideoToCanvas(src: string, text: string) {
        const horizontalCenter = this.canvas.width / 2;
        const verticalCenter = this.canvas.height / 2;

        let image = new Image;
        image.src = src;


        image.addEventListener("load", () => {
            this.ctx.drawImage(image, horizontalCenter - 111, verticalCenter + 219);
            this.writeTextToCanvas(text, 15, horizontalCenter, verticalCenter + 245, "#6597CF");
        });

        this.canvas.addEventListener("click", (event: MouseEvent) => {
            if (event.x > horizontalCenter - 111 && event.x < horizontalCenter + 111) {
                if (event.y > verticalCenter + 219 && event.y < verticalCenter + 259) {
                    // this.removeVideo()
                    this.Clear()
                    const newScreen = new Video;
                }
            }
        });

    }
}