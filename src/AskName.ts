class AskName {
    public constructor() {
        this.save_name();
    }

    public save_name() {
        let name: string;

        //@ts-ignore
        if (cookie.get("name") == undefined || cookie.get("name") == null) {
            name = prompt("Vul je naam in!", "Speler");
            //@ts-ignore
            cookie.set("name", name, {expires: 366});
        } else {
            // do nothing
        }
    }
}