class Game {

    private readonly canvas: Canvas;
    private readonly keyHandler: keyHandler;
    private readonly questionHandler: questionHandler;
    private countryController = new countryController;
    private country: string;
    private goodAnswer: string;
    private answerInterval: any;
    private answerpadding: number;
    private urlFR: string = `./assets/video/${this.country}.mp4`;

    constructor() {
        this.countryController = new countryController;
        this.country = this.countryController.getCountry();
        const canvasElement: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
        this.canvas = new Canvas(canvasElement);
        this.keyHandler = new keyHandler;
        this.questionHandler = new questionHandler;
        this.questionHandler.questionCounter = 0;
        this.answerpadding = 300;
        // Renders the level screen once
        this.levelScreen();
        // Checks if answer is given
        this.answerInterval = window.setInterval(() => this.checkAnswer(), 200 / 1);
    }

    // Draws the earned souvenirs
    private drawSouvenirs() {
        if (this.questionHandler.question0 != true) {
            this.canvas.writeImageFromFileToCanvas(`assets/images/${this.country}/souvenir1_tr.png`, 130, 150, 150, 150, "QuesOneTransparent");
        } else {
            this.canvas.writeImageFromFileToCanvas(`assets/images/${this.country}/souvenir1_h.png`, 130, 150, 150, 150, "QuesOne");
        }

        if (this.questionHandler.question1 != true) {
            this.canvas.writeImageFromFileToCanvas(`assets/images/${this.country}/souvenir2_tr.png`, 330, 150, 150, 150, "QuesTwoTransparent");
        } else {
            this.canvas.writeImageFromFileToCanvas(`assets/images/${this.country}/souvenir2_h.png`, 330, 150, 150, 150, "QuesTwo");
        }

        if (this.questionHandler.question2 != true) {
            this.canvas.writeImageFromFileToCanvas(`assets/images/${this.country}/souvenir3_tr.png`, 530, 150, 150, 150, "QuesThreeTransparent");
        }
    }


    // Writes the game screen
    private gameScreen() {
        // Writes top bar with name in it to the canvas  
        this.canvas.drawRectangleToCanvas("#6597cf", 0, 0, this.canvas.getWidth(), 100);
        this.canvas.drawRectangleToCanvas("#6597cf", this.canvas.getWidth() - 700, 150, 600, 400);
        this.canvas.writeNameToRectangle('', 50, 60, this.canvas.getWidth(), 30);
        this.canvas.writeCountryToRectangle(`Je bent in ${this.country}`, this.canvas.getWidth() - 250, 60, this.canvas.getWidth(), 30);
    }

    // Writes the level assets
    private writeLevelAssets() {
        var canvas = document.getElementById("canvas");
        // Adds country to class
        canvas.classList.add(`${this.country}`);
        // Adds the right character based on country name
        this.canvas.writeImageFromFileToCanvas(`assets/images/${this.country}/char.png`, 50, this.canvas.getHeight() - 250, 350, 350, "Character");
    }

    private showQuestion() {
        // Gets right value from questions array
        let questionObject = this.questionHandler.questions[this.questionHandler.questionCounter];
        // Writes the question to the game screen
        this.canvas.writeTextToCanvas(questionObject.question, 30, this.canvas.getWidth() - 400, 200, '#FFF', 'center');
        // Picks the good answer
        this.goodAnswer = questionObject.answer;
        // Writes video explaining string
        this.canvas.writeTextToCanvas("TIP! Druk op 'V' voor een informatievideo!", 30, this.canvas.getWidth() - 400, 520, '#FFF', 'center');
    }

    private showAnswers() {
        // Get question object from array
        let questionObject = this.questionHandler.questions[this.questionHandler.questionCounter];
        // Gets the array with potential answers
        let answerArray = questionObject.potentials;
        // Loops trough the potential answers and writes them to the canvas
        for (let index = 0; index < answerArray.length; index++) {
            const answerElement = answerArray[index];
            this.canvas.writeTextToCanvas(answerElement, 30, this.canvas.getWidth() - 400, this.answerpadding, '#FFF', 'center');
            // Sets padding to 50 so the answers will appear under each other
            this.answerpadding += 50;
        }
    }

    private resetLevel() {
        // Sets answer padding back to 300
        this.answerpadding = 300;
        // Clears the canvas
        this.canvas.Clear();
        // Renders the level screen
        this.levelScreen();
    }

    private checkAnswer() {
        // If 'V' is pressed, enter Video screen
        if (this.keyHandler.keyPressed == 'V') {
            // Render video screen
            this.videoScreen();
        }

        // If 'C' is pressed, close Video screen and enter Level screen
        if (this.keyHandler.keyPressed == 'R') {
            // Hides video
            this.canvas.hideVideo();
            // Resets level screen
            this.resetLevel();
        }

        // Run if answer is the same as pushed button
       if (this.goodAnswer == this.keyHandler.keyPressed) {
        // Increases the question counter by 1
        this.questionHandler.increaseQuestionCounter();
        // Resets the question booleans
        this.questionHandler.setQuestionBooleans();
        // Resets the last pressed key
        this.keyHandler.resetKeys();
        // Resets the level screen
        this.resetLevel();
    }

        if (this.keyHandler.keyPressed !== null) {
            // If answers is not good, or keypress is not an answers letter, do this
            if (this.goodAnswer !== this.keyHandler.keyPressed && this.keyHandler.keyPressed !== 'V' && this.keyHandler.keyPressed !== 'R') {
                // Stop interval to prevent infinite loop
                clearInterval(this.answerInterval);
                // Clears the canvas
                this.canvas.Clear();
                // Loads Game screen
                this.gameScreen();
                // Loads Level assets
                this.writeLevelAssets();
                // Draws the souvenirs
                this.drawSouvenirs();
                // Sets answerpadding to the default 300
                this.answerpadding = 300;
                // Writes text to the canvas
                this.canvas.writeTextToCanvas('Niet goed, probeer opnieuw!', 30, this.canvas.getWidth() - 400, 200, '#FFF', 'center');
                // After 3 secs, load level screen again and restart the checkAnswer-interval
                setTimeout(() => {
                    this.keyHandler.resetKeys();
                    this.levelScreen();
                    this.answerInterval = window.setInterval(() => this.checkAnswer(), 200 / 1);
                }, 3000);
            }
        }

        // If there are no questions, reset and move page to start page after 2 secs
        if (this.questionHandler.questionCounter > 2) {
            clearInterval(this.answerInterval);
            console.log('Spel afgelopen')
            this.playedOutScreen();
            setTimeout(() => {
                window.location.replace('index.html');
            }, 2000);
        }
    }

    // By running this, render the level screen
    public levelScreen() {
        // Clears the canvas
        this.canvas.Clear();
        // Loads Game screen
        this.gameScreen();
        // Loads Level assets
        this.writeLevelAssets();
        // Draws the souvenirs
        this.drawSouvenirs();
        // Shows the question
        this.showQuestion();
        // Starts the keyHandler to check for keypresses
        this.keyHandler.runKeyHandler();
        // Shows the potential answers according to the question
        this.showAnswers();
    }

    // By running this, render the Played Out screen
    public playedOutScreen() {
        // Clears the canvas
        this.canvas.Clear();
        // Loads Gamescreen
        this.gameScreen();
        // Loads Level assets
        this.writeLevelAssets();
        // Draws the souvenirs
        this.drawSouvenirs();
        // Draws the last souvenir
        this.canvas.writeImageFromFileToCanvas(`assets/images/${this.country}/souvenir3_h.png`, 530, 150, 150, 150, "QuesThree");
        // Shows level played out text
        this.canvas.writeTextToCanvas('Goed gedaan! Level uitgespeeld!', 30, this.canvas.getWidth() - 400, 200, '#FFF', 'center');
    }

    // Function to show the video
    public showVideo() {
        var videlem = document.getElementById("video");
        videlem.style.display = "initial";
    }

    // Renders video screen
    public videoScreen() {
        // Clears the canvas
        this.canvas.Clear();
        // Writes info text
        this.canvas.writeTextToCanvas('Bekijk de video voor meer informatie!', 70, this.canvas.getWidth() / 2, 100, '#FFF', 'center');
        // Gets video element
        var videlem = document.getElementById("video");
        // Writes the source
        var sourceMP4 = document.createElement("source");
        // Sets the type of the video
        sourceMP4.type = "video/mp4";
        // Sets the source of the video
        sourceMP4.src = this.urlFR;
        // Append source to DOM element
        videlem.appendChild(sourceMP4);
        // Gives DOM element an ID
        videlem.id = "video";
        // Shows the video
        this.showVideo();
        // Shows close button
        this.canvas.writeCloseButtonToCanvas();
    }
}

// Event listener on page load
window.addEventListener('load', init);

// Event listener runs this on page load
function init(): void {
    if (window.location.pathname.match(/\/index.html/)) {
        // do nothing
    } else {
        setTimeout(function () { const ikReis = new Game(); }, 1000);
    }
}