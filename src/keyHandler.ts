class keyHandler {
    public keyPressed: string;

    public constructor() {
    }

    // Adds event listeners on keys
    public runKeyHandler() {
        window.addEventListener("keydown", (event) => this.keyPressHandler(event));

    }

    // Checks on key pressed
    public keyPressHandler(event: KeyboardEvent) {
        if (event.key == 'a') {
            this.keyPressed = 'A';
            console.log('A ingetoetst')
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

    // Resets the last key pressed
    public resetKeys() {
        this.keyPressed = null;
    }
}