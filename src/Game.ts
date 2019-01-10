class Game {

    private readonly canvas: Canvas;
    private readonly keyHandler: keyHandler;
    private readonly questionHandler: questionHandler;
    private countryController = new countryController;
    private country: string = this.countryController.getCountry();
    private goodAnswer: string;
    private answerInterval: any;
    private answerpadding: number;
    private url: string = `./assets/video/${this.country}.mp4`;
    private backgroundMusicUrl = './assets/audio/music.mp3';
    private life_handler = new LifeHandler();
    private passed: string;
    private backgroundMusic: any;
    private musicMuted: boolean;

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
        // Play background music 
        this.backgroundMusic = new Audio(this.backgroundMusicUrl);
        // Sets musicMuted to false
        this.musicMuted = false;
        this.checkForMute();
    }

    private playBackgroundMusic() {
        this.backgroundMusic.play();
        this.musicMuted = false;
        this.canvas.writeImageFromFileToCanvas('./assets/images/soundOn.png', 350, 30, 40, 40, 'soundOnButton')
    }

    private pauseBackgroundMusic() {
        this.backgroundMusic.pause();
        this.musicMuted = true;
        this.canvas.writeImageFromFileToCanvas('./assets/images/mute.png', 350, 30, 40, 40, 'muteButton')
        this.canvas.writeTextToCanvas('M-toets: Geluid aan', 15, 460, 55, '#FFF', 'center');
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
        // Writes top bar with name and country in it to the canvas  
        this.canvas.drawRectangleToCanvas("#6597cf", 0, 0, this.canvas.getWidth(), 100);
        this.canvas.drawRectangleToCanvas("#6597cf", this.canvas.getWidth() - 700, 150, 600, 400);
        // this.canvas.writeNameToRectangle(120, 60, 350, 30);
        // this.canvas.writeCountryToRectangle(`Je bent in ${this.country}`, this.canvas.getWidth() - 300, 60, this.canvas.getWidth(), 30);
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
        // Say they need to use keyboard input
        this.canvas.writeTextToCanvas("Druk de toets in van het juiste antwoord!", 25, this.canvas.getWidth() - 400, 250, "#FFF", "center");
        // Picks the good answer
        this.goodAnswer = questionObject.answer;
        // Writes video explaining string
        this.canvas.writeTextToCanvas("Druk op 'V' voor de informatievideo!", 25, this.canvas.getWidth() - 400, 495, '#FFF', 'center');
        // Writes hint explaining string
        this.canvas.writeTextToCanvas("Druk op 'H' voor een hint!", 25, this.canvas.getWidth() - 400, 525, '#FFF', 'center');
    }

    private storeHint() {
        // Gets the hint corresponding to the current question
        let questionObject = this.questionHandler.questions[this.questionHandler.questionCounter];
        this.canvas.writeTextToCanvas(questionObject.hint, 25, this.canvas.getWidth() - 400, 250, "#FFF", "center")
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

    private checkForMute() {
        if (this.musicMuted == true) {
            this.pauseBackgroundMusic();
            this.keyHandler.resetKeys();
            this.canvas.Clear();
            this.resetLevel();
            this.canvas.writeTextToCanvas('M-toets: Geluid aan', 20, 460, 57, '#FFF', 'center');
        }

        else if (this.musicMuted == false) {
            this.playBackgroundMusic();
            this.keyHandler.resetKeys();
            this.canvas.Clear();
            this.resetLevel();
            this.canvas.writeTextToCanvas('M-toets: Geluid uit', 20, 460, 57, '#FFF', 'center');
        }
    }

    public hideVideo() {
        //@ts-ignore
        let videlem: HTMLVideoElement = document.getElementById("video")
        videlem.style.display = "none";
        videlem.pause();
        this.checkForMute();
    }

    private checkAnswer() {
        // If 'V' is pressed, enter Video screen
        if (this.keyHandler.keyPressed == 'V') {
            // Render video screen
            this.videoScreen();
        }

        if (this.keyHandler.keyPressed == 'H') {
            // Get stored hint
            this.storeHint();
            // Clears canvas
            this.canvas.Clear();
            // Render hint screen
            this.hintScreen();
        }


        if (this.keyHandler.keyPressed == 'R') {
            this.hideVideo();
            this.checkForMute();
            this.resetLevel();
            var canvas = document.getElementById("canvas");
            // Adds country to class
            canvas.classList.remove(`${this.country}_dark`);
            canvas.classList.add(`${this.country}`);
        }


        if (this.keyHandler.keyPressed == 'M' && this.musicMuted == false) {
            this.pauseBackgroundMusic();
            this.keyHandler.resetKeys();
            this.canvas.Clear();
            this.canvas.writeTextToCanvas('M-toets: Geluid uit', 25, 460, 55, '#FFF', 'center');
            this.resetLevel();
        }

        else if (this.keyHandler.keyPressed == 'M' && this.musicMuted == true) {
            this.playBackgroundMusic();
            this.keyHandler.resetKeys();
            this.canvas.Clear();
            this.canvas.writeTextToCanvas('M-toets: Geluid aan', 25, 460, 55, '#FFF', 'center');
            this.resetLevel();
        }

        // Run if answer is the same as pushed button
        if (this.goodAnswer == this.keyHandler.keyPressed) {
            // Play good answer sound
            new Audio('./assets/audio/good.mp3').play()
            // Increases the question counter by 1
            this.questionHandler.increaseQuestionCounter();
            // Resets the question booleans
            this.questionHandler.setQuestionBooleans();
            // Resets the last pressed key
            this.keyHandler.resetKeys();
            // Resets the level screen
            this.resetLevel();
            // Checks for mute
            this.checkForMute();
        }

        if (this.keyHandler.keyPressed !== null) {
            // If answers is not good, or keypress is not an answers letter, do this
            if (this.goodAnswer !== this.keyHandler.keyPressed && this.keyHandler.keyPressed !== 'V' && this.keyHandler.keyPressed !== 'R' && this.keyHandler.keyPressed !== 'M' && this.keyHandler.keyPressed !== 'H') {
                // Stop interval to prevent infinite loop
                clearInterval(this.answerInterval);
                // Play good answer sound
                new Audio('./assets/audio/wrong.mp3').play()
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
                // subtract life
                this.life_handler.subtract_life();
                // draw lifes
                this.life_handler.draw_lifes();
                // Writes text to the canvas
                if (this.life_handler.return_life() == 0) {
                    this.canvas.writeTextToCanvas("Je hebt geen levens meer! :(", 30, this.canvas.getWidth() - 400, 200, '#FFF', 'center');
                } else {
                    this.canvas.writeTextToCanvas('Niet goed, probeer opnieuw!', 30, this.canvas.getWidth() - 400, 200, '#FFF', 'center');
                }

                // After 3 secs, load level screen again and restart the checkAnswer-interval. Check lifes first
                if (this.life_handler.return_life() == 0) {
                    setTimeout(() => {
                        window.location.replace('index.html');
                    }, 3000);
                } else {
                    setTimeout(() => {
                        this.keyHandler.resetKeys();
                        this.levelScreen();
                        this.checkForMute();
                        this.answerInterval = window.setInterval(() => this.checkAnswer(), 200 / 1);
                    }, 3000);
                }
            }
        }

        // If there are no questions, reset and move page to start page after 2 secs
        // also add a cookie if passed
        if (this.questionHandler.questionCounter > 2) {
            clearInterval(this.answerInterval);
            console.log('Spel afgelopen')
            this.playedOutScreen();

            // Add cookie
            let url = new URL(window.location.href); // or construct from window.location
            let params = new URLSearchParams(url.search.slice(1));

            //@ts-ignore
            let cookie_val = cookie.get("passed");

            for (let p of params) {
                this.passed = window.atob(p[1]);
            }

            if (cookie_val == undefined || cookie_val == null) {
                //@ts-ignore
                cookie.set("passed", `,${this.passed}`, { expires: 366 });
            } else {
                if (!cookie_val.match(this.passed)) {
                    cookie_val = `${cookie_val},${this.passed}`;
                    //@ts-ignore
                    cookie.set("passed", cookie_val, { expires: 366 });
                }
            }

            setTimeout(() => {
                window.location.replace('index.html');
            }, 2000);
        }
    }

    // By running this, render the level screen
    public levelScreen() {
        // Clears the canvas
        this.canvas.Clear();
        // Loads Level assets
        this.writeLevelAssets();
        // Draws the souvenirs
        this.drawSouvenirs();
        // Render game screen
        this.gameScreen();
        // Shows the question
        this.showQuestion();
        // Starts the keyHandler to check for keypresses
        this.keyHandler.runKeyHandler();
        // Shows the potential answers according to the question
        this.showAnswers();
        // Writes name and country to top bar
        this.canvas.writeNameToRectangle(170, 60, 350, 30);
        this.canvas.writeCountryToRectangle(`Je bent in ${this.country}`, this.canvas.getWidth() - 250, 60, this.canvas.getWidth(), 30);
        // draw lifes
        this.life_handler.draw_lifes();
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
        // Pauses background music
        this.backgroundMusic.pause();
        // Plays level passed sound
        new Audio('./assets/audio/passed.mp3').play()
        // Shows level played out text
        this.canvas.writeTextToCanvas('Goed gedaan! Level uitgespeeld!', 30, this.canvas.getWidth() - 400, 200, '#FFF', 'center');
        // show lifes
        this.life_handler.draw_lifes();
    }

    // Function to show the video
    public showVideo() {
        var videlem = document.getElementById("video");
        videlem.style.display = "initial";
    }

    // Renders video screen
    public videoScreen() {
        this.backgroundMusic.pause();
        // Clears the canvas
        this.canvas.Clear();
        // Writes info text
        this.canvas.writeTextToCanvas('Bekijk de video voor meer informatie!', 70, this.canvas.getWidth() / 2, 100, '#FFF', 'center');
        // Append source to DOM element
        if (document.getElementById("vsrc") == null) {
            // Gets video element
            let videlem = document.getElementById("video");
            // Writes the source
            let sourceMP4 = document.createElement("source");
            // Sets the type of the video
            sourceMP4.type = "video/mp4";
            // Sets the source of the video
            sourceMP4.src = this.url;
            sourceMP4.id = "vsrc";
            videlem.appendChild(sourceMP4);
            // Gives DOM element an ID
            videlem.id = "video";
        }
        // Shows the video
        this.showVideo();
        // Shows close button
        //this.canvas.writeTextToCanvas("Druk op 'R' om de video te sluiten...", 30, this.canvas.getWidth() / 2, (this.canvas.getHeight() / 2 + 245), "#FFF");
        this.canvas.writeCloseButtonToCanvas();
    }

    // Renders video screen
    public hintScreen() {
        var canvas = document.getElementById("canvas");
        // Adds country to class
        canvas.classList.remove(`${this.country}`);
        canvas.classList.add(`${this.country}_dark`);
        this.canvas.Clear();
        // Writes info text
        let questionObject = this.questionHandler.questions[this.questionHandler.questionCounter];
        this.canvas.writeTextToCanvas(`${questionObject.hint}`, 70, this.canvas.getWidth() / 2, 350, '#FFF', 'center');
        this.canvas.writeTextToCanvas(`Bekijk de hints om de vraag makkelijker te maken!`, 70, this.canvas.getWidth() / 2, 100, '#FFF', 'center');
        this.canvas.writeCloseButtonToCanvas();
    }

    public video_source() {
        return this.url;
    }
}

// Event listener on page load
window.addEventListener('load', init);

// Event listener runs this on page load
function init(): void {
    if (window.location.pathname.match(/\/index.html/)) {
        // do nothing
    } else {
        const ikReis = new Game();

        const videlem = document.getElementById("video");
        videlem.setAttribute("src", ikReis.video_source());

        setTimeout(function () { ikReis }, 1000);
    }
}