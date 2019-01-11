class AskName {
    public constructor() {
        // If object is make, run this function
        this.save_name();
    }

    // Function to save name and set the cookie value
    public save_name() {
        let name: string;

        //@ts-ignore
        if (cookie.get("name") == undefined || cookie.get("name") == null) {
            name = prompt("Vul je naam in!", "Speler");
            //@ts-ignore
            cookie.set("name", name, { expires: 366 });
        } else {
            // do nothing
        }
    }
}