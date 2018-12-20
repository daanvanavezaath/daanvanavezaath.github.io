class questionHandler {

    public question0: boolean = false;
    public question1: boolean = false;
    public question2: boolean = false;
    public questions: Array<any>;
    public countryController: countryController;
    public questionCounter: number;

    public constructor() {
        this.countryController = new countryController;
        // Counter begins at 0
        this.questionCounter = 0;


        if (this.countryController.getCountry() == 'Frankrijk') {
            // Array with questions
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
                potentials: ['A: Napoleon', "B: Georges Pompidou", "C: Jeanne D'Arc", 'D: Lodewijk XIV']
            }
            ];
        }

        if (this.countryController.getCountry() == 'Belgie') {
            // Array with questions
            this.questions = [{
                number: 0,
                question: 'Sinds wanneer bestaat België?',
                answer: 'D',
                potentials: ['A: 1795', "B: 2000", 'C: 1908', 'D: 1830']
            },
            {
                number: 1,
                question: 'Hoelang heeft het Verenigd Koninkrijk der Nederlanden standgehouden?',
                answer: 'B',
                potentials: ['A: 8 Jaar', "B: 15 Jaar", 'C: 17.5 Jaar', 'D: 55 Jaar']
            },
            {
                number: 2,
                question: 'Wat betekend "Seffus"?',
                answer: 'C',
                potentials: ['A: Zeven', "B: Eventjes", "C: Straks", 'D: Gisteren']
            }
            ];
        }

        if (this.countryController.getCountry() == 'Duitsland') {
            // Array with questions
            this.questions = [{
                number: 0,
                question: 'Wat betekend "Man" in het Duits?',
                answer: 'A',
                potentials: ['A: Mens', 'B: Man', 'C: Vader', 'D: Vrachtwagen']
            },
            {
                number: 1,
                question: 'Uit hoeveel vorstendommen bestond Duitsland vroeger?',
                answer: 'C',
                potentials: ['A: Precies 100', 'B: Ongeveer 40', 'C: Ongeveer 130', 'D: Precies 12']
            },
            {
                number: 2,
                question: 'Wat wordt er bedoeld met "Schlager"?',
                answer: 'B',
                potentials: ['A: Slaan', 'B: Muziek', "C: Slager", 'D: Vleesindustrie']
            }
            ];
        }
    }

    // Increases the question counter with 1
    public increaseQuestionCounter() {
        this.questionCounter++;
    }

    // Resets the Question Counter to 0
    public resetQuestionCounter() {
        this.questionCounter == 0;
    }

    // Sets the question booleans
    public setQuestionBooleans() {
        if (this.questionCounter > 0) {
            this.question0 = true;
        }

        if (this.questionCounter > 1) {
            this.question1 = true;
        }

        if (this.questionCounter > 2) {
            this.question2 = true;
        }
    }
}