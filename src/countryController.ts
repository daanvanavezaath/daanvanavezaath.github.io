class countryController {
    public country: string;

    constructor() {
    }

    public getCountry() {
        // Gets current page url
        let url = new URL(window.location.href); // or construct from window.location

        // Search url for params
        let params = new URLSearchParams(url.search.slice(1));

        // Dehash country param
        for (let p of params) {
            this.country = window.atob(p[1]);
        }

        // Statement to change country name from URL-friendly to Dutch
        switch (this.country) {
            case "france":
                this.country = "Frankrijk";
                break;
            case "belgium":
                this.country = "Belgie";
                break;
            case "germany":
                this.country = "Duitsland";
                break;
            case "netherlands":
                this.country = "Nederland";
                break;
            case "uk":
                this.country = "Engeland";
                break;
            case "iceland":
                this.country = "IJsland";
                break;
            default:
                this.country = null;
                break;
        }

        // If no country is given in the URL param, move player to index
        if (this.country == null && window.location.pathname.match(/\/game.html/)) {
            alert('Oeps! Foutje... Wacht even, je wordt doorgestuurd.')
            setTimeout(() => {
                window.location.replace('index.html');
            }, 50);
        }

        // Returns country name
        return this.country;
    }
}