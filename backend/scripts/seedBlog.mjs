/**
 * Blog seed script
 * Run:  cd backend && node scripts/seedBlog.mjs
 *
 * - Removes old lorem-ipsum test posts
 * - Adds 4 quality published blog posts
 */
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, default: '', trim: true },
  content: { type: String, required: true },
  coverImage: { type: String, default: '' },
  coverPublicId: { type: String, default: '' },
  category: { type: String, default: 'General', trim: true },
  tags: { type: [String], default: [] },
  author: { type: String, default: 'MBX Solutions' },
  published: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
}, { timestamps: true })

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema)

const posts = [
  {
    title: '5 Proven Ways to Reduce Claim Denials in Home Health Billing',
    slug: 'reduce-claim-denials-home-health-billing',
    excerpt: 'Claim denials quietly drain agency revenue. Here are five field-tested strategies our RCM team uses to cut denial rates and accelerate reimbursements.',
    category: 'Billing',
    tags: ['denials', 'billing', 'revenue cycle', 'home health'],
    author: 'MBX Solutions',
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=1200&q=80&auto=format&fit=crop',
    content: `Claim denials are one of the biggest hidden threats to a home health agency's cash flow. Industry studies show that nearly 65% of denied claims are never reworked — which means agencies are literally leaving money on the table. The good news? Most denials are preventable.

## 1. Verify Eligibility Before Every Episode

The single most common cause of denial is lost eligibility. Insurance coverage changes, plan terminations and authorization lapses happen silently between visits.

- Run eligibility checks at intake and again before each billing episode
- Confirm prior authorizations are valid through the entire certification period
- Document verification reference numbers in the patient chart

## 2. Get Documentation Right the First Time

Payers deny claims for missing signatures, incomplete OASIS data and inconsistent visit notes. Your clinicians are your first line of defense.

- Use point-of-care documentation tools to catch errors in real time
- Standardize physician order formats across your agency
- Audit 5% of charts weekly to catch patterns before payers do

## 3. Scrub Claims Before Submission

A clean claim rate above 95% should be your minimum standard. Automated claim scrubbing catches issues like mismatched diagnosis codes, date-of-service errors and billing beyond authorized visit limits.

### What a good scrubber catches

- HCPCS and ICD-10 code mismatches
- Modifier errors (especially modifiers for LUPA thresholds)
- Duplicate submission attempts

## 4. Track Denials by Root Cause

Every denial letter is data. Tag each denial by reason — eligibility, authorization, documentation, coding, timely filing — and review the trend monthly. Most agencies discover that 3 root causes generate 80% of their denials.

## 5. Set a 48-Hour Rework SLA

Aged denials lose appeal windows. Assign clear ownership, rework within 48 hours of receipt, and track appeal outcomes. Agencies that rework denials within two days recover significantly more revenue than those batching weekly.

## The Bottom Line

Denial management isn't a back-office chore — it's a revenue strategy. Agencies that combine front-end verification, clean documentation and disciplined rework routinely cut denial rates by half within two quarters.

Need help getting there? Our RCM team offers a free billing audit that identifies exactly where your denials are coming from.`,
  },
  {
    title: 'ICD-10 Coding for Hospice: Common Mistakes and How to Avoid Them',
    slug: 'icd-10-coding-hospice-common-mistakes',
    excerpt: 'Accurate hospice coding protects both compliance and reimbursement. Learn the coding mistakes that trigger audits — and the workflows that prevent them.',
    category: 'Coding',
    tags: ['coding', 'hospice', 'icd-10', 'compliance'],
    author: 'MBX Solutions',
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80&auto=format&fit=crop',
    content: `Hospice coding is unlike any other discipline in medical billing. You are not coding to maximize payment — you are coding to paint an accurate clinical picture that supports terminal prognosis. That distinction is where most agencies get into trouble.

## Mistake 1: Using Stale or Unspecific Terminal Diagnoses

The terminal diagnosis on the claim must match the physician certification and the plan of care. Agencies often carry forward a diagnosis from admission even after the disease process has evolved.

- Reconcile the primary terminal diagnosis at every recertification
- Use the most specific ICD-10 code available — unspecified codes invite scrutiny
- Ensure the certifying physician's documentation supports the code billed

## Mistake 2: Ignoring the Domino Effect of Secondary Diagnoses

Secondary diagnoses drive visit intensity and supply needs. If comorbidities like diabetes, cardiac disease or dysphagia are absent from coding, reviewers may question why related services were delivered.

### Best practice

- Code all active comorbidities each billing period
- Remove resolved conditions — carrying "zombie" codes is an audit flag
- Cross-check coded conditions against medication lists

## Mistake 3: Poor Documentation Alignment

MAC reviewers compare the claim, the clinical record and the physician narrative. Any mismatch — a coded symptom with no supporting note, or a documented symptom that is never coded — weakens your position in an audit.

## Mistake 4: Missing NPI and Physician Detail Errors

Simple administrative errors like mismatched attending physician NPIs or missing attending physician information remain a top reason for hospice claim rejections. Automate this check in your claim scrubber.

## Building a Compliance-First Coding Workflow

- Implement dual coding or 10% retrospective review for new admissions
- Hold monthly coding huddles between clinical and billing teams
- Track denial reasons tied to coding and feed them back into education
- Keep a coding bulletin for quarterly ICD-10 updates

## The Bottom Line

Clean hospice coding is a team sport. When clinicians document precisely and coders translate that documentation faithfully, claims stand up to scrutiny and revenue flows without disruption.

Want a second set of eyes on your coding? Our certified coders provide free coding audits for hospice and home health agencies.`,
  },
  {
    title: 'The 2026 Home Health Payment Rule: What Agencies Need to Know',
    slug: '2026-home-health-payment-rule-agencies-guide',
    excerpt: 'CMS updates reshape PDGM rates, wage indexes and compliance expectations for the new year. Here is a practical breakdown of what changes and how to prepare.',
    category: 'Industry News',
    tags: ['pdgm', 'cms', 'payment rule', 'home health'],
    author: 'MBX Solutions',
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=1200&q=80&auto=format&fit=crop',
    content: `Every year, the CMS Home Health Final Rule resets the financial landscape for agencies. The 2026 rule brings payment updates, wage index revisions and policy refinements that directly affect your per-episode revenue. Here's what matters operationally.

## What Changed in the 2026 Final Rule

### Payment update

CMS finalized a net payment update for home health agencies reflecting the home health market basket percentage increase, partially offset by productivity adjustments. Agencies in higher wage index regions will see more movement than others.

### Wage index revisions

The annual wage index refresh reshuffles county-level rates. If your county's index moved, your per-visit and per-episode revenue shifts with it — for better or worse.

### Behavioral assumption adjustments

CMS continues refining its calculated behavioral cost savings from PDGM. These permanent adjustments influence the final payment percentage, so budget projections should be updated, not rolled forward from last year's model.

## What This Means for Your Agency

- **Re-run your 2026 budget** using the new wage index for every county you serve
- **Review LUPA thresholds** — utilization patterns near thresholds deserve monitoring
- **Reassess visit utilization** under updated case-mix weights, especially for neurological and wound care patient groups

## Compliance Items Hiding in the Rule

Payment rules aren't just about money. Each cycle, CMS tightens expectations around:

- Quality reporting program participation and data submission windows
- EVV compliance for personal care and home health services
- Accuracy of outcome and assessment data (OASIS-E submissions)

Miss these and you may face payment penalties that dwarf any rate update.

## How to Prepare This Quarter

1. Pull your top 20 HHRG case-mix codes and compare weighted revenue under 2026 rates
2. Meet with your billing partner to model best-case and worst-case scenarios
3. Train clinical managers on any documentation changes affecting coding
4. Calendar every CMS submission deadline for the year

## The Bottom Line

Agencies that treat the Final Rule as a planning event — not a headline — protect margins while competitors scramble. If you'd like a review of how the 2026 changes affect your specific payer mix, our team offers a free payment impact analysis.`,
  },
  {
    title: 'HIPAA Compliance in a Remote Billing World: A Practical Checklist',
    slug: 'hipaa-compliance-remote-billing-checklist',
    excerpt: 'Remote work expanded PHI risk surfaces overnight. This practical checklist covers the administrative, technical and physical safeguards every billing operation needs.',
    category: 'Compliance',
    tags: ['hipaa', 'compliance', 'remote work', 'security'],
    author: 'MBX Solutions',
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80&auto=format&fit=crop',
    content: `Medical billing runs on Protected Health Information, and the modern billing operation is distributed — coders, billers and QA staff often work across cities, time zones and even countries. Remote flexibility is here to stay, and so is HIPAA. Here is a practical checklist to keep both.

## Administrative Safeguards

The administrative backbone of HIPAA applies to people and process, not just software.

- Signed Business Associate Agreements (BAAs) with every vendor touching PHI
- Documented workforce HIPAA training at hire and annually thereafter
- Role-based access policies: staff see only the PHI their function requires
- A written incident response plan with defined escalation paths
- Quarterly access reviews — remove accounts the day someone transitions off

## Technical Safeguards

Technical controls are where most remote breaches actually happen.

### Must-haves for remote billing teams

- Company-managed devices with full-disk encryption — no personal laptops for PHI
- Multi-factor authentication on every system that stores or transmits PHI
- VPN or zero-trust network access; never expose RDP or billing systems to the open internet
- Automatic screen lock and idle timeouts
- Audit logging on EHR and billing platforms, reviewed monthly

### Communication hygiene

- Only HIPAA-compliant platforms for email, messaging and file transfer
- No PHI in personal email, SMS or consumer chat apps — ever
- Encrypted, access-controlled file storage instead of local desktops

## Physical Safeguards — Even at Home

Physical safeguards apply at the kitchen table too.

- Private workspace where screens are not visible to household members
- Privacy filters on laptop screens for staff in shared living spaces
- Printed PHI prohibited; shredding policies for anything that slips through
- Device inventory tracked, with immediate remote-wipe capability

## Common Gaps We See in Audits

- Staff forwarding Explanation of Benefits to personal email "to work later"
- Shared logins for billing software "to save on licenses"
- Offboarding done in bulk monthly instead of same-day
- BAAs missing with small vendors like transcription or courier services

## The Bottom Line

HIPAA compliance isn't a certificate on the wall — it's a living system of controls that adapts to how your team actually works. Remote operations raise the bar, but with disciplined safeguards, your billing workflow can be both flexible and audit-ready.

Want an objective look at your billing operation's compliance posture? Request a [free audit](/free-billing-audit) from our compliance team.`,
  },
  {
    title: 'Home Health NOA and Hospice NOE: The 5-Day Deadline You Cannot Miss',
    slug: 'home-health-noa-noe-5-day-deadline',
    excerpt: 'Miss the CMS Notice of Admission or Notice of Election window and the entire episode is at risk. Here is the filing timeline, the penalties and a proven 48-hour workflow.',
    category: 'Compliance',
    tags: ['noa', 'noe', 'home health', 'hospice', 'cms', 'compliance'],
    author: 'MBX Solutions',
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80&auto=format&fit=crop',
    content: `Every home health and hospice agency knows the rule: the Notice of Admission (NOA) for home health and the Notice of Election (NOE) for hospice must reach CMS within **5 calendar days** of the start of care or the date of hospice election.

What many agencies do not realize is how unforgiving that window is. It is calendar days, not business days. It does not pause for weekends. And a late notice does not trigger a small penalty — it can cost you the **entire payment for that 30-day period**.

## What the Deadline Actually Costs

CMS treats a missing or late NOA/NOE as a failed certification. The practical consequence is severe:

- The agency is not paid for the first 30-day period of the episode
- A subsequent certification request (NCR) or medical review can extend the hold
- Repeated late notices trigger escalating audit scrutiny
- In hospice, a late NOE can make the patient ineligible for the hospice benefit entirely

The math is brutal. A single missed notice on a $3,500 episode is $3,500 of unbilled revenue — and it repeats every period for the life of that patient.

> A late NOA is not a paperwork error. It is a payment denial waiting to happen, and it compounds every 30 days the patient stays in your care.

## Home Health NOA: The Filing Timeline

The NOA must be filed for every start of care, and for any change in patient status that affects payment.

1. **Day 0** — Start of care. Verbal notice to the patient and caregiver is given, and the NOA is created in the billing system
2. **Within 48 hours** — NOA transmitted to the MAC (Medicare Administrative Contractor)
3. **By Day 5** — Hard deadline. After this, the claim risks denial

A detail that trips agencies up: the NOA is required even when the patient is admitted from a referral source. There is no exemption for "the hospital was supposed to handle it."

## Hospice NOE: Separate Rules, Same Urgency

Hospice elections follow their own sequence, and the order matters.

- The **NOE** must be filed within **5 calendar days** of the date of election
- A **3-day/respite** admission follows the same NOE requirement as a routine admission
- **Beneficiary-elected** and **provider-elected** cases have different documentation paths but the same filing clock
- Changing the primary diagnosis mid-episode does **not** require a new NOE, but changing the **level of care** does trigger updated election paperwork

Our [home health and hospice billing team](/home-health-hospice) treats the NOA and NOE as the first task on every admission, not a task that happens after the clinical paperwork is done.

## The 48-Hour Workflow That Works

Agencies that consistently hit the deadline share one operating pattern: the billing team is notified **before** the clinical documentation is complete.

1. **Admission coordination alerts billing directly.** A notification fires the moment the referral is accepted, not when the first visit is finished
2. **NOA/NOE is pre-populated** from referral data — name, Medicare number, start date, agency NPI — so filing is a review, not a data-entry project
3. **A compliance calendar tracks every episode.** Each open case has a countdown to its day 5, visible to the whole team
4. **Daily exception review.** Any episode without a transmitted notice is escalated the same day, never the next week

> The agencies that miss deadlines are not the ones that lack knowledge. They are the ones where billing finds out late.

## Four Mistakes We See Repeatedly

- **Counting business days instead of calendar days.** A start of care on a Friday gives you until the following Wednesday
- **Waiting on the physician's signed order.** The NOA does not require the signed plan of treatment — the start of care date does
- **Forgetting the hospice NOE on a patient who "looked like" they were already enrolled.** Every new election needs its own notice
- **No tracking mechanism.** If your only safeguard is memory, you will eventually lose money

## How to Audit Your Own Compliance

Pull your last 60 days of admissions and check three things:

- Does every episode have a transmission date at or before day 5?
- What is your average days-to-file, and is any single case over 4?
- How many open episodes have no notice transmitted at all?

If you cannot answer those three questions quickly, you do not have visibility — and unseen risk is exactly the kind that shows up on an audit.

## The Bottom Line

The NOA and NOE deadlines are the cheapest revenue protection available to your agency. The work is small, the data already exists, and the downside of getting it wrong is an entire payment period.

If you want a third party to check your filing history and quantify what is sitting in that 5-day window, our compliance team will review your last 90 days at no cost. See how our [full RCM engagement](/rcm-services) covers compliance calendar management end to end.
`,
  },
  {
    title: 'PDGM Explained: How the Home Health Payment Model Actually Works',
    slug: 'pdgm-home-health-payment-model-explained',
    excerpt: 'PDGM replaced the four-case model in 2020 and rewards efficiency, not volume. Understand patient groups, the 30-day period and the factors that move your payment.',
    category: 'Industry News',
    tags: ['pdgm', 'home health', 'payment', 'cms', 'revenue cycle'],
    author: 'MBX Solutions',
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&auto=format&fit=crop',
    content: `If you bill home health, you have almost certainly heard the acronym PDGM more times than you wanted to. What matters is not memorizing the model — it is understanding which levers actually move your payment.

PDGM replaced the four-case prospective payment system on January 1, 2020. It pays agencies a fixed amount per 30-day period, and the amount is determined by **how sick the patient is** and **how much care they need** — not by how many visits you sent.

## The Two Axes That Drive Everything

Every 30-day PDGM payment calculation starts with two questions.

### 1. What is the clinical grouping?

The first axis is the **Clinical Grouping (CG)**, which categorizes the primary diagnosis into one of six groups:

- DG1 — Hearing, vestibular, and speech
- DG2 — Neuro
- DG3 — Respiratory
- DG4 — Skin, subcutaneous tissue, and musculoskeletal
- DG5 — Diabetes
- DG6 — Gastrointestinal, genitourinary, and metabolic

The CG is driven by the principal diagnosis. A vague or unspecified principal diagnosis often lands the patient in a group that **understates** severity — and underpayment follows.

### 2. How much resource is being used?

The second axis is the **Case Mix Group (CMG)**, which scores the severity within that Clinical Group using four further factors:

- **Admission source** — the referral origin
- **Wound status** — presence and stage
- **Activities of Daily Living (ADL)** — functional scoring
- **Homebound status** — and the justification for it

> PDGM does not pay for effort. It pays for measured clinical severity. Undocumented severity is unpaid severity.

## The 30-Day Period Changes Everything

PDGM pays in **30-day periods** rather than episodes. A 120-day patient generates roughly four payment periods, and each one is scored independently.

This has three consequences agencies regularly underestimate:

1. **OASIS timing is critical.** The assessment drives the payment calculation, so a late or inaccurate OASIS directly reduces the payment for that period
2. **Patient improvement can reduce payment.** A patient who genuinely improves scores lower severity. That is a good clinical outcome and a lower payment — agencies need to plan for it
3. **A hospital readmission creates a new, lower-scoring period.** Post-acute patients are not automatically sicker, and treating them as if they are does not help

## The Behavioral Assumption Adjustment

CMS calculates an assumed amount of behavioral savings across all home health agencies, then applies a **permanent reduction** to every agency. The adjustment rose each year through the initial phase-in and continues to be recalculated.

The practical implication: your *net* payment per period is lower than your base case-mix weight suggests. Budgeting off the raw CMG weight without the adjustment is the most common modeling error we see.

## What Actually Moves Your Payment

In descending order of financial impact:

1. **Principal diagnosis specificity.** More specific codes land patients in higher-scoring groups
2. **Accurate ADL scoring.** Under-coded ADLs are the most common silent leak
3. **Wound documentation.** Staging errors cut the CMG directly
4. **Admission source accuracy.** Miscoding this shifts the score
5. **Visit pattern discipline.** Visits beyond what the model supports are not paid for

> The first four are documentation and coding problems. The fifth is a discipline problem. None of them require sending more visits.

## Where Most Agencies Lose Money

Across the accounts we review, three failure patterns show up repeatedly.

### Underspecified diagnoses

"Unspecified" codes are convenient and they are expensive. A specific principal diagnosis can change the Clinical Group entirely.

### OASIS submitted late or corrected after the fact

Corrections after submission frequently arrive too late to affect the payment period they should have influenced.

### Homebound justification that does not hold up

Homebound status is scored, and weak justification is visible in review. Our [certified coding team](/home-health-hospice) documents the narrative support for homebound status as part of the coding pass, not as an afterthought.

## Using PDGM Data Deliberately

A mature operation does not treat PDGM as an accounting exercise. It treats it as a feedback loop:

- Track payment variance per CMG to find where documentation and payment disagree
- Compare your case-mix distribution against similar agencies in your region
- Review every negative or low-scoring period at recertification, not at year end
- Feed denial reasons back into documentation training

## The Bottom Line

PDGM rewards accurate clinical documentation and disciplined resource use. The agencies doing well are not the ones sending the most visits — they are the ones whose documentation matches the severity of their patients.

Our [RCM team](/rcm-services) scores every PDGM period and reviews coding and OASIS against the payment outcome. If you want an outside read on where your case-mix is leaking money, request a [free 90-day audit](/free-billing-audit).
`,
  },
  {
    title: 'A/R Aging Explained: How to Recover Stuck Receivables Before Appeal Windows Close',
    slug: 'ar-aging-recovery-appeal-windows',
    excerpt: 'Not all aged receivables are lost. A breakdown of A/R aging buckets, the appeal deadlines inside each one, and the recovery order that actually returns cash.',
    category: 'Billing',
    tags: ['accounts receivable', 'ar aging', 'denials', 'recovery', 'billing'],
    author: 'MBX Solutions',
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80&auto=format&fit=crop',
    content: `An aging report is a list of money you are supposed to have. The problem is that the report itself does nothing — the value is entirely in how you work it.

Most practices look at aging the same way: a single total, a general sense that it is too high, and no system for prioritizing. The result is that the easiest money is never worked and the hardest money gets attempted first.

## What the Aging Buckets Actually Mean

Standard aging buckets are not arbitrary. Each one carries different payer behavior and different recovery odds.

### 0–30 days

These are working as intended. Payment has not yet come due, or the claim is in the adjudication window. **No action needed** — other than confirming nothing has stalled abnormally.

### 31–60 days

This is your **early warning zone**. Most claims sitting here are stuck for a fixable reason: a missing authorization, a rejected claim that was never reworked, or a claim that was never submitted at all.

> A claim that reaches 60 days without resolution is almost never going to resolve on its own. This bucket is where recovery is cheapest.

### 61–90 days

The most common source of **preventable write-offs**. Payer appeal windows for many claims are 90–120 days from the date of service. Money in this bucket is still recoverable — but only if it is being actively worked.

### 91–120 days

You are now working against the clock. Appeal deadlines are tightening, and some payers require escalation to a provider relations representative rather than a standard appeal.

### 120+ days

Recovery is possible but expensive. These balances need root-cause analysis, not a resubmission. They also deserve a candid internal conversation about which payers and which workflows are responsible.

## The Appeal Windows Everyone Forgets

This is where most practices leak money without realizing it. Timely filing rules and appeal deadlines are **different clocks running in parallel**.

- Medicare claims generally must be filed within **12 months** of the date of service
- Many commercial payers allow **90–180 days** to appeal a denial
- Corrected claims can often only be submitted **once per claim**
- Some payers strip a claim from the aging report entirely once it is denied, so it vanishes from view while remaining uncollected

That last point is critical. A denied claim that drops off the aging report has not been resolved. It has been hidden. Our [old A/R recovery process](/capabilities) starts by reconciling the **remittance and clearinghouse data** to surface balances the aging report is not showing you.

## The Recovery Order That Works

Working newest-oldest is backwards. Work in this order instead:

1. **Claims never submitted.** These are the easiest money on the report. Find them in the clearinghouse rejection files
2. **Claims denied for correctable reasons.** Wrong code, missing modifier, authorization not on file — resubmit or correct
3. **Claims denied for clinical or medical necessity reasons.** These need documentation rebuild and a formal appeal
4. **Claims with no response at all.** These need payer escalation, not a form
5. **Balances past 120 days with no clear owner.** Assign ownership and set a recovery target, including a write-off decision

> The discipline that matters most is a 48-hour rework standard. Aged denials lose appeal windows, and a denial worked on day 60 is worth far more than the same denial worked on day 100.

## Three Metrics Worth Watching

If you track nothing else, track these three weekly.

### Rework velocity

Average days from denial receipt to corrective action. Anything above 7 days is a systemic problem, not a staffing problem.

### Denial rate by root cause

Tag every denial by cause and review the trend monthly. Most practices find that three causes generate 80% of denials, which makes the fix list short and specific.

### Over-90 balance as a percentage of total

This is the honest measure of revenue-cycle health. If this number is not trending down quarter over quarter, the operation is not improving regardless of how good new billing looks.

## Where to Start This Week

1. Export your aging report as of 90 days ago and as of today, and reconcile the difference
2. Pull your clearinghouse rejection file and count claims that were **never** accepted
3. Pull every denial from the last 60 days and tag it by root cause
4. Calculate total balance in the 91+ bucket and identify the three payers responsible for most of it

## The Bottom Line

A/R aging is not a reporting problem, it is a **work-order system**. Practices that treat it as a queue with owners, deadlines and a standard rework time recover materially more money than practices that treat it as a number in a monthly meeting.

If you want an independent count of what is recoverable in your aging report, we will review your last 90 days and tell you specifically what is there. Start with a [free 90-day A/R audit](/free-billing-audit).
`,
  },
  {
    title: 'Clean Claim Rate: What It Means and How to Actually Improve It',
    slug: 'clean-claim-rate-benchmarks',
    excerpt: 'A clean claim rate above 95% is achievable — and most practices do not know their own number. Here is how to measure it, and the five checks that move it.',
    category: 'Billing',
    tags: ['clean claim rate', 'claim scrubbing', 'denials', 'billing', 'first pass'],
    author: 'MBX Solutions',
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80&auto=format&fit=crop',
    content: `"What is your clean claim rate?" is one of the most revealing questions you can ask a medical billing operation — because most practices cannot answer it.

They know their denial rate. They rarely know the number that actually predicts it.

## Defining the Metric That Matters

A **clean claim rate** is the percentage of claims accepted by the payer **on first submission**, with no rejection, no denial and no rework required.

The formula is straightforward:

- **Clean claim rate = (claims paid or pending on first pass ÷ total claims submitted) × 100**

The number that gets confused with it is first-pass **resolution**, which allows a claim to be corrected and re-submitted once and still count. Both are useful, but they measure different things and mixing them makes a 97% number meaningless.

> If you do not measure the clean claim rate, you are managing denials reactively instead of preventing them structurally.

## Why 95% Is the Line

The reason 95% matters is arithmetic, not fashion.

At a 98% clean claim rate, 2 out of every 100 claims need rework. At 90%, 10 do. On a monthly volume of 2,000 claims that is a difference of 160 claims requiring staff time, follow-up and delay — every single month.

Benchmarks vary by specialty, but as a general rule for professional claims:

- **95%+** — strong, and the practical target for most operations
- **90–95%** — average, and usually hiding a specific fixable problem
- **Below 90%** — a process issue, not a people issue

One caveat worth stating plainly: home health and hospice are not directly comparable to physician professional claims. UB-04 institutional claims under PDGM face a different validation chain. Use physician benchmarks for physician billing and evaluate home health and hospice against their own trending.

## The Five Checks That Move the Number

### 1. Validate before you submit

A claim scrubber should check for the errors that account for most rejections: missing or invalid patient identifiers, date-of-service mismatches, unbilled diagnosis, authorization not on file, and modifier errors.

> The single highest-leverage control in the entire revenue cycle is a scrub that runs **before** the claim leaves your building.

### 2. Confirm eligibility while the visit still matters

An eligibility check performed 30 days after the date of service is a documentation exercise, not a verification. Front-end checks catch problems while they are still fixable.

### 3. Get authorization before the service, not after

Authorization is the most common correctable denial in outpatient billing, and it is entirely preventable. Build it into intake with an escalation path for cases that come back urgent.

### 4. Audit a real sample

Pull 50–100 claims, check each against the documentation and the payer edits, and categorize every defect you find. This produces an actual defect rate instead of a guess.

### 5. Feed denial data back into the process

Denial reason codes are free root-cause analysis. If one reason represents 20% of your denials, fixing that single cause is a bigger win than any other project on the list.

Our [claim scrubbing and submission workflow](/rcm-services) applies all five, and the numbers land in your [weekly reporting](/software) so you can see movement rather than take it on faith.

## What Actually Causes a Low Clean Claim Rate

Across the operations we audit, the causes are rarely exotic.

- Charge entry happens days after the encounter, so documentation has moved on
- One person does coding, entry and review — so the same blind spot repeats
- No pre-submission scrub, so errors are found by the payer instead of internally
- Denials are categorized as "other" because nobody owns the taxonomy
- The staff reworking denials is not the same staff producing them, so the feedback loop is broken

> A clean claim rate improves fastest when the person who fixes a denial is the same person who will prevent the next one.

## The Connection to A/R Aging

Clean claim rate and aging move together. A claim that is clean on first submission pays inside the payer's normal cycle — typically 14 to 30 days. A claim that gets denied does not merely cost you the payment; it costs you **45 to 90 additional days** of delay for the same dollar.

That is why improving the clean claim rate shows up twice: once in collected revenue, and again in days-in-A/R.

## How to Measure It This Week

1. Ask your clearinghouse for a first-pass report for the last 90 days
2. Calculate the clean claim rate by service line, not just in total
3. Pull every rejection code and every top-5 denial reason
4. Identify the single largest defect and assign an owner to fix it this month

## The Bottom Line

The clean claim rate is the most actionable single number in a revenue cycle. It is measurable today, it has a clear benchmark, and it responds quickly to focused effort.

If you do not currently know your number, that is the right place to start. Our [free 90-day audit](/free-billing-audit) calculates it for you and identifies the specific defects driving it.
`,
  },
  {
    title: 'Physician Credentialing and CAQH: Why Providers Get Paid Late',
    slug: 'physician-credentialing-caqh-payment-delays',
    excerpt: 'A clean claim that should pay in 20 days can sit unpaid for three months because enrollment never completed. A practical look at the credentialing bottlenecks that cost providers real money.',
    category: 'Compliance',
    tags: ['credentialing', 'caqh', 'enrollment', 'payer', 'revenue cycle'],
    author: 'MBX Solutions',
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80&auto=format&fit=crop',
    content: `Ask a practice manager why revenue is behind and they will usually blame coding, the payer, or patients. In a surprising number of cases the actual cause is that **the provider was never properly enrolled with the payer in the first place**.

Credentialing is the least glamorous part of revenue cycle management and the one with the longest delay between the error and the financial consequence.

## The Enrollment Lifecycle

Before a provider sees a single paid claim from a payer, a chain of steps has to complete:

1. **CAQH profile** — the provider's data attested and attested to
2. **Payer application** — the provider applies, sometimes through a delegated entity
3. **Primary source verification** — the payer independently confirms identity, training and malpractice history
4. **Credentialing decision** — a committee reviews and approves or denies
5. **Contracting** — fee schedule terms are established
6. **Effective date assignment** — and only now do claims actually pay

Each step can stall, and several commonly stall simultaneously.

> A provider can submit perfect claims for four months and see every single one deny for the same reason: the provider number was not effective on the date of service.

## Where It Actually Breaks

### The CAQH profile is incomplete or stale

This is the most common failure, and it is entirely preventable. Profiles go stale because re-attestation is missed, a malpractice carrier changed, or a new license was added and never attested.

Symptoms include: applications rejected for "incomplete information," or processing that mysteriously stops partway through.

### The effective date is backdated incorrectly

Providers often expect coverage to begin when they start seeing patients. Payer effective dates frequently land earlier — sometimes the date of an old application, sometimes the date the group contract was signed. Claims billed before the true effective date are denied as "provider not enrolled on date of service."

### Group and individual enrollment are confused

A provider can be correctly enrolled individually and **still** have no in-network status with a specific group. This is a common source of denials that survive several rounds of re-submission.

### Re-credentialing cycles lapse

Insurance carriers change, hospitals re-appoint, and payer cycles recur every two to three years. Missed re-credentialing can strip network status without a single claim being denied in advance.

### Delegated credentialing adds a step

If you use a management services organization, one more party sits between you and the payer. That is not a problem in itself, but it means status is only visible by asking — and nobody asks until a claim does not pay.

## The Cost of a Credentialing Delay

The impact is not just delayed payment, it is delayed payment **with full administrative cost already incurred**.

- Staff time spent rebilling and appealing
- Patient balances incorrectly written to the patient
- Contracting and referral relationships damaged during the gap
- Cash flow planning disrupted, because the revenue was already budgeted
- In some cases a retroactive correction is requested and must itself be appealed

> The most expensive claim in a practice is often not a complex one. It is a simple claim for a provider whose enrollment took an extra 90 days to resolve.

## A Workflow That Prevents This

Our [credentialing service](/services) runs a checklist rather than a queue, and the difference is measurable.

1. **CAQH attestation on a 90-day cadence.** A recurring calendar entry, not a reminder triggered by a rejection
2. **Onboarding triggered at contract signature**, not at the first rejected claim
3. **Effective dates captured in a central tracker** with the group and individual enrollment status recorded separately
4. **Status verified in writing with the payer.** A call is not documentation; a confirmation is
5. **Payer representative relationships maintained**, so escalation is a conversation rather than a queue
6. **Re-credentialing calendared for the whole provider panel** on a rolling basis

## Questions to Ask Your Payers

These four questions resolve most credentialing problems in a single conversation:

- What is my provider's **effective date** for each service location?
- Is the provider enrolled **individually and through the group**, or only one of the two?
- What specific documents are outstanding, if anything?
- What is the status of the application, and who owns it at your organization?

Write the answers down. The status of a credentialing application should never live only in somebody's inbox.

## The Bottom Line

Credentialing problems are slow, quiet and expensive. They are also almost entirely preventable with a tracked, calendar-driven workflow and one point of accountability.

If you suspect an enrollment gap is affecting your collections, our [free 90-day audit](/free-billing-audit) will trace denial reasons to the specific provider and payer combinations responsible.
`,
  },
  {
    title: 'ERA and EOB Posting: Closing the Gap Between Payment and Your Ledger',
    slug: 'era-eob-posting-reconciliation-guide',
    excerpt: 'Money arrives but the ledger does not match. How to set up electronic remittance posting and reconciliation so every payment is accounted for.',
    category: 'Billing',
    tags: ['era', 'eob', 'reconciliation', 'payment posting', 'billing'],
    author: 'MBX Solutions',
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=crop',
    content: `A practice can be paid correctly and still not know it. That gap between the remittance and the ledger is where revenue quietly disappears.

The reason is usually that posting is treated as a data-entry task rather than a reconciliation process. Data entry records what arrived. Reconciliation confirms that the ledger is right — and those are different jobs.

## ERA and EOB: What Each One Is

### EOB — Explanation of Benefits

The human-readable explanation the payer sends, or that appears in the portal. It tells you what was billed, what the payer allowed, what they paid and what they owe the patient.

It is essential for patient balances and for appeal decisions, and it is awkward to reconcile in volume.

### ERA — Electronic Remittance Advice

The machine-readable version of the same information, in a standard X12 835 format. It carries the same detail as the EOB in a format a system can actually process.

Once ERA posting is automated, payment posting stops being a data-entry backlog and becomes a verification step.

> A practice that reconciles ERA against the bank deposit will never have a mystery variance. A practice that does not will eventually find one and have no way to reconstruct what happened.

## Why Posting Falls Behind

In most operations the same causes repeat:

- **Manual entry at volume.** Pasting from an EOB into a practice management system is slow and error-prone, and it guarantees a backlog
- **No daily deposit matching.** Without matching the deposit total to remittances, gaps are invisible
- **Multiple payers, multiple formats.** Paper from one payer, portal from another, ERA from a third
- **Takeback and adjustment confusion.** Contractual adjustments, patient responsibility and prior payments are applied inconsistently
- **Staff turnover losing the context.** The person who knew the quirks of one payer is gone

## A Reconciliation Process That Holds

The reliable pattern has four parts, done daily.

### 1. Match the deposit

Every remittance advice is tied to a specific deposit. Start by confirming that the total remitted equals the total deposited. A mismatch here is the most valuable signal you will get all day.

### 2. Auto-post, then review exceptions

Let ERA data post automatically, then route only the exceptions to a human: zero-paid claims, adjustments outside expected range, denials, and any payment for a claim not on the open aging report.

### 3. Route the patient portion correctly

The payer determines what the patient owes. That amount should flow to patient statements automatically, with your office statement policy applied consistently. Manually re-deriving patient responsibility is a common source of both billing errors and angry calls.

### 4. Reconcile the clearinghouse daily

This is the step most practices skip, and it is the one that catches real money. Compare what you **submitted** against what was **accepted**, and investigate anything rejected or dropped.

> Submission-to-acceptance reconciliation finds claims that never existed as far as the payer was concerned. Without it, those claims never appear in an aging report — they are simply absent.

## Variables That Are Not Errors

Some ledger variance is expected and should be defined in advance so staff do not chase it.

- **Takebacks and recoupments** — the payer recovers previously paid money
- **Coordination of benefits** — a second payer pays after the first
- **Attachments and supporting documentation** — held pending receipt
- **Capitation and per-member amounts** — not tied to a specific claim

The point is not to eliminate these. It is to classify them consistently so a real variance stands out.

## Three Numbers Worth Watching

### Days in A/R

The most visible measure of posting health. A rising number usually means the posting function is behind the billing function.

### Credit balance at month end

A credit balance that grows without explanation means somewhere, a payment is being applied to the wrong account. This is a patient-trust issue as much as a revenue one.

### Unapplied cash

Payments received but not allocated to a specific account. It should be near zero at any month end. A growing balance is the clearest sign that reconciliation has lapsed.

## What to Automate First

If your operation is not yet automated, the sequence that pays off fastest:

1. ERA **retrieval and posting** for your highest-volume payers
2. **Deposit-to-remittance matching** as a daily control
3. **Patient statement** generation with the payer's responsibility applied
4. **Clearinghouse reconciliation** to surface never-submitted claims
5. **Denial reason categorization** feeding back into prevention

Our [payment posting and reconciliation](/capabilities) covers all five, with exception-based review so staff time goes to problems rather than data entry.

## The Bottom Line

Every dollar that arrives and is not correctly reflected in your ledger is a dollar you will eventually write off or chase. Automated ERA posting with daily reconciliation turns payment posting from a bottleneck into a control.

If your ledger does not currently tie out to your deposits, that gap is measurable. A [free 90-day A/R audit](/free-billing-audit) will quantify it precisely.
`,
  },
  {
    title: 'Prior Authorization: A Practical Workflow for Practices That Hate It',
    slug: 'prior-authorization-workflow-guide',
    excerpt: 'Prior authorization is the most preventable denial in outpatient billing. Here is a workflow that gets authorization before the service instead of after the denial.',
    category: 'Operations',
    tags: ['prior authorization', 'workflow', 'denials', 'operations', 'billing'],
    author: 'MBX Solutions',
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=1200&q=80&auto=format&fit=crop',
    content: `Prior authorization is universally disliked and almost universally treated as an interruption to real work. It is also the single most preventable denial category in outpatient billing, which makes it a strange thing to leave unmanaged.

The reason it stays painful is structural: authorization work is triggered by urgency rather than by process, so it gets done badly under time pressure and then reworked twice.

## Why It Fails So Often

Authorization failures cluster into a few repeatable causes.

### It is requested too late

If the request goes in the day before the procedure, there is no room for a peer-to-peer call, a fax that does not arrive, or a payer portal that rejects the submission.

### Clinical documentation is not assembled with the request

Payers deny for missing records far more often than for clinical insufficiency. A request without recent notes, relevant history and the correct codes is a request designed to be denied.

### The wrong codes are submitted

Authorization must be requested for the **exact** procedure and diagnosis codes that will be billed. Approving a different CPT than the one billed is an automatic denial.

### Expiration is not tracked

An approved authorization is not permanent. Most expire after a set number of days or a set number of visits, and using an expired authorization is treated exactly like having no authorization.

### Nobody owns the queue

If authorization is everyone's job, it is no one's job, and the work surfaces at the point of service.

> Prior authorization fails the same way every time: it is discovered late, requested under pressure, and chased after the service has already happened.

## A Workflow That Actually Works

### Put authorization in the pre-visit window

The right time to request authorization is when the service is **scheduled**, not when it is imminent. Build a trigger so that scheduling a procedure automatically creates an authorization task with a due date.

### Assemble the packet before you submit

A complete first request is the cheapest request you will ever send. Standardize what goes in it:

- Current diagnosis codes and the procedure code to be performed
- Recent clinical notes supporting medical necessity
- Relevant imaging, lab results or prior treatment history
- Provider credentials and the specific location where service will occur
- The correct payer portal, fax number or EDI channel

### Confirm receipt, then confirm approval

A submission receipt is not an approval. Log the confirmation number and the expected response date, and set a follow-up for anyone who has not responded.

Our [virtual medical assistant service](/medical-assistant) takes this off the front desk entirely, which is usually where the bottleneck actually sits.

### Build the expiry into the schedule

Store the authorization number, approved units, and expiration date where the scheduling system can see them. Flag the appointment when the authorization is close to expiring or already used up.

### Route peer-to-peer calls well

When a payer requires a peer-to-peer conversation, the call should reach the **clinician who can speak to medical necessity** with the chart open in front of them. Routing these to a biller without clinical context is why so many fail.

## Measuring Whether It Is Working

Track these four numbers, monthly.

### Authorization approval rate on first request

Below 90% means the packets are incomplete. This is the most direct measure of front-end quality.

### Authorization-related denial rate

This is the number that shows up in revenue. It should trend toward zero as the workflow improves.

### Average days from request to approval

A rising number means payers are slowing down or your packets are being resubmitted. Either way it predicts scheduling problems three weeks out.

### Cost per authorized visit

Authorization has a real labor cost. Once you know it, you can make informed decisions about how much clinical effort to invest in a given procedure.

## A Note on Home Health and Hospice

Authorization in home health and hospice works differently and deserves separate handling.

- **Hospice** requires a physician or practitioner certification rather than a payer-style prior authorization
- **Home health** requires a plan of care and physician orders, and face-to-face encounter requirements have their own strict timing
- **Face-to-face encounter** documentation must support the coding and must be completed within the required window — this is a common denial trigger and it is a scheduling problem as much as a documentation one

Our [home health and hospice billing team](/home-health-hospice) treats these as tracked compliance tasks with their own calendars rather than as authorization tickets.

## The Bottom Line

Prior authorization is a workflow problem wearing a clinical costume. Move it earlier, standardize the packet, confirm receipt, track expiry, and measure the first-request approval rate.

If your denial report shows a meaningful authorization share, that is recoverable revenue sitting in identifiable categories. Our [free 90-day audit](/free-billing-audit) will quantify it against your actual denial data.
`,
  },
  {
    title: 'Net Collection Rate Benchmarks: What to Target and How to Get There',
    slug: 'net-collection-rate-benchmarks',
    excerpt: 'Net collection rate is the most honest number in a revenue cycle. Here are realistic benchmarks, what moves them, and how to find the balance hiding in your report.',
    category: 'Billing',
    tags: ['net collection rate', 'benchmarks', 'revenue cycle', 'billing', 'performance'],
    author: 'MBX Solutions',
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&q=80&auto=format&fit=crop',
    content: `Gross collections tell you what you billed. Net collections tell you what you kept. Only the second number reflects the actual performance of your billing operation.

Net collection rate is the standard measure — and the one most practices cannot currently produce on demand.

## The Formula

**Net collection rate = (payments ÷ (charges − contractual adjustments)) × 100**

The subtlety is in the denominator. It is charges **after contractual adjustments** — the amount the payer was contractually obligated to pay. That is what you should have collected.

A practice billing $1,000,000 with $400,000 in contractual write-offs, receiving $540,000, has a net collection rate of 90%. It looks like a 54% gross rate, which sounds alarming and tells you nothing.

> Net collection rate measures only the things you can actually control: denials, underpayments, coding errors and uncollected patient balances.

## Realistic Benchmarks

Benchmarks shift by specialty, payer mix and geography, so treat these as orientation rather than targets to hit at any cost.

- **95%+** — genuinely strong performance, consistently achieved by mature operations
- **90–95%** — healthy and typical of a well-run practice
- **85–90%** — average, and usually indicates recoverable leakage
- **Below 85%** — a system problem with significant money attached to it

Two important caveats. Practices with a high Medicare percentage often see lower net rates because Medicare applies coinsurance and deductibles that patients rarely pay. And emergency care sees a different patient-balance reality than a scheduled procedure. Compare yourself against practices with a **similar payer mix**, not against a national average.

## What Moves the Number

### Denial rate and rework discipline

Every denial is a direct hit to net collection, and every denial also adds days in A/R. Reducing denials improves both the rate and the velocity.

### Underpayment detection

This is the most commonly missed opportunity. If nobody compares what the payer **paid** against what the contract says they **owed**, small underpayments accumulate invisibly across thousands of claims.

> Contract variance is the quietest form of revenue loss. A 3% underpayment on every claim looks like a rounding error on one claim and a full-time salary across a year.

### Patient balance management

Balances sitting uncollected because nobody followed up on them will not resolve themselves. The question is whether you have a consistent, tiered follow-up process.

### Credentialing accuracy

A provider not enrolled with a payer does not pay, and those claims eventually age out entirely. This quietly suppresses net collection rate more than any single other factor.

### Charge capture

Services performed but never billed are revenue that never appears anywhere — not in charges, not in collections, and not on a report you would think to check.

## Four Numbers to Run Before Anything Else

Before changing anything, produce these from your last full quarter.

### 1. Net collection rate overall

The headline number. If you cannot produce it, that is the first problem to solve.

### 2. Net collection rate by top five payers

Overall numbers hide offsetting problems. A payer paying well can mask a payer paying badly, and blended rates are deceptive.

### 3. Denial rate as a percentage of claims submitted

The best single predictor of future net collection performance. Track it monthly, not quarterly.

### 4. Days in A/R

Net rate says how much you kept. Days in A/R says how fast it arrived. Both matter, and they often move together.

## Connecting Back to Denials

The most useful relationship in a revenue cycle is between denial rate and net collection rate.

As a rough model: if a payer denies 10% of claims and you rework 6 of those 10 successfully within the appeal window, your effective loss is 4% of charges. That single number explains most of the gap between a 90% and a 95% net collection rate.

Which means **denial prevention is the highest-leverage work available** — not because it sounds important, but because it is arithmetically the largest recoverable category.

## Benchmarking Honestly

The most common benchmarking error is comparing a mature operation to an average one and concluding the gap is talent. It is usually structure.

Before concluding that your team is underperforming, rule out the structural explanations:

- Is the aging report complete, or are denied claims dropping out of it?
- Is underpayment being checked at all?
- Are patient balances being worked consistently?
- Is every provider correctly enrolled with every payer they bill?

Once those four are confirmed, the remaining gap genuinely is process and performance — and that is where process improvement pays off.

## The Bottom Line

Net collection rate is the most honest number in a revenue cycle, and most practices cannot produce it quickly. Getting accurate is the first win; improving it follows from denial reduction, underpayment detection and disciplined patient balance follow-up.

Our [RCM engagements](/rcm-services) report this metric with your payer-level detail, so you can see exactly where it moves. To find out what your real number is and what is holding it back, start with a [free 90-day audit](/free-billing-audit).
`,
  },
  {
    title: 'Outsource Medical Billing or Hire In-House: An Honest Comparison',
    slug: 'outsource-vs-in-house-medical-billing',
    excerpt: 'Both models can work. Here is a framework for deciding which fits your practice — with the real cost lines most comparisons leave out.',
    category: 'Industry News',
    tags: ['outsourcing', 'in-house', 'rcm', 'decision', 'billing'],
    author: 'MBX Solutions',
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80&auto=format&fit=crop',
    content: `We are a billing company, so we are not a neutral source on this question. What we can do is lay out the decision honestly, including the cases where in-house is genuinely the better answer.

The choice is not really outsourcing versus in-house. It is **who carries the risk, who carries the cost, and who carries the accountability** for collections.

## What In-House Actually Costs

The salary is the visible line. It is rarely the largest one.

- **Salary and benefits** — a competent biller is $55,000–$75,000 depending on region and experience
- **Payroll taxes and benefits** — commonly 20–30% on top of salary
- **Software and clearinghouse fees** — practice management, claim scrubbing, ERA posting, phone system
- **Education and certification** — coding credentials, continuing education, payer updates
- **Physical workspace and equipment** — desk, monitor, phone, secure record storage
- **Backfill coverage** — PTO, illness, turnover, and the cost of hiring when someone leaves

Against that, a new biller rarely produces full value in the first 90 days. Realistic ramp time is three to six months.

> Add it up honestly and a single experienced in-house biller commonly costs $85,000–$110,000 fully loaded — before you have measured what they actually collect.

### The volatility problem

One person carries a lot of risk. If that person leaves, the billing function stops until a replacement is hired and trained, and knowledge of payer quirks, claim history and patient balances leaves with them. During that gap, denials and A/R age with nobody working them.

### The coverage ceiling

One person cannot be deeply good at coding, credentialing, denial appeals, A/R follow-up and patient balances simultaneously. Something gets the least attention, and it is usually the least visible work — which is A/R.

## What Outsourcing Actually Costs

- **Fees** — commonly a percentage of net collections, or a fixed monthly amount
- **Transition effort** — historical data migration, staff retraining, workflow documentation
- **Loss of internal knowledge** — if your current team had undocumented payer relationships, that context needs explicit transfer
- **Oversight time** — a good RCM partner still requires someone internally to review reports and escalate

## The Case for Staying In-House

In-house is the better answer when several of these are true:

- Very low claim volume — a few claims a week does not justify a full team
- Highly specialized billing you already know cold
- A biller who is genuinely excellent and wants to stay
- Tight control over every patient-facing interaction
- Transition risk that would outweigh the savings

> Outsourcing is not automatically better. For a small practice with low volume and a strong existing biller, keeping that person is often the correct call.

## The Case for Outsourcing

Outsourcing tends to win when:

- **Volume is high enough** that you would otherwise need more than one person
- **The work has spread too thin** — coding, credentialing, denials and A/R all deserve attention
- **Turnover has been disruptive** — an agency absorbs resignations without stopping work
- **You lack visibility** — an experienced partner brings benchmarks you cannot generate internally
- **The economics have not been measured** — many practices have never calculated their true cost per claim

## The Comparison Most People Miss

The correct question is not "what would an agency charge me?" It is **"what is my cost per collected dollar, and what is my net collection rate?"**

| Measure | In-house | Outsourced |
|---|---|---|
| Fully loaded annual cost | Salary + benefits + software + space | Fee, often performance-based |
| Revenue risk carried by you | Entirely | Usually shared |
| Coverage when someone is out | Often none | Continuous |
| Payer and coding expertise | Depth in one or two areas | Broad across specialties |
| Benchmarks and visibility | Limited | Usually included |
| Time to full productivity | 3–6 months | 30–90 days to transition |

## Questions to Ask Any RCM Partner

Including us. These are the questions that reveal whether a partner will actually help.

1. What exactly is the fee structure, and what happens if collections go down?
2. Who specifically will work on my account, and what is their experience with my specialty?
3. What do you need from my staff, and how many hours per week is that?
4. What happens to my data if I leave — do I get it in a usable format?
5. How will we know it is working? What reports do I receive, and how often?
6. What is your implementation timeline, and what does the first 60 days look like?

## A Framework That Helps

1. **Get your current numbers.** Net collection rate, denial rate, days in A/R, aged balance. You cannot evaluate an alternative without a baseline
2. **Calculate your true cost per collected dollar.** Fully loaded cost divided by collections
3. **Model the improvement.** If the same operation ran at the benchmarks a mature RCM team typically achieves, what would the difference be worth?
4. **Run a 90-day audit.** Ours is free, and it gives you the baseline plus the specific defects to model against

## The Bottom Line

The honest answer is that there is no universally correct choice — there is only the choice that fits your volume, your staffing reality and your tolerance for risk.

If your numbers are strong and the team is stable, protect it. If the work has spread thin, turnover is disruptive, or you simply do not know your net collection rate, that is worth a serious conversation.

Start with the [free 90-day audit](/free-billing-audit) and compare what you find against what an [RCM engagement](/rcm-services) is likely to produce. The audit is useful whether you decide to hire us or not.
`,
  },
  {
    title: 'MIPS Reporting and Value-Based Care: A Billing Operations Guide',
    slug: 'mips-reporting-value-based-care-guide',
    excerpt: 'MIPS scoring affects what you are paid, and most practices treat it as a compliance chore. How billing and revenue cycle data already contains most of what you need.',
    category: 'Compliance',
    tags: ['mips', 'value based care', 'qpp', 'reporting', 'cms'],
    author: 'MBX Solutions',
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80&auto=format&fit=crop',
    content: `MIPS is frequently described as a reporting program. It is more accurately described as a **payment adjustment program** — one where failure to participate or perform adequately reduces reimbursement.

The uncomfortable part is that the data needed for the score already flows through your billing system. Most practices are paying penalties on information they are already generating and not capturing.

## The Four Performance Categories

MIPS scoring is built from four categories, each weighted for the current performance year.

### Quality

Sixty measures in the current framework, submitted as data. This is usually the largest category and the one practices are most anxious about.

Much of the underlying data — clinical quality measures tied to claims — can be derived from the billing data you already have. The work is extraction and validation, not new data collection.

### Improvement Activities

A menu of high-value activities, each with credits, scored on how many you complete. This is the easiest category to earn points in because it is largely attestation-based rather than data-based.

Many practices dramatically underperform here simply because nobody maps their current quality improvement work to the activity list.

### Promoting Interoperability

Measures how you use certified EHR technology: electronic prescribing, health information exchange, and document exchange.

This is a configuration and workflow question rather than a data question, and the score depends substantially on how your team actually uses the technology day to day.

### Cost

Based on your Medicare spend, so relevant to practices with significant Medicare volume. An efficient cost score can meaningfully offset a weaker quality score.

> Because the four categories are weighted rather than all-or-nothing, a practice that is average in everything frequently outscores a practice that is strong in one and weak in the others.

## The Structural Problem With MIPS

MIPS is a **heterogeneous program**. A four-physician internal medicine practice and a 40-provider multispecialty group face the same menu, but their realistic ceilings are completely different.

The result is that practices regularly compare scores to peers with completely different patient populations, specialties and payer mixes — and conclude they are failing.

A four-physician internal medicine practice and a 40-provider multispecialty group face the same menu, but their realistic ceilings are completely different.

## Where the Data Already Lives

This is the part worth internalizing: a significant portion of MIPS-relevant data already passes through the revenue cycle.

- Diagnosis and procedure codes on submitted claims
- Utilization patterns by condition
- Medicare spend by beneficiary
- Encounter volumes and visit types
- Telehealth utilization, now permanently weighted in many measures

> If your billing data is clean and your reporting is inconsistent, you have a data problem. If your billing data is inconsistent, you have a data problem that no amount of reporting discipline will fix.

That distinction matters. In our experience, MIPS struggles in billing operations usually trace back to coding and documentation quality rather than to an inability to pull numbers.

## A Practical Sequence

1. **Confirm your MIPS status and reporting pathway** — this determines what you are actually required to submit
2. **Get your Quality score baseline** for each measure you are scored on
3. **Audit the underlying data** against a sample of charts — this is where coding problems surface
4. **Map current quality improvement work to Improvement Activities** and claim what you already do
5. **Review EHR usage workflows**, since the interoperability score depends on actual use
6. **Set a re-measurement date** and repeat on a schedule, not annually at the deadline

## Where Billing Operations Contribute Directly

The revenue cycle influences MIPS outcomes more than most practices expect, largely through data quality.

- **Diagnosis coding completeness** drives several clinical quality measures
- **Accurate procedure coding** affects utilization and cost measures
- **Modifier accuracy** affects resource-use measures
- **Documentation support** determines whether clinical measures can be defended

Our [certified coding and compliance review](/hipaa) reviews documentation against the measures you are actually scored on, rather than reviewing charts in isolation.

## The Value-Based Trajectory

MIPS is a bridge, not a destination. The stated direction of CMS and other payers is toward **alternative payment models** where reimbursement is tied to quality and cost rather than volume.

Practices already operating under value-based contracts should assume their revenue cycle function will be asked for something it often cannot currently provide: **per-member cost analysis, quality outcome reporting, and total-cost-of-care attribution.**

Practices that build that capability now will be positioned for those contracts. Practices that wait will be renegotiating from a position of weakness.

## The Bottom Line

MIPS is a payment program, not a paperwork exercise, and the data to do well in it is largely data you already generate. The gap is usually extraction and discipline, not collection.

If you want to know how clean your underlying data actually is, that is exactly what a [revenue cycle audit](/free-billing-audit) measures. It is free, and the findings apply whether you participate in MIPS or not.
`,
  },
]


async function main() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('MONGODB_URI missing in backend/.env')
    process.exit(1)
  }
  await mongoose.connect(uri)
  console.log('Connected to MongoDB')

  // Remove old test/lorem posts (keep anything user created that looks intentional)
  const del = await Blog.deleteMany({
    $or: [
      { content: /ipsam suscipit/i },
      { content: /eveniet sunt/i },
      { content: /dolorum commodi/i },
      { content: /est non sint nesciun/i },
      { title: /^(Untitled|Test|Demo)/i },
    ],
  })
  console.log(`Removed ${del.deletedCount} test post(s)`)

  for (const post of posts) {
    const res = await Blog.updateOne(
      { slug: post.slug },
      { $set: post },
      { upsert: true }
    )
    const slug = post.slug
    if (res.upsertedCount) console.log(`Inserted: ${slug}`)
    else console.log(`Updated:  ${slug}`)
  }

  const total = await Blog.countDocuments()
  console.log(`Done. Total blog posts in DB: ${total}`)
  await mongoose.disconnect()
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
