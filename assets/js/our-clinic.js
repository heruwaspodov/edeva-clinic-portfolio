(function () {
    "use strict";

    function escapeHtml(value) {
        return String(value).replace(/[&<>"']/g, function (character) {
            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
            }[character];
        });
    }

    function tagLabel(tag) {
        return tag
            .split("-")
            .map(function (word) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join(" ");
    }

    function imageMarkup(item) {
        var imagePath = item.image.replace(/^\/+/, "");
        return (
            '<img src="/' +
            escapeHtml(imagePath) +
            '" alt="' +
            escapeHtml(tagLabel(item.tag)) +
            ' at Edeva Clinic" loading="lazy" decoding="async" data-clinic-image />'
        );
    }

    function clinicItem(item, marginClass) {
        return (
            '<div class="portfolio-item' +
            (marginClass ? " " + marginClass : "") +
            '">' +
            imageMarkup(item) +
            '<div class="content bg-primary ui-p-30">' +
            '<h6 class="white ui-mb-10">' +
            escapeHtml(tagLabel(item.tag)) +
            '</h6><h4 class="white">Edeva Clinic</h4></div></div>'
        );
    }

    function homeMarkup(items) {
        return (
            '<div class="row align-items-end row-gap-30">' +
            '<div class="col-lg-4 col-md-6 col-12"><div class="heading ui-mb-40">' +
            '<p class="eyebrow ui-mb-10">Our Clinic</p><h2 class="ui-mb-16">Explore our looks</h2>' +
            '<p class="ui-mb-35">Step into a thoughtfully designed clinic where expert care meets advanced technology. From comfortable treatment rooms to carefully selected equipment, every detail supports safe, effective, and personalized skin care.</p>' +
            '<a href="our-clinic" class="cus-btn mx-auto"><img src="assets/media/icons/circle-arrow.svg" alt="arrow" class="arr-2" />' +
            '<span class="text">Our Clinic</span><span class="circle"></span>' +
            '<img src="assets/media/icons/circle-arrow.svg" alt="arrow" class="arr-1" /></a></div>' +
            clinicItem(items[0]) +
            '</div><div class="col-lg-4 col-md-6 col-12">' +
            clinicItem(items[1], "ui-mb-30") +
            clinicItem(items[2]) +
            '</div><div class="col-lg-4 col-12"><div class="row"><div class="col-lg-12 col-md-6">' +
            clinicItem(items[3], "ui-mb-30") +
            '</div><div class="col-lg-12 col-md-6">' +
            clinicItem(items[4]) +
            "</div></div></div></div>"
        );
    }

    function galleryMarkup(items) {
        return items
            .map(function (item) {
                return (
                    '<div class="col-lg-4 col-md-6 col-12"><div class="portfolio-item clinic-gallery-item">' +
                    imageMarkup(item) +
                    '<div class="content bg-primary ui-p-30"><h6 class="white ui-mb-10">' +
                    escapeHtml(tagLabel(item.tag)) +
                    '</h6><h4 class="white">Edeva Clinic</h4></div></div></div>'
                );
            })
            .join("");
    }

    function addFallbacks(container) {
        container.querySelectorAll("[data-clinic-image]").forEach(function (image) {
            image.addEventListener("error", function () {
                if (image.dataset.fallbackApplied) return;
                image.dataset.fallbackApplied = "true";
                image.src = image.src.replace(/\.webp$/i, ".jpg");
            });
        });
    }

    function renderHome(clinics) {
        var homeItems = clinics.filter(function (item) {
            return item.is_show_at_home === true;
        });
        if (homeItems.length < 5) throw new Error("Five home clinic images are required");

        document.querySelectorAll("[data-clinic-home-list]").forEach(function (container) {
            container.innerHTML = homeMarkup(homeItems.slice(0, 5));
            addFallbacks(container);
        });
    }

    function renderClinicPage(clinics) {
        document.querySelectorAll("[data-clinic-list]").forEach(function (container) {
            var tags = Array.from(
                new Set(
                    clinics.map(function (item) {
                        return item.tag;
                    }),
                ),
            );
            var filterButtons =
                '<button class="nav-link active" type="button" data-clinic-filter="all" aria-pressed="true">All</button>' +
                tags
                    .map(function (tag) {
                        return (
                            '<button class="nav-link" type="button" data-clinic-filter="' +
                            escapeHtml(tag) +
                            '" aria-pressed="false">' +
                            escapeHtml(tagLabel(tag)) +
                            "</button>"
                        );
                    })
                    .join("");

            container.innerHTML =
                '<div class="nav nav-tabs" role="tablist" aria-label="Filter galeri klinik">' +
                filterButtons +
                '</div><div class="row row-gap-30" data-clinic-gallery></div>';

            var gallery = container.querySelector("[data-clinic-gallery]");
            function updateGallery(tag) {
                var visibleItems = tag === "all" ? clinics : clinics.filter(function (item) {
                    return item.tag === tag;
                });
                gallery.innerHTML = galleryMarkup(visibleItems);
                addFallbacks(gallery);
                container.querySelectorAll("[data-clinic-filter]").forEach(function (button) {
                    var active = button.dataset.clinicFilter === tag;
                    button.classList.toggle("active", active);
                    button.setAttribute("aria-pressed", String(active));
                });
            }

            container.addEventListener("click", function (event) {
                var button = event.target.closest("[data-clinic-filter]");
                if (!button || !container.contains(button)) return;
                updateGallery(button.dataset.clinicFilter);
            });
            updateGallery("all");
        });
    }

    function showLoadError() {
        document.querySelectorAll("[data-clinic-home-list], [data-clinic-list]").forEach(function (container) {
            container.textContent = "Galeri klinik belum dapat dimuat. Silakan coba lagi.";
        });
    }

    window.EdevaClinic = {
        init: function () {
            return fetch("/assets/data/our-clinic.json")
                .then(function (response) {
                    if (!response.ok) throw new Error("Unable to load our-clinic.json");
                    return response.json();
                })
                .then(function (clinics) {
                    if (!Array.isArray(clinics)) throw new Error("Invalid our-clinic.json");
                    var validClinics = clinics.filter(function (item) {
                        return item && typeof item.image === "string" && typeof item.tag === "string" && typeof item.is_show_at_home === "boolean";
                    });
                    if (validClinics.length !== clinics.length) throw new Error("Invalid clinic in our-clinic.json");
                    renderHome(validClinics);
                    renderClinicPage(validClinics);
                })
                .catch(function (error) {
                    console.error(error);
                    showLoadError();
                });
        },
    };
})();
