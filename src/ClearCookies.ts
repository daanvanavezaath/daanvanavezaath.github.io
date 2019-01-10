class ClearCookies {
    private cookie_id = document.getElementById("clear_cookies");

    public constructor() {
        this.clear_cookies();
    }

    public clear_cookies() {
        this.cookie_id.addEventListener("click", function() {
            if (confirm("Weet je zeker dat je opnieuw wilt beginnen?")) {
                //@ts-ignore
                cookie.set("passed", " ", {expires: 366});
                //@ts-ignore
                cookie.remove("name");
                setTimeout(() => location.reload(), 100);
            } else {
                // do nothing
            }
        });
    }
}