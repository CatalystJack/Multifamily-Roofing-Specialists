import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock3,
  FileText,
  Layers3,
  MapPin,
  Menu,
  Plus,
  Sparkles,
  X,
} from "lucide-react";

type ProjectKind = "new construction" | "reroofing" | "storm response";

const projectTypes: { label: ProjectKind; detail: string }[] = [
  { label: "new construction", detail: "Ground-up communities" },
  { label: "reroofing", detail: "Occupied or portfolio" },
  { label: "storm response", detail: "Inspection + action plan" },
];

const capabilities = [
  {
    icon: Layers3,
    index: "01",
    title: "Scope by building",
    body: "A single brief becomes a building-by-building plan your GC, ownership team, and property staff can all use.",
    color: "sage",
  },
  {
    icon: Clock3,
    index: "02",
    title: "Sequence around people",
    body: "Access, parking, residents, landscaping, and daily cleanup are part of the schedule—not an afterthought.",
    color: "coral",
  },
  {
    icon: FileText,
    index: "03",
    title: "Close the loop",
    body: "Photo-backed reporting and warranty documentation follow the asset from first walk to final closeout.",
    color: "ochre",
  },
];

const faqs = [
  ["Do you work with general contractors?", "Yes. We price and document work inside GC schedules, with one accountable point of contact from bid through closeout."],
  ["What regions do you cover?", "We are based in Charlotte and serve North Carolina, South Carolina, Tennessee, and Georgia."],
  ["Can you assess a full portfolio?", "That is where our process shines. Start with the asset count and we will shape the right inspection or capital plan."],
];

export function RoofingProjectBrief() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectType, setProjectType] = useState<ProjectKind>("reroofing");
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const handleSave = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2600);
  };

  return (
    <div className="brief-shell">
      <style>{`
        .brief-shell {
          --ink: #17352f;
          --ink-soft: #49635a;
          --paper: #f4f0e8;
          --paper-deep: #e8e1d3;
          --line: rgba(23,53,47,.18);
          --coral: #d76546;
          --coral-dark: #b94e34;
          --sage: #9bad98;
          --ochre: #d2a256;
          min-height: 100vh;
          background: var(--paper);
          color: var(--ink);
          font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
          overflow: hidden;
        }
        .brief-shell *, .brief-shell *::before, .brief-shell *::after { box-sizing: border-box; }
        .brief-shell a { color: inherit; text-decoration: none; }
        .brief-shell button, .brief-shell input, .brief-shell textarea { font: inherit; }
        .brief-wrap { width: min(100% - 56px, 1360px); margin: 0 auto; }
        .brief-nav {
          height: 86px; display: flex; align-items: center; justify-content: space-between;
          border-bottom: 1px solid var(--line); position: relative; z-index: 4;
        }
        .brief-brand { display: flex; align-items: center; gap: 11px; font-size: 12px; font-weight: 800; letter-spacing: .09em; text-transform: uppercase; }
        .brief-brand-mark { width: 27px; height: 27px; border: 2px solid var(--coral); display: grid; place-items: center; transform: rotate(45deg); }
        .brief-brand-mark::before { content: ""; width: 8px; height: 8px; border: 2px solid var(--ink); }
        .brief-brand span:last-child { max-width: 154px; line-height: 1.12; }
        .brief-links { display: flex; gap: 34px; align-items: center; margin-left: auto; margin-right: 35px; }
        .brief-links a { font: 11px ui-monospace, SFMono-Regular, monospace; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-soft); transition: color .2s ease; }
        .brief-links a:hover { color: var(--coral-dark); }
        .brief-nav-cta, .brief-action {
          border: 0; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          background: var(--ink); color: var(--paper); padding: 14px 18px; font: 700 10px ui-monospace, SFMono-Regular, monospace;
          letter-spacing: .08em; text-transform: uppercase; transition: background-color .2s ease, transform .2s ease;
        }
        .brief-nav-cta:hover, .brief-action:hover { background: var(--coral-dark); transform: translateY(-2px); }
        .brief-menu { display: none; border: 1px solid var(--line); background: transparent; padding: 8px; color: var(--ink); cursor: pointer; }
        .brief-hero { padding: 88px 0 104px; position: relative; }
        .brief-hero::after { content: ""; position: absolute; width: 450px; height: 450px; right: -140px; top: 30px; border: 1px solid rgba(23,53,47,.1); border-radius: 50%; pointer-events: none; }
        .brief-hero-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(420px, .78fr); gap: clamp(55px, 9vw, 148px); align-items: center; }
        .brief-kicker, .brief-micro { color: var(--coral-dark); font: 700 10px ui-monospace, SFMono-Regular, monospace; letter-spacing: .15em; text-transform: uppercase; }
        .brief-kicker { display: flex; gap: 12px; align-items: center; }
        .brief-kicker::before { content: ""; width: 32px; height: 1px; background: var(--coral); }
        .brief-hero h1 { font: 400 clamp(3.9rem, 7vw, 7.3rem)/.88 Georgia, "Times New Roman", serif; letter-spacing: -.075em; margin: 23px 0 28px; max-width: 750px; }
        .brief-hero h1 em { color: var(--coral); font-style: italic; }
        .brief-lede { max-width: 512px; color: var(--ink-soft); font-size: 15px; line-height: 1.75; margin: 0; }
        .brief-hero-meta { display: flex; align-items: center; gap: 26px; margin-top: 42px; }
        .brief-text-link { display: inline-flex; align-items: center; gap: 10px; font: 700 10px ui-monospace, SFMono-Regular, monospace; letter-spacing: .1em; text-transform: uppercase; border-bottom: 1px solid var(--coral); padding-bottom: 8px; }
        .brief-text-link svg { transition: transform .2s ease; }
        .brief-text-link:hover svg { transform: translate(3px, -3px); }
        .brief-location { color: var(--ink-soft); display: inline-flex; align-items: center; gap: 6px; font-size: 12px; }
        .brief-intake { background: var(--ink); color: var(--paper); padding: 28px; position: relative; z-index: 1; box-shadow: 17px 17px 0 rgba(210,162,86,.55); }
        .brief-intake::before { content: "PROJECT INTAKE / 01"; position: absolute; top: -25px; left: 0; color: var(--coral-dark); font: 700 9px ui-monospace, SFMono-Regular, monospace; letter-spacing: .13em; }
        .brief-intake h2 { font: 400 clamp(2rem, 3vw, 2.8rem)/1 Georgia, serif; letter-spacing: -.04em; margin: 0 0 8px; }
        .brief-intake-copy { color: #bbcac0; font-size: 12px; line-height: 1.55; margin: 0 0 24px; max-width: 340px; }
        .brief-form-label { display: block; color: #a9beb0; font: 9px ui-monospace, SFMono-Regular, monospace; letter-spacing: .14em; text-transform: uppercase; margin-bottom: 9px; }
        .brief-type-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 7px; margin-bottom: 24px; }
        .brief-type { min-height: 78px; border: 1px solid rgba(244,240,232,.2); background: transparent; color: var(--paper); cursor: pointer; padding: 11px 9px; text-align: left; transition: border-color .2s ease, background-color .2s ease; }
        .brief-type:hover { border-color: var(--ochre); }
        .brief-type.selected { border-color: var(--ochre); background: rgba(210,162,86,.16); }
        .brief-type strong { display: block; font: 14px Georgia, serif; margin-bottom: 8px; }
        .brief-type span { display: block; color: #a9beb0; font-size: 9px; line-height: 1.25; }
        .brief-field { display: grid; gap: 8px; margin-bottom: 16px; }
        .brief-field input, .brief-field textarea { width: 100%; border: 0; border-bottom: 1px solid rgba(244,240,232,.28); color: var(--paper); background: transparent; outline: none; padding: 9px 0; font-size: 13px; }
        .brief-field textarea { min-height: 47px; resize: vertical; }
        .brief-field input::placeholder, .brief-field textarea::placeholder { color: #7f988c; }
        .brief-field input:focus, .brief-field textarea:focus { border-color: var(--ochre); }
        .brief-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        .brief-intake .brief-action { width: 100%; margin-top: 9px; background: var(--coral); color: #fff8ee; }
        .brief-intake .brief-action:hover { background: #e17858; }
        .brief-sent { border: 1px solid rgba(210,162,86,.6); padding: 40px 28px; min-height: 352px; display: grid; align-content: center; }
        .brief-check { width: 32px; height: 32px; display: grid; place-items: center; border: 1px solid var(--ochre); color: var(--ochre); margin-bottom: 20px; }
        .brief-sent h3 { font: 400 32px Georgia, serif; margin: 0 0 10px; }
        .brief-sent p { color: #bbcac0; font-size: 13px; line-height: 1.65; margin: 0; }
        .brief-sent button { border: 0; background: none; color: var(--ochre); text-align: left; margin-top: 23px; padding: 0; font: 700 10px ui-monospace, monospace; letter-spacing: .1em; text-transform: uppercase; cursor: pointer; }
        .brief-ribbon { border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); background: var(--paper-deep); }
        .brief-ribbon-inner { display: grid; grid-template-columns: 1.15fr .85fr .85fr .85fr; }
        .brief-stat { padding: 25px 24px 26px 0; }
        .brief-stat + .brief-stat { border-left: 1px solid var(--line); padding-left: 24px; }
        .brief-stat b { display: block; font: 400 clamp(2rem, 3.2vw, 3.5rem)/1 Georgia, serif; letter-spacing: -.06em; }
        .brief-stat span { display: block; color: var(--ink-soft); font: 9px ui-monospace, SFMono-Regular, monospace; letter-spacing: .11em; line-height: 1.5; margin-top: 7px; text-transform: uppercase; }
        .brief-section { padding: 110px 0 120px; }
        .brief-section-header { max-width: 735px; display: grid; grid-template-columns: 1fr 1.2fr; gap: 60px; margin-bottom: 56px; }
        .brief-section h2 { font: 400 clamp(2.6rem, 4.5vw, 5rem)/.94 Georgia, serif; letter-spacing: -.07em; margin: 0; }
        .brief-section-intro { color: var(--ink-soft); font-size: 14px; line-height: 1.7; padding-top: 9px; }
        .brief-capabilities { display: grid; grid-template-columns: 1.1fr .92fr .92fr; border-top: 1px solid var(--line); }
        .brief-capability { min-height: 272px; padding: 26px 25px 25px 0; position: relative; }
        .brief-capability + .brief-capability { border-left: 1px solid var(--line); padding-left: 25px; }
        .brief-capability::after { content: ""; position: absolute; height: 4px; width: 44px; bottom: 0; left: 0; background: var(--sage); }
        .brief-capability.color-coral::after { background: var(--coral); }
        .brief-capability.color-ochre::after { background: var(--ochre); }
        .brief-capability svg { color: var(--coral-dark); margin-bottom: 36px; }
        .brief-capability-index { color: var(--ink-soft); float: right; font: 10px ui-monospace, monospace; }
        .brief-capability h3 { font: 400 25px/1 Georgia, serif; letter-spacing: -.035em; margin: 0 0 12px; }
        .brief-capability p { max-width: 290px; color: var(--ink-soft); font-size: 12px; line-height: 1.65; margin: 0; }
        .brief-process { background: var(--ink); color: var(--paper); padding: 92px 0 100px; position: relative; }
        .brief-process::after { content: "MFRS / 2024"; color: rgba(244,240,232,.3); position: absolute; right: 28px; bottom: 29px; font: 9px ui-monospace, monospace; letter-spacing: .12em; }
        .brief-process-grid { display: grid; grid-template-columns: .8fr 1.2fr; gap: 12%; }
        .brief-process h2 { max-width: 430px; }
        .brief-process .brief-kicker { color: var(--ochre); }
        .brief-process .brief-kicker::before { background: var(--ochre); }
        .brief-process-copy { color: #bbcac0; max-width: 360px; font-size: 13px; line-height: 1.7; margin: 20px 0 0; }
        .brief-steps { border-top: 1px solid rgba(244,240,232,.2); }
        .brief-step { display: grid; grid-template-columns: 45px 1fr auto; gap: 18px; align-items: center; border-bottom: 1px solid rgba(244,240,232,.2); padding: 21px 0; }
        .brief-step-num { color: var(--ochre); font: 11px ui-monospace, monospace; }
        .brief-step strong { font: 400 21px Georgia, serif; }
        .brief-step span { color: #9ab0a3; font-size: 11px; }
        .brief-step-check { color: var(--sage); }
        .brief-faq { padding: 105px 0 120px; }
        .brief-faq-grid { display: grid; grid-template-columns: .7fr 1.3fr; gap: 13%; }
        .brief-faq h2 { font: 400 clamp(2.5rem, 4vw, 4.25rem)/.95 Georgia, serif; letter-spacing: -.06em; margin: 0; }
        .brief-faq-copy { color: var(--ink-soft); font-size: 13px; line-height: 1.7; margin-top: 19px; max-width: 260px; }
        .brief-faq-list { border-top: 1px solid var(--line); }
        .brief-faq-item { border-bottom: 1px solid var(--line); }
        .brief-faq-toggle { width: 100%; border: 0; background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: space-between; gap: 20px; color: var(--ink); text-align: left; padding: 22px 0; font: 400 18px Georgia, serif; }
        .brief-faq-toggle svg { transition: transform .2s ease; flex: 0 0 auto; }
        .brief-faq-toggle.open svg { transform: rotate(180deg); }
        .brief-faq-answer { color: var(--ink-soft); font-size: 13px; line-height: 1.65; max-width: 580px; padding: 0 35px 22px 0; }
        .brief-footer { background: var(--paper-deep); border-top: 1px solid var(--line); padding: 30px 0; }
        .brief-footer-inner { display: flex; align-items: center; justify-content: space-between; gap: 20px; }
        .brief-footer small { color: var(--ink-soft); font: 10px ui-monospace, monospace; letter-spacing: .08em; text-transform: uppercase; }
        .brief-footer-links { display: flex; gap: 22px; color: var(--ink-soft); font: 10px ui-monospace, monospace; letter-spacing: .08em; text-transform: uppercase; }
        .brief-save { position: fixed; right: 22px; bottom: 22px; z-index: 7; background: var(--ink); color: var(--paper); padding: 12px 16px; font: 10px ui-monospace, monospace; letter-spacing: .06em; box-shadow: 4px 4px 0 var(--ochre); animation: brief-rise .22s ease-out both; }
        @keyframes brief-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 850px) {
          .brief-wrap { width: min(100% - 38px, 1360px); }
          .brief-links { gap: 17px; margin-right: 17px; }
          .brief-hero-grid, .brief-process-grid, .brief-faq-grid { grid-template-columns: 1fr; gap: 74px; }
          .brief-hero { padding-top: 70px; }
          .brief-hero::after { right: -240px; top: 260px; }
          .brief-hero h1 { max-width: 650px; }
          .brief-intake { max-width: 600px; }
          .brief-process-grid { gap: 46px; }
          .brief-faq-grid { gap: 42px; }
        }
        @media (max-width: 620px) {
          .brief-wrap { width: min(100% - 32px, 1360px); }
          .brief-nav { height: 72px; }
          .brief-links, .brief-nav-cta { display: none; }
          .brief-menu { display: inline-flex; }
          .brief-mobile-links { display: grid; position: absolute; top: 71px; left: 0; right: 0; padding: 12px 16px 18px; background: var(--paper); border-bottom: 1px solid var(--line); }
          .brief-mobile-links a { padding: 12px 0; border-bottom: 1px solid var(--line); font: 10px ui-monospace, monospace; letter-spacing: .1em; text-transform: uppercase; }
          .brief-hero { padding: 62px 0 90px; }
          .brief-hero h1 { font-size: clamp(3.45rem, 16vw, 5.7rem); }
          .brief-lede { font-size: 14px; }
          .brief-hero-meta { align-items: flex-start; flex-direction: column; gap: 18px; margin-top: 30px; }
          .brief-intake { padding: 21px; box-shadow: 9px 9px 0 rgba(210,162,86,.55); }
          .brief-type-grid { grid-template-columns: 1fr; }
          .brief-type { min-height: 0; display: flex; align-items: center; justify-content: space-between; }
          .brief-type strong { margin-bottom: 2px; }
          .brief-form-row { grid-template-columns: 1fr; gap: 0; }
          .brief-ribbon-inner { grid-template-columns: 1fr 1fr; }
          .brief-stat { padding: 20px 12px 21px 0; }
          .brief-stat + .brief-stat { padding-left: 12px; }
          .brief-stat:nth-child(3) { border-left: 0; border-top: 1px solid var(--line); padding-left: 0; }
          .brief-stat:nth-child(4) { border-top: 1px solid var(--line); }
          .brief-stat b { font-size: 2.25rem; }
          .brief-section { padding: 83px 0 90px; }
          .brief-section-header { grid-template-columns: 1fr; gap: 24px; margin-bottom: 40px; }
          .brief-capabilities { grid-template-columns: 1fr; }
          .brief-capability { min-height: 0; padding: 25px 0 31px; }
          .brief-capability + .brief-capability { border-left: 0; }
          .brief-capability svg { margin-bottom: 24px; }
          .brief-process { padding: 80px 0 88px; }
          .brief-step { grid-template-columns: 31px 1fr auto; gap: 10px; }
          .brief-step strong { font-size: 18px; }
          .brief-step span { display: block; margin-top: 4px; }
          .brief-footer-inner { align-items: flex-start; flex-direction: column; }
          .brief-footer-links { flex-wrap: wrap; }
        }
      `}</style>

      <header className="brief-wrap brief-nav">
        <a className="brief-brand" href="#top" aria-label="Multifamily Roofing Specialists home">
          <span className="brief-brand-mark" aria-hidden="true" />
          <span>Multifamily Roofing Specialists</span>
        </a>
        <nav className={`brief-links ${menuOpen ? "brief-mobile-links" : ""}`} aria-label="Primary navigation">
          <a href="#approach" onClick={() => setMenuOpen(false)}>Approach</a>
          <a href="#process" onClick={() => setMenuOpen(false)}>How it works</a>
          <a href="#answers" onClick={() => setMenuOpen(false)}>Answers</a>
        </nav>
        <a className="brief-nav-cta" href="#intake">Start a project <ArrowUpRight size={14} /></a>
        <button className="brief-menu" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      <main id="top">
        <section className="brief-wrap brief-hero">
          <div className="brief-hero-grid">
            <div>
              <div className="brief-kicker">A better first conversation</div>
              <h1>Roofing that <em>keeps</em> the whole asset moving.</h1>
              <p className="brief-lede">The roofing partner for apartment communities, developers, and GCs who need a clear scope before the first crew arrives.</p>
              <div className="brief-hero-meta">
                <a className="brief-text-link" href="#intake">Build your project brief <ArrowRight size={15} /></a>
                <span className="brief-location"><MapPin size={14} /> Charlotte → Southeast</span>
              </div>
            </div>

            <div className="brief-intake" id="intake">
              {!submitted ? (
                <form onSubmit={handleSubmit} aria-label="Start a project brief">
                  <h2>What are you planning?</h2>
                  <p className="brief-intake-copy">Give us the shape of the work. We&apos;ll come prepared with the right questions.</p>
                  <span className="brief-form-label">01 / Project type</span>
                  <div className="brief-type-grid">
                    {projectTypes.map((type) => (
                      <button
                        className={`brief-type ${projectType === type.label ? "selected" : ""}`}
                        key={type.label}
                        type="button"
                        onClick={() => setProjectType(type.label)}
                        aria-pressed={projectType === type.label}
                      >
                        <strong>{type.label}</strong>
                        <span>{type.detail}</span>
                      </button>
                    ))}
                  </div>
                  <div className="brief-form-row">
                    <label className="brief-field">
                      <span className="brief-form-label">02 / Your name</span>
                      <input name="name" placeholder="First and last" required />
                    </label>
                    <label className="brief-field">
                      <span className="brief-form-label">03 / Company</span>
                      <input name="company" placeholder="Company or ownership group" required />
                    </label>
                  </div>
                  <label className="brief-field">
                    <span className="brief-form-label">04 / The short version</span>
                    <textarea name="scope" placeholder="Property, number of buildings, timing…" required />
                  </label>
                  <button className="brief-action" type="submit">Send project brief <ArrowRight size={15} /></button>
                </form>
              ) : (
                <div className="brief-sent" role="status">
                  <div className="brief-check"><Check size={17} /></div>
                  <h3>Brief received.</h3>
                  <p>We&apos;ll review the shape of your project and follow up with a useful first conversation—not a generic sales call.</p>
                  <button type="button" onClick={() => setSubmitted(false)}>Send another brief <ArrowRight size={13} /></button>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="brief-ribbon" aria-label="Company experience">
          <div className="brief-wrap brief-ribbon-inner">
            <div className="brief-stat"><b>50+</b><span>Years combined roofing experience</span></div>
            <div className="brief-stat"><b>$5.5B+</b><span>Multifamily transaction experience</span></div>
            <div className="brief-stat"><b>04</b><span>Southeast states served</span></div>
            <div className="brief-stat"><b>01</b><span>Point of accountability</span></div>
          </div>
        </section>

        <section className="brief-wrap brief-section" id="approach">
          <div className="brief-section-header">
            <div><div className="brief-kicker">The operating idea</div></div>
            <div>
              <h2>Roof work is never just roof work.</h2>
              <p className="brief-section-intro">It touches the schedule, the resident experience, the capital plan, and the next owner. We make those connections visible early.</p>
            </div>
          </div>
          <div className="brief-capabilities">
            {capabilities.map((capability) => {
              const Icon = capability.icon;
              return (
                <article className={`brief-capability color-${capability.color}`} key={capability.index}>
                  <Icon size={21} strokeWidth={1.5} />
                  <span className="brief-capability-index">{capability.index}</span>
                  <h3>{capability.title}</h3>
                  <p>{capability.body}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="brief-process" id="process">
          <div className="brief-wrap brief-process-grid">
            <div>
              <div className="brief-kicker">From first walk to closeout</div>
              <h2>Clear handoffs. Fewer surprises.</h2>
              <p className="brief-process-copy">A repeatable process gives every stakeholder the same picture of the work—while experienced people stay responsible for every conclusion.</p>
            </div>
            <div className="brief-steps">
              {[
                ["01", "Frame the asset", "Scope, schedule, stakeholders"],
                ["02", "See the condition", "Building-level field intelligence"],
                ["03", "Make the plan", "Priorities, phasing, budget"],
                ["04", "Deliver + document", "Install, inspect, warrant"],
              ].map(([number, title, detail]) => (
                <div className="brief-step" key={number}>
                  <span className="brief-step-num">{number}</span>
                  <div><strong>{title}</strong><span>{detail}</span></div>
                  <Check className="brief-step-check" size={16} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="brief-wrap brief-faq" id="answers">
          <div className="brief-faq-grid">
            <div>
              <div className="brief-kicker">Useful answers</div>
              <h2>Before you put us on the bid list.</h2>
              <p className="brief-faq-copy">The short version of how we work, where we work, and what a first conversation looks like.</p>
            </div>
            <div className="brief-faq-list">
              {faqs.map(([question, answer], index) => (
                <div className="brief-faq-item" key={question}>
                  <button className={`brief-faq-toggle ${openFaq === index ? "open" : ""}`} type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}>
                    {question}<ChevronDown size={17} />
                  </button>
                  {openFaq === index && <div className="brief-faq-answer">{answer}</div>}
                </div>
              ))}
              <button className="brief-text-link" type="button" onClick={handleSave} style={{ marginTop: 27, background: "transparent" }}>Save this page for later <Plus size={14} /></button>
            </div>
          </div>
        </section>
      </main>

      <footer className="brief-footer">
        <div className="brief-wrap brief-footer-inner">
          <small>© 2024 Multifamily Roofing Specialists / Charlotte, NC</small>
          <div className="brief-footer-links"><a href="#top">Back to top</a><a href="#intake">Start a project</a></div>
        </div>
      </footer>
      {saved && <div className="brief-save"><Sparkles size={13} style={{ verticalAlign: "middle", marginRight: 7 }} /> Page saved to your notes</div>}
    </div>
  );
}