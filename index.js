// Menu/Navbar items are selected when the page is at that part
$('body').scrollspy({target: "#menu-tabs", offset: 80});

// Add smooth scrolling on all links inside the navbar
$(".nav-link").on('click', function(e) {

    // prevent default anchor click behavior
    e.preventDefault();

    // store hash
    var hash = this.hash;

    // animate
    $('html, body').animate({
        scrollTop: ($(hash).offset().top - 80)
    }, 800, function(){
        // when done, add hash to url (default click behaviour)
        window.location.hash = hash;
    });
});

// Enable popovers (used on Services headers, deals icons, & footer icons)
$(function () {
    $('[data-toggle="popover"]').popover();
});

// Functions for Google Maps
var markerS, markerA, markerD, infoWindow;
function initMap()
{
    // Summerlin Map
    var posS = {lat: 36.194510, lng: -115.258065};
    var optionsS = { zoom: 14, center: posS, scrollwheel: false, mapTypeControl: false };
    var mapS = new google.maps.Map(document.getElementById("summerlin-map"), optionsS);
    markerS = new google.maps.Marker({
        map: mapS,
        animation: google.maps.Animation.DROP,
        // icon: "company-logo.png",
        position: posS
    });
    markerS.addListener('click', toggleBounce);

    // Aliante Map
    var posA = {lat: 36.285986, lng: -115.178478};
    var optionsA = { zoom: 14, center: posA, scrollwheel: false, mapTypeControl: false };
    var mapA = new google.maps.Map(document.getElementById("aliante-map"), optionsA);
    markerA = new google.maps.Marker({
        map: mapA,
        animation: google.maps.Animation.DROP,
        // icon: "company-logo.png",
        position: posA
    });
    markerA.addListener('click', toggleBounce);

    // Downtown Map
    var posD = {lat: 36.160955, lng: -115.144164};
    var optionsD = { zoom: 14, center: posD, scrollwheel: false, mapTypeControl: false };
    var mapD = new google.maps.Map(document.getElementById("downtown-map"), optionsD);
    markerD = new google.maps.Marker({
        map: mapD,
        animation: google.maps.Animation.DROP,
        // icon: "company-logo.png",
        position: posD
    });
    markerD.addListener('click', toggleBounce);
}

// Markers on maps will start/stop bouncing upon click
function toggleBounce()
{
    if (this.getAnimation() !== null)
        this.setAnimation(null);
    else
        this.setAnimation(google.maps.Animation.BOUNCE);
}

// Error checking on contact form before submission
$("form").submit(function()
{
    if ($("#email").val() == "" || $("#subject").val() == "" || $("#content").val() == "")
    {
        $("#error-msg").css("display", "block");
        $("#success-msg").css("display", "none");
        $("#error-msg").html("<strong>Uh oh!</strong> There were error(s) in your email:");
        if ($("#email").val() == "")
            $("#error-msg").append("<br>The email field is required.");
        if ($("#subject").val() == "")
            $("#error-msg").append("<br>The subject field is required.");
        if ($("#content").val() == "")
            $("#error-msg").append("<br>The content field is required.");

        return false;
    }
    else
        return true;
});

// The function actually applying the offset
function offsetAnchor() {
    if (location.hash.length !== 0) {
        window.scrollTo(window.scrollX, window.scrollY - 80);
    }
}

// Captures click events of all a elements with href starting with #
$(document).on('click', 'a[href^="#"]', function(event) {
    // Click events are captured before hashchanges. Timeout causes offsetAnchor to be called after the page jump.
    window.setTimeout(function() {
        offsetAnchor();
    }, 0);
});

// Set the offset when entering page with hash present in the url
window.setTimeout(offsetAnchor, 0);

// Sets the width/height of various components based on the width/height of the window
function setSizes()
{
    // Reviews

    // Sets the text size for smaller screens so that all the text fits
    if ($("body").width() > 995)
        $(".review-text").css("font-size", "16px");
    else if ($("body").width() > 940)
        $(".review-text").css("font-size", "15px");
    else if ($("body").width() > 760)
        $(".review-text").css("font-size", "14px");
    else if ($("body").width() > 685)
        $(".review-text").css("font-size", "13px");
    else if ($("body").width() > 651)
        $(".review-text").css("font-size", "12px");
    else if ($("body").width() > 500)
        $(".review-text").css("font-size", "11px");
    else
        $(".review-text").css("font-size", "11px");

    // Change the reviews based on the width of the screen, since the larger reviews won't fit on mobile screens
    if ($("body").width() > 550)
    {
        $("#review-t-1").html("\"Complete wizardry.  My lap top is more than 10 years old but John and the crew keep it up to date and working in light speed - And they get the work done super fast.  Trustworthy, responsible and possess the necessary expertise to get any job done with complete satisfaction.\"");
        $("#review-a-1").html("Bob S.");
        $("#review-t-2").html("\"Professional and knowledgeable. John did a remote repair with me, which saved me a trip over there and time without my computer. It is my go-to place for any computer problems in the future. I am 100% behind them.\"");
        $("#review-a-2").html("June D.");
    }
    else
    {
        $("#review-t-1").html("\"They were very quick, cleaned up my computer as promised and it is now running like a champ.\"");
        $("#review-a-1").html("Jeffrey C.");
        $("#review-t-2").html("\"Esteban fixed the virus on my Mac. Super friendly and pretty quick turnaround. Thank you!\"");
        $("#review-a-2").html("Diane S.");
    }

    // Sets the width of the main content and side padding of the reviews
    $("#carousel-text").css("width", (($(window).width() * 0.7) + $("#carousel-text").css("padding-left") + $("#carousel-text").css("padding-left")));
    $("#carousel-text").css("padding-left", ($("#carousel-btn-left").width() - 15));
    $("#carousel-text").css("padding-right", ($("#carousel-btn-right").width() - 15));

    // Finds the review with the largest height
    var maxHeight = 0;
    $(".carousel-item").each(function() {
        var height = $(".carousel-item").height();
        if (height > maxHeight)
            maxHeight = height;
    });

    // Sets all reviews to the largest height, so containers don't move when the carousel scrolls
    $(".carousel-item").each(function() {
        $(".carousel-item").css("height", (maxHeight + 48) + "px");
    });
    $("#carousel-text").css("height", (maxHeight + 48) + "px");

    // Sets the carousel buttons to match the height of the reviews
    $("#carousel-btn-left").css("height", $("#carousel-text").height());
    $("#carousel-btn-right").css("height", $("#carousel-text").height());





    // Jumbotron

    // Sets the height of the jumbotron to fill the page, with enough room for the menu at the top and the review carousel at the bottom
    $(".jumbotron").css("height", ($(window).height() - $(".navbar").height() - $("#reviews").height() - 16) + "px");

    // Resizes the width for the the business popup when the screen width is less than 1160px
    if ($("body").width() < 1160)
        $("#business-popup").css("width", "90%");





    // Services
    if ($("body").width() > 575 && $("body").width() < 697)
        $(".services-list").css("font-size", "14px");
    else
        $(".services-list").css("font-size", "16px");





    // Locations

    // Sets width of cards' contents to not extend past card border
    $(".card-row").css("width", $(".locations-card").width() + "px");
    $(".card-row").css("margin-left", "0px");

    // Sets the padding on the left and right of the hours table for locations
    if ($("body").width() > 1450) // 1450 - ???
    {
        $(".days").css("padding-left", "100px");
        $(".hours").css("padding-right", "100px");
    }
    else if ($("body").width() > 1090) // 1091 - 1450
    {
        $(".days").css("padding-left", "50px");
        $(".hours").css("padding-right", "50px");
    }
    else if ($("body").width() > 830) // 831 - 1090
    {
        $(".days").css("padding-left", "30px");
        $(".hours").css("padding-right", "30px");
    }
    else if ($("body").width() > 700) // 701 - 830
    {
        $(".days").css("padding-left", "20px");
        $(".hours").css("padding-right", "20px");
    }
    else if ($("body").width() > 575) // 576 - 700
    {
        $(".days").css("padding-left", "10px");
        $(".hours").css("padding-right", "10px");
    }
    else if ($("body").width() > 386) // 387 - 575
    {
        $(".days").css("padding-left", "50px");
        $(".hours").css("padding-right", "50px");
    }
    else if ($("body").width() > 326) // 327 - 386
    {
        $(".days").css("padding-left", "20px");
        $(".hours").css("padding-right", "20px");
    }
    else if ($("body").width() > 310) // 311 - 326
    {
        $(".days").css("padding-left", "10px");
        $(".hours").css("padding-right", "10px");
    }

    // Only smart hours are shown if screen is < 310px wide
    if ($("body").width() > 310) // 311 - ???
    {
        $(".location-hours").css("display", "flex");
        $("#summerlin-map").css("display", "flex");
        $("#aliante-map").css("display", "flex");
        $("#downtown-map").css("display", "flex");
    }
    else // 0 - 310
    {
        $(".location-hours").css("display", "none");
        $("#summerlin-map").css("display", "none");
        $("#aliante-map").css("display", "none");
        $("#downtown-map").css("display", "none");
    }

    // Sets the height of the maps based on the cards changing sizes
    if ($("body").width() > 991) // 992 - ???
    {
        $("#summerlin-map").css("height", "300px");
        $("#aliante-map").css("height", "300px");
        $("#downtown-map").css("height", "300px");

    }
    else if ($("body").width() > 576) // 577 - 991
    {
        $("#summerlin-map").css("height", "453px");
        $("#aliante-map").css("height", "453px");
        $("#downtown-map").css("height", "453px");
    }
    else // 0 - 576
    {
        $("#summerlin-map").css("height", ($("#summerlin-map").width() / 2) + "px");
        $("#aliante-map").css("height", ($("#aliante-map").width() / 2) + "px");
        $("#downtown-map").css("height", ($("#downtown-map").width() / 2) + "px");
    }

    // Adds a bottom margin on the location cards when each card fills the entire row
    if ($("body").width() > 991) // 577 - ???
        $(".locations-card").css("margin-bottom", "0px");
    else // 0 - 576
        $(".locations-card").css("margin-bottom", "10px");
}

// Sets the correct width/height for the jumbotron and reviews carousel everytime the page loads or changes size
setSizes();
$(window).resize(function() {
    setSizes();
});

// Bolds the current day and its corresponding open hours in the 'Locations' section
var currentDate = new Date();
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var hours = ["Closed", "9am - 6pm", "9am - 6pm", "9am - 6pm", "9am - 6pm", "9am - 5pm", "10am - 3pm"];
for (var i = 0; i <= 6; i++)
{
    if (currentDate.getDay() == i)
    {
        $(".days").append("<p><strong>" + days[i] + "</strong></p>");
        $(".hours").append("<p><strong>" + hours[i] + "</strong></p>");
    }
    else
    {
        $(".days").append("<p>" + days[i] + "</p>");
        $(".hours").append("<p>" + hours[i] + "</p>");
    }
}

// Smart Hours
var hour = currentDate.getHours();
var minute = currentDate.getMinutes();
var dayOfTheWeek = days[currentDate.getDay()];
var todayOpeningTime = 0;
var todayClosingTime = 0;

if (dayOfTheWeek == "Monday" || dayOfTheWeek == "Tuesday" || dayOfTheWeek == "Wednesday" || dayOfTheWeek == "Thursday")
{
    todayOpeningTime = 9;
    todayClosingTime = 18;
}
else if (dayOfTheWeek == "Friday")
{
    todayOpeningTime = 9;
    todayClosingTime = 17;
}
else if (dayOfTheWeek == "Saturday")
{
    todayOpeningTime = 10;
    todayClosingTime = 15;
}

if ( (todayOpeningTime == 0 && todayClosingTime == 0) || hour >= todayClosingTime )
{
    $(".smartHoursSummerlin").html("Currently Closed");
    $(".smartHoursSummerlin").css({"color": "#a94442", "font-weight": "bold"});
}
else if ( (todayOpeningTime - hour) > 0 && (todayOpeningTime - hour) < 5 )
{
    if ( (todayOpeningTime - hour) == 1 )
        $(".smartHoursSummerlin").html("Opening in " + (60 - minute) + " minute(s)");
    else
        $(".smartHoursSummerlin").html("Opening in " + (todayOpeningTime - hour) + " hour(s)");
    $(".smartHoursSummerlin").css({"color": "#9daa03", "font-weight": "bold"});
}
else if ( (todayClosingTime - hour) == 1 )
{
    $(".smartHoursSummerlin").html("Closing in " + (60 - minute) + " minute(s)");
    $(".smartHoursSummerlin").css({"color": "#af8103", "font-weight": "bold"});
}
else
{
    $(".smartHoursSummerlin").html("Currently Open");
    $(".smartHoursSummerlin").css({"color": "#00a803", "font-weight": "bold"});
}
