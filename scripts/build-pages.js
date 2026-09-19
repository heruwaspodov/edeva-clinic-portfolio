"use strict";

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const output = path.join(root, "dist");
const siteUrl = "https://edeva-clinic.web.app";
const headTemplate = fs.readFileSync(path.join(root, "components", "head.html"), "utf8");

const pages = {
    "index.html": {
        title: "Klinik Edeva Tasikmalaya | Klinik Kecantikan & Perawatan Kulit",
        description:
            "Klinik Edeva adalah klinik kecantikan dan perawatan kulit di Tasikmalaya. Temukan treatment kecantikan dan perawatan kulit sesuai kebutuhan Anda.",
        includeSchema: true,
    },
    "services.html": {
        title: "Layanan Perawatan Kulit | Klinik Edeva Tasikmalaya",
        description: "Lihat layanan kecantikan dan perawatan kulit yang tersedia di Klinik Edeva Tasikmalaya.",
    },
    "service-detail.html": {
        title: "Detail Layanan Perawatan Kulit | Klinik Edeva Tasikmalaya",
        description: "Informasi layanan kecantikan dan perawatan kulit di Klinik Edeva Tasikmalaya.",
    },
    "portfolio.html": {
        title: "Galeri Perawatan | Klinik Edeva Tasikmalaya",
        description: "Lihat galeri layanan dan perawatan di Klinik Edeva Tasikmalaya.",
    },
    "appointment.html": {
        title: "Buat Janji | Klinik Edeva Tasikmalaya",
        description: "Buat janji untuk layanan kecantikan dan perawatan kulit di Klinik Edeva Tasikmalaya.",
    },
    "contact.html": {
        title: "Kontak dan Lokasi | Klinik Edeva Tasikmalaya",
        description:
            "Hubungi atau kunjungi Klinik Edeva di Tasikmalaya untuk informasi perawatan kulit dan kecantikan.",
    },
};

function escapeHtml(value) {
    return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function structuredData() {
    const clinic = {
        "@context": "https://schema.org",
        "@type": "MedicalClinic",
        name: "Klinik Pratama Edeva",
        alternateName: "Klinik Edeva",
        url: `${siteUrl}/`,
        hasMap: "https://maps.app.goo.gl/kpRPzHzyXc6zh7nU9",
        description: "Klinik kecantikan dan perawatan kulit di Tasikmalaya.",
        sameAs: [
            "https://www.instagram.com/klinik.edeva/?hl=en",
            "https://www.tiktok.com/@klinik.edeva",
            "https://shopee.co.id/unskinullinataskin",
        ],
        address: {
            "@type": "PostalAddress",
            streetAddress: "Jl. Tarumanagara No. 5",
            addressLocality: "Tasikmalaya",
            addressRegion: "Jawa Barat",
            postalCode: "46121",
            addressCountry: "ID",
        },
        areaServed: {
            "@type": "City",
            name: "Tasikmalaya",
        },
    };

    return `    <script type="application/ld+json">\n        ${JSON.stringify(clinic, null, 2).replace(/</g, "\\u003c")}\n    </script>`;
}

function renderHead(page, filename) {
    const canonicalUrl = filename === "index.html" ? `${siteUrl}/` : `${siteUrl}/${filename}`;
    const values = {
        title: escapeHtml(page.title),
        description: escapeHtml(page.description),
        canonicalUrl,
        structuredData: page.includeSchema ? structuredData() : "",
    };

    return headTemplate.replace(/{{(title|description|canonicalUrl|structuredData)}}/g, (_, key) => values[key]);
}

function buildPages() {
    const pageEntries = Object.entries(pages).filter(([filename]) => {
        if (fs.existsSync(path.join(root, filename))) {
            return true;
        }

        console.warn(`Skipping missing source page: ${filename}`);
        return false;
    });

    if (pageEntries.length === 0) {
        throw new Error("No source pages found to build.");
    }

    fs.rmSync(output, { recursive: true, force: true });
    fs.mkdirSync(output, { recursive: true });
    fs.cpSync(path.join(root, "assets"), path.join(output, "assets"), { recursive: true });
    fs.cpSync(path.join(root, "components"), path.join(output, "components"), { recursive: true });

    for (const [filename, page] of pageEntries) {
        const source = fs.readFileSync(path.join(root, filename), "utf8");
        const marker = "<!-- shared-head -->";

        if (!source.includes(marker)) {
            throw new Error(`Missing ${marker} in ${filename}`);
        }

        fs.writeFileSync(path.join(output, filename), source.replace(marker, renderHead(page, filename)));
    }

    console.log(`Built ${pageEntries.length} pages in dist/.`);
}

if (require.main === module) {
    buildPages();
}

module.exports = { buildPages, pages, renderHead };
