(function () {
    "use strict";

    var detailBase = "/service-detail.html?service=";
    var bookingUrl = "https://linktr.ee/dr.ulli?utm_source=website&utm_medium=social&utm_content=service_detail";
    var arrow =
        '<svg xmlns="http://www.w3.org/2000/svg" width="43" height="42" viewBox="0 0 43 42" fill="none" aria-hidden="true">' +
        '<path d="M15.4524 27.3347L27.455 15.3308M27.455 15.3308L17.3787 15.3308M27.455 15.3308L27.455 25.4071" ' +
        'stroke="#A96480" stroke-width="2.26987" stroke-linecap="round" stroke-linejoin="round"/></svg>';

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

    function detailUrl(service) {
        return detailBase + encodeURIComponent(service.slug);
    }

    function fallbackSource(source) {
        return source.replace(/\.webp$/i, ".jpg");
    }

    function addImageFallback(image) {
        image.addEventListener("error", function () {
            if (image.dataset.fallbackApplied) return;
            image.dataset.fallbackApplied = "true";
            image.src = image.src.replace(/\.webp$/i, ".jpg");
        });
    }

    function cardMarkup(service, mode) {
        var grid = mode === "grid";
        var content =
            '<img src="/' +
            escapeHtml(service.image) +
            '" alt="Ilustrasi layanan ' +
            escapeHtml(service.name) +
            '" loading="lazy" data-service-image />' +
            '<span class="overlay"></span>' +
            '<span class="content d-flex align-items-end ui-gap-20">' +
            '<span class="text-block"><span class="h4 white service-card-title' +
            (grid ? " ui-mb-10" : "") +
            '">' +
            escapeHtml(service.name) +
            "</span>" +
            (grid
                ? '<span class="white service-card-description">' + escapeHtml(service.description) + "</span>"
                : "") +
            '</span><span class="link-btn">' +
            arrow +
            "</span></span>";

        if (grid) {
            return (
                '<div class="col-xxl-3 col-xl-4 col-md-6">' +
                '<a class="service-card" href="' +
                detailUrl(service) +
                '" aria-label="Lihat detail ' +
                escapeHtml(service.name) +
                '">' +
                content +
                "</a></div>"
            );
        }

        return (
            '<div class="service-slide">' +
            '<a class="service-card" href="' +
            detailUrl(service) +
            '" aria-label="Lihat detail ' +
            escapeHtml(service.name) +
            '">' +
            content +
            "</a></div>"
        );
    }

    function renderLists(services) {
        document.querySelectorAll("[data-service-list]").forEach(function (container) {
            var mode = container.dataset.serviceList;
            container.innerHTML = services
                .map(function (service) {
                    return cardMarkup(service, mode);
                })
                .join("");
            container.querySelectorAll("[data-service-image]").forEach(addImageFallback);
        });
    }

    function setMetadata(service) {
        document.title = service.name + " | Edeva Clinic Tasikmalaya";
        var description = document.querySelector('meta[name="description"]');
        if (description) description.content = service.description;

        var canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) canonical.href = "https://edeva-clinic.web.app" + detailUrl(service);

        [
            ['meta[property="og:title"]', document.title],
            ['meta[property="og:description"]', service.description],
            ['meta[property="og:url"]', "https://edeva-clinic.web.app" + detailUrl(service)],
            ['meta[name="twitter:title"]', document.title],
            ['meta[name="twitter:description"]', service.description],
        ].forEach(function (entry) {
            var meta = document.querySelector(entry[0]);
            if (meta) meta.content = entry[1];
        });
    }

    function renderGallery(service, container, heroSource) {
        if (!Array.isArray(service.images)) return;

        Promise.all(
            service.images
                .filter(function (source) {
                    return source !== heroSource;
                })
                .map(function (source, index) {
                    return new Promise(function (resolve) {
                        var image = new Image();
                        var sources = [source, fallbackSource(source)];
                        var sourceIndex = 0;
                        image.alt = "Foto " + service.name + " " + (index + 1);
                        image.onload = function () {
                            resolve(image);
                        };
                        image.onerror = function () {
                            sourceIndex += 1;
                            if (sourceIndex < sources.length) {
                                image.src = "/" + sources[sourceIndex];
                                return;
                            }
                            resolve(null);
                        };
                        image.src = "/" + sources[sourceIndex];
                    });
                }),
        ).then(function (images) {
            images.forEach(function (image) {
                if (!image) return;
                var item = document.createElement("div");
                item.className = "service-detail-gallery-item";
                item.appendChild(image);
                container.appendChild(item);
            });
        });
    }

    function renderDetail(services) {
        var container = document.querySelector("[data-service-detail]");
        if (!container) return;

        var slug = new URLSearchParams(window.location.search).get("service");
        var index = services.findIndex(function (service) {
            return service.slug === slug;
        });
        var title = document.querySelector("[data-service-title]");
        var breadcrumb = document.querySelector("[data-service-breadcrumb]");

        if (index < 0) {
            var missing = slug ? "Layanan tidak ditemukan" : "Pilih layanan";
            title.textContent = missing;
            breadcrumb.textContent = missing;
            container.innerHTML =
                '<div class="text-center"><p class="ui-mb-30">' +
                (slug ? "Layanan yang Anda cari tidak tersedia." : "Pilih layanan untuk melihat detailnya.") +
                '</p><a class="cus-btn" href="/services">Lihat semua layanan</a></div>';
            document.title = missing + " | Edeva Clinic Tasikmalaya";
            return;
        }

        var service = services[index];
        title.textContent = service.name;
        breadcrumb.textContent = service.name;
        setMetadata(service);

        var related = services
            .map(function (item) {
                var current = item.slug === service.slug;
                return (
                    '<li><a href="' +
                    detailUrl(item) +
                    '"' +
                    (current ? ' aria-current="page"' : "") +
                    "><span>" +
                    escapeHtml(item.name) +
                    "</span>" +
                    arrow +
                    "</a></li>"
                );
            })
            .join("");

        container.innerHTML =
            '<div class="row row-gap-30">' +
            '<div class="col-lg-8"><div class="detail-content">' +
            '<img class="ui-mb-55 main-img service-detail-image" alt="Ilustrasi layanan ' +
            escapeHtml(service.name) +
            '" />' +
            '<h2 class="ui-mb-30">' +
            escapeHtml(service.name) +
            "</h2>" +
            '<p class="ui-mb-35">' +
            escapeHtml(service.description) +
            "</p>" +
            '<p class="ui-mb-35">' +
            escapeHtml(service.long_description) +
            "</p>" +
            '<div class="service-detail-gallery ui-mb-35" data-service-gallery></div>' +
            '<a class="cus-btn" href="' +
            bookingUrl +
            '" target="_blank" rel="noopener noreferrer">Konsultasi dan Booking</a>' +
            "</div></div>" +
            '<aside class="col-lg-4"><div class="service-related"><h3>Services</h3>' +
            '<ul class="unstyled service-related-list">' +
            related +
            "</ul></div></aside>" +
            "</div>";

        var mainImage = container.querySelector(".service-detail-image");
        var relatedPanel = container.querySelector(".service-related");
        var gallery = container.querySelector("[data-service-gallery]");
        var preferredSource = service.image.replace(/image-0\.webp$/, "image-1.webp");
        var heroCandidates = [];
        [preferredSource, service.image].forEach(function (source) {
            [source, fallbackSource(source)].forEach(function (url) {
                if (!heroCandidates.some(function (candidate) { return candidate.url === url; })) {
                    heroCandidates.push({ source: source, url: url });
                }
            });
        });
        var heroIndex = 0;
        function syncRelatedHeight() {
            relatedPanel.style.height = mainImage.getBoundingClientRect().height + "px";
        }
        function loadHero() {
            mainImage.src = "/" + heroCandidates[heroIndex].url;
        }
        syncRelatedHeight();
        if (typeof ResizeObserver !== "undefined") {
            new ResizeObserver(syncRelatedHeight).observe(mainImage);
        } else {
            window.addEventListener("resize", syncRelatedHeight);
        }
        mainImage.onload = function () {
            syncRelatedHeight();
            renderGallery(service, gallery, heroCandidates[heroIndex].source);
        };
        mainImage.onerror = function () {
            heroIndex += 1;
            if (heroIndex < heroCandidates.length) {
                loadHero();
            }
        };
        loadHero();
    }

    function showLoadError() {
        document.querySelectorAll("[data-service-list], [data-service-detail]").forEach(function (target) {
            target.textContent = "Layanan belum dapat dimuat. Silakan coba lagi.";
        });
    }

    window.EdevaServices = {
        init: function () {
            return fetch("/assets/data/services.json")
                .then(function (response) {
                    if (!response.ok) throw new Error("Unable to load services.json");
                    return response.json();
                })
                .then(function (services) {
                    if (!Array.isArray(services)) throw new Error("Invalid services.json");
                    renderLists(services);
                    renderDetail(services);
                })
                .catch(function (error) {
                    console.error(error);
                    showLoadError();
                });
        },
    };
})();
