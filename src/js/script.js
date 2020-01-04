$(document).ready(function () {
    setTimeout(function () {
        window.scrollTo(0, 0);
    }, 1);
});

$(document).ready(function () {
    $("#btn").on("click", function (e) {
        e.preventDefault();
        let top = $("#section2").offset().top;
        $("html, body").animate({
            scrollTop: top
        }, 150);
    });
});

$(document).ready(function () {
    $("#first").on("click", function (e) {
        e.preventDefault();
        let top = $("#section1").offset().top;
        $("html, body").animate({
            scrollTop: top
        }, 150);
    });
});

$(document).ready(function () {
    $("#sec").on("click", function (e) {
        e.preventDefault();
        let top = $("#section2").offset().top;
        $("html, body").animate({
            scrollTop: top
        }, 150);
    });
});

$(document).ready(function () {
    $("#tr").on("click", function (e) {
        e.preventDefault();
        let top = $("#section3").offset().top;
        $("html, body").animate({
            scrollTop: top
        }, 150);
    });
});

let isScrolling = false;

window.addEventListener("scroll", throttleScroll, false);

function throttleScroll(e) {
    if (isScrolling === false) {
        window.requestAnimationFrame(function () {
            scrolling(e);
            isScrolling = false;
        });
    }
    isScrolling = true;
}

document.addEventListener("DOMContentLoaded", scrolling, false);

let Items = document.querySelectorAll("#section2 *");

function scrolling() {


    for (let i = 0; i < Items.length; i++) {
        let listItem = Items[i];

        if (isPartiallyVisible(listItem)) {
            listItem.classList.add("active");
        } else {
            listItem.classList.remove("active");
        }
    }
}

function isPartiallyVisible(el) {
    let elementBoundary = el.getBoundingClientRect();
    let top = elementBoundary.top;
    let bottom = elementBoundary.bottom;
    let height = elementBoundary.height;

    return ((top + height >= 0) && (height + window.innerHeight >= bottom));
}

