module.exports = [
"[project]/src/app/opengraph-image--metadata.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$opengraph$2d$image$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/opengraph-image.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$lib$2f$metadata$2f$get$2d$metadata$2d$route$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/lib/metadata/get-metadata-route.js [app-rsc] (ecmascript)");
;
;
const imageModule = {
    alt: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$opengraph$2d$image$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["alt"],
    contentType: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$opengraph$2d$image$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["contentType"],
    size: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$opengraph$2d$image$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["size"]
};
async function __TURBOPACK__default__export__(props) {
    const { __metadata_id__: _, ...params } = await props.params;
    const imageUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$lib$2f$metadata$2f$get$2d$metadata$2d$route$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fillMetadataSegment"])("/", params, "opengraph-image", false);
    function getImageMetadata(imageMetadata, idParam) {
        const data = {
            alt: imageMetadata.alt,
            type: imageMetadata.contentType || 'image/png',
            url: imageUrl + (idParam ? '/' + idParam : '') + '?' + "0579ef345637c81d"
        };
        const { size } = imageMetadata;
        if (size) {
            data.width = size.width;
            data.height = size.height;
        }
        return data;
    }
    return [
        getImageMetadata(imageModule, '')
    ];
}
}),
"[project]/src/app/opengraph-image--metadata.js [app-rsc] (ecmascript, Next.js Server Component)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/opengraph-image--metadata.js [app-rsc] (ecmascript)"));
}),
"[project]/src/app/opengraph-image.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "alt",
    ()=>alt,
    "contentType",
    ()=>contentType,
    "default",
    ()=>Image,
    "size",
    ()=>size
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$og$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/og.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$content$2f$site$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/content/site.ts [app-rsc] (ecmascript)");
;
;
;
const alt = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$content$2f$site$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["site"].name} — ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$content$2f$site$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["site"].tagline}`;
const size = {
    width: 1200,
    height: 630
};
const contentType = "image/png";
async function Image() {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$og$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ImageResponse"](/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: "#0b0a08",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "80px"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: 64,
                    fontWeight: 700,
                    color: "#f5f2ea",
                    lineHeight: 1.2,
                    marginBottom: "24px"
                },
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$content$2f$site$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["site"].name
            }, void 0, false, {
                fileName: "[project]/src/app/opengraph-image.tsx",
                lineNumber: 26,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: "120px",
                    height: "4px",
                    background: "#ff6b1a",
                    marginBottom: "24px"
                }
            }, void 0, false, {
                fileName: "[project]/src/app/opengraph-image.tsx",
                lineNumber: 37,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: 32,
                    color: "#a8a196",
                    lineHeight: 1.4
                },
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$content$2f$site$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["site"].tagline
            }, void 0, false, {
                fileName: "[project]/src/app/opengraph-image.tsx",
                lineNumber: 45,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/opengraph-image.tsx",
        lineNumber: 15,
        columnNumber: 7
    }, this), {
        ...size
    });
}
}),
"[project]/src/content/site.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Single source of truth for site copy and structured content.
 * Components read from here. Keep prose changes in this file, not in JSX.
 *
 * Anything marked PLACEHOLDER is invented scaffolding and must be replaced
 * with real, verifiable content before launch — see BLUEPRINT.md, Phase 6
 * (content & launch audit). Do not publish fabricated stats or testimonials.
 */ __turbopack_context__.s([
    "founders",
    ()=>founders,
    "nav",
    ()=>nav,
    "services",
    ()=>services,
    "site",
    ()=>site,
    "stats",
    ()=>stats,
    "testimonials",
    ()=>testimonials,
    "work",
    ()=>work
]);
const site = {
    name: "CyberMercenaries",
    tagline: "We build the infrastructure attackers hope you never test.",
    subline: "Web design, full-stack development and offensive security — from two people who read systems for a living.",
    location: {
        city: "Agartala",
        state: "Tripura",
        country: "India",
        // Agartala coordinates — used for the footer geo-tag, not a generic label.
        lat: "23.8315° N",
        lng: "91.2868° E"
    },
    contact: {
        email: "cybermercenaries200@gmail.com",
        whatsapp: "919084472401",
        whatsappDisplay: "+91 90844 72401"
    }
};
const nav = [
    {
        label: "Services",
        href: "#services"
    },
    {
        label: "Pricing",
        href: "#pricing"
    },
    {
        label: "Work",
        href: "#work"
    },
    {
        label: "About",
        href: "#about"
    },
    {
        label: "Contact",
        href: "#contact"
    }
];
const founders = [
    {
        name: "Mohit Kumar Yadav",
        role: "Web Design & Brand Identity",
        // PLACEHOLDER bio — replace with Mohit's own words.
        bio: "Designs the interfaces and identities clients actually remember, then hands off assets that don't fall apart in development."
    },
    {
        name: "Pratyay Mukherjee",
        role: "Full-Stack Development, Cybersecurity & Penetration Testing",
        // PLACEHOLDER bio — replace with real wording before launch.
        bio: "Builds the application and the infrastructure under it, then attacks both before a stranger gets the chance to."
    }
];
const services = [
    {
        key: "web-design",
        name: "Web Design",
        tagline: "Interfaces people trust on sight, built on a system that scales past page one."
    },
    {
        key: "full-stack-dev",
        name: "Full-Stack Web Development",
        tagline: "Modern stacks, clean architecture, deploy-ready — not just demo-ready."
    },
    {
        key: "migration-vps",
        name: "Migration, VPS & Server Management",
        tagline: "Zero-downtime moves, hardened Linux boxes, and someone who answers at 2am."
    },
    {
        key: "cybersecurity-consultancy",
        name: "Cybersecurity Consultancy",
        tagline: "Risk assessment and architecture review before an incident forces the conversation."
    },
    {
        key: "penetration-testing",
        name: "Penetration Testing & Ethical Hacking",
        tagline: "Authorized attacks that find what a scanner won't, with a report someone can act on."
    }
];
const testimonials = [];
const stats = [
    {
        value: "2",
        label: "Full-stack projects shipped"
    },
    {
        value: "2026",
        label: "Studio est."
    },
    {
        value: "24/7",
        label: "Server & incident response"
    }
];
const work = [
    {
        slug: "whycrime",
        title: "WhyCrime",
        tags: [
            "Full-stack build",
            "Penetration testing"
        ],
        description: "Crime-news and forensic-academy platform, built from scratch to deployment and later security-reviewed."
    },
    {
        slug: "forensic-fusion",
        title: "Forensic Fusion",
        tags: [
            "Full-stack build",
            "Cybersecurity consultancy"
        ],
        description: "Marketing site and e-learning platform for a forensic science training company, with certificate verification."
    }
];
}),
];

//# sourceMappingURL=src_0ebkpmi._.js.map