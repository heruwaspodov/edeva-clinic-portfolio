(function () {
    "use strict";

    var componentSlots = Array.from(document.querySelectorAll("[data-component]"));

    Promise.all(
        componentSlots.map(function (slot) {
            var componentName = slot.dataset.component;

            return fetch("/components/" + componentName + ".html")
                .then(function (response) {
                    if (!response.ok) {
                        throw new Error("Unable to load component: " + componentName);
                    }

                    return response.text();
                })
                .then(function (markup) {
                    slot.outerHTML = markup;
                });
        }),
    )
        .then(function () {
            if (!document.querySelector("[data-service-list], [data-service-detail]")) {
                return;
            }

            return new Promise(function (resolve, reject) {
                var servicesScript = document.createElement("script");
                servicesScript.src = "/assets/js/services.js";
                servicesScript.onload = function () {
                    window.EdevaServices.init().then(resolve, reject);
                };
                servicesScript.onerror = function () {
                    document.querySelectorAll("[data-service-list], [data-service-detail]").forEach(function (target) {
                        target.textContent = "Layanan belum dapat dimuat. Silakan coba lagi.";
                    });
                    resolve();
                };
                document.body.appendChild(servicesScript);
            });
        })
        .then(function () {
            if (!document.querySelector("[data-product-list]")) {
                return;
            }

            return new Promise(function (resolve, reject) {
                var productsScript = document.createElement("script");
                productsScript.src = "/assets/js/products.js";
                productsScript.onload = function () {
                    window.EdevaProducts.init().then(resolve, reject);
                };
                productsScript.onerror = function () {
                    document.querySelectorAll("[data-product-list]").forEach(function (target) {
                        target.textContent = "Produk belum dapat dimuat. Silakan coba lagi.";
                    });
                    resolve();
                };
                document.body.appendChild(productsScript);
            });
        })
        .then(function () {
            var appScript = document.createElement("script");
            appScript.src = "/assets/js/app.js";
            document.body.appendChild(appScript);
        })
        .catch(function (error) {
            console.error(error);
        });
})();
