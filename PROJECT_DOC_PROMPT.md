# MBX Solutions — Website Technical Documentation Prompt

> **How to use:** paste this entire file into Claude and send it.
> Claude will read the verified project data below and produce one finished file:
> `WEBSITE_DOCUMENTATION.md`.
>
> Every fact in the **GROUND TRUTH DATA** section was read directly from the codebase.
> Claude must treat it as fact and must not re-invent, guess, or "improve" any of it.

---

# YOUR ROLE

You are a senior technical writer documenting a website that was built by a development team.
Your job is to produce an accurate, complete **technical record of what was built**:
the technologies, the code structure, every page and link, and the SEO implementation.

Write for a technically capable reader — a client stakeholder, a project manager, or a developer
taking over the project — who wants to understand the system, not be sold to.

You are NOT writing marketing copy, not a sales pitch, and not a code review.
You are producing a reference document that accurately describes an existing codebase.

---

# OUTPUT SPECIFICATION

Produce **exactly one file** in your response, named `WEBSITE_DOCUMENTATION.md`.

| Rule | Detail |
|---|---|
| Format | GitHub-Flavored Markdown only |
| Language | Professional English |
| Structure | Use `#`, `##`, `###` headings in order, never skipping a level |
| Tables | Use Markdown tables for every list of routes, links, endpoints, fields, and packages |
| Diagrams | Use a fenced ASCII code block for the code structure tree and the request-flow diagram |
| Code blocks | Always tag the language (`json`, `xml`, `bash`, `text`) |
| Length | Comprehensive. Do not compress. This is a reference document. |
| Emojis | None anywhere |
| Files created | Only `WEBSITE_DOCUMENTATION.md`. No README, no SUMMARY, no other file. |

---

# GROUND TRUTH DATA (verified — use exactly as given)

## 1. What was built

A healthcare revenue cycle management (RCM) marketing website with a linked admin dashboard,
a live visitor chat system, and a blog/gallery/testimonial content management system backed by
a REST API and a MongoDB database.

| Metric | Count |
|---|---|
| Route definitions in `App.jsx` | 29 |
| Static public pages | 25 |
| Dynamic route patterns | 2 (`/blog/:slug`, `/locations/:slug`) |
| Pages served by the dynamic patterns | 64 (14 blog posts + 50 state pages) |
| Total indexable URLs | 89 |
| Admin screens | 7 |
| Page component files | 37 (30 in `src/pages/`, 7 in `src/pages/admin/`) |
| Shared component files | 27 (22 in `src/components/`, 5 in `src/components/admin/`) |
| `React.lazy()` imports | 29 |
| Production output chunks | 73 |
| Main entry bundle | ~277 KB uncompressed |
| API endpoints | 34 (14 public, 20 authenticated) |
| MongoDB collections | 6 |
| JSON-LD schema types | 5 |
| SEO metadata entries | 26 |
| Automated checks passing | 70 |
| Lint errors / warnings | 0 |

Site-wide brand constants: name `MBX Solutions`, email `info@mbxsol.com`, phone
`+1 (888) 370-6494` (tel `+18883706494`), secondary utility-bar phone `+1 (559) 777-7919`,
LinkedIn `https://www.linkedin.com/company/mbxsol/`, Facebook `https://www.facebook.com/Mbxsol`,
Twitter handle `@mbxsol`, logo `/mbx-logo.png`.

The site deliberately shows a different secondary phone number in the top utility bar. This was
explicitly confirmed as intentional by the client.

## 2. Technologies, packages and libraries

### Frontend — `frontend/package.json`

| Package | Version | Role in this project |
|---|---|---|
| `react` | `^19.2.8` | Component model for all 37 page components and 27 shared components |
| `react-dom` | `^19.2.8` | DOM renderer mounted into `#root` |
| `react-router-dom` | `^7.18.2` | All 29 client-side routes, `useLocation`, nested admin routes, `BrowserRouter` |
| `vite` | `^8.2.2` | Dev server and production bundler. Produces the 73 output chunks |
| `@vitejs/plugin-react` | `^6.1.0` | React fast-refresh and JSX transform inside Vite |
| `tailwindcss` | `^4.3.3` | All styling. Utility-first CSS, no separate CSS framework |
| `@tailwindcss/vite` | `^4.3.3` | Tailwind v4 Vite plugin, configured through the Vite plugin API |
| `framer-motion` | `^13.1.1` | Scroll reveals, section animations, gallery transitions |
| `lucide-react` | `^1.34.0` | Icon set used across all pages and the admin panel |
| `oxlint` | `^1.79.0` | Linter, dev dependency. Current result: 0 errors, 0 warnings |
| `@types/react` | `^19.2.18` | TypeScript type definitions |
| `@types/react-dom` | `^19.2.4` | TypeScript type definitions |

Typography: **Plus Jakarta Sans** (weights 300–800), loaded from Google Fonts in `index.html` with
`preconnect` hints to `fonts.googleapis.com` and `fonts.gstatic.com`.

### Backend — `backend/package.json`

| Package | Version | Role in this project |
|---|---|---|
| `express` | `^4.21.2` | The API server. Hosts all 34 routes |
| `mongoose` | `^8.10.1` | ODM for the 6 MongoDB collections |
| `jsonwebtoken` | `^9.0.3` | Signs and verifies the admin auth tokens |
| `bcryptjs` | `^3.0.3` | Hashes the administrator password |
| `cors` | `^2.8.5` | Permits the frontend origin to call the API |
| `dotenv` | `^16.4.7` | Loads environment variables |
| `cloudinary` | `^1.41.1` | Destroys legacy media assets by `publicId` on delete |
| `multer` | `^1.4.5-lts.1` | Retained as a dependency |
| `multer-storage-cloudinary` | `^4.0.0` | Retained as a dependency |

### Runtime and language versions

| Item | Value |
|---|---|
| JavaScript language level | ES modules, modern JavaScript |
| Node.js | 24.x |
| Database | MongoDB |
| Framework preset | Vite |
| Markup | JSX, all pages and components |

## 3. Code structure

```
billing/
├── frontend/                            # React single-page application
│   ├── index.html                       # Document shell. Base meta, favicon,
│   │                                    #   theme-color, Google Fonts, #root mount
│   ├── vercel.json                      # SPA rewrites, permanent redirects,
│   │                                    #   security headers, cache headers
│   ├── vite.config.js                   # Vite + React + Tailwind v4 plugin setup
│   ├── package.json
│   ├── public/                          # Served at the site root
│   │   ├── robots.txt                   # Crawl rules + 2 sitemap references
│   │   ├── sitemap.xml                  # Static sitemap, 75 URLs
│   │   ├── favicon.svg
│   │   ├── mbx-logo.png                 # Main logo, also the apple-touch-icon
│   │   ├── logo-white.svg
│   │   ├── logo.jpeg
│   │   ├── icons.svg
│   │   └── WhatsApp Image 2026-09-02 at 2.16.59 PM.jpeg
│   ├── scripts/
│   │   ├── test-seo.mjs                 # 23 SEO checks
│   │   └── test-chat-alert.mjs          # 11 chat alert unit checks
│   └── src/
│       ├── main.jsx                     # React entry point, mounts <App/>
│       ├── App.jsx                      # THE ROUTE TABLE. 29 <Route> definitions
│       ├── index.css                    # Tailwind entry + design tokens
│       ├── pages/                       # 30 page components
│       │   ├── Home.jsx                 # /
│       │   ├── Services.jsx             # /services
│       │   ├── Gallery.jsx              # /gallery
│       │   ├── Testimonials.jsx         # /testimonials
│       │   ├── About.jsx                # /about
│       │   ├── Contact.jsx              # /connect-us
│       │   ├── HIPAA.jsx                # /hipaa
│       │   ├── Company.jsx              # /company
│       │   ├── Resources.jsx            # /resources
│       │   ├── AccountManager.jsx       # /account-manager
│       │   ├── MBXAdvantage.jsx         # /mbx-advantage
│       │   ├── Software.jsx             # /software
│       │   ├── MedicalAssistant.jsx     # /medical-assistant
│       │   ├── RCMServices.jsx          # /rcm-services
│       │   ├── Capabilities.jsx         # /capabilities
│       │   ├── Solution.jsx             # /solution
│       │   ├── Blog.jsx                 # /blog
│       │   ├── BlogPost.jsx             # /blog/:slug
│       │   ├── SmallProject.jsx         # /projects/small
│       │   ├── LargeProject.jsx         # /projects/large
│       │   ├── HomeHealthHospice.jsx    # /home-health-hospice
│       │   ├── Locations.jsx            # /locations
│       │   ├── Location.jsx             # /locations/:slug
│       │   ├── Team.jsx                 # /team
│       │   ├── FAQs.jsx                 # /faqs
│       │   ├── FreeBillingAudit.jsx     # /free-billing-audit
│       │   ├── PrivacyPolicy.jsx        # /privacy-policy
│       │   ├── NotFound.jsx             # * catch-all
│       │   ├── RSMServices.jsx          # Not imported by any route
│       │   ├── Admin.jsx                # /admin/* router + ProtectedRoute
│       │   └── admin/                   # 7 admin screen components
│       │       ├── AdminLogin.jsx           # /admin/login
│       │       ├── DashboardOverview.jsx    # /admin
│       │       ├── AdminGallery.jsx         # /admin/gallery
│       │       ├── AdminMessages.jsx        # /admin/messages
│       │       ├── AdminChat.jsx            # /admin/chat
│       │       ├── AdminTestimonials.jsx    # /admin/testimonials
│       │       └── AdminBlog.jsx            # /admin/blog
│       ├── components/                  # 22 shared components
│       │   ├── Navbar.jsx              # Mega-menu. Holds the navItems array
│       │   ├── Footer.jsx              # Site footer, contact links
│       │   ├── TopUtilityHeader.jsx    # Thin top bar, the secondary phone
│       │   ├── ChatWidget.jsx          # Floating chat launcher + WhatsApp handoff
│       │   ├── ContactForm.jsx         # Posts to /api/contact
│       │   ├── ReviewForm.jsx          # Posts to /api/testimonials/submit
│       │   ├── HeroSection.jsx
│       │   ├── SectionTestimonials.jsx # Site-wide testimonial strip
│       │   ├── SectionStatsGrid.jsx
│       │   ├── SectionAuditCTA.jsx
│       │   ├── SectionEHRLogos.jsx
│       │   ├── SectionHealthcareSectors.jsx
│       │   ├── SectionRCMTimeline.jsx
│       │   ├── SectionSolutionsTabs.jsx
│       │   ├── SectionSpecialtiesScroll.jsx
│       │   ├── ServiceAccordion.jsx
│       │   ├── PricingPlans.jsx
│       │   ├── TeamCard.jsx
│       │   ├── TeamSection.jsx
│       │   ├── WorkflowVisual.jsx
│       │   ├── Animated.jsx            # framer-motion reveal primitives
│       │   ├── UI.jsx                  # Shared buttons, containers, headings
│       │   └── admin/                  # 5 admin components
│       │       ├── AdminLayout.jsx
│       │       ├── AdminSidebar.jsx
│       │       ├── AdminHeader.jsx
│       │       ├── AdminUI.jsx
│       │       └── ChatAlarmPoller.jsx
│       ├── contexts/
│       │   └── AuthContext.jsx         # JWT lifecycle: login, verify, logout
│       ├── hooks/
│       │   └── useSeo.js               # useSeo() + usePageSeo()
│       ├── utils/
│       │   ├── seo.js                  # The SEO engine + 5 schema builders
│       │   └── adminApi.js             # Auth header + shared 401 handler
│       ├── data/                       # 5 content data files
│       │   ├── seo.js                  # 26 SEO metadata entries
│       │   ├── locations.js            # 50 states + 17 featured states
│       │   ├── pricingPlans.js         # 4 plans
│       │   ├── teamData.js             # 16 people
│       │   └── softwarePartners.js     # 14 EHR partners
│       └── assets/                     # Imported images and fonts
│
└── backend/
    ├── api/
    │   └── index.js                    # The entire backend: 6 Mongoose
    │                                   #   schemas, 6 models, 34 routes,
    │                                   #   rate limiter, auth middleware
    ├── models/
    │   ├── Contact.js
    │   ├── Gallery.js
    │   └── Testimonial.js
    ├── scripts/
    │   ├── seedBlog.mjs                # Seeds the 14 blog posts
    │   ├── validateBlogContent.mjs
    │   ├── checkCoverImages.mjs
    │   ├── inspectBlog.mjs
    │   ├── selftestAdminLockdown.mjs   # 26 checks, live API + database
    │   └── selftestChatAlert.mjs       # 10 checks, live API + database
    ├── vercel.json                     # Serverless build + /api/* routing
    ├── .env.example                    # Placeholder values only
    └── package.json
```

### Key architectural decisions

- **Single backend file.** `backend/api/index.js` holds every schema, model and route. This keeps
  the whole API surface reviewable in a single place, so the authorisation boundary for all 34
  endpoints can be audited at a glance.
- **Content separated from components.** All copy, metadata, locations, plans, team and partner
  data live in `src/data/*.js`. Pages render data; they do not hardcode it. A non-developer can
  edit copy and SEO metadata without touching a component.
- **One SEO entry point.** No page writes a `<title>` or a meta tag directly. Everything routes
  through `useSeo` / `usePageSeo`, which guarantees no duplicate or stale tags.
- **Uniform admin API access.** Every authenticated call goes through `utils/adminApi.js`, so token
  attachment and 401 handling are written once and applied to all six admin screens.

## 4. All pages and all links

### 4.1 Route table — the 29 definitions in `App.jsx`

| # | Route | Component | Page title (from `data/seo.js`) | SEO metadata |
|---|---|---|---|---|
| 1 | `/` | `Home.jsx` | Healthcare Revenue Cycle Management Services | Yes |
| 2 | `/services` | `Services.jsx` | Revenue Cycle Management Services | Yes |
| 3 | `/gallery` | `Gallery.jsx` | Our Work, Team & Facility Gallery | Yes |
| 4 | `/testimonials` | `Testimonials.jsx` | Client Testimonials & Results | Yes |
| 5 | `/about` | `About.jsx` | About MBX Solutions | Yes |
| 6 | `/connect-us` | `Contact.jsx` | Contact MBX Solutions | Yes |
| 7 | `/hipaa` | `HIPAA.jsx` | HIPAA Compliance in Medical Billing | Yes |
| 8 | `/company` | `Company.jsx` | Our Company & Mission | Yes |
| 9 | `/resources` | `Resources.jsx` | Revenue Cycle Resources & Guides | Yes |
| 10 | `/account-manager` | `AccountManager.jsx` | Your Dedicated Account Manager | Yes |
| 11 | `/mbx-advantage` | `MBXAdvantage.jsx` | The MBX Advantage | Yes |
| 12 | `/software` | `Software.jsx` | RCM Software & Practice Management Tools | Yes |
| 13 | `/medical-assistant` | `MedicalAssistant.jsx` | Virtual Medical Assistant Services | Yes |
| 14 | `/rcm-services` | `RCMServices.jsx` | Medical Billing & RCM Solutions | Yes |
| 15 | `/capabilities` | `Capabilities.jsx` | Our RCM Capabilities | Yes |
| 16 | `/solution` | `Solution.jsx` | RCM Solution & Engagement Model | Yes |
| 17 | `/blog` | `Blog.jsx` | Revenue Cycle & Medical Billing Blog | Yes |
| 18 | `/blog/:slug` | `BlogPost.jsx` | Post title, injected at runtime | Runtime `Article` schema |
| 19 | `/projects/small` | `SmallProject.jsx` | RCM for Small Practices | Yes |
| 20 | `/projects/large` | `LargeProject.jsx` | RCM for Large Groups & Health Systems | Yes |
| 21 | `/home-health-hospice` | `HomeHealthHospice.jsx` | Home Health & Hospice Billing Services | Yes |
| 22 | `/locations` | `Locations.jsx` | Medical Billing Services by State | Yes |
| 23 | `/locations/:slug` | `Location.jsx` | State name, injected at runtime | Runtime `ProfessionalService` schema |
| 24 | `/team` | `Team.jsx` | Meet the MBX Solutions Team | Yes |
| 25 | `/faqs` | `FAQs.jsx` | FAQs — Medical Billing & RCM Questions | Yes, plus `FAQPage` |
| 26 | `/free-billing-audit` | `FreeBillingAudit.jsx` | Free 90-Day A/R Billing Audit | Yes |
| 27 | `/privacy-policy` | `PrivacyPolicy.jsx` | Privacy Policy | Yes, **`noindex: true`** |
| 28 | `/admin/*` | `Admin.jsx` | Not indexed | `noindex` + `X-Robots-Tag` |
| 29 | `*` | `NotFound.jsx` | Not indexed | 404 handling |

**Count reconciliation:** 29 route definitions = 25 static public pages + 2 dynamic patterns + the
admin router + the catch-all. `data/seo.js` contains 26 metadata entries; 25 of them map to live
static routes, and the remaining entry is `/projects`, for which no route is defined.

### 4.2 Dynamic pages

| Pattern | What drives it | Page count | Structured data |
|---|---|---|---|
| `/blog/:slug` | The `Blog` collection, filtered `published: true` | **14** | `Article` + `BreadcrumbList` |
| `/locations/:slug` | `LOCATIONS` in `data/locations.js` | **50** | `ProfessionalService` + `BreadcrumbList` |

**Total indexable URLs: 89** — 75 in the static sitemap plus 14 in the dynamic blog sitemap.

#### The 50 state pages

`data/locations.js` exports two arrays. `LOCATIONS` holds **exactly 50 unique states** and drives
the 50 rendered `/locations/:slug` pages plus the `/locations` index. `FEATURED_LOCATIONS` holds
**17 of those same 50 states** and exists only so the navigation bar can show a short dropdown of
popular states. Both arrays call the same `loc()` helper and both resolve to the same 50 URLs, so
there is exactly one page per state and no state appears twice in the rendered output.

Each state record holds a `name`, a `slug`, and a Wikimedia Commons photograph of a landmark in
that state, used as the page hero image.

All 50 pages share the same component, `Location.jsx`. Each one injects:

- **Page title** — `Medical Billing Services in <State>`, for example `Medical Billing Services in Texas`
- **`ProfessionalService` schema** — `areaServed` set to the state, `url` built from the state
  slug, and `parentOrganization` pointing at the root `Organization`
- **`BreadcrumbList` schema** — Home / Locations / <State>

If a slug does not match a state, the component renders a "Location Not Found" state instead of a
service page.

**Page section order**, identical across all 50 pages:

1. Hero with the state name and its landmark image
2. Breadcrumb
3. "Why Choose MBX Solutions?" — Local Expertise, 24/7 Support, Cost-Effective Solutions
4. "Our Medical Billing Services in <State>" — six service cards: Revenue Cycle Management,
   Credentialing Services, Prior Authorization Services, Medical Billing, Insurance Verification,
   Medical Coding
5. "Medical Billing Services Nationwide" — out-of-state coverage block
6. FAQ block
7. Call to action

#### The full list of 50 location pages

Every row below is a real, separately indexable URL.

| # | State | Slug | URL | Page title | In nav dropdown |
|---|---|---|---|---|---|
| 1 | Alabama | `alabama` | `/locations/alabama` | Medical Billing Services in Alabama | Yes |
| 2 | Arizona | `arizona` | `/locations/arizona` | Medical Billing Services in Arizona | No |
| 3 | Arkansas | `arkansas` | `/locations/arkansas` | Medical Billing Services in Arkansas | No |
| 4 | California | `california` | `/locations/california` | Medical Billing Services in California | Yes |
| 5 | Colorado | `colorado` | `/locations/colorado` | Medical Billing Services in Colorado | No |
| 6 | Connecticut | `connecticut` | `/locations/connecticut` | Medical Billing Services in Connecticut | No |
| 7 | Delaware | `delaware` | `/locations/delaware` | Medical Billing Services in Delaware | No |
| 8 | Georgia | `georgia` | `/locations/georgia` | Medical Billing Services in Georgia | Yes |
| 9 | Hawaii | `hawaii` | `/locations/hawaii` | Medical Billing Services in Hawaii | Yes |
| 10 | Kansas | `kansas` | `/locations/kansas` | Medical Billing Services in Kansas | Yes |
| 11 | Kentucky | `kentucky` | `/locations/kentucky` | Medical Billing Services in Kentucky | No |
| 12 | Louisiana | `louisiana` | `/locations/louisiana` | Medical Billing Services in Louisiana | Yes |
| 13 | Maine | `maine` | `/locations/maine` | Medical Billing Services in Maine | No |
| 14 | Maryland | `maryland` | `/locations/maryland` | Medical Billing Services in Maryland | Yes |
| 15 | Massachusetts | `massachusetts` | `/locations/massachusetts` | Medical Billing Services in Massachusetts | No |
| 16 | Michigan | `michigan` | `/locations/michigan` | Medical Billing Services in Michigan | No |
| 17 | Minnesota | `minnesota` | `/locations/minnesota` | Medical Billing Services in Minnesota | No |
| 18 | Mississippi | `mississippi` | `/locations/mississippi` | Medical Billing Services in Mississippi | No |
| 19 | Alaska | `alaska` | `/locations/alaska` | Medical Billing Services in Alaska | Yes |
| 20 | Florida | `florida` | `/locations/florida` | Medical Billing Services in Florida | Yes |
| 21 | Idaho | `idaho` | `/locations/idaho` | Medical Billing Services in Idaho | Yes |
| 22 | Illinois | `illinois` | `/locations/illinois` | Medical Billing Services in Illinois | No |
| 23 | Indiana | `indiana` | `/locations/indiana` | Medical Billing Services in Indiana | No |
| 24 | Iowa | `iowa` | `/locations/iowa` | Medical Billing Services in Iowa | No |
| 25 | Missouri | `missouri` | `/locations/missouri` | Medical Billing Services in Missouri | No |
| 26 | Montana | `montana` | `/locations/montana` | Medical Billing Services in Montana | Yes |
| 27 | Nebraska | `nebraska` | `/locations/nebraska` | Medical Billing Services in Nebraska | Yes |
| 28 | Nevada | `nevada` | `/locations/nevada` | Medical Billing Services in Nevada | Yes |
| 29 | New Hampshire | `new-hampshire` | `/locations/new-hampshire` | Medical Billing Services in New Hampshire | No |
| 30 | New Jersey | `new-jersey` | `/locations/new-jersey` | Medical Billing Services in New Jersey | No |
| 31 | New Mexico | `new-mexico` | `/locations/new-mexico` | Medical Billing Services in New Mexico | No |
| 32 | New York | `new-york` | `/locations/new-york` | Medical Billing Services in New York | No |
| 33 | North Carolina | `north-carolina` | `/locations/north-carolina` | Medical Billing Services in North Carolina | No |
| 34 | North Dakota | `north-dakota` | `/locations/north-dakota` | Medical Billing Services in North Dakota | No |
| 35 | Ohio | `ohio` | `/locations/ohio` | Medical Billing Services in Ohio | Yes |
| 36 | Oklahoma | `oklahoma` | `/locations/oklahoma` | Medical Billing Services in Oklahoma | Yes |
| 37 | Oregon | `oregon` | `/locations/oregon` | Medical Billing Services in Oregon | No |
| 38 | Pennsylvania | `pennsylvania` | `/locations/pennsylvania` | Medical Billing Services in Pennsylvania | Yes |
| 39 | Rhode Island | `rhode-island` | `/locations/rhode-island` | Medical Billing Services in Rhode Island | Yes |
| 40 | South Carolina | `south-carolina` | `/locations/south-carolina` | Medical Billing Services in South Carolina | No |
| 41 | South Dakota | `south-dakota` | `/locations/south-dakota` | Medical Billing Services in South Dakota | No |
| 42 | Tennessee | `tennessee` | `/locations/tennessee` | Medical Billing Services in Tennessee | No |
| 43 | Texas | `texas` | `/locations/texas` | Medical Billing Services in Texas | No |
| 44 | Utah | `utah` | `/locations/utah` | Medical Billing Services in Utah | No |
| 45 | Vermont | `vermont` | `/locations/vermont` | Medical Billing Services in Vermont | No |
| 46 | Virginia | `virginia` | `/locations/virginia` | Medical Billing Services in Virginia | No |
| 47 | Washington | `washington` | `/locations/washington` | Medical Billing Services in Washington | No |
| 48 | West Virginia | `west-virginia` | `/locations/west-virginia` | Medical Billing Services in West Virginia | No |
| 49 | Wisconsin | `wisconsin` | `/locations/wisconsin` | Medical Billing Services in Wisconsin | No |
| 50 | Wyoming | `wyoming` | `/locations/wyoming` | Medical Billing Services in Wyoming | No |

#### The 14 blog pages

Blog posts are stored in MongoDB and inserted by `backend/scripts/seedBlog.mjs`, so they are not
present as a file in `src/data/`. Five categories are in use.

| # | Category | Post title |
|---|---|---|
| 1 | Compliance | MIPS Reporting and Value-Based Care: A Billing Operations Guide |
| 2 | Industry News | Outsource Medical Billing or Hire In-House: An Honest Comparison |
| 3 | Billing | Net Collection Rate Benchmarks: What to Target and How to Get There |
| 4 | Operations | Prior Authorization: A Practical Workflow for Practices That Hate It |
| 5 | Billing | ERA and EOB Posting: Closing the Gap Between Payment and Your Ledger |
| 6 | Compliance | Physician Credentialing and CAQH: Why Providers Get Paid Late |
| 7 | Billing | Clean Claim Rate: What It Means and How to Actually Improve It |
| 8 | Billing | A/R Aging Explained: How to Recover Stuck Receivables Before Appeal Windows Close |
| 9 | Industry News | PDGM Explained: How the Home Health Payment Model Actually Works |
| 10 | Compliance | Home Health NOA and Hospice NOE: The 5-Day Deadline You Cannot Miss |
| 11 | Compliance | HIPAA Compliance in a Remote Billing World: A Practical Checklist |
| 12 | Industry News | The 2026 Home Health Payment Rule: What Agencies Need to Know |
| 13 | Coding | ICD-10 Coding for Hospice: Common Mistakes and How to Avoid Them |
| 14 | Billing | 5 Proven Ways to Reduce Claim Denials in Home Health Billing |

Categories (5): **Billing, Coding, Compliance, Industry News, Operations**.

### 4.3 Navigation links — `components/Navbar.jsx`

The `navItems` array defines a mega-menu. Many items point at an anchor fragment on another page
rather than a dedicated route, so one page covers a whole topic.

| Menu item | Link | Kind |
|---|---|---|
| Home | `/` | Route |
| Home Health & Hospice | `/home-health-hospice` | Route |
| **Company** — dropdown | | |
|  | `/company` | Route |
|  | `/about` | Route |
|  | `/gallery` | Route |
|  | `/testimonials` | Route |
|  | `/hipaa` | Route |
|  | `/faqs` | Route |
|  | `/connect-us` | Route |
|  | `/blog` | Route |
| **Services** — dropdown | | |
|  | `/projects/small` | Route |
|  | `/projects/large` | Route |
|  | `/services#home-health` | Anchor |
|  | `/services#hospice` | Anchor |
|  | `/services#claim-entry` | Anchor |
|  | `/services#claims-scrubbing` | Anchor |
|  | `/services#medical-coding` | Anchor |
|  | `/services#ar-followup` | Anchor |
|  | `/services#denial-management` | Anchor |
|  | `/services#credentialing` | Anchor |
|  | `/services#free-audit` | Anchor |
| **Locations** — dropdown | | |
|  | 17 featured states → `/locations/<state-slug>` | Dynamic |
|  | `/locations` ("View all locations") | Route |
| **Resources** — dropdown | | |
|  | `/resources` | Route |
|  | `/account-manager` | Route |
|  | `/services#free-audit` | Anchor |
|  | `/hipaa` | Route |
|  | `/services` | Route |
| The MBX Advantage | `/mbx-advantage` | Route |
| **Software** — dropdown | | |
|  | `/software` | Route |
|  | `/software#dashboard` | Anchor |
|  | `/software#coding` | Anchor |
| **RCM Services** — dropdown | | |
|  | `/rcm-services` | Route |
|  | `/rcm-services#coding` | Anchor |
|  | `/rcm-services#ar` | Anchor |
|  | `/rcm-services#denial` | Anchor |
| **Solution** — dropdown | | |
|  | `/solution` | Route |
|  | `/solution#billing` | Anchor |
|  | `/solution#oasis` | Anchor |
|  | `/solution#reporting` | Anchor |
| Free Billing Audit | `/free-billing-audit` | Route |

The navbar also renders a three-item statistics strip: `90%+` Rate, `<40d` Days, `97%` Paid.

### 4.4 Footer links — `components/Footer.jsx`

| Link | Target |
|---|---|
| Logo | `/` |
| Privacy | `/privacy-policy` |
| Email | `mailto:info@mbxsol.com` |
| Phone | `tel:+18883706494` |
| Facebook | `https://www.facebook.com/Mbxsol` |
| LinkedIn | `https://www.linkedin.com/company/mbxsol` |
| Facebook share | `https://www.facebook.com/sharer/sharer.php?u=<current URL>` |
| LinkedIn share | `https://www.linkedin.com/sharing/share-offsite/?url=<current URL>` |

### 4.5 Other outbound links

| Link | Where | Purpose |
|---|---|---|
| `https://wa.me/18883706494` | `ChatWidget.jsx` | WhatsApp handoff from the chat launcher |
| `images.unsplash.com/...` | 12 page and section components | Editorial photography, served with `?auto=format&fit=crop&w=<size>` |
| `thumb.wikimedia.org/...` | `data/locations.js` | State landmark photographs for the 50 location pages |
| `http://localhost:5000` | `api/index.js` | Local development fallback base URL |

### 4.6 Permanent redirects — `frontend/vercel.json`

| From | To | Reason |
|---|---|---|
| `/contact` | `/connect-us` | Legacy contact path |
| `/contact-us` | `/connect-us` | Legacy contact path |
| `/blog/:slug/` | `/blog/:slug` | Trailing-slash normalisation, so one canonical URL per post |
| `/locations/:slug/` | `/locations/:slug` | Trailing-slash normalisation, so one canonical URL per state |

## 5. SEO implementation

### 5.1 The SEO engine

| File | Responsibility |
|---|---|
| `src/utils/seo.js` | The engine. Exports the `SITE_URL`, `SITE_NAME`, `DEFAULT_OG_IMAGE`, `DEFAULT_TWITTER_HANDLE` and `CONTACT` constants, the tag writers `absoluteUrl`, `setTitle`, `setMeta`, `setCanonical`, `setOpenGraph`, `setJsonLd`, and the 5 schema builders |
| `src/data/seo.js` | The content. A `SEO` object with 26 entries, each holding `title`, `description`, `keywords`, `image`, and for `/privacy-policy` a `noindex` flag |
| `src/hooks/useSeo.js` | `useSeo(options)` applies title, description, keywords, canonical, Open Graph, Twitter card and JSON-LD for a route. `usePageSeo(path, overrides)` looks up defaults in `data/seo.js` and merges overrides on top |

Two mechanisms keep the tags correct:

- **Every managed tag is stamped** with a `data-seo` attribute and replaced on route change, so
  client-side navigation can never leave a stale or duplicated tag behind.
- **JSON-LD scripts are stamped** `data-seo-jsonld` and removed before new ones are appended, which
  keeps schema output to exactly one copy per page.

`useSeo` serialises its `jsonLd` argument to a dependency key rather than depending on the object
identity, because pages build schema objects inline and a new object every render would otherwise
loop the effect.

`SITE_URL` is read from the `VITE_SITE_URL` environment variable, so the same code produces correct
absolute URLs in every environment. `absoluteUrl()` passes through fully-qualified URLs unchanged
and otherwise prefixes them with `SITE_URL`.

`index.html` carries a base title, base description, `og:site_name`, `og:type`, `og:locale` and
`twitter:card=summary_large_image` as first-paint fallbacks; per-route values are then injected at
runtime by `useSeo`.

### 5.2 Structured data — 5 schema types

| Schema | Builder | Emitted on | Contents |
|---|---|---|---|
| `Organization` | `organizationSchema()` | Site-wide | Name, URL, logo, image, description, telephone, email, LinkedIn and Facebook `sameAs`, `areaServed` United States, and 8 `knowsAbout` topics: Revenue Cycle Management, Medical Billing, Home Health Billing, Hospice Billing, PDGM, Medical Coding, Physician Credentialing, Accounts Receivable Recovery |
| `BreadcrumbList` | `breadcrumbSchema(items)` | Blog posts, location pages, section pages | Ordered `ListItem` entries with absolute URLs |
| `Article` | `articleSchema({...})` | `/blog/:slug` | `headline`, `description`, `image`, `datePublished`, `dateModified`, `author`, `publisher` with logo `ImageObject`, `mainEntityOfPage`, `keywords` |
| `FAQPage` | `faqSchema(questions)` | `/faqs` | Each question as a `Question` with an `acceptedAnswer` |
| `ProfessionalService` | `localBusinessSchema({...})` | `/locations/:slug` | `name`, `alternateName`, `url` built from the state slug, `description`, `image`, `logo`, `telephone`, `email`, `priceRange: "$$"`, `areaServed` as a `State`, optional `PostalAddress`, and `parentOrganization` pointing at the root `Organization` |

The `parentOrganization` reference links each of the 50 state-level entities back to the single root
`Organization`. This is a deliberate single-entity, multi-location markup structure.

### 5.3 Meta and social tags

| Managed per route | Values |
|---|---|
| `<title>` | From `data/seo.js`, falling back to `SITE_NAME` |
| `meta[name=description]` | From `data/seo.js` |
| `meta[name=keywords]` | From `data/seo.js` |
| `link[rel=canonical]` | Absolute URL via `absoluteUrl()` |
| `meta[name=robots]` | Supports `noindex`; used for `/privacy-policy` |
| `meta[name=theme-color]` | `#0B2F4E` |
| `meta[name=locale]` | `en_US` |
| `og:title`, `og:description`, `og:image`, `og:url`, `og:type` | Per route. `og:type` defaults to `website`, and posts pass `article` |
| `og:site_name` | `MBX Solutions`, from `index.html` |
| `og:locale` | `en_US`, from `index.html` |
| `twitter:card` | `summary_large_image`, from `index.html` |
| `twitter:site` | `@mbxsol` |
| `twitter:title`, `twitter:description`, `twitter:image` | Per route, mirrored from Open Graph |

Each of the 26 entries in `data/seo.js` also declares its own `image` path, consumed by `useSeo` and
written into `og:image` and `twitter:image`.

### 5.4 Sitemaps

| Sitemap | Location | URLs | Contents |
|---|---|---|---|
| Static | `frontend/public/sitemap.xml` | **75** | The 25 fixed routes plus the 50 location pages |
| Dynamic | `GET /api/sitemap.xml` | **14** | Every `published: true` blog post, with a real `lastmod` derived from the post's `updatedAt` falling back to `createdAt`, `changefreq: monthly`, `priority: 0.6`. Sent with `Cache-Control: public, max-age=3600` |

Because blog posts live in the database, they cannot be baked into a static file. Splitting the
sitemap into a static file plus a generated endpoint keeps database-driven URLs covered without the
static file going stale.

### 5.5 `robots.txt` — `frontend/public/robots.txt`

```
User-agent: *
Allow: /

# Admin dashboard has no public value and should never be indexed
Disallow: /admin
Disallow: /admin/

# Filtered / paginated variants would create duplicate URLs
Disallow: /*?category=
Disallow: /*?search=
Disallow: /*?limit=

Sitemap: https://mbxsol.com/sitemap.xml
Sitemap: https://mbxsol.com/api/sitemap.xml
```

The parameter rules stop the blog's category filter, its search results and its pagination from
being indexed as separate URLs, so the faceted variants do not compete with the base `/blog` URL.

### 5.6 Excluding the admin area from indexing

Three independent mechanisms:

1. `robots.txt` disallows `/admin` and `/admin/`.
2. `AdminNoindex` in `App.jsx` renders on any path starting with `/admin` and applies a `noindex`
   meta tag through `useSeo`. It is deliberately mounted only on admin paths so it can never
   overwrite the metadata of a public page.
3. `frontend/vercel.json` sends `X-Robots-Tag: noindex, nofollow` as an HTTP response header on
   `/admin(.*)`.

### 5.7 Rewrites and headers — `frontend/vercel.json`

**SPA rewrite.** A single negative-lookahead rule forwards every request to `/index.html` except a
small allowlist of real files and folders:

```json
{
  "source": "/((?!assets/|api/|robots\\.txt|sitemap\\.xml|favicon|logo|mbx-logo|icons\\.svg|WhatsApp).*)",
  "destination": "/index.html"
}
```

This is what makes deep links such as `/blog/clean-claim-rate-what-it-means` resolve on a hard
refresh, while real files continue to be served normally.

**Response headers.**

| Path pattern | Headers |
|---|---|
| `/admin(.*)` | `X-Robots-Tag: noindex, nofollow`, `X-Frame-Options: DENY` |
| `/assets/(.*)` | `Cache-Control: public, max-age=31536000, immutable` |
| `/(sitemap\.xml\|robots\.txt)` | `Cache-Control: public, max-age=3600` |
| `/(.*)` | `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`, `X-Frame-Options: SAMEORIGIN` |

### 5.8 Brand data consistency

Name, phone, email and social profiles are declared once in the `CONTACT` constant in
`utils/seo.js`. The footer, the `Organization` schema, the `ProfessionalService` schema and the
chat widget's WhatsApp link all read from that single source, so the values cannot drift between
the visible page and the structured data.

## 6. Backend API

All 34 endpoints are defined in `backend/api/index.js`. "Auth" means a valid JWT bearer token is
required; without one the server responds `401`.

### 6.1 Public endpoints (14)

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Liveness probe. Returns `{ status: "ok" }` |
| GET | `/api/sitemap.xml` | Generates the dynamic blog sitemap |
| POST | `/api/auth/login` | Validates the administrator password, applies the rate limit, returns a signed JWT |
| GET | `/api/gallery` | Returns gallery items for the public lightbox |
| POST | `/api/contact` | Accepts a contact form submission |
| GET | `/api/testimonials` | Returns testimonials where `active` and `approved` are both true |
| POST | `/api/testimonials/submit` | Accepts a public review, stored unapproved |
| GET | `/api/blog` | Lists published posts, with optional category and search filters |
| GET | `/api/blog/slug/:slug` | Returns one post and increments its `views` counter |
| GET | `/api/blog/categories` | Returns the distinct categories across published posts |
| POST | `/api/chat/start` | Opens a visitor chat session and returns its `sessionId` |
| POST | `/api/chat/:sessionId/messages` | Visitor sends a message |
| GET | `/api/chat/:sessionId/messages` | Visitor polls their own transcript |
| POST | `/api/chat/:sessionId/read` | Visitor marks the transcript as read |

### 6.2 Authenticated endpoints (20)

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/auth/verify` | Validates the current token and returns `{ valid, admin }` |
| POST | `/api/gallery` | Creates a gallery item |
| PUT | `/api/gallery/:id` | Updates a gallery item |
| DELETE | `/api/gallery/:id` | Deletes a gallery item and destroys the legacy Cloudinary asset when a `publicId` is present |
| GET | `/api/contact` | Lists all contact submissions |
| PATCH | `/api/contact/:id` | Marks a submission read or unread |
| DELETE | `/api/contact/:id` | Deletes a submission |
| GET | `/api/testimonials/all` | Lists every testimonial including unapproved |
| POST | `/api/testimonials` | Creates a testimonial directly |
| PUT | `/api/testimonials/:id` | Edits, approves, features or reorders a testimonial |
| DELETE | `/api/testimonials/:id` | Deletes a testimonial |
| GET | `/api/blog/admin/all` | Lists all posts including drafts |
| GET | `/api/blog/admin/:id` | Returns one post for editing |
| POST | `/api/blog` | Creates a post and generates its slug |
| PUT | `/api/blog/:id` | Updates a post |
| DELETE | `/api/blog/:id` | Deletes a post |
| GET | `/api/chat/admin/conversations` | Lists conversations with unread counts |
| GET | `/api/chat/admin/:sessionId/messages` | Returns a full transcript |
| POST | `/api/chat/admin/:sessionId/messages` | Sends an admin reply |
| POST | `/api/chat/admin/:sessionId/read` | Marks read and resets `adminUnread` |

One authenticated route verifies the token; the other 19 are CMS and data-management routes.

### 6.3 Request flow

```
Visitor browser
   │
   │  GET /blog/clean-claim-rate-what-it-means
   ▼
frontend/vercel.json  ── matches the SPA rewrite ──▶  /index.html
   │
   │  React mounts, React.lazy() fetches the route chunk
   ▼
BlogPost.jsx
   │  useSeo() writes title, canonical, Open Graph, Article schema
   │  fetch('/api/blog/slug/:slug')
   ▼
backend/api/index.js  ── Express ──▶  Mongoose ──▶  MongoDB Blog collection
   │
   ▼  post JSON back to BlogPost.jsx, which renders the article
```

For writes, the admin screens route every call through `utils/adminApi.js`, which attaches the
`Authorization: Bearer` header before sending.

## 7. Database — 6 collections

| Collection | Fields |
|---|---|
| **Gallery** | `title`, `category`, `url`, `publicId`, `order` |
| **Contact** | `name`, `phone`, `email`, `agencyName`, `patientName`, `specialty`, `ehrSoftware`, `message`, `read` |
| **Testimonial** | `name`, `role`, `content`, `rating`, `active`, `approved`, `source`, `order` |
| **Blog** | `title`, `slug` (unique), `excerpt`, `content`, `coverImage`, `coverPublicId`, `category`, `tags` (array), `author`, `published` (boolean), `views` (number), `createdAt`, `updatedAt` |
| **ChatSession** | `sessionId` (unique), `visitorName`, `lastMessage`, `lastMessageAt`, `adminUnread`, `visitorUnread`, `status` (enum: `waiting`, `active`, `ended`), `createdAt`, `updatedAt` |
| **ChatMessage** | `sessionId` (indexed), `sender` (enum: `visitor`, `admin`), `text`, `read`, `createdAt`, `updatedAt` |

`Contact` is the only collection holding directly identifying submission data. `ChatMessage`
indirectly identifies visitors through `sessionId` and `ChatSession.visitorName`.

### Schema design decisions

- **Testimonial moderation** is modelled with three separate fields: `source` records where the
  entry came from, `approved` records that an administrator has reviewed it, and `active` records
  whether it should be shown. The public endpoint filters on `active && approved`.
- **Blog slugs are generated in code.** A `pre('validate')` hook lowercases the title, strips
  non-alphanumeric characters, converts spaces to hyphens, truncates to 80 characters and appends a
  short base-36 timestamp to guarantee uniqueness. The hook only runs when `title` is modified and
  `slug` is still empty, so a manually chosen slug is never overwritten.
- **`ChatMessage.sessionId` is indexed** because every message read filters on it.
- **Gallery stores a URL, not a file.** The schema holds `url` plus an optional `publicId` for the
  legacy Cloudinary asset, so deletion can clean up the old asset when one is recorded.

## 8. Components and UI

| Area | Count | Notes |
|---|---|---|
| Page components in `src/pages/` | 30 | 29 are routed and lazy-loaded; `RSMServices.jsx` is not imported by any route |
| Admin screens in `src/pages/admin/` | 7 | Reached through the `Admin.jsx` router |
| Shared components in `src/components/` | 22 | Navbar, Footer, ChatWidget, forms, page sections, UI primitives |
| Admin components in `src/components/admin/` | 5 | Layout, sidebar, header, UI kit, alarm poller |
| `React.lazy()` imports in `App.jsx` | 29 | Every routed page |
| Production output chunks | 73 | One per route plus shared icon and component chunks |
| Main entry bundle | ~277 KB | Downloaded once, then cached |

**Code splitting.** Each page is a separate chunk, so a visitor opening `/` downloads the home page
and the shared components but not the 14 blog post pages, the 50 location pages, or the admin
screens. `RouteFallback` in `App.jsx` renders a spinner while a chunk downloads.

**Design tokens.** `src/index.css` defines the Tailwind theme colours. The primary navy is `#0B2F4E`,
also set as `theme-color` in `index.html`.

**Images.** Editorial photography is pulled from Unsplash with `auto=format&fit=crop&w=<size>`
parameters, and state landmark images come from Wikimedia Commons.

**Site-wide testimonial strip.** `SectionTestimonials.jsx` is mounted in `App.jsx` for every public
route except `/mbx-advantage`, where it is deliberately suppressed.

## 9. Admin panel

Seven screens, all behind a `ProtectedRoute` in `Admin.jsx`. Unauthenticated visitors are redirected
to `/admin/login`. The public navbar and footer are hidden on admin paths, and a shared
`AdminLayout` / `AdminSidebar` / `AdminHeader` shell provides navigation and the unread badge.

| Route | Screen | What it manages |
|---|---|---|
| `/admin/login` | `AdminLogin.jsx` | Email and password entry. Surfaces the lockout message when the API returns `429` |
| `/admin` | `DashboardOverview.jsx` | Aggregate counts, newest contact submissions, unread chat count |
| `/admin/gallery` | `AdminGallery.jsx` | Add, edit, categorise, reorder and delete gallery images |
| `/admin/messages` | `AdminMessages.jsx` | Contact inbox: read, mark read, delete |
| `/admin/chat` | `AdminChat.jsx` | Visitor conversations, replies, read state |
| `/admin/testimonials` | `AdminTestimonials.jsx` | Approve, feature, reorder and delete testimonials |
| `/admin/blog` | `AdminBlog.jsx` | Create, edit, publish, unpublish and delete posts |

### Chat alarm

`ChatAlarmPoller.jsx` is mounted at the app root in `App.jsx`, not inside the admin routes. It polls
for new visitor messages and raises an audible alarm plus an unread badge for a signed-in
administrator, including while they are browsing the public site. It renders nothing when logged
out. `AuthContext` stores the token and `useSeo`'s sibling hook handles the audio unlock that
browser autoplay policy requires on a first user gesture.

## 10. Security implementation

| Control | Implementation |
|---|---|
| Password storage | `bcryptjs` hashes the administrator password before comparison |
| Session handling | Stateless JWT. `POST /api/auth/login` issues the token, `GET /api/auth/verify` validates it, and the token is held client-side by `AuthContext` |
| Login rate limiting | 5 failed attempts, then a 15-minute lockout, tracked per IP address and per email address. Responds `429` with `Retry-After: 900` |
| API authorisation | 20 of 34 endpoints sit behind the `auth` middleware: the token-verify route plus 19 CMS and data routes |
| Expired session handling | `utils/adminApi.js` clears the stored token and redirects to `/admin/login?expired=1` on any `401`, so a session that lapses mid-task returns the user to the login screen with a message |
| Upload surface | The gallery accepts a URL. Direct file upload is not part of the gallery flow |
| Admin framing | `X-Frame-Options: DENY` on `/admin(.*)`, `SAMEORIGIN` site-wide |
| Content type sniffing | `X-Content-Type-Options: nosniff` site-wide |
| Referrer leakage | `Referrer-Policy: strict-origin-when-cross-origin` site-wide |
| Transport security | `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` site-wide |
| Secret handling | `backend/.env.example` carries placeholder values only. The real environment file is not tracked |

The rate limiter is held in memory, so its counters live for the lifetime of a single server process.

## 11. Quality checks

| Suite | File | What it verifies | Result |
|---|---|---|---|
| SEO validation | `frontend/scripts/test-seo.mjs` | Metadata coverage, canonical URLs, schema output, sitemap contents, robots rules | **23 checks passing** |
| Chat alert unit tests | `frontend/scripts/test-chat-alert.mjs` | Unread diffing, alarm triggering, audio unlock, badge counts | **11 checks passing** |
| Admin and gallery lockdown | `backend/scripts/selftestAdminLockdown.mjs` | That each admin route rejects an unauthenticated request and that public routes stay open, against a live API and database | **26 checks passing** |
| Chat alerting | `backend/scripts/selftestChatAlert.mjs` | Session creation, message send, unread counters and read receipts, against a live API and database | **10 checks passing** |
| Lint | `oxlint` across the frontend | Style and correctness | **0 errors, 0 warnings** |
| Blog content validation | `backend/scripts/validateBlogContent.mjs` | Post structure and required fields | Available |
| Blog cover image check | `backend/scripts/checkCoverImages.mjs` | Cover image presence | Available |
| Blog inspection | `backend/scripts/inspectBlog.mjs` | Reads back seeded posts | Available |
| Blog seeding | `backend/scripts/seedBlog.mjs` | Inserts the 14 posts into MongoDB | Available |

The two backend self-test suites run against a real API and a real MongoDB instance rather than
mocks, so they exercise the authorisation boundary in a running environment.

---

# DOCUMENT OUTLINE

Build the document in exactly this order.

## Title
`# MBX Solutions — Website Technical Documentation`

Then a one-paragraph **Purpose** stating that the document records the technologies, structure, pages
and SEO implementation of the delivered website, and that every figure was read from the codebase.

## 1. Overview
Three short paragraphs: what the site is, the three-part composition (public marketing pages, a
content system, an admin dashboard), and the scale. Close with a compact table of the headline
counts from the ground truth data. No business positioning, no sales framing.

## 2. Technologies, packages and libraries
The two package tables exactly as given, followed by a short paragraph on the runtime and language
versions. Then a short subsection naming the two build-time tools that are not in the dependency
list but shape the output: Vite as the bundler and Tailwind v4 as the styling system, and the
`oxlint` linter.

## 3. Code structure
The full folder tree in a fenced code block, annotated as in the ground truth data. Then a table
describing the responsibility of each significant folder or file group: `src/pages`,
`src/components`, `src/contexts`, `src/hooks`, `src/utils`, `src/data`, `public/`, `scripts/`,
`backend/api`, `backend/models`, `backend/scripts`. Close with the four key architectural decisions
from the ground truth data, each as a short paragraph with a bolded lead-in.

## 4. Pages and links
- **4.1 Route table** — the full 29-row table from the ground truth data, then the count
  reconciliation paragraph.
- **4.2 Dynamic pages** — the two patterns, the 89-URL total, the `LOCATIONS` and
  `FEATURED_LOCATIONS` explanation, the page title and schema injected by `Location.jsx`, the
  seven-section order shared by all 50 location pages, the **full 50-row location table** (state,
  slug, URL, page title, and whether it appears in the nav dropdown), and the 14-post table with
  its 5 categories. Reproduce all 50 rows; do not summarise or abbreviate the list.
- **4.3 Navigation links** — the full navbar table.
- **4.4 Footer links** — the full footer table.
- **4.5 Other outbound links** — the full table.
- **4.6 Permanent redirects** — the full table.

## 5. SEO implementation
- **5.1 The SEO engine** — the three-file table, the `data-seo` and `data-seo-jsonld` stamping
  mechanisms, the `jsonLdKey` serialisation detail, `SITE_URL` and `absoluteUrl`, and the fallback
  tags in `index.html`.
- **5.2 Structured data** — the five-schema table, then a short paragraph on the
  `parentOrganization` relationship.
- **5.3 Meta and social tags** — the full table of managed tags.
- **5.4 Sitemaps** — the two-sitemap table and the reason for the split.
- **5.5 robots.txt** — the file in a `text` code block, then a line-by-line explanation including
  the parameter rules.
- **5.6 Excluding the admin area** — the three mechanisms.
- **5.7 Rewrites and headers** — the rewrite rule in a `json` code block with an explanation, then
  the headers table.
- **5.8 Brand data consistency** — the single `CONTACT` source and its five consumers.

## 6. Backend API
A paragraph on the single-file layout. Then the two endpoint tables exactly as given. Then the
request-flow ASCII diagram with a paragraph walking through it.

## 7. Database
The six-collection table, then a short note identifying which collections hold personal data. Then
the four schema design decisions as short paragraphs.

## 8. Components and UI
The component and chunk table, then paragraphs on code splitting and `RouteFallback`, design tokens,
image sourcing, and the site-wide testimonial strip.

## 9. Admin panel
The seven-screen table, then the shared shell, then a paragraph on the chat alarm poller and the
audio unlock.

## 10. Security implementation
The control table, then a short factual note on the in-memory rate limiter.

## 11. Quality checks
The suite table, then a paragraph on why testing against a live API and database is stronger than
mock-based testing.

---

# RULES — FOLLOW STRICTLY

1. **Do not fabricate.** Every number, route, link, endpoint, field, title, version and count must
   come from the GROUND TRUTH DATA section. If a detail is not there, omit it or write
   "Not documented in the source material." Never invent a plausible fact.

2. **Anchor every technical claim to its source file.** When you state something technical, name the
   file it came from — for example `src/utils/seo.js`, `backend/api/index.js`, `App.jsx`,
   `frontend/vercel.json`, `robots.txt`. Every route, link, endpoint and field must be traceable.

3. **Neutral technical record.** State what is implemented and what it does. Do not praise, do not
   criticise, do not recommend, do not score, do not use words like "excellent", "robust",
   "best-in-class" or "needs improvement". Describe; do not evaluate.

4. **No deployment or infrastructure content.** Do not write about hosting providers, deployment
   pipelines, build commands run on a server, environment variable setup, domain configuration, or
   how to push changes. The document covers the application only. If a `vercel.json` rule has SEO
   or security consequences, describe only that consequence.

5. **No business or marketing commentary.** Do not describe the company's market position, target
   audience, service value, or competitive strengths. Document the system, not the sales pitch.

6. **Explain jargon on first use.** Define RCM, PDGM, NOA, NOE, CAQH, A/R, ERA, EOB, clean claim
   rate, net collection rate, MIPS, JWT, JSON-LD, canonical, sitemap, `noindex`, Open Graph,
   code splitting, lazy loading, and SPA on the first occurrence. Keep it to a clause, not a
   glossary section.

7. **Use tables for anything with shared properties.** Any list of more than three similar items
   belongs in a table. Every one of the 50 location URLs and all 14 blog posts must appear as
   individual rows. Never collapse them into a sentence or use "and 47 others".

8. **Distinguish "static page" from "static asset"** correctly. A page at a fixed route is a static
   route, not a static file.

9. **Preserve the counts exactly.** 29 routes, 25 static pages, 2 dynamic patterns, 50 states,
   14 posts, 7 admin screens, 34 endpoints (14 public / 20 authenticated), 6 collections, 5 schemas,
   26 metadata entries, 37 page files, 27 components, 73 chunks, 89 indexable URLs, 89 total. If a
   total in the ground truth data does not add up, report the figures as given and do not invent a
   reconciliation.

10. **Output only the document.** No commentary before or after it, no follow-up questions, no
    summary of what you are about to write. Produce the finished `WEBSITE_DOCUMENTATION.md` directly.

---

# BEGIN

Write the complete `WEBSITE_DOCUMENTATION.md` now, following the outline, the ground truth data and
the rules above.
