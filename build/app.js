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
    hideVideo() {
        var videlem = document.getElementById("video");
        videlem.style.display = "none";
    }
    writeCloseButtonToCanvas() {
        this.writeTextToCanvas("Druk op 'C' om de video te sluiten...", 30, this.getWidth() / 2, (this.getHeight() / 2 + 245), "#FFF");
    }
}
class Game {
    constructor() {
        this.urlFR = "./assets/video/Frankrijk.mp4";
        const canvasElement = document.getElementById('canvas');
        this.canvas = new Canvas(canvasElement);
        this.keyHandler = new keyHandler;
        this.questionHandler = new questionHandler;
        this.country = 'Frankrijk';
        this.questionHandler.questionCounter = 0;
        this.answerpadding = 300;
        this.levelScreen();
        this.answerInterval = window.setInterval(() => this.checkAnswer(), 200 / 1);
    }
    drawSouvenirs() {
        if (this.questionHandler.question0 != true) {
            this.canvas.writeImageFromFileToCanvas(`assets/images/${this.country}/souvenir1_tr.png`, 130, 150, 150, 150, "QuesOneTransparent");
        }
        else {
            this.canvas.writeImageFromFileToCanvas(`assets/images/${this.country}/souvenir1_h.png`, 130, 150, 150, 150, "QuesOne");
        }
        if (this.questionHandler.question1 != true) {
            this.canvas.writeImageFromFileToCanvas(`assets/images/${this.country}/souvenir2_tr.png`, 330, 150, 150, 150, "QuesTwoTransparent");
        }
        else {
            this.canvas.writeImageFromFileToCanvas(`assets/images/${this.country}/souvenir2_h.png`, 330, 150, 150, 150, "QuesTwo");
        }
        if (this.questionHandler.question2 != true) {
            this.canvas.writeImageFromFileToCanvas(`assets/images/${this.country}/souvenir3_tr.png`, 530, 150, 150, 150, "QuesThreeTransparent");
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
        let questionObject = this.questionHandler.questions[this.questionHandler.questionCounter];
        this.canvas.writeTextToCanvas(questionObject.question, 30, this.canvas.getWidth() - 400, 200, '#FFF', 'center');
        this.goodAnswer = questionObject.answer;
        this.canvas.writeTextToCanvas("TIP! Druk op 'V' voor een informatievideo!", 30, this.canvas.getWidth() - 400, 520, '#FFF', 'center');
    }
    showAnswers() {
        let questionObject = this.questionHandler.questions[this.questionHandler.questionCounter];
        let answerArray = questionObject.potentials;
        for (let index = 0; index < answerArray.length; index++) {
            const answerElement = answerArray[index];
            this.canvas.writeTextToCanvas(answerElement, 30, this.canvas.getWidth() - 400, this.answerpadding, '#FFF', 'center');
            this.answerpadding += 50;
        }
    }
    checkAnswer() {
        if (this.keyHandler.keyPressed == 'V') {
            this.videoScreen();
        }
        if (this.keyHandler.keyPressed == 'C') {
            this.canvas.hideVideo();
            this.canvas.Clear();
            this.levelScreen();
        }
        if (this.goodAnswer == this.keyHandler.keyPressed) {
            this.keyHandler.resetKeys();
            this.canvas.Clear();
            this.answerpadding = 300;
            this.questionHandler.setQuestionBooleans();
            this.questionHandler.increaseQuestionCounter();
            this.levelScreen();
        }
        if (this.keyHandler.keyPressed !== null) {
            if (this.goodAnswer !== this.keyHandler.keyPressed && this.keyHandler.keyPressed !== 'V' && this.keyHandler.keyPressed !== 'C') {
                clearInterval(this.answerInterval);
                this.canvas.Clear();
                this.gameScreen();
                this.writeLevelAssets();
                this.drawSouvenirs();
                this.answerpadding = 300;
                this.canvas.writeTextToCanvas('Niet goed, probeer opnieuw!', 30, this.canvas.getWidth() - 400, 200, '#FFF', 'center');
                setTimeout(() => {
                    this.keyHandler.resetKeys();
                    this.levelScreen();
                    this.answerInterval = window.setInterval(() => this.checkAnswer(), 200 / 1);
                }, 3000);
            }
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
        this.showAnswers();
    }
    playedOutScreen() {
        this.canvas.Clear();
        this.gameScreen();
        this.writeLevelAssets();
        this.drawSouvenirs();
        this.canvas.writeImageFromFileToCanvas(`assets/images/${this.country}/souvenir3_h.png`, 530, 150, 150, 150, "QuesThree");
        this.canvas.writeTextToCanvas('Goed gedaan! Level uitgespeeld!', 30, this.canvas.getWidth() - 400, 200, '#FFF', 'center');
    }
    showVideo() {
        var videlem = document.getElementById("video");
        videlem.style.display = "initial";
    }
    videoScreen() {
        this.canvas.Clear();
        this.canvas.writeTextToCanvas('Bekijk de video voor meer informatie!', 70, this.canvas.getWidth() / 2, 100, '#FFF', 'center');
        var videlem = document.getElementById("video");
        var sourceMP4 = document.createElement("source");
        sourceMP4.type = "video/mp4";
        sourceMP4.src = this.urlFR;
        videlem.appendChild(sourceMP4);
        videlem.id = "video";
        this.showVideo();
        this.canvas.writeCloseButtonToCanvas();
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
        this.keyPressed = null;
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
        if (event.key == 'v') {
            this.keyPressed = 'V';
        }
        if (event.key == 'c') {
            this.keyPressed = 'C';
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
                answer: 'C',
                potentials: ['A: Hollandia', "B: l'Hollande", 'C: Les Pays-Bas', 'D: Les Nederlands']
            },
            {
                number: 1,
                question: 'Wat is de bekendste kaas van Frankrijk?',
                answer: 'D',
                potentials: ['A: Brie', "B: Beaufort", 'C: Roquefort', 'D: Camembert']
            },
            {
                number: 2,
                question: 'Wie was de bekendste Franse persoon?',
                answer: 'A',
                potentials: ['A: Napoleon', "B: Georges Pompidou", "Jeanne D'Arc", 'Lodewijk XIV']
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