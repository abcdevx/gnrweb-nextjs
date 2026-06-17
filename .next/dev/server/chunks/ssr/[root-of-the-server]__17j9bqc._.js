module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/lib/soundcheck.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * soundcheck.ts — Server-only API client for SoundCheck.
 *
 * All functions in this file run server-side only (Server Components or Route
 * Handlers). The API key is never sent to the browser.
 *
 * Environment variables required (set in .env.local):
 *   SOUNDCHECK_API_URL   — Base URL of the SoundCheck app (e.g. https://app.soundcheck.com)
 *   SOUNDCHECK_API_KEY   — API key generated in SoundCheck for this band
 */ __turbopack_context__.s([
    "getMembers",
    ()=>getMembers,
    "getShows",
    ()=>getShows
]);
const BASE_URL = process.env.SOUNDCHECK_API_URL?.replace(/\/$/, '');
const API_KEY = process.env.SOUNDCHECK_API_KEY;
function getHeaders() {
    return {
        'x-api-key': API_KEY ?? '',
        'Content-Type': 'application/json'
    };
}
function isConfigured() {
    return Boolean(BASE_URL && API_KEY);
}
async function getShows() {
    if (!isConfigured()) return [];
    const res = await fetch(`${BASE_URL}/api/public/shows`, {
        headers: getHeaders(),
        cache: 'no-store'
    });
    if (!res.ok) throw new Error(`Failed to fetch shows: ${res.status}`);
    const data = await res.json();
    return data.shows ?? [];
}
async function getMembers() {
    if (!isConfigured()) return [];
    const res = await fetch(`${BASE_URL}/api/public/members`, {
        headers: getHeaders(),
        cache: 'no-store'
    });
    if (!res.ok) throw new Error(`Failed to fetch members: ${res.status}`);
    const data = await res.json();
    return data.members ?? [];
}
}),
"[project]/app/shows/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ShowsPage,
    "dynamic",
    ()=>dynamic,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$site$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/site.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$soundcheck$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/soundcheck.ts [app-rsc] (ecmascript)");
;
;
;
const dynamic = 'force-dynamic';
const metadata = {
    title: `Shows | ${__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$site$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["siteConfig"].bandName}`,
    description: `Upcoming and past shows for ${__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$site$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["siteConfig"].bandName}.`
};
function formatDate(dateStr) {
    if (!dateStr) return 'TBD';
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
}
function formatTime(timeStr) {
    if (!timeStr) return '';
    const [h, m] = timeStr.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    return `${hour}:${String(m).padStart(2, '0')} ${ampm}`;
}
function splitShows(shows) {
    const today = new Date().toISOString().split('T')[0];
    return {
        upcoming: shows.filter((s)=>s.event_date && s.event_date >= today).sort((a, b)=>(a.event_date ?? '').localeCompare(b.event_date ?? '')),
        past: shows.filter((s)=>s.event_date && s.event_date < today || s.status === 'completed').sort((a, b)=>(b.event_date ?? '').localeCompare(a.event_date ?? ''))
    };
}
async function ShowsPage() {
    let shows = [];
    let error = null;
    try {
        shows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$soundcheck$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getShows"])();
    } catch (e) {
        error = e instanceof Error ? e.message : 'Failed to load shows';
    }
    const { upcoming, past } = splitShows(shows);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-b border-[var(--gnr-border)] py-16 px-6 text-center bg-[var(--gnr-surface)]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-5xl sm:text-6xl",
                    children: "Shows"
                }, void 0, false, {
                    fileName: "[project]/app/shows/page.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/shows/page.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-16 px-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-3xl mx-auto",
                    children: [
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-center text-[var(--gnr-muted)] mb-8",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/app/shows/page.tsx",
                            lineNumber: 62,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-16",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-2xl mb-8 pb-3 border-b border-[var(--gnr-border)]",
                                    children: "Upcoming"
                                }, void 0, false, {
                                    fileName: "[project]/app/shows/page.tsx",
                                    lineNumber: 67,
                                    columnNumber: 13
                                }, this),
                                upcoming.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[var(--gnr-muted)]",
                                    children: "No upcoming shows scheduled. Check back soon!"
                                }, void 0, false, {
                                    fileName: "[project]/app/shows/page.tsx",
                                    lineNumber: 69,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-4",
                                    children: upcoming.map((show)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "border-l-2 border-[var(--gnr-brand)] pl-5 py-4 bg-[var(--gnr-surface)] flex flex-col gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-[family-name:var(--gnr-font-display)] text-sm uppercase tracking-wider text-[var(--gnr-brand)]",
                                                    children: formatDate(show.event_date)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/shows/page.tsx",
                                                    lineNumber: 77,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-[family-name:var(--gnr-font-body)] text-lg text-[var(--gnr-text)] font-semibold",
                                                    children: show.venue_name ?? 'Venue TBA'
                                                }, void 0, false, {
                                                    fileName: "[project]/app/shows/page.tsx",
                                                    lineNumber: 80,
                                                    columnNumber: 21
                                                }, this),
                                                show.event_time && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm text-[var(--gnr-muted)]",
                                                    children: [
                                                        formatTime(show.event_time),
                                                        show.event_end_time && ` – ${formatTime(show.event_end_time)}`
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/shows/page.tsx",
                                                    lineNumber: 84,
                                                    columnNumber: 23
                                                }, this),
                                                show.notes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm text-[var(--gnr-muted)] italic",
                                                    children: show.notes
                                                }, void 0, false, {
                                                    fileName: "[project]/app/shows/page.tsx",
                                                    lineNumber: 90,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, show.id, true, {
                                            fileName: "[project]/app/shows/page.tsx",
                                            lineNumber: 73,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/shows/page.tsx",
                                    lineNumber: 71,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/shows/page.tsx",
                            lineNumber: 66,
                            columnNumber: 11
                        }, this),
                        past.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-2xl mb-8 pb-3 border-b border-[var(--gnr-border)]",
                                    children: "Past Shows"
                                }, void 0, false, {
                                    fileName: "[project]/app/shows/page.tsx",
                                    lineNumber: 101,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-2",
                                    children: past.map((show)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 py-3 border-b border-[var(--gnr-border)] opacity-60",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-[family-name:var(--gnr-font-display)] text-xs uppercase tracking-wider text-[var(--gnr-muted)] min-w-[180px]",
                                                    children: formatDate(show.event_date)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/shows/page.tsx",
                                                    lineNumber: 108,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[var(--gnr-text)]",
                                                    children: show.venue_name ?? 'Venue TBA'
                                                }, void 0, false, {
                                                    fileName: "[project]/app/shows/page.tsx",
                                                    lineNumber: 111,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, show.id, true, {
                                            fileName: "[project]/app/shows/page.tsx",
                                            lineNumber: 104,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/shows/page.tsx",
                                    lineNumber: 102,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/shows/page.tsx",
                            lineNumber: 100,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/shows/page.tsx",
                    lineNumber: 59,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/shows/page.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/app/shows/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/shows/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__17j9bqc._.js.map