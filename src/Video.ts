class Video {

    private readonly canvas: Canvas;
    private urlFR: string = "./assets/video/Frankrijk.mp4";
    private urlNL: string = "Video URL van Nederland";
    private urlBE: string = "Video URL van België";
    private urlDU: string = "Video URL van Duitsland";

    constructor() {
        const canvasElement: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
        this.canvas = new Canvas(canvasElement);
        // Runs draw function once
        this.draw();
    }

    public draw() {
        // Clears the canvas
        this.canvas.Clear();
        // this.removeTheVideo();
        this.videoScreen();
    }

    public videoScreen() {
        this.canvas.writeTextToCanvas(`Bekijk de onderstaande video over Frankrijk`, 50, this.canvas.getWidth() / 2, this.canvas.getHeight() / 2 - 220, "#6597CF");
        // this.canvas.writeImageFromFileToCanvas("./assets/images/closeBlue.png", 985, 70, 50, 50);
        this.canvas.writeButtonToCanvas("./assets/images/closeButton.png", 995, 75, 30, 30)
        var videlem = document.getElementById("video");
        var sourceMP4 = document.createElement("source");
        sourceMP4.type = "video/mp4";
        sourceMP4.src = this.urlFR;
        videlem.appendChild(sourceMP4);
        videlem.id = "video";
        this.hideVideo();
    }

    // Function to hide the video
    public hideVideo() {
        var videlem = document.getElementById("video");
        videlem.style.display = "initial";
    }
    
    // Function to show the video
    public showVideo() {
        var videlem = document.getElementById("video")
        videlem.style.display = "none";
    }

    // Function to remove the html <video> permanently
    public removeTheVideo() {
        // Get the <video> element
        var video = document.getElementById("video")
        // Remove <video> from canvas
        video.remove()
    }
}

