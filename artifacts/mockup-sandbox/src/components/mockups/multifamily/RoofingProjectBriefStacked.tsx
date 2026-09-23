import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ClipboardList,
  MapPin,
  Menu,
  ShieldCheck,
  X,
} from "lucide-react";

type Service = {
  number: string;
  title: string;
  summary: string;
  detail: string;
  color: string;
};

const services: Service[] = [
  {
    number: "01",
    title: "New construction",
    summary: "Production roofing coordinated to your schedule.",
    detail: "Materials, crews, inspections, and closeout stay aligned from first takeoff through turnover.",
    color: "#9aaa93",
  },
  {
    number: "02",
    title: "Occupied rehabs",
    summary: "Reroofing sequenced around residents and access.",
    detail: "We plan around parking, landscaping, daily cleanup, and the details property teams need to keep moving.",
    color: "#d4775a",
  },
  {
    number: "03",
    title: "Storm inspections",
    summary: "Photo-documented conditions with clear next actions.",
    detail: "Building-level observations turn a weather event into a practical scope, priority list, and response plan.",
    color: "#d0a358",
  },
  {
    number: "04",
    title: "Capital planning",
    summary: "Roof condition data turned into usable budgets.",
    detail: "We help owners see replacement windows, phasing, and portfolio priorities before the capital meeting.",
    color: "#7695a0",
  },
];

const faqs = [
  ["Do you work with general contractors?", "Yes. We price and document work inside GC schedules, with one accountable point of contact from bid through closeout."],
  ["What regions do you cover?", "We are based in Charlotte and serve North Carolina, South Carolina, Tennessee, and Georgia."],
  ["Can you assess a full portfolio?", "That is where our process shines. Start with the asset count and we will shape the right inspection or capital plan."],
];

export function RoofingProjectBriefStacked() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const savePage = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2800);
  };

  return (
    <div className="stacked-roofing">
      <style>{`
        .stacked-roofing {
          --stack-ink: #203b38;
          --stack-ink-2: #42605a;
          --stack-paper: #f2eee5;
          --stack-paper-2: #e4ded1;
          --stack-line: rgba(32,59,56,.17);
          --stack-coral: #d4775a;
          --stack-gold: #d0a358;
          --stack-mist: #d8e0db;
          min-height: 100vh;
          background: var(--stack-paper);
          color: var(--stack-ink);
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          overflow: hidden;
        }
        .stacked-roofing *, .stacked-roofing *::before, .stacked-roofing *::after { box-sizing: border-box; }
        .stacked-roofing a { color: inherit; text-decoration: none; }
        .stacked-roofing button, .stacked-roofing input, .stacked-roofing textarea { font: inherit; }
        .stack-wrap { width: min(100% - 48px, 1400px); margin-inline: auto; }
        .stack-rail {
          position: fixed; z-index: 10; inset: 0 auto 0 0; width: 74px; display: flex;
          align-items: center; flex-direction: column; justify-content: space-between;
          padding: 26px 0 28px; border-right: 1px solid rgba(242,238,229,.2);
          background: var(--stack-ink); color: var(--stack-paper);
        }
        .stack-mark { width: 26px; height: 26px; display: grid; place-items: center; border: 1px solid var(--stack-gold); transform: rotate(45deg); }
        .stack-mark::after { content: ""; width: 9px; height: 9px; border: 1px solid var(--stack-paper); }
        .stack-rail-nav { display: flex; align-items: center; flex-direction: column; gap: 28px; }
        .stack-rail-nav a, .stack-rail-end { color: rgba(242,238,229,.6); font: 9px ui-monospace, SFMono-Regular, monospace; letter-spacing: .11em; text-transform: uppercase; writing-mode: vertical-rl; transform: rotate(180deg); transition: color .2s ease; }
        .stack-rail-nav a:hover, .stack-rail-end:hover { color: var(--stack-gold); }
        .stack-rail-end { color: var(--stack-gold); }
        .stack-main { margin-left: 74px; }
        .stack-header { height: 82px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--stack-line); }
        .stack-wordmark { display: inline-flex; align-items: center; gap: 10px; font-size: 11px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
        .stack-wordmark i { width: 8px; height: 8px; display: inline-block; background: var(--stack-coral); }
        .stack-header-links { display: flex; align-items: center; gap: 31px; margin-left: auto; margin-right: 33px; }
        .stack-header-links a, .stack-micro { color: var(--stack-ink-2); font: 10px ui-monospace, SFMono-Regular, monospace; letter-spacing: .1em; text-transform: uppercase; }
        .stack-header-links a:hover { color: var(--stack-coral); }
        .stack-header-cta, .stack-button { display: inline-flex; align-items: center; justify-content: center; gap: 9px; border: 0; background: var(--stack-ink); color: var(--stack-paper); padding: 13px 17px; cursor: pointer; font: 700 10px ui-monospace, SFMono-Regular, monospace; letter-spacing: .08em; text-transform: uppercase; transition: background-color .2s ease, transform .2s ease; }
        .stack-header-cta:hover, .stack-button:hover { background: var(--stack-coral); transform: translateY(-2px); }
        .stack-menu { display: none; border: 1px solid var(--stack-line); background: transparent; color: var(--stack-ink); padding: 8px; cursor: pointer; }
        .stack-mobile-links { display: none; }
        .stack-hero { display: grid; grid-template-columns: minmax(0, .9fr) minmax(400px, 1.1fr); min-height: 665px; border-bottom: 1px solid var(--stack-line); }
        .stack-hero-copy { display: flex; flex-direction: column; justify-content: space-between; padding: clamp(58px, 8vw, 126px) clamp(28px, 7vw, 110px) 54px clamp(24px, 7vw, 106px); }
        .stack-kicker { display: flex; align-items: center; gap: 11px; color: var(--stack-coral); font: 700 10px ui-monospace, SFMono-Regular, monospace; letter-spacing: .14em; text-transform: uppercase; }
        .stack-kicker::before { content: ""; width: 31px; height: 1px; background: var(--stack-coral); }
        .stack-hero h1 { max-width: 720px; margin: 25px 0 25px; font: 400 clamp(4.2rem, 7.7vw, 8.2rem)/.82 Georgia, "Times New Roman", serif; letter-spacing: -.085em; }
        .stack-hero h1 em { color: var(--stack-coral); font-style: italic; }
        .stack-hero-lede { max-width: 440px; margin: 0; color: var(--stack-ink-2); font-size: 14px; line-height: 1.8; }
        .stack-hero-foot { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; }
        .stack-hero-foot a { display: inline-flex; align-items: center; gap: 9px; padding-bottom: 8px; border-bottom: 1px solid var(--stack-coral); font: 700 10px ui-monospace, SFMono-Regular, monospace; letter-spacing: .1em; text-transform: uppercase; }
        .stack-hero-foot a:hover svg { transform: translate(3px, -3px); }
        .stack-hero-foot svg { transition: transform .2s ease; }
        .stack-location { display: inline-flex; align-items: center; gap: 6px; color: var(--stack-ink-2); font-size: 11px; }
        .stack-hero-image { position: relative; min-height: 460px; background: #304d4a url("/__mockup/images/roofing-project-brief-stacked-hero.jpg") center / cover no-repeat; isolation: isolate; }
        .stack-hero-image::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(32,59,56,.42), transparent 48%), linear-gradient(0deg, rgba(32,59,56,.52), transparent 45%); }
        .stack-image-note { position: absolute; z-index: 1; left: 27px; bottom: 25px; color: var(--stack-paper); font: 10px ui-monospace, SFMono-Regular, monospace; letter-spacing: .12em; text-transform: uppercase; }
        .stack-image-note span { display: block; margin-top: 7px; color: #e8cf9f; }
        .stack-stats { display: grid; grid-template-columns: repeat(4, 1fr); border-bottom: 1px solid var(--stack-line); background: var(--stack-paper-2); }
        .stack-stat { min-height: 128px; padding: 25px 22px 23px; }
        .stack-stat + .stack-stat { border-left: 1px solid var(--stack-line); }
        .stack-stat b { display: block; font: 400 clamp(2.3rem, 3.7vw, 4.1rem)/1 Georgia, serif; letter-spacing: -.07em; }
        .stack-stat span { display: block; max-width: 150px; margin-top: 7px; color: var(--stack-ink-2); font: 9px/1.5 ui-monospace, SFMono-Regular, monospace; letter-spacing: .1em; text-transform: uppercase; }
        .stack-section { padding: clamp(80px, 10vw, 145px) 0; }
        .stack-section-head { display: grid; grid-template-columns: .55fr 1.45fr; gap: 8vw; align-items: start; margin-bottom: 58px; }
        .stack-section-head h2, .stack-process h2, .stack-answers h2 { max-width: 760px; margin: 0; font: 400 clamp(3rem, 5vw, 6rem)/.88 Georgia, serif; letter-spacing: -.075em; }
        .stack-section-intro { max-width: 470px; margin: 13px 0 0; color: var(--stack-ink-2); font-size: 14px; line-height: 1.75; }
        .stack-dossier { display: grid; grid-template-columns: 1fr 1.15fr; border-top: 1px solid var(--stack-line); }
        .stack-service-list { border-right: 1px solid var(--stack-line); }
        .stack-service { width: 100%; display: grid; grid-template-columns: 42px 1fr 20px; gap: 15px; align-items: center; padding: 25px 26px 25px 0; border: 0; border-bottom: 1px solid var(--stack-line); background: transparent; color: var(--stack-ink); cursor: pointer; text-align: left; }
        .stack-service:hover, .stack-service.active { background: rgba(216,224,219,.55); }
        .stack-service-number { color: var(--stack-coral); font: 10px ui-monospace, monospace; }
        .stack-service strong { display: block; font: 400 24px/1 Georgia, serif; letter-spacing: -.03em; }
        .stack-service small { display: block; margin-top: 6px; color: var(--stack-ink-2); font-size: 11px; line-height: 1.45; }
        .stack-service svg { color: var(--stack-ink-2); transition: transform .2s ease; }
        .stack-service.active svg { transform: rotate(45deg); color: var(--stack-coral); }
        .stack-dossier-panel { position: relative; min-height: 350px; padding: 35px clamp(26px, 4vw, 60px); overflow: hidden; background: var(--stack-ink); color: var(--stack-paper); }
        .stack-dossier-panel::before { content: attr(data-index); position: absolute; right: 23px; top: 7px; color: rgba(242,238,229,.08); font: 400 12rem/.9 Georgia, serif; letter-spacing: -.1em; }
        .stack-dossier-panel .stack-micro { color: var(--stack-gold); position: relative; }
        .stack-dossier-panel h3 { position: relative; max-width: 520px; margin: 74px 0 15px; font: 400 clamp(2.5rem, 4.2vw, 5rem)/.88 Georgia, serif; letter-spacing: -.07em; }
        .stack-dossier-panel p { position: relative; max-width: 440px; margin: 0; color: #becbc2; font-size: 13px; line-height: 1.75; }
        .stack-dossier-accent { position: absolute; left: 0; bottom: 0; width: 90px; height: 5px; background: var(--stack-gold); transition: width .25s ease; }
        .stack-experience { padding: 0 0 clamp(85px, 10vw, 140px); }
        .stack-experience-inner { display: grid; grid-template-columns: .72fr 1.28fr; gap: 12vw; align-items: start; padding: clamp(60px, 7vw, 100px) clamp(25px, 6vw, 90px); background: var(--stack-ink); color: var(--stack-paper); }
        .stack-experience h2 { max-width: 460px; margin: 19px 0 0; font: 400 clamp(2.8rem, 4.5vw, 5.6rem)/.88 Georgia, serif; letter-spacing: -.075em; }
        .stack-experience-copy { max-width: 360px; color: #beccc2; font-size: 13px; line-height: 1.75; }
        .stack-process-list { margin-top: 33px; border-top: 1px solid rgba(242,238,229,.2); }
        .stack-process-row { display: grid; grid-template-columns: 42px 1fr auto; gap: 15px; align-items: center; padding: 20px 0; border-bottom: 1px solid rgba(242,238,229,.2); }
        .stack-process-row > span:first-child { color: var(--stack-gold); font: 10px ui-monospace, monospace; }
        .stack-process-row strong { display: block; font: 400 21px Georgia, serif; }
        .stack-process-row small { display: block; margin-top: 5px; color: #9aafa2; font-size: 11px; }
        .stack-process-row svg { color: var(--stack-mist); }
        .stack-answers { padding: 0 0 clamp(92px, 11vw, 155px); }
        .stack-answers-grid { display: grid; grid-template-columns: .72fr 1.28fr; gap: 12vw; }
        .stack-answers h2 { max-width: 450px; }
        .stack-answers-copy { max-width: 280px; margin: 21px 0 0; color: var(--stack-ink-2); font-size: 13px; line-height: 1.7; }
        .stack-faq { border-top: 1px solid var(--stack-line); }
        .stack-faq-item { border-bottom: 1px solid var(--stack-line); }
        .stack-faq-toggle { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 20px; border: 0; background: transparent; color: var(--stack-ink); padding: 21px 0; cursor: pointer; text-align: left; font: 400 18px Georgia, serif; }
        .stack-faq-toggle svg { flex: 0 0 auto; transition: transform .2s ease; }
        .stack-faq-toggle.open svg { transform: rotate(180deg); }
        .stack-faq-answer { max-width: 590px; padding: 0 35px 22px 0; color: var(--stack-ink-2); font-size: 13px; line-height: 1.7; }
        .stack-save { display: inline-flex; align-items: center; gap: 8px; margin-top: 27px; border: 0; border-bottom: 1px solid var(--stack-coral); background: transparent; padding: 0 0 8px; color: var(--stack-ink); cursor: pointer; font: 700 10px ui-monospace, monospace; letter-spacing: .1em; text-transform: uppercase; }
        .stack-contact { padding: clamp(70px, 8vw, 115px) 0; background: var(--stack-paper-2); border-top: 1px solid var(--stack-line); }
        .stack-contact-grid { display: grid; grid-template-columns: .7fr 1.3fr; gap: 12vw; }
        .stack-contact h2 { max-width: 480px; margin: 18px 0 0; font: 400 clamp(3rem, 5vw, 5.7rem)/.87 Georgia, serif; letter-spacing: -.075em; }
        .stack-contact-note { max-width: 340px; margin: 23px 0 0; color: var(--stack-ink-2); font-size: 13px; line-height: 1.75; }
        .stack-contact-details { display: grid; gap: 9px; margin-top: 35px; font: 11px ui-monospace, monospace; }
        .stack-contact-details a:hover { color: var(--stack-coral); }
        .stack-contact-form { padding-top: 24px; border-top: 1px solid var(--stack-line); }
        .stack-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        .stack-field { display: grid; gap: 7px; margin-bottom: 19px; }
        .stack-field label, .stack-field span { color: var(--stack-ink-2); font: 700 9px ui-monospace, monospace; letter-spacing: .12em; text-transform: uppercase; }
        .stack-field input, .stack-field textarea { width: 100%; border: 0; border-bottom: 1px solid rgba(32,59,56,.31); outline: none; background: transparent; color: var(--stack-ink); padding: 10px 0; font-size: 13px; }
        .stack-field textarea { min-height: 72px; resize: vertical; }
        .stack-field input:focus, .stack-field textarea:focus { border-color: var(--stack-coral); }
        .stack-field input::placeholder, .stack-field textarea::placeholder { color: #82928a; }
        .stack-contact-form .stack-button { background: var(--stack-coral); color: #fff7ed; }
        .stack-contact-form .stack-button:hover { background: var(--stack-ink); }
        .stack-success { min-height: 300px; display: grid; align-content: center; padding-top: 24px; border-top: 1px solid var(--stack-line); }
        .stack-success-mark { width: 31px; height: 31px; display: grid; place-items: center; margin-bottom: 20px; border: 1px solid var(--stack-coral); color: var(--stack-coral); }
        .stack-success h3 { margin: 0 0 10px; font: 400 33px Georgia, serif; }
        .stack-success p { max-width: 400px; margin: 0; color: var(--stack-ink-2); font-size: 13px; line-height: 1.7; }
        .stack-success button { width: fit-content; margin-top: 20px; border: 0; border-bottom: 1px solid var(--stack-coral); background: transparent; padding: 0 0 7px; color: var(--stack-ink); cursor: pointer; font: 700 10px ui-monospace, monospace; letter-spacing: .1em; text-transform: uppercase; }
        .stack-footer { padding: 26px 0; background: var(--stack-ink); color: var(--stack-paper); }
        .stack-footer-inner { display: flex; align-items: center; justify-content: space-between; gap: 20px; }
        .stack-footer small, .stack-footer-links { color: #a9b9b0; font: 9px ui-monospace, monospace; letter-spacing: .08em; text-transform: uppercase; }
        .stack-footer-links { display: flex; gap: 24px; }
        .stack-footer-links a:hover { color: var(--stack-gold); }
        .stack-toast { position: fixed; z-index: 20; right: 22px; bottom: 22px; display: flex; align-items: center; gap: 8px; padding: 13px 16px; background: var(--stack-ink); color: var(--stack-paper); box-shadow: 4px 4px 0 var(--stack-gold); font: 10px ui-monospace, monospace; letter-spacing: .05em; animation: stack-rise .22s ease-out both; }
        @keyframes stack-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 900px) {
          .stack-rail { display: none; }
          .stack-main { margin-left: 0; }
          .stack-wrap { width: min(100% - 38px, 1400px); }
          .stack-hero { grid-template-columns: 1fr; }
          .stack-hero-copy { min-height: 570px; padding: 72px 30px 46px; }
          .stack-hero-image { min-height: 390px; }
          .stack-section-head, .stack-dossier, .stack-experience-inner, .stack-answers-grid, .stack-contact-grid { grid-template-columns: 1fr; gap: 43px; }
          .stack-service-list { border-right: 0; }
          .stack-dossier-panel { min-height: 330px; }
          .stack-experience-inner { padding: 58px 30px 65px; }
          .stack-answers-grid, .stack-contact-grid { gap: 48px; }
        }
        @media (max-width: 620px) {
          .stack-wrap { width: min(100% - 32px, 1400px); }
          .stack-header { height: 70px; }
          .stack-header-links, .stack-header-cta { display: none; }
          .stack-menu { display: inline-flex; }
          .stack-mobile-links { position: absolute; z-index: 5; top: 69px; left: 0; right: 0; display: grid; padding: 10px 16px 17px; border-bottom: 1px solid var(--stack-line); background: var(--stack-paper); }
          .stack-mobile-links a { padding: 12px 0; border-bottom: 1px solid var(--stack-line); font: 10px ui-monospace, monospace; letter-spacing: .1em; text-transform: uppercase; }
          .stack-hero-copy { min-height: 575px; padding: 59px 0 38px; }
          .stack-hero h1 { font-size: clamp(3.55rem, 16vw, 5.7rem); }
          .stack-hero-foot { align-items: flex-start; flex-direction: column; gap: 19px; }
          .stack-hero-image { min-height: 320px; }
          .stack-stats { grid-template-columns: 1fr 1fr; }
          .stack-stat { min-height: 110px; padding: 19px 14px 20px 0; }
          .stack-stat:nth-child(odd) { border-left: 0; }
          .stack-stat:nth-child(n+3) { border-top: 1px solid var(--stack-line); }
          .stack-stat b { font-size: 2.45rem; }
          .stack-stat span { font-size: 8px; }
          .stack-section { padding: 76px 0 84px; }
          .stack-section-head { margin-bottom: 38px; }
          .stack-section-head h2, .stack-answers h2 { font-size: clamp(2.8rem, 13vw, 4.5rem); }
          .stack-service { grid-template-columns: 30px 1fr 18px; gap: 9px; padding-right: 0; }
          .stack-service strong { font-size: 20px; }
          .stack-dossier-panel { min-height: 330px; padding: 27px 22px; }
          .stack-dossier-panel h3 { margin-top: 72px; font-size: 3rem; }
          .stack-experience { padding-bottom: 82px; }
          .stack-experience-inner { padding: 46px 22px 52px; }
          .stack-process-row { grid-template-columns: 30px 1fr auto; gap: 10px; }
          .stack-process-row strong { font-size: 18px; }
          .stack-answers { padding-bottom: 86px; }
          .stack-contact { padding: 74px 0 84px; }
          .stack-contact h2 { font-size: clamp(3rem, 13vw, 4.7rem); }
          .stack-form-row { grid-template-columns: 1fr; gap: 0; }
          .stack-footer-inner { align-items: flex-start; flex-direction: column; }
          .stack-footer-links { flex-wrap: wrap; }
        }
      `}</style>

      <aside className="stack-rail" aria-label="Section index">
        <a className="stack-mark" href="#stack-top" aria-label="Back to top" />
        <nav className="stack-rail-nav">
          <a href="#stack-approach">Approach</a>
          <a href="#stack-process">Process</a>
          <a href="#stack-answers">Answers</a>
        </nav>
        <a className="stack-rail-end" href="#stack-contact">Start</a>
      </aside>

      <div className="stack-main" id="stack-top">
        <header className="stack-wrap stack-header">
          <a className="stack-wordmark" href="#stack-top"><i aria-hidden="true" /> Multifamily Roofing Specialists</a>
          <nav className="stack-header-links" aria-label="Primary navigation">
            <a href="#stack-approach">Approach</a>
            <a href="#stack-process">How it works</a>
            <a href="#stack-answers">Answers</a>
          </nav>
          <a className="stack-header-cta" href="#stack-contact">Request a bid <ArrowUpRight size={14} /></a>
          <button className="stack-menu" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          {menuOpen && (
            <nav className="stack-mobile-links" aria-label="Mobile navigation">
              <a href="#stack-approach" onClick={() => setMenuOpen(false)}>Approach</a>
              <a href="#stack-process" onClick={() => setMenuOpen(false)}>How it works</a>
              <a href="#stack-answers" onClick={() => setMenuOpen(false)}>Answers</a>
              <a href="#stack-contact" onClick={() => setMenuOpen(false)}>Request a bid</a>
            </nav>
          )}
        </header>

        <main>
          <section className="stack-hero" aria-labelledby="stack-hero-title">
            <div className="stack-hero-copy">
              <div>
                <div className="stack-kicker">Multifamily, by design</div>
                <h1 id="stack-hero-title">Roofing that <em>keeps</em> the whole asset moving.</h1>
                <p className="stack-hero-lede">The roofing partner for apartment communities, developers, and GCs who need a clear scope before the first crew arrives.</p>
              </div>
              <div className="stack-hero-foot">
                <a href="#stack-contact">Build your project brief <ArrowRight size={15} /></a>
                <span className="stack-location"><MapPin size={14} /> Charlotte → Southeast</span>
              </div>
            </div>
            <div className="stack-hero-image" role="img" aria-label="Apartment community roofline at golden hour">
              <div className="stack-image-note">Field note / 001<span>Charlotte, North Carolina</span></div>
            </div>
          </section>

          <section className="stack-stats" aria-label="Company experience">
            <div className="stack-stat"><b>50+</b><span>Years combined roofing experience</span></div>
            <div className="stack-stat"><b>$5.5B+</b><span>Multifamily transaction experience</span></div>
            <div className="stack-stat"><b>04</b><span>Southeast states served</span></div>
            <div className="stack-stat"><b>01</b><span>Point of accountability</span></div>
          </section>

          <section className="stack-wrap stack-section" id="stack-approach">
            <div className="stack-section-head">
              <div className="stack-kicker">The operating idea</div>
              <div>
                <h2>Roof work is never just roof work.</h2>
                <p className="stack-section-intro">It touches the schedule, the resident experience, the capital plan, and the next owner. We make those connections visible early.</p>
              </div>
            </div>
            <div className="stack-dossier">
              <div className="stack-service-list" role="tablist" aria-label="Roofing services">
                {services.map((service, index) => (
                  <button className={`stack-service ${activeService === index ? "active" : ""}`} key={service.number} type="button" role="tab" aria-selected={activeService === index} onClick={() => setActiveService(index)}>
                    <span className="stack-service-number">{service.number}</span>
                    <span><strong>{service.title}</strong><small>{service.summary}</small></span>
                    <ArrowRight size={16} />
                  </button>
                ))}
              </div>
              <article className="stack-dossier-panel" data-index={services[activeService].number} role="tabpanel">
                <span className="stack-micro">Scope / {services[activeService].number}</span>
                <h3>{services[activeService].title}</h3>
                <p>{services[activeService].detail}</p>
                <span className="stack-dossier-accent" style={{ backgroundColor: services[activeService].color }} />
              </article>
            </div>
          </section>

          <section className="stack-wrap stack-experience" id="stack-process">
            <div className="stack-experience-inner">
              <div>
                <div className="stack-kicker" style={{ color: "#d0a358" }}>From first walk to closeout</div>
                <h2>Clear handoffs. Fewer surprises.</h2>
                <p className="stack-experience-copy">A repeatable process gives every stakeholder the same picture of the work—while experienced people stay responsible for every conclusion.</p>
              </div>
              <div className="stack-process-list">
                {[
                  ["01", "Frame the asset", "Scope, schedule, stakeholders"],
                  ["02", "See the condition", "Building-level field intelligence"],
                  ["03", "Make the plan", "Priorities, phasing, budget"],
                  ["04", "Deliver + document", "Install, inspect, warrant"],
                ].map(([number, title, detail]) => (
                  <div className="stack-process-row" key={number}>
                    <span>{number}</span>
                    <div><strong>{title}</strong><small>{detail}</small></div>
                    <Check size={16} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="stack-wrap stack-answers" id="stack-answers">
            <div className="stack-answers-grid">
              <div>
                <div className="stack-kicker">Useful answers</div>
                <h2>Before you put us on the bid list.</h2>
                <p className="stack-answers-copy">The short version of how we work, where we work, and what a first conversation looks like.</p>
              </div>
              <div>
                <div className="stack-faq">
                  {faqs.map(([question, answer], index) => (
                    <div className="stack-faq-item" key={question}>
                      <button className={`stack-faq-toggle ${openFaq === index ? "open" : ""}`} type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                        {question}<ChevronDown size={17} />
                      </button>
                      {openFaq === index && <div className="stack-faq-answer">{answer}</div>}
                    </div>
                  ))}
                </div>
                <button className="stack-save" type="button" onClick={savePage}>Save this page for later <ClipboardList size={14} /></button>
              </div>
            </div>
          </section>

          <section className="stack-contact" id="stack-contact" aria-labelledby="stack-contact-title">
            <div className="stack-wrap stack-contact-grid">
              <div>
                <div className="stack-kicker">Start a conversation</div>
                <h2 id="stack-contact-title">Let&apos;s nail down your roofing plan.</h2>
                <p className="stack-contact-note">Tell us what you&apos;re planning. We&apos;ll come prepared to talk scope and schedule.</p>
                <div className="stack-contact-details">
                  <a href="tel:+17042192097">704-219-2097</a>
                  <a href="mailto:help@themultifamilyroofers.com">help@themultifamilyroofers.com</a>
                </div>
              </div>
              {submitted ? (
                <div className="stack-success" role="status">
                  <div className="stack-success-mark"><Check size={16} /></div>
                  <h3>Message received.</h3>
                  <p>Thank you. Our team will review the details and follow up on scope and next steps.</p>
                  <button type="button" onClick={() => setSubmitted(false)}>Send another message <ArrowRight size={13} /></button>
                </div>
              ) : (
                <form className="stack-contact-form" onSubmit={handleSubmit} aria-label="Request a bid form">
                  <div className="stack-form-row">
                    <label className="stack-field"><span>Name</span><input name="name" placeholder="Your name" required /></label>
                    <label className="stack-field"><span>Company</span><input name="company" placeholder="Company name" required /></label>
                  </div>
                  <div className="stack-form-row">
                    <label className="stack-field"><span>Email</span><input name="email" type="email" placeholder="you@company.com" required /></label>
                    <label className="stack-field"><span>Phone</span><input name="phone" type="tel" placeholder="(555) 555-5555" /></label>
                  </div>
                  <label className="stack-field"><span>Project details</span><textarea name="message" placeholder="Property, number of buildings, timing…" required /></label>
                  <button className="stack-button" type="submit">Send message <ArrowRight size={15} /></button>
                </form>
              )}
            </div>
          </section>
        </main>

        <footer className="stack-footer">
          <div className="stack-wrap stack-footer-inner">
            <small>© 2024 Multifamily Roofing Specialists / Charlotte, NC</small>
            <div className="stack-footer-links"><a href="#stack-top">Back to top</a><a href="#stack-contact">Start a project</a></div>
          </div>
        </footer>
      </div>
      {saved && <div className="stack-toast"><ShieldCheck size={14} /> Page saved to your notes</div>}
    </div>
  );
}