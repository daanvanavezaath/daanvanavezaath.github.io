// Set the start of the timer
let timerStart = Date.now();

// Give shake class after flying in to solve bug
setInterval(function () {
    $("#loadingImage").addClass("shake");
}, 600);

// Function that counts percents en remove loadscreen when page is loaded
$(window).load(function () {
    // Generate counter
    let loadTime = (Date.now() - timerStart) / 1000;
    var c = new CountUp("counter", 0, 100, 0, loadTime, {
        useEasing: false,
        useGrouping: false
    });
    c.start();
    // Fade out if page is loaded
    $(".loadscreen").fadeOut("slow");;
});

