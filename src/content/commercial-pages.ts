export interface CommercialFaq {
  question: string;
  answer: string;
}

export interface CommercialPage {
  slug: string;
  name: string;
  /** On-page H1. Can be longer and more descriptive. */
  title: string;
  /** <title> tag text, kept short so it is not truncated in search results. */
  metaTitle: string;
  description: string;
  intro: string;
  problem: string;
  solution: string;
  deliverables: string[];
  suitableFor: string[];
  notSuitableFor: string[];
  process: string[];
  timeline: string;
  pricing: string;
  portfolioSlug: string;
  proof: string;
  cta: string;
  faqs: CommercialFaq[];
}

export const commercialPages: CommercialPage[] = [
  {
    slug: "shopify-development-lahore",
    name: "Shopify development",
    title: "Shopify development company in Lahore for stores ready to launch",
    metaTitle: "Shopify development company in Lahore",
    description: "DeviaTech builds Shopify stores for Lahore businesses and Pakistani D2C brands, including products, COD, shipping, analytics, and launch support.",
    intro: "Launch a store that is easy for customers to browse and practical for your team to operate. We handle the storefront and the operational details around checkout, shipping, and orders.",
    problem: "Selling through Instagram or WhatsApp can work early on, but product discovery, order details, and follow-up become difficult to manage as demand grows.",
    solution: "We set up a focused Shopify store around your catalogue, customer journey, and local buying conditions, including cash-on-delivery and mobile checkout checks.",
    deliverables: ["Theme setup and brand-aligned storefront", "Products, collections, navigation, and content pages", "Payment, cash-on-delivery, shipping, and returns setup", "Meta Pixel and launch-flow checks", "Handoff guidance for orders and content"],
    suitableFor: ["Boutiques, bakeries, gift shops, and D2C brands", "Businesses moving from social selling to a proper store", "Teams that can provide product, brand, and policy content"],
    notSuitableFor: ["Businesses that need a complex custom marketplace", "Projects without products, content, or an owner available for decisions", "Teams looking for a fully custom platform when Shopify already fits"],
    process: ["Discovery and catalogue review", "Store structure, scope, and fixed-price plan", "Build, product setup, and real checkout testing", "Launch, handoff, and post-launch support window"],
    timeline: "Most focused stores take 7-10 days after content and scope are ready.",
    pricing: "Projects start from PKR 40,000. Final pricing depends on product count, theme customisation, integrations, content readiness, and launch support.",
    portfolioSlug: "ala-gallery-ecommerce",
    proof: "Ala Gallery is an ecommerce store shaped for an Instagram-led gift business in Lahore.",
    cta: "Get a Shopify store estimate",
    faqs: [
      { question: "Can you set up cash on delivery?", answer: "Yes. COD, payment, shipping, and returns requirements are part of the launch review." },
      { question: "Do I need to provide the products?", answer: "You provide the product information and brand assets. We organise and add them as part of the agreed scope." },
      { question: "Will I be able to manage the store?", answer: "Yes. We hand over the Shopify store and explain the day-to-day product and order workflow." },
    ],
  },
  {
    slug: "custom-software-development-lahore",
    name: "Custom software development",
    title: "Custom software development company in Lahore",
    metaTitle: "Custom software development in Lahore",
    description: "DeviaTech builds custom web software for businesses and startups in Lahore that need a workflow beyond an off-the-shelf tool.",
    intro: "When your workflow is the product, a generic tool can create more work than it removes. We turn the important parts of that workflow into a focused, maintainable web application.",
    problem: "Spreadsheets, disconnected tools, and manual handoffs make it hard to see what is happening and harder to scale a process consistently.",
    solution: "We first define the users, rules, and core workflow, then build the smallest useful application with a clear path for future phases.",
    deliverables: ["Discovery and workflow mapping", "Responsive web application", "Authentication and role-aware access where needed", "Essential admin and operational views", "Deployment, documentation, and handoff"],
    suitableFor: ["Businesses with a repeatable workflow worth improving", "Teams replacing manual or disconnected processes", "Founders with a product assumption to test"],
    notSuitableFor: ["Projects with no clear user or business problem", "A request to reproduce a large platform in one release", "Teams unwilling to make scope decisions"],
    process: ["Understand the current workflow and desired outcome", "Separate the core release from later improvements", "Build and review working increments weekly", "Launch, measure usage, and plan the next phase"],
    timeline: "A focused first release usually takes 3-10 weeks, depending on users, rules, integrations, and testing needs.",
    pricing: "Projects start from PKR 150,000. Pricing depends on workflow complexity, roles, integrations, design depth, and deployment requirements.",
    portfolioSlug: "easyfytag-nfc-platform",
    proof: "EasyfyTag combined a desktop tag-writing tool with a web dashboard, requiring work across the connected product workflow.",
    cta: "Discuss your software workflow",
    faqs: [
      { question: "Can you work with an existing system?", answer: "Yes. We can review the current workflow, codebase, or APIs before recommending whether to extend, replace, or connect it." },
      { question: "Do you build mobile apps?", answer: "We focus primarily on responsive web applications. We can discuss a mobile requirement during discovery and recommend the right first surface." },
      { question: "Who owns the code?", answer: "You receive the agreed project code and deployment handoff after final payment. We do not lock you into our hosting." },
    ],
  },
  {
    slug: "mvp-development",
    name: "MVP development",
    title: "MVP development company in Pakistan for startup founders",
    metaTitle: "MVP development company in Pakistan",
    description: "DeviaTech helps Pakistani founders turn a product assumption into a focused MVP they can put in front of real users.",
    intro: "An MVP should answer an important question, not attempt to finish the whole roadmap. We reduce the scope to the core user flow and build a useful first release around it.",
    problem: "Founders often have a long feature list but no clear first signal. Building everything before testing the core assumption increases time, cost, and uncertainty.",
    solution: "We define what the first version needs to prove, build the essential flow, and leave a clear phase-two backlog based on what you learn.",
    deliverables: ["Product discovery and assumption definition", "User-flow and MVP scope plan", "Responsive web product", "Essential authentication, admin, and feedback flows", "Deployment, handoff, and next-step backlog"],
    suitableFor: ["Founders testing a product with early users", "Teams preparing a usable investor or pilot demo", "Businesses validating a new digital workflow"],
    notSuitableFor: ["A complete version of a large marketplace in one phase", "Clients who want a pitch deck instead of a working product", "Projects where every roadmap feature is mandatory for launch"],
    process: ["Identify the core assumption and first users", "Write the smallest useful scope and fixed price", "Build visible weekly increments", "Launch, collect feedback, and prioritise phase two"],
    timeline: "Focused MVPs generally take 3-10 weeks depending on the core flow, roles, integrations, and testing.",
    pricing: "Projects start from PKR 150,000. Pricing depends on product scope, user roles, integrations, design, and deployment needs.",
    portfolioSlug: "cvilo-ai-resume-builder",
    proof: "Cvilo is an AI-powered resume builder built as a product experience rather than a marketing-only website.",
    cta: "Plan your MVP",
    faqs: [
      { question: "How do you decide what goes into an MVP?", answer: "We start with the one assumption the product needs to prove and keep only the flows that help answer it." },
      { question: "Can you continue after launch?", answer: "Yes. After launch we can use feedback and usage signals to scope later phases, fixes, and improvements." },
      { question: "Do I need a complete specification?", answer: "No. You need a clear problem and access to the people who understand it. Discovery helps turn that into a buildable scope." },
    ],
  },
  {
    slug: "web-development-lahore",
    name: "Web development",
    title: "Web development company in Lahore for business websites and applications",
    metaTitle: "Web development company in Lahore",
    description: "DeviaTech creates fast, responsive business websites and web applications for companies in Lahore and across Pakistan.",
    intro: "Your website should explain what you do, make the next step obvious, and be easy to maintain. We build polished web experiences without adding complexity your team does not need.",
    problem: "Outdated websites and disconnected landing pages can make a credible business look harder to buy from and leave potential customers without a clear next action.",
    solution: "We organise the information, design the key pages around customer intent, and build a responsive site or web application with a practical handoff.",
    deliverables: ["Information architecture and page planning", "Responsive design and implementation", "Content and conversion-focused page sections", "Forms, analytics, and essential integrations", "SEO foundations, deployment, and handoff"],
    suitableFor: ["Service businesses that need a credible web presence", "Teams replacing an outdated business website", "Companies that need a focused web application interface"],
    notSuitableFor: ["Projects without an owner for content decisions", "A request for unlimited pages before agreeing on the core audience", "A complex internal system better suited to a dedicated software scope"],
    process: ["Clarify audience, offer, and conversion goal", "Plan pages, content, and visual direction", "Build and review the site in weekly increments", "Test, deploy, and hand over the finished website"],
    timeline: "A focused business website typically takes 2-4 weeks depending on content, pages, integrations, and review cycles.",
    pricing: "Pricing depends on page count, content readiness, design requirements, integrations, and whether the project includes a custom application flow.",
    portfolioSlug: "nabtahvie-corporate-website",
    proof: "Nabtahvie combined a corporate website with a custom Laravel CMS admin panel.",
    cta: "Plan your business website",
    faqs: [
      { question: "Can you help with website content?", answer: "We can structure and refine the content scope. Full copywriting can be included when agreed before the build." },
      { question: "Will the site work on phones?", answer: "Yes. Responsive behaviour is part of the standard build and is reviewed across common screen sizes." },
      { question: "Can I update the website myself?", answer: "We can include a CMS or content workflow when your team needs regular editing." },
    ],
  },
  {
    slug: "maintenance-support",
    name: "Maintenance and support",
    title: "Website maintenance and support for businesses in Pakistan",
    metaTitle: "Website maintenance and support in Pakistan",
    description: "DeviaTech provides practical website maintenance, bug fixes, updates, and post-launch support for businesses in Pakistan.",
    intro: "A launch is not the end of a website's useful life. We help teams keep their site working, secure, and ready for small improvements without reopening a full rebuild every time.",
    problem: "Small bugs, content changes, dependency updates, and unclear ownership can leave a live website slowly becoming less reliable.",
    solution: "We agree on the support scope, response expectations, and access needed, then handle maintenance work transparently instead of treating every fix as an emergency.",
    deliverables: ["Post-launch bug fixes and troubleshooting", "Dependency and framework update review", "Small content and UI changes", "Performance and reliability checks", "Clear issue tracking and release notes"],
    suitableFor: ["Businesses with an existing site that needs a reliable technical partner", "Teams without an in-house web developer", "Past clients who need continued support after handoff"],
    notSuitableFor: ["Emergency response without access or a defined scope", "A complete redesign disguised as maintenance", "Unsupported systems that cannot be safely accessed or deployed"],
    process: ["Review the current site, access, and support needs", "Agree on a support package or task-based scope", "Prioritise and complete fixes with visible updates", "Review recurring issues and recommend larger work only when needed"],
    timeline: "Small fixes can be scheduled in days; larger updates are scoped with a written timeline before work begins.",
    pricing: "Pricing depends on the system, response expectations, monthly workload, hosting access, and whether support includes ongoing development.",
    portfolioSlug: "nabtahvie-corporate-website",
    proof: "DeviaTech includes a support window after project handoff and can continue with separately scoped work beyond it.",
    cta: "Review your support needs",
    faqs: [
      { question: "Do you support websites built by another agency?", answer: "Often, yes. We first review the codebase, deployment process, and access before committing to ongoing support." },
      { question: "Do you offer a monthly retainer?", answer: "We can discuss a recurring support arrangement when the system and expected workload are clear." },
      { question: "Can you guarantee no downtime?", answer: "No responsible developer can guarantee that. We can improve release practices, monitoring, and recovery based on the system." },
    ],
  },
  {
    slug: "dedicated-development-team-pakistan",
    name: "Dedicated development team",
    title: "Dedicated React development team in Pakistan",
    metaTitle: "Hire dedicated React developers in Pakistan",
    description: "Extend your product team with dedicated React and Next.js development support from Pakistan, with direct communication and weekly updates.",
    intro: "When your roadmap needs more consistent capacity than a one-off project, DeviaTech can work as a focused delivery partner alongside your product or engineering team.",
    problem: "Hiring quickly, keeping context, and maintaining delivery quality can be difficult when an internal team has more roadmap than capacity.",
    solution: "We align on the codebase, backlog, communication rhythm, and definition of done, then contribute as a small, accountable extension of your team.",
    deliverables: ["React and Next.js feature development", "Frontend integration with existing APIs", "Bug fixing and product iteration", "Weekly delivery updates and planning", "Documented handoff and shared code ownership"],
    suitableFor: ["Product teams with an existing backlog and technical owner", "Startups needing React or Next.js capacity", "Companies that value direct collaboration over anonymous outsourcing"],
    notSuitableFor: ["Clients without a product owner or prioritised backlog", "Projects requiring 24/7 support coverage", "Teams expecting a large managed department from day one"],
    process: ["Review product context, codebase, and backlog", "Agree on team shape, working hours, and delivery rhythm", "Start with a small onboarding scope", "Scale the engagement only after the collaboration works"],
    timeline: "Onboarding can begin within an agreed start window; the first delivery cycle is planned around your codebase and backlog.",
    pricing: "Pricing depends on seniority, weekly capacity, engagement length, technical ownership, and the level of product involvement required.",
    portfolioSlug: "cvilo-ai-resume-builder",
    proof: "Cvilo demonstrates DeviaTech's experience building a product with Next.js and React alongside a Go backend and AI capabilities.",
    cta: "Discuss team extension",
    faqs: [
      { question: "Will we communicate directly with the developers?", answer: "Yes. We keep communication direct and provide regular progress updates rather than hiding delivery behind an account layer." },
      { question: "Can you work in our repository?", answer: "Yes, after access and workflow review. We can adapt to your branching, review, and deployment practices." },
      { question: "Do we need a technical lead?", answer: "A product or technical owner on your side helps the engagement move quickly, especially when requirements are changing." },
    ],
  },
  {
    slug: "white-label-development-partner",
    name: "White-label development partner",
    title: "White-label web development partner for agencies",
    metaTitle: "White-label web development partner",
    description: "DeviaTech supports agencies and consultants as a white-label web development partner for Shopify, React, Next.js, and custom web projects.",
    intro: "You own the client relationship. We provide the delivery capacity, technical execution, and communication discipline needed to ship work under your brand.",
    problem: "Agencies can win work faster than their delivery team can absorb it, creating pressure to hire before the scope or relationship is proven.",
    solution: "We work behind the scenes on an agreed scope, follow your handoff and review process, and keep client-sensitive work confidential.",
    deliverables: ["White-label Shopify and ecommerce implementation", "React and Next.js website development", "Custom web application features", "Technical estimates and delivery planning", "Pull requests, documentation, and handoff support"],
    suitableFor: ["Design, marketing, and branding agencies", "Independent consultants with trusted client relationships", "Studios that need reliable technical capacity for selected projects"],
    notSuitableFor: ["Partners seeking the lowest possible hourly price", "Projects with no defined owner or acceptance criteria", "Engagements that require us to take over your client relationship"],
    process: ["Sign an NDA and review your client brief", "Agree on scope, communication, and white-label boundaries", "Deliver in your preferred review workflow", "Provide clean handoff and documentation under the agreed arrangement"],
    timeline: "Timing follows your client commitment; a written estimate and delivery plan are agreed before work starts.",
    pricing: "Pricing depends on the technology, scope clarity, review responsibility, urgency, and whether the work is project-based or recurring.",
    portfolioSlug: "easyfytag-nfc-platform",
    proof: "EasyfyTag required coordinated delivery across an Electron desktop app, React dashboard, Go services, and Docker deployment.",
    cta: "Start a partner conversation",
    faqs: [
      { question: "Can you work entirely under our brand?", answer: "Yes. White-label boundaries, client communication, and attribution are agreed before the engagement begins." },
      { question: "Can you join client calls?", answer: "That depends on the engagement. We can stay behind the scenes or join selected technical calls when mutually agreed." },
      { question: "Do you sign NDAs?", answer: "We can review and sign a reasonable NDA before receiving confidential client or product information." },
    ],
  },
];

export function getCommercialPageBySlug(slug: string) {
  return commercialPages.find((page) => page.slug === slug) ?? null;
}
