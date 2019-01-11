class ClearCookies {
    // Get the remove cookies butten from DOM
    private cookie_id = document.getElementById("clear_cookies");

    public constructor() {
        // If object is made, execute function clear_cookies()
        this.clear_cookies();
    }

    // Clears cookies
    public clear_cookies() {
        this.cookie_id.addEventListener("click", function () {
            // Warn the player
            if (confirm("Weet je zeker dat je opnieuw wilt beginnen?")) {
                //@ts-ignore
                // Sets cookie expiration to a date 366 days in the future
                cookie.set("passed", "", { expires: 366 });
                //@ts-ignore
                cookie.remove("name");
                setTimeout(() => location.reload(), 100);
            } else {
                // Don't do anything :)
            }
        });
    }
}