/*---------------------------------------------"
// Template Name: Edeva Clinic
// Description:  Edeva Clinic Html Template
// Version: 1.0.0
--------------------------------------------*/

var MyScroll = "";
(function (window, document, $, undefined) {
    "use strict";
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Nokia|Opera Mini/i.test(navigator.userAgent)
        ? !0
        : !1;
    var Scrollbar = window.Scrollbar;
    var Init = {
        i: function (e) {
            Init.s();
            Init.methods();
        },
        s: function (e) {
            (this._window = $(window)),
                (this._document = $(document)),
                (this._body = $("body")),
                (this._html = $("html"));
        },
        methods: function (e) {
            Init.w();
            Init.BackToTop();
            Init.preloader();
            Init.header();
            Init.slick();
            Init.achivementCountdown();
            Init.niceSelect();
            Init.wow();
            Init.twentytwenty();
            Init.magnifying();
            Init.timepicker();
            Init.formValidation();
            Init.contactForm();
            Init.checkBoxes();
            Init.dropdown();
        },

        BackToTop: function () {
            var scrollToTopBtn = document.querySelector(".scrollToTopBtn");
            var rootElement = document.documentElement;

            function handleScroll() {
                var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
                if (rootElement.scrollTop / scrollTotal > 0.05) {
                    scrollToTopBtn.classList.add("showBtn");
                } else {
                    scrollToTopBtn.classList.remove("showBtn");
                }
            }

            function scrollToTop() {
                rootElement.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
            }
            scrollToTopBtn.addEventListener("click", scrollToTop);
            document.addEventListener("scroll", handleScroll);
        },
        preloader: function () {
            setTimeout(function () {
                $("#preloader").fadeOut("slow");
            }, 2800);
            setInterval(function () {
                $(".baby").first().toggleClass("down");
            }, 400);
        },

        w: function (e) {
            if (isMobile) {
                $("body").addClass("is-mobile");
            }
        },
        header: function () {
            function dynamicCurrentMenuClass(selector) {
                let FileName = window.location.href.split("/").reverse()[0];
                selector.find("li").each(function () {
                    let anchor = $(this).find("a");
                    if ($(anchor).attr("href") == FileName) {
                        $(this).addClass("current");
                    }
                });
                selector.children("li").each(function () {
                    if ($(this).find(".current").length) {
                        $(this).addClass("current");
                    }
                });
                if ("" == FileName) {
                    selector.find("li").eq(0).addClass("current");
                }
            }
            if ($(".main-menu__list").length) {
                let mainNavUL = $(".main-menu__list");
                dynamicCurrentMenuClass(mainNavUL);
            }
            if ($(".main-menu__nav").length && $(".mobile-nav__container").length) {
                let navContent = document.querySelector(".main-menu__nav").innerHTML;
                let mobileNavContainer = document.querySelector(".mobile-nav__container");
                mobileNavContainer.innerHTML = navContent;
            }
            if ($(".sticky-header__content").length) {
                let navContent = document.querySelector(".main-menu").innerHTML;
                let mobileNavContainer = document.querySelector(".sticky-header__content");
                mobileNavContainer.innerHTML = navContent;
            }
            if ($(".mobile-nav__container .main-menu__list").length) {
                let dropdownAnchor = $(".mobile-nav__container .main-menu__list .dropdown > a");
                dropdownAnchor.each(function () {
                    let self = $(this);
                    let toggleBtn = document.createElement("BUTTON");
                    toggleBtn.setAttribute("aria-label", "dropdown toggler");
                    toggleBtn.innerHTML = "<i class='fa fa-angle-down'></i>";
                    self.append(function () {
                        return toggleBtn;
                    });
                    self.find("button").on("click", function (e) {
                        e.preventDefault();
                        let self = $(this);
                        self.toggleClass("expanded");
                        self.parent().toggleClass("expanded");
                        self.parent().parent().children("ul").slideToggle();
                    });
                });
            }
            if ($(".mobile-nav__toggler").length) {
                $(".mobile-nav__toggler").on("click", function (e) {
                    e.preventDefault();
                    $(".mobile-nav__wrapper").toggleClass("expanded");
                    $("body").toggleClass("locked");
                });
            }
            $(window).on("scroll", function () {
                if ($(".stricked-menu").length) {
                    var headerScrollPos = 130;
                    var stricky = $(".stricked-menu");
                    if ($(window).scrollTop() > headerScrollPos) {
                        stricky.addClass("stricky-fixed");
                    } else if ($(this).scrollTop() <= headerScrollPos) {
                        stricky.removeClass("stricky-fixed");
                    }
                }
            });
        },
        //  Nice Select
        niceSelect: function () {
            if ($(".has-nice-select").length) {
                $(".has-nice-select, .contact-form select").niceSelect();
            }
        },
        slick: function () {
            if ($(".hero-slider").length) {
                $(".hero-slider").slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplaySpeed: 6000,
                    speed: 2000,
                    infinite: true,
                    fade: true,
                    autoplay: false,
                    centerMode: false,
                    dots: false,
                    draggable: true,
                    arrows: false,
                    lazyLoad: "progressive",
                });
            }
            if ($(".services-slider").length) {
                $(".services-slider").slick({
                    autoplay: !1,
                    autoplaySpeed: 3000,
                    speed: 900,
                    arrows: !1,
                    swipe: true,
                    draggable: true,
                    dots: true,
                    slidesToShow: 4,
                    pauseOnFocus: !1,
                    pauseOnHover: !1,
                    responsive: [
                        {
                            breakpoint: 1399,
                            settings: {
                                slidesToShow: 3,
                            },
                        },
                        {
                            breakpoint: 999,
                            settings: {
                                slidesToShow: 2,
                            },
                        },
                        {
                            breakpoint: 767,
                            settings: {
                                slidesToShow: 1,
                            },
                        },
                    ],
                });
            }
            if ($(".services-slider-2").length) {
                $(".services-slider-2").slick({
                    autoplay: !1,
                    autoplaySpeed: 3000,
                    speed: 900,
                    arrows: !1,
                    swipe: true,
                    draggable: true,
                    dots: true,
                    slidesToShow: 3,
                    pauseOnFocus: !1,
                    pauseOnHover: !1,
                    responsive: [
                        {
                            breakpoint: 1399,
                            settings: {
                                slidesToShow: 3,
                            },
                        },
                        {
                            breakpoint: 1199,
                            settings: {
                                slidesToShow: 2,
                            },
                        },
                        {
                            breakpoint: 575,
                            settings: {
                                slidesToShow: 1,
                            },
                        },
                    ],
                });
            }
            if ($(".team-slider").length) {
                $(".team-slider").slick({
                    autoplay: !1,
                    autoplaySpeed: 3000,
                    speed: 900,
                    arrows: !1,
                    swipe: true,
                    draggable: true,
                    dots: true,
                    slidesToShow: 4,
                    pauseOnFocus: !1,
                    pauseOnHover: !1,
                    responsive: [
                        {
                            breakpoint: 1399,
                            settings: {
                                slidesToShow: 3,
                            },
                        },
                        {
                            breakpoint: 999,
                            settings: {
                                slidesToShow: 2,
                            },
                        },
                        {
                            breakpoint: 575,
                            settings: {
                                slidesToShow: 1,
                            },
                        },
                    ],
                });
            }
            if ($(".clients-slider").length) {
                $(".clients-slider").slick({
                    autoplay: !0,
                    autoplaySpeed: 0,
                    speed: 10000,
                    arrows: !0,
                    swipe: !0,
                    slidesToShow: 6,
                    cssEase: "linear",
                    pauseOnFocus: !1,
                    pauseOnHover: !1,
                    responsive: [
                        {
                            breakpoint: 1499,
                            settings: {
                                slidesToShow: 4,
                            },
                        },
                        {
                            breakpoint: 999,
                            settings: {
                                slidesToShow: 3,
                            },
                        },
                        {
                            breakpoint: 490,
                            settings: {
                                slidesToShow: 2,
                            },
                        },
                    ],
                });
            }
            if ($(".blogs-slider").length) {
                $(".blogs-slider").slick({
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    autoplaySpeed: 3000,
                    speed: 900,
                    infinite: true,
                    autoplay: false,
                    centerMode: false,
                    dots: true,
                    draggable: true,
                    arrows: false,
                    lazyLoad: "progressive",
                    responsive: [
                        {
                            breakpoint: 992,
                            settings: {
                                slidesToShow: 2,
                            },
                        },
                        {
                            breakpoint: 767,
                            settings: {
                                slidesToShow: 1,
                            },
                        },
                    ],
                });
            }
            if ($(".testimonial-slider").length) {
                $(".testimonial-slider").slick({
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    autoplaySpeed: 3000,
                    speed: 900,
                    infinite: true,
                    autoplay: true,
                    centerMode: false,
                    dots: true,
                    draggable: true,
                    arrows: true,
                    lazyLoad: "progressive",
                    responsive: [
                        {
                            breakpoint: 767,
                            settings: {
                                slidesToShow: 1,
                            },
                        },
                    ],
                });
            }
            if ($(".testimonial-slider-2").length) {
                $(".testimonial-slider-2").slick({
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    autoplaySpeed: 3000,
                    speed: 900,
                    infinite: true,
                    autoplay: true,
                    centerMode: false,
                    dots: true,
                    draggable: true,
                    arrows: true,
                    lazyLoad: "progressive",
                    responsive: [
                        {
                            breakpoint: 992,
                            settings: {
                                slidesToShow: 2,
                            },
                        },
                        {
                            breakpoint: 575,
                            settings: {
                                slidesToShow: 1,
                            },
                        },
                    ],
                });
            }
            $(".btn-prev").click(function () {
                var $this = $(this).attr("data-slide");
                $("." + $this).slick("slickPrev");
            });
            $(".btn-next").click(function () {
                var $this = $(this).attr("data-slide");
                $("." + $this).slick("slickNext");
            });

            jQuery(document).ready(function ($) {
                var timelines = $(".cd-horizontal-timeline"),
                    eventsMinDistance = 96;

                timelines.length > 0 && initTimeline(timelines);

                function initTimeline(timelines) {
                    timelines.each(function () {
                        var timeline = $(this),
                            timelineComponents = {};

                        // Cache elements
                        timelineComponents["timelineWrapper"] = timeline.find(".events-wrapper");
                        timelineComponents["eventsWrapper"] = timelineComponents["timelineWrapper"].children(".events");
                        timelineComponents["fillingLine"] =
                            timelineComponents["eventsWrapper"].children(".filling-line");
                        timelineComponents["timelineEvents"] = timelineComponents["eventsWrapper"].find("a");
                        timelineComponents["timelineDates"] = parseDate(timelineComponents["timelineEvents"]);
                        timelineComponents["eventsMinLapse"] = minLapse(timelineComponents["timelineDates"]);
                        timelineComponents["timelineNavigation"] = timeline.find(".cd-timeline-navigation");
                        timelineComponents["eventsContent"] = timeline.children(".events-content");

                        // Set event positions and timeline width
                        setDatePosition(timelineComponents, eventsMinDistance);
                        var timelineTotWidth = setTimelineWidth(timelineComponents, eventsMinDistance);

                        // Show timeline
                        timeline.addClass("loaded");

                        // ✅ Only show next content on arrow click (no scroll)
                        timelineComponents["timelineNavigation"].on("click", ".next", function (event) {
                            event.preventDefault();
                            showNewContent(timelineComponents, timelineTotWidth, "next");
                        });

                        timelineComponents["timelineNavigation"].on("click", ".prev", function (event) {
                            event.preventDefault();
                            showNewContent(timelineComponents, timelineTotWidth, "prev");
                        });

                        // Timeline dot click
                        timelineComponents["eventsWrapper"].on("click", "a", function (event) {
                            event.preventDefault();
                            timelineComponents["timelineEvents"].removeClass("selected");
                            $(this).addClass("selected");
                            updateOlderEvents($(this));
                            updateFilling($(this), timelineComponents["fillingLine"], timelineTotWidth);
                            updateVisibleContent($(this), timelineComponents["eventsContent"]);
                        });

                        // Mobile swipe
                        timelineComponents["eventsContent"].on("swipeleft", function () {
                            var mq = checkMQ();
                            mq == "mobile" && showNewContent(timelineComponents, timelineTotWidth, "next");
                        });
                        timelineComponents["eventsContent"].on("swiperight", function () {
                            var mq = checkMQ();
                            mq == "mobile" && showNewContent(timelineComponents, timelineTotWidth, "prev");
                        });
                    });
                }

                function showNewContent(timelineComponents, timelineTotWidth, direction) {
                    var visibleContent = timelineComponents["eventsContent"].find(".selected"),
                        newContent = direction === "next" ? visibleContent.next() : visibleContent.prev();

                    if (newContent.length > 0) {
                        var selectedDate = timelineComponents["eventsWrapper"].find(".selected"),
                            newEvent =
                                direction === "next"
                                    ? selectedDate.parent("li").next("li").children("a")
                                    : selectedDate.parent("li").prev("li").children("a");

                        updateFilling(newEvent, timelineComponents["fillingLine"], timelineTotWidth);
                        updateVisibleContent(newEvent, timelineComponents["eventsContent"]);
                        newEvent.addClass("selected");
                        selectedDate.removeClass("selected");
                        updateOlderEvents(newEvent);
                    }
                }

                function setDatePosition(timelineComponents, min) {
                    for (let i = 0; i < timelineComponents["timelineDates"].length; i++) {
                        var distance = daydiff(
                                timelineComponents["timelineDates"][0],
                                timelineComponents["timelineDates"][i],
                            ),
                            distanceNorm = Math.round(distance / timelineComponents["eventsMinLapse"]) + 2;
                        timelineComponents["timelineEvents"].eq(i).css("left", distanceNorm * min + "px");
                    }
                }

                function setTimelineWidth(timelineComponents, width) {
                    var timeSpan = daydiff(
                            timelineComponents["timelineDates"][0],
                            timelineComponents["timelineDates"][timelineComponents["timelineDates"].length - 1],
                        ),
                        timeSpanNorm = Math.round(timeSpan / timelineComponents["eventsMinLapse"]) + 4,
                        totalWidth = timeSpanNorm * width;

                    timelineComponents["eventsWrapper"].css("width", totalWidth + "px");
                    updateFilling(
                        timelineComponents["timelineEvents"].eq(0),
                        timelineComponents["fillingLine"],
                        totalWidth,
                    );

                    return totalWidth;
                }

                function updateFilling(selectedEvent, filling, totWidth) {
                    var eventStyle = window.getComputedStyle(selectedEvent.get(0), null),
                        eventLeft = eventStyle.getPropertyValue("left"),
                        eventWidth = eventStyle.getPropertyValue("width");

                    eventLeft = Number(eventLeft.replace("px", "")) + Number(eventWidth.replace("px", "")) / 2;
                    var scaleValue = eventLeft / totWidth;
                    setTransformValue(filling.get(0), "scaleX", scaleValue);
                }

                function updateVisibleContent(event, eventsContent) {
                    var eventDate = event.data("date"),
                        visibleContent = eventsContent.find(".selected"),
                        selectedContent = eventsContent.find('[data-date="' + eventDate + '"]'),
                        selectedContentHeight = selectedContent.height();

                    var classEnetering =
                        selectedContent.index() > visibleContent.index()
                            ? "selected enter-right"
                            : "selected enter-left";
                    var classLeaving = selectedContent.index() > visibleContent.index() ? "leave-left" : "leave-right";

                    selectedContent.attr("class", classEnetering);
                    visibleContent
                        .attr("class", classLeaving)
                        .one("webkitAnimationEnd oanimationend msAnimationEnd animationend", function () {
                            visibleContent.removeClass("leave-right leave-left");
                            selectedContent.removeClass("enter-left enter-right");
                        });

                    eventsContent.css("height", selectedContentHeight + "px");
                }

                function updateOlderEvents(event) {
                    event.parent("li").prevAll("li").children("a").addClass("older-event");
                    event.parent("li").nextAll("li").children("a").removeClass("older-event");
                }

                function setTransformValue(element, property, value) {
                    element.style["-webkit-transform"] = property + "(" + value + ")";
                    element.style["-moz-transform"] = property + "(" + value + ")";
                    element.style["-ms-transform"] = property + "(" + value + ")";
                    element.style["-o-transform"] = property + "(" + value + ")";
                    element.style["transform"] = property + "(" + value + ")";
                }

                function parseDate(events) {
                    var dateArrays = [];
                    events.each(function () {
                        var dateComp = $(this).data("date").split("/"),
                            newDate = new Date(dateComp[2], dateComp[1] - 1, dateComp[0]);
                        dateArrays.push(newDate);
                    });
                    return dateArrays;
                }

                function daydiff(first, second) {
                    return Math.round(second - first);
                }

                function minLapse(dates) {
                    var dateDistances = [];
                    for (let i = 1; i < dates.length; i++) {
                        var distance = daydiff(dates[i - 1], dates[i]);
                        dateDistances.push(distance);
                    }
                    return Math.min.apply(null, dateDistances);
                }

                function checkMQ() {
                    return window
                        .getComputedStyle(document.querySelector(".cd-horizontal-timeline"), "::before")
                        .getPropertyValue("content")
                        .replace(/'/g, "")
                        .replace(/"/g, "");
                }
            });
        },
        wow: function () {
            if ($(".wow").length) {
                var wow = new WOW({
                    boxClass: "wow",
                    animateClass: "animated",
                    mobile: !0,
                    live: !0,
                });
                wow.init();
            }
        },
        twentytwenty: function () {
            $(function () {
                $("#before_after").twentytwenty({
                    default_offset_pct: 0.7, // How much of the before image is visible when the page loads
                    before_label: "January 2017", // Set a custom before label
                    after_label: "March 2017", // Set a custom after label
                    no_overlay: true, //Do not show the overlay with before and after
                    move_slider_on_hover: false, // Move slider on mouse hover?
                    move_with_handle_only: true, // Allow a user to swipe anywhere on the image to control slider movement.
                    click_to_move: false, // Allow a user to click (or tap) anywhere on the image to move the slider to that location.
                });
                $("#before_after2").twentytwenty({
                    default_offset_pct: 0.7, // How much of the before image is visible when the page loads
                    before_label: "January 2017", // Set a custom before label
                    after_label: "March 2017", // Set a custom after label
                    no_overlay: true, //Do not show the overlay with before and after
                    move_slider_on_hover: false, // Move slider on mouse hover?
                    move_with_handle_only: true, // Allow a user to swipe anywhere on the image to control slider movement.
                    click_to_move: false, // Allow a user to click (or tap) anywhere on the image to move the slider to that location.
                });
            });
        },
        magnifying: function () {
            if ($(".video-popup").length) {
                $(".video-popup").magnificPopup({
                    type: "iframe",
                    mainClass: "mfp-fade",
                    removalDelay: 160,
                    preloader: true,
                    fixedContentPos: false,
                });
            }
            $(".video-popup").magnificPopup({
                type: "iframe",
                iframe: {
                    patterns: {
                        youtube: {
                            index: "youtube.com/",
                            id: function (url) {
                                var match = url.match(/[?&]v=([^?&]+)/);
                                if (!match) {
                                    match = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
                                }
                                return match && match[1] ? match[1] : null;
                            },
                            src: "https://www.youtube.com/embed/%id%?autoplay=1",
                        },
                    },
                },
            });
            $("#playBtn").on("click", function () {
                $("#myVideo")[0].play();
                $(this).hide();
            });
        },
        achivementCountdown: function () {
            var section = $(".counter-section");
            if (section.length === 0) return;

            var hasEntered = false;

            var checkAndAnimate = function () {
                var shouldAnimate = $(window).scrollTop() + $(window).height() >= section.offset().top;

                if (shouldAnimate && !hasEntered) {
                    hasEntered = true;
                    // Trigger the counter animation
                    if (typeof this.counterActivate === "function") {
                        this.counterActivate();
                    }
                }
            }.bind(this);

            // Run on load in case the section is already in view
            checkAndAnimate();

            // Run on scroll
            $(window).on("scroll", checkAndAnimate);
        },
        counterActivate: function () {
            $(".counter-count .count").each(function () {
                var $this = $(this);
                $this.prop("Counter", 0).animate(
                    {
                        Counter: $this.text(),
                    },
                    {
                        duration: 4600,
                        easing: "swing",
                        step: function (now) {
                            $this.text(Math.ceil(now));
                        },
                    },
                );
            });
        },
        timepicker: function () {
            if ($(".timepicker").length) {
                $(".timepicker").timepicker({
                    timeFormat: "h:mm p",
                    interval: 60,
                    minTime: "10:00am",
                    maxTime: "6:00pm",
                    defaultTime: "11:00am",
                    startTime: "10:00am",
                    dynamic: false,
                    dropdown: true,
                    scrollbar: false,
                });
            }
        },
        checkBoxes: function () {
            $(".cusbtn").each(function (index) {
                const uniqueId = "goo-" + index;
                $(this).find('filter[id="goo"]').attr("id", uniqueId);
                $(this)
                    .find('[filter="url(#goo)"]')
                    .attr("filter", "url(#" + uniqueId + ")");
                $(this)
                    .find('[style*="url(#goo)"]')
                    .each(function () {
                        let updatedStyle = $(this).attr("style").replace("url(#goo)", `url(#${uniqueId})`);
                        $(this).attr("style", updatedStyle);
                    });
            });

            $(".sub-checkboxes").hide();
            $(".arrow-block").click(function () {
                var subCheckboxes = $(this).next(".sub-checkboxes");
                var chevronIcon = $(this).find("i");
                subCheckboxes.slideToggle("fast");
                chevronIcon.toggleClass("fa-chevron-down fa-chevron-up");
            });
            $(".check-block, .sub-check-box").click(function (event) {
                event.stopPropagation();
            });

            if ($(".customer-container").length) {
                $(".signin-button").click(function () {
                    $(".sign-form").slideToggle();
                });
            }
            if ($(".toggle-sidebar").length) {
                $(".blog-filter").on("click", function () {
                    $(".toggle-sidebar").animate(
                        {
                            left: "0",
                        },
                        300,
                    );
                    $(".shop-sidebar-overlay").fadeIn(300);
                    $("body").addClass("no-scroll"); // Disable scroll
                });

                $(".shop-sidebar-overlay").on("click", function () {
                    $(".toggle-sidebar").animate(
                        {
                            left: "-800px",
                        },
                        300,
                    );
                    $(this).fadeOut(300);
                    $("body").removeClass("no-scroll"); // Enable scroll
                });
            }
        },
        dropdown: function () {
            $(document).ready(function () {
                $(".wrapper-dropdown").each(function () {
                    let $dropdown = $(this);
                    let $arrow = $dropdown.find("svg");
                    let $options = $dropdown.find(".topbar-dropdown");
                    let $display = $dropdown.find(".selected-display");

                    $dropdown.on("click", function (event) {
                        event.stopPropagation();
                        $(".wrapper-dropdown").not($dropdown).removeClass("active");
                        $(".wrapper-dropdown svg").not($arrow).removeClass("rotated");

                        $dropdown.toggleClass("active");
                        $arrow.toggleClass("rotated");
                    });

                    $options.find("li").on("click", function (event) {
                        event.stopPropagation();
                        $display.text($(this).text());
                        closeAllDropdowns();
                    });
                });

                $(document).on("click", function () {
                    closeAllDropdowns();
                });

                function closeAllDropdowns() {
                    $(".wrapper-dropdown").removeClass("active");
                    $(".wrapper-dropdown svg").removeClass("rotated");
                }
            });

            if ($(".category-block").length) {
                $(".category-block .title").on("click", function (e) {
                    var count = $(this).data("count");
                    if ($(".category-block.box-" + count + " .content-block").is(":visible")) {
                        $(".category-block.box-" + count + " span i").removeClass("fa-chevron-up");
                        $(".category-block.box-" + count + " span i").addClass("fa-chevron-down");
                        $(".category-block.box-" + count + " .content-block").hide("slow");
                    } else {
                        $(".category-block.box-" + count + " span i").removeClass("fa-chevron-down");
                        $(".category-block.box-" + count + " span i").addClass("fa-chevron-up");
                        $(".category-block.box-" + count + " .content-block").show("slow");
                    }
                });
            }
        },
        formValidation: function () {
            if ($(".contact-form").length) {
                $(".contact-form").validate();
            }
            if ($(".login-form").length) {
                $(".login-form").validate();
            }
        },
        contactForm: function () {
            $(".contact-form").on("submit", function (e) {
                e.preventDefault();
                if ($(".contact-form").valid()) {
                    var _self = $(this);
                    _self.closest("div").find('button[type="submit"]').attr("disabled", "disabled");
                    var data = $(this).serialize();
                    $.ajax({
                        url: "https://websitemakerz.com/mail/contact.php",
                        type: "post",
                        dataType: "json",
                        data: data,
                        success: function (data) {
                            $(".contact-form").trigger("reset");
                            _self.find('button[type="submit"]').removeAttr("disabled");
                            if (data.success) {
                                document.getElementById("alert-message").innerHTML =
                                    "<h5 class='color-sec mt-16 mb-16'>Email Sent Successfully</h5>";
                            } else {
                                document.getElementById("alert-message").innerHTML =
                                    "<h5 class='color-sec mt-16 mb-16'>There is an error</h5>";
                            }
                            $("#messages").show("slow");
                            $("#messages").slideDown("slow");
                            setTimeout(function () {
                                $("#messages").slideUp("hide");
                                $("#messages").hide("slow");
                            }, 4000);
                        },
                    });
                } else {
                    return !1;
                }
            });
        },
    };
    Init.i();
})(window, document, jQuery);
