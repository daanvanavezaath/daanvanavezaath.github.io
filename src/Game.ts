class Game {

    private readonly canvas: Canvas;
    private readonly keyHandler: keyHandler;
    private readonly country: string;
    private readonly questionHandler: questionHandler;
    private goodAnswer: string;
    private answerInterval: any;

    constructor() {
        const canvasElement: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
        this.canvas = new Canvas(canvasElement);
        this.keyHandler = new keyHandler;
        this.questionHandler = new questionHandler;
        this.country = 'Frankrijk';
        this.questionHandler.questionCounter = 0;
        this.goodAnswer = null;
        // Renders the level screen once
        this.levelScreen();

        // Checks if answer is given
        this.answerInterval = window.setInterval(() => this.checkAnswer(), 200 / 1);
    }

    // Draws the earned souvenirs
    private drawSouvenirs() {
        if (this.questionHandler.question0 != true) {
            this.canvas.writeImageFromFileToCanvas(`assets/images/${this.country}/souvenir1_tr.png`, 50, 150, 150, 150, "QuesOneTransparent");
        } else {
            this.canvas.writeImageFromFileToCanvas(`assets/images/${this.country}/souvenir1_h.png`, 50, 150, 150, 150, "QuesOne");
        }

        if (this.questionHandler.question1 != true) {
            this.canvas.writeImageFromFileToCanvas(`assets/images/${this.country}/souvenir2_tr.png`, 250, 150, 150, 150, "QuesTwoTransparent");
        } else {
            this.canvas.writeImageFromFileToCanvas(`assets/images/${this.country}/souvenir2_h.png`, 250, 150, 150, 150, "QuesTwo");
        }

        if (this.questionHandler.question2 != true) {
            this.canvas.writeImageFromFileToCanvas(`assets/images/${this.country}/souvenir3_tr.png`, 450, 150, 150, 150, "QuesThreeTransparent");
        } else {
            this.canvas.writeImageFromFileToCanvas(`assets/images/${this.country}/souvenir3_h.png`, 450, 150, 150, 150, "QuesThree");
        }
    }


    // Writes the game screen
    private gameScreen() {
        // Writes top bar with name in it to the canvas  
        this.canvas.drawRectangleToCanvas("#6597cf", 0, 0, this.canvas.getWidth(), 100);
        this.canvas.drawRectangleToCanvas("#6597cf", this.canvas.getWidth() - 700, 150, 600, 400);
        //this.canvas.writeNameToRectangle(this.askForName(), 50, 60, this.canvas.getWidth(), 30);
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
        let value = this.questionHandler.questions[this.questionHandler.questionCounter];
        // Writes the question to the game screen
        this.canvas.writeTextToCanvas(value.question, 30, this.canvas.getWidth() - 400, 200, '#FFF', 'center');
        // Picks the good answer
        this.goodAnswer = value.answer;
    }

    private checkAnswer() {
        // Run if answer is the same as pushed button 
        if (this.goodAnswer == this.keyHandler.keyPressed) {
            // Resets the last pressed key
            this.keyHandler.resetKeys();
            // Clears the canvas
            this.canvas.Clear();
            // Sets the question booleans
            this.questionHandler.setQuestionBooleans();
            // Increases the question counter by 1
            this.questionHandler.increaseQuestionCounter();
            // Renders the level screen
            this.levelScreen();
        } 
        
        // If the answer is not right, reset the last key pressed
        if (this.goodAnswer !== this.keyHandler.keyPressed) {
            this.keyHandler.resetKeys();
        }

        // If there are no questions, reset and move page to start page after 2 secs
        if(this.questionHandler.questionCounter > 2) {
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
        this.gameScreen();
        this.writeLevelAssets();
        this.drawSouvenirs();
        this.showQuestion();
        this.keyHandler.runKeyHandler();
    }

    // By running this, render the Played Out screen
    public playedOutScreen() {
        this.canvas.Clear();
        this.gameScreen();
        this.writeLevelAssets();
        this.canvas.writeTextToCanvas('Goed gedaan! Level uitgespeeld!', 30, this.canvas.getWidth() - 400, 200, '#FFF', 'center');
    }
}

// Event listener on page load
window.addEventListener('load', init);

// Event listener runs this on page load
function init(): void {
    setTimeout(function () { const ikReis = new Game(); }, 1000);
}
