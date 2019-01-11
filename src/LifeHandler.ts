class LifeHandler {
    private canvas: Canvas = new Canvas(<HTMLCanvasElement>document.getElementById('canvas'));

    private lifes: number = 3;
    private transparent_life: string = "./assets/images/redcrosspng_tr.png";
    private opaque_life: string = "./assets/images/redcrosspng.png";

    public constructor() {
    }

    // Returns lifes left
    public return_life() {
        return this.lifes;
    }

    // If there are any lives left, subtract one from the amount of lives
    public subtract_life() {
        if (this.lifes > 0) {
            this.lifes -= 1;
            console.log(this.lifes);
        }

        // If there are no lives left, move to index after 3 secs
        if (this.lifes == 0) {
            setTimeout(() => {
                window.location.replace('index.html');
            }, 3000);
        }
    }

    // Draw the life images to canvas
    public draw_lifes() {
        if (this.lifes == 3) {
            this.canvas.writeImageFromFileToCanvas(this.transparent_life, this.canvas.getWidth() - 700, 600, 100, 100, "one_transp");
            this.canvas.writeImageFromFileToCanvas(this.transparent_life, this.canvas.getWidth() - 450, 600, 100, 100, "one_transp");
            this.canvas.writeImageFromFileToCanvas(this.transparent_life, this.canvas.getWidth() - 200, 600, 100, 100, "one_transp");
        } else if (this.lifes == 2) {
            this.canvas.writeImageFromFileToCanvas(this.opaque_life, this.canvas.getWidth() - 700, 600, 100, 100, "one_transp");
            this.canvas.writeImageFromFileToCanvas(this.transparent_life, this.canvas.getWidth() - 450, 600, 100, 100, "one_transp");
            this.canvas.writeImageFromFileToCanvas(this.transparent_life, this.canvas.getWidth() - 200, 600, 100, 100, "one_transp");
        } else if (this.lifes == 1) {
            this.canvas.writeImageFromFileToCanvas(this.opaque_life, this.canvas.getWidth() - 700, 600, 100, 100, "one_transp");
            this.canvas.writeImageFromFileToCanvas(this.opaque_life, this.canvas.getWidth() - 450, 600, 100, 100, "one_transp");
            this.canvas.writeImageFromFileToCanvas(this.transparent_life, this.canvas.getWidth() - 200, 600, 100, 100, "one_transp");
        } else {
            this.canvas.writeImageFromFileToCanvas(this.opaque_life, this.canvas.getWidth() - 700, 600, 100, 100, "one_transp");
            this.canvas.writeImageFromFileToCanvas(this.opaque_life, this.canvas.getWidth() - 450, 600, 100, 100, "one_transp");
            this.canvas.writeImageFromFileToCanvas(this.opaque_life, this.canvas.getWidth() - 200, 600, 100, 100, "one_transp");
        }
    }
}