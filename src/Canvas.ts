class Canvas {

    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;

    constructor(canvas:HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    // Clears the canvas
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

    // Gets the width of the canvas
    public getWidth() {
        return this.canvas.width;
    }

    // Gets the height of the canvas
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
        heigth: number,
        id: string) {

        let image = new Image();
        // add the listener so the waiting will not affect the change
        image.addEventListener('load', () => {
            //this.ctx.clip();
            this.ctx.drawImage(image, aXpos, aYpos, width, heigth);
        });

        // load the source in the image.
        image.src = aSrc;
    }

    // Draws a rectangle to the canvas
    public drawRectangleToCanvas(color: string, aXpos: number, aYpos: number, width: number, height: number) {
        this.ctx.fillStyle = color;
        this.ctx.rect(aXpos, aYpos, width, height);
        this.ctx.fill();
    }

    // Writes name to the rectangle if provided
    public writeNameToRectangle(text: string, aXpos: number, aYpos: number, maxWidth: number, fontSize: number) {
        this.ctx.fillStyle = '#FFF';
        this.ctx.font = `${fontSize}px Walkway`;
        this.ctx.fillText(`ikReis | ${text}`, aXpos, aYpos, maxWidth);
    }

    // Writes country into the rectangle 
    public writeCountryToRectangle(text: string, aXpos: number, aYpos: number, maxWidth: number, fontSize: number) {
        this.ctx.fillStyle = '#FFF';
        this.ctx.font = `${fontSize}px Walkway`;
        this.ctx.fillText(text, aXpos, aYpos, maxWidth);
    }
}