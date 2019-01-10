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
                question: 'Hoeveel vorstendommen had Duitsland vroeger?',
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

        if (this.countryController.getCountry() == 'Nederland') {
            // Array with questions
            this.questions = [{
                number: 0,
                question: 'Hoeveel mensen wonen er in Nederland?',
                answer: 'C',
                potentials: ['A: Ongeveer 10 miljoen', 'B: Ongeveer 16 miljoen', 'C: Ongeveer 17 miljoen', 'D: Ongeveer 20 miljoen']
            },
            {
                number: 1,
                question: 'Hoeveel procent is werkloos in Nederland?',
                answer: 'D',
                potentials: ['A: 1', 'B: 10', 'C: 50', 'D: 5']
            },
            {
                number: 2,
                question: 'Hoeveel procent is bejaard?',
                answer: 'A',
                potentials: ['A: Ongeveer 18', 'B: Ongeveer 8', 'C: Ongeveer 28', 'D: Ongeveer 5']
            }
            ];
        }

        if (this.countryController.getCountry() == 'Engeland') {
            // Array with questions
            this.questions = [{
                number: 0,
                question: 'Wat is de naam van het Engelse koningshuis?',
                answer: 'D',
                potentials: ['A: Saxe-Coburg', 'B: London', 'C: Buckingham Palace', 'D: Windsor']
            },
            {
                number: 1,
                question: 'Wat is een nette naam voor agent?',
                answer: 'C',
                potentials: ['A: Smeris', 'B: Pigs', 'C: Bobby', 'D: My Kok']
            },
            {
                number: 2,
                question: 'Wat heeft een Engelse agent niet?',
                answer: 'B',
                potentials: ['A: Wapenstok', 'B: Pistool', 'C: Portofoon', 'D: Handboeien']
            }
            ];
        }

        if (this.countryController.getCountry() == 'IJsland') {
            this.questions = [{
                number: 0,
                question: 'Wie was de man die IJsland haar naam gaf?',
                answer: 'C',
                potentials: ['A: Halldór Ásgrímsson', 'B: Hannes Hafstein', 'C: Hrafna-Flóki', 'D: Ólafur Ragnar Grímsson']
            },
            {
                number: 1,
                question: 'Wat is de hoofdstad van IJsland?',
                answer: 'A',
                potentials: ['A: Reykjavík', 'B: Keflavik', 'C: Húsavík', 'D: Akureyri']
            },
            {
                number: 2,
                question: 'Wanneer werd IJsland onafhankelijk van Denemarken?',
                answer: 'B',
                potentials: ['A: 1872', 'B: 1944', 'C: 1968', 'D: 2000']
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