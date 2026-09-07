(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/nav.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Nav",
    ()=>Nav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.mjs [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$content$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/content/site.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function Nav() {
    _s();
    const [scrolled, setScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Nav.useEffect": ()=>{
            const onScroll = {
                "Nav.useEffect.onScroll": ()=>setScrolled(window.scrollY > 40)
            }["Nav.useEffect.onScroll"];
            onScroll();
            window.addEventListener("scroll", onScroll, {
                passive: true
            });
            return ({
                "Nav.useEffect": ()=>window.removeEventListener("scroll", onScroll)
            })["Nav.useEffect"];
        }
    }["Nav.useEffect"], []);
    // Lock body scroll while the mobile overlay is open.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Nav.useEffect": ()=>{
            document.body.style.overflow = open ? "hidden" : "";
            return ({
                "Nav.useEffect": ()=>{
                    document.body.style.overflow = "";
                }
            })["Nav.useEffect"];
        }
    }["Nav.useEffect"], [
        open
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("sticky top-0 z-50 h-[var(--nav-height)] transition-colors duration-300", scrolled ? "border-b border-line bg-void/80 backdrop-blur" : "bg-void"),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto flex h-full max-w-[var(--container-max)] items-center justify-between px-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "font-mono text-base font-medium tracking-tight text-ink",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$content$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["site"].name
                    }, void 0, false, {
                        fileName: "[project]/src/components/nav.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "hidden items-center gap-8 md:flex",
                        "aria-label": "Primary",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$content$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nav"].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: item.href,
                                className: "text-sm text-ink-dim transition-colors hover:text-ink",
                                children: item.label
                            }, item.href, false, {
                                fileName: "[project]/src/components/nav.tsx",
                                lineNumber: 50,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/nav.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setOpen((v)=>!v),
                        className: "flex h-10 w-10 items-center justify-center text-ink-dim transition-colors hover:text-ink md:hidden",
                        "aria-label": open ? "Close menu" : "Open menu",
                        "aria-expanded": open,
                        children: open ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            className: "h-5 w-5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/nav.tsx",
                            lineNumber: 67,
                            columnNumber: 19
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                            className: "h-5 w-5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/nav.tsx",
                            lineNumber: 67,
                            columnNumber: 47
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/nav.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/nav.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            open ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 top-[var(--nav-height)] z-40 bg-void md:hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: "flex flex-col gap-2 px-6 py-8",
                    "aria-label": "Mobile",
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$content$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nav"].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: item.href,
                            onClick: ()=>setOpen(false),
                            className: "border-b border-line py-4 text-lg text-ink-dim transition-colors hover:text-ink",
                            children: item.label
                        }, item.href, false, {
                            fileName: "[project]/src/components/nav.tsx",
                            lineNumber: 78,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/nav.tsx",
                    lineNumber: 73,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/nav.tsx",
                lineNumber: 72,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/nav.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
_s(Nav, "eMpPTtqqZxSNagOpvvzDYb1NomM=");
_c = Nav;
var _c;
__turbopack_context__.k.register(_c, "Nav");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/content/site.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_14pp5i-._.js.map