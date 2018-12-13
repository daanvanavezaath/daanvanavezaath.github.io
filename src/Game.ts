class Game {

    private readonly canvas: Canvas;

    constructor() {
        const canvasElement: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
        this.canvas = new Canvas(canvasElement);
        // Runs draw function once
        this.draw();
        // Function remove video
        // this.canvas.removeVideo();    
    }

    public askForName() {
        var person = prompt("Wat is je naam?", "");
        return person;
    }

    public draw() {
        // Clears the canvas
        this.canvas.Clear();
        // Writes the top bar
        this.canvas.drawRectangleToCanvas("#6597cf", 0, 0, this.canvas.getWidth(), 100);
        this.canvas.writeNameToRectangle(this.askForName(), 50, 60, this.canvas.getWidth(), 30);
        this.canvas.writeImageFromFileToCanvas('assets/images/france/monsieur.png', 50, this.canvas.getHeight() - 250, 350, 350);
        this.canvas.writeVideoToCanvas("./assets/images/buttonBlue.png", "Start Video");
    }
}

// Event listener on page load
window.addEventListener('load', init);

// Event listener runs this on page load
function init(): void {
    const ikReis = new Game();
    // Class Video niet in gebruik!
    // const video = new Video();
}
