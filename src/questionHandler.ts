class questionHandler {

    public question0: boolean = false;
    public question1: boolean = false;
    public question2: boolean = false;
    public questions: Array<any>;
    public questionCounter: number;

    public constructor() {
        // Counter begins at 0
        this.questionCounter = 0;

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
            potentials: ['A: Napoleon', "B: Georges Pompidou", "Jeanne D'Arc", 'Lodewijk XIV']
        }
        ];
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
        if(this.questionCounter >= 1) {
            this.question0 = true;
        }

        if(this.questionCounter >= 2 ) {
            this.question1 = true;
        }
    }
}