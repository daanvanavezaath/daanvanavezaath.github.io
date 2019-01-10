class LifeHandler {
    private canvas: Canvas = new Canvas(<HTMLCanvasElement>document.getElementById('canvas'));

    private lifes: number = 3;
    private transparent_life: string = "./assets/images/redcrosspng_tr.png";
    private opaque_life: string = "./assets/images/redcrosspng.png";

    public constructor() {
    }

    public subtract_life() {
        if (this.lifes > 0) {
            this.lifes -= 1;
            console.log(this.lifes);
        }

        if (this.lifes == 0) {
            setTimeout(() => {
                window.location.replace('index.html');
            }, 2000);
        }
    }

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

    public return_life() {
        return this.lifes;
    }
}