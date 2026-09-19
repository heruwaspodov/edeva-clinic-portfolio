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
            var appScript = document.createElement("script");
            appScript.src = "/assets/js/app.js";
            document.body.appendChild(appScript);
        })
        .catch(function (error) {
            console.error(error);
        });
})();
