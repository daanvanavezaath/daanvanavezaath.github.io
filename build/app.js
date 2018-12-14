class Canvas {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
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
    writeImageFromFileToCanvas(aSrc, aXpos, aYpos, width, heigth, id) {
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
        this.ctx.fillStyle = '#FFF';
        this.ctx.font = `${fontSize}px Walkway`;
        this.ctx.fillText(`ikReis | ${text}`, aXpos, aYpos, maxWidth);
    }
    writeCountryToRectangle(text, aXpos, aYpos, maxWidth, fontSize) {
        this.ctx.fillStyle = '#FFF';
        this.ctx.font = `${fontSize}px Walkway`;
        this.ctx.fillText(text, aXpos, aYpos, maxWidth);
    }
}
class Game {
    constructor() {
        const canvasElement = document.getElementById('canvas');
        this.canvas = new Canvas(canvasElement);
        this.keyHandler = new keyHandler;
        this.questionHandler = new questionHandler;
        this.country = 'Frankrijk';
        this.questionHandler.questionCounter = 0;
        this.goodAnswer = null;
        this.levelScreen();
        this.answerInterval = window.setInterval(() => this.checkAnswer(), 200 / 1);
    }
    drawSouvenirs() {
        if (this.questionHandler.question0 != true) {
            this.canvas.writeImageFromFileToCanvas(`assets/images/${this.country}/souvenir1_tr.png`, 50, 150, 150, 150, "QuesOneTransparent");
        }
        else {
            this.canvas.writeImageFromFileToCanvas(`assets/images/${this.country}/souvenir1_h.png`, 50, 150, 150, 150, "QuesOne");
        }
        if (this.questionHandler.question1 != true) {
            this.canvas.writeImageFromFileToCanvas(`assets/images/${this.country}/souvenir2_tr.png`, 250, 150, 150, 150, "QuesTwoTransparent");
        }
        else {
            this.canvas.writeImageFromFileToCanvas(`assets/images/${this.country}/souvenir2_h.png`, 250, 150, 150, 150, "QuesTwo");
        }
        if (this.questionHandler.question2 != true) {
            this.canvas.writeImageFromFileToCanvas(`assets/images/${this.country}/souvenir3_tr.png`, 450, 150, 150, 150, "QuesThreeTransparent");
        }
        else {
            this.canvas.writeImageFromFileToCanvas(`assets/images/${this.country}/souvenir3_h.png`, 450, 150, 150, 150, "QuesThree");
        }
    }
    gameScreen() {
        this.canvas.drawRectangleToCanvas("#6597cf", 0, 0, this.canvas.getWidth(), 100);
        this.canvas.drawRectangleToCanvas("#6597cf", this.canvas.getWidth() - 700, 150, 600, 400);
        this.canvas.writeCountryToRectangle(`Je bent in ${this.country}`, this.canvas.getWidth() - 250, 60, this.canvas.getWidth(), 30);
    }
    writeLevelAssets() {
        var canvas = document.getElementById("canvas");
        canvas.classList.add(`${this.country}`);
        this.canvas.writeImageFromFileToCanvas(`assets/images/${this.country}/char.png`, 50, this.canvas.getHeight() - 250, 350, 350, "Character");
    }
    showQuestion() {
        let value = this.questionHandler.questions[this.questionHandler.questionCounter];
        this.canvas.writeTextToCanvas(value.question, 30, this.canvas.getWidth() - 400, 200, '#FFF', 'center');
        this.goodAnswer = value.answer;
    }
    checkAnswer() {
        if (this.goodAnswer == this.keyHandler.keyPressed) {
            this.keyHandler.resetKeys();
            this.canvas.Clear();
            this.questionHandler.setQuestionBooleans();
            this.questionHandler.increaseQuestionCounter();
            this.levelScreen();
        }
        if (this.goodAnswer !== this.keyHandler.keyPressed) {
            this.keyHandler.resetKeys();
        }
        if (this.questionHandler.questionCounter > 2) {
            clearInterval(this.answerInterval);
            console.log('Spel afgelopen');
            this.playedOutScreen();
            setTimeout(() => {
                window.location.replace('index.html');
            }, 2000);
        }
    }
    levelScreen() {
        this.canvas.Clear();
        this.gameScreen();
        this.writeLevelAssets();
        this.drawSouvenirs();
        this.showQuestion();
        this.keyHandler.runKeyHandler();
    }
    playedOutScreen() {
        this.canvas.Clear();
        this.gameScreen();
        this.writeLevelAssets();
        this.canvas.writeTextToCanvas('Goed gedaan! Level uitgespeeld!', 30, this.canvas.getWidth() - 400, 200, '#FFF', 'center');
    }
}
window.addEventListener('load', init);
function init() {
    setTimeout(function () { const ikReis = new Game(); }, 1000);
}
class keyHandler {
    constructor() {
    }
    runKeyHandler() {
        window.addEventListener("keydown", (event) => this.keyPressHandler(event));
    }
    keyPressHandler(event) {
        if (event.key == 'a') {
            this.keyPressed = 'A';
            console.log('A ingetoetst');
        }
        if (event.key == 'b') {
            this.keyPressed = 'B';
        }
        if (event.key == 'c') {
            this.keyPressed = 'C';
        }
        if (event.key == 'd') {
            this.keyPressed = 'D';
        }
    }
    resetKeys() {
        this.keyPressed = null;
    }
}
class questionHandler {
    constructor() {
        this.question0 = false;
        this.question1 = false;
        this.question2 = false;
        this.questionCounter = 0;
        this.questions = [{
                number: 0,
                question: 'Hoe schrijf je Nederland in het Frans?',
                answer: 'A'
            },
            {
                number: 1,
                question: 'Wat is de bekendste kaas van Frankrijk?',
                answer: 'D'
            },
            {
                number: 2,
                question: 'Wie was de bekendste Franse persoon?',
                answer: 'B'
            }
        ];
    }
    increaseQuestionCounter() {
        this.questionCounter++;
    }
    resetQuestionCounter() {
        this.questionCounter == 0;
    }
    setQuestionBooleans() {
        if (this.questionCounter >= 1) {
            this.question0 = true;
        }
        if (this.questionCounter >= 2) {
            this.question1 = true;
        }
    }
}
//# sourceMappingURL=app.js.map