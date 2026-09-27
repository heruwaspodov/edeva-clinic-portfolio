(function () {
    "use strict";

    function showLoadError() {
        document.querySelectorAll("[data-product-list]").forEach(function (list) {
            list.textContent = "Produk belum dapat dimuat. Silakan coba lagi.";
        });
    }

    function renderProducts(products) {
        document.querySelectorAll("[data-product-list]").forEach(function (list) {
            var cards = document.createDocumentFragment();
            var slider = list.dataset.productList === "slider";

            products.forEach(function (product) {
                if (
                    !product ||
                    typeof product.name !== "string" ||
                    typeof product.image !== "string" ||
                    typeof product.description !== "string"
                ) {
                    throw new Error("Invalid product in products.json");
                }

                var column = document.createElement("div");
                column.className = slider ? "product-slide" : "col-lg-4 col-md-6 col-12";

                var card = document.createElement("div");
                card.className = "blog-card";

                var imageArea = document.createElement("div");
                imageArea.className = "card-img";

                var image = document.createElement("img");
                var imagePath = product.image.replace(/^\/+/, "");
                var fallbackPath = imagePath.replace(/\.webp$/i, ".png");
                image.src = "/" + imagePath;
                image.alt = "Produk " + product.name;
                image.width = 400;
                image.height = 320;
                image.loading = "lazy";
                image.decoding = "async";
                if (fallbackPath !== imagePath) {
                    image.addEventListener(
                        "error",
                        (function (imageElement, fallback) {
                            return function () {
                                if (imageElement.dataset.fallbackApplied) return;
                                imageElement.dataset.fallbackApplied = "true";
                                imageElement.src = "/" + fallback;
                            };
                        })(image, fallbackPath)
                    );
                }
                imageArea.appendChild(image);

                var content = document.createElement("div");
                content.className = "card-content";

                var title = document.createElement("h2");
                title.className = slider ? "h4 title" : "h4 title ui-mb-20";
                title.textContent = product.name;
                content.appendChild(title);

                if (!slider) {
                    var description = document.createElement("p");
                    description.className = "product-description";
                    description.textContent = product.description;
                    content.appendChild(description);
                }

                card.appendChild(imageArea);
                card.appendChild(content);
                column.appendChild(card);
                cards.appendChild(column);
            });

            list.replaceChildren(cards);
        });
    }

    window.EdevaProducts = {
        init: function () {
            return fetch("/assets/data/products.json")
                .then(function (response) {
                    if (!response.ok) throw new Error("Unable to load products.json");
                    return response.json();
                })
                .then(function (products) {
                    if (!Array.isArray(products)) throw new Error("Invalid products.json");
                    renderProducts(products);
                })
                .catch(function (error) {
                    console.error(error);
                    showLoadError();
                });
        },
    };
})();
