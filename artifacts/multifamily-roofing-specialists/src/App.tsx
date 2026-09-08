import { useEffect, useState, type CSSProperties, type FormEvent } from 'react';
import { ArrowRight, Check, Menu, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import roofDetail from '@assets/image_1788528449639.png';
import roofCraft from '@assets/image_1788528508357.png';
import roofInspection from '@assets/image_1788528536470.png';
import roofInstall from '@assets/image_1788528549611.png';
import roofRepair from '@assets/image_1788528562507.png';
import brandLogo from '@assets/3_1788871577496.png';

const queryClient = new QueryClient();

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Service Area', href: '#service-area' },
  { label: 'Contact', href: '#contact' },
];

const programs = [
  {
    number: '01',
    title: 'New Construction',
    description:
      'Production roofing for apartment developments, with coordinated material loading, repeatable install details, and disciplined closeout across every building on the job.',
  },
  {
    number: '02',
    title: 'Occupied Rehabs & Portfolio Reroofing',
    description:
      'Multi-building replacements sequenced around residents: access, parking, landscaping, daily cleanup, and clear communication with property staff throughout.',
  },
  {
    number: '03',
    title: 'Storm & Damage Inspections',
    description:
      'Prompt, photo-documented field assessments organized by building, so ownership and management teams know exactly what needs action and what doesn’t.',
  },
  {
    number: '04',
    title: 'Capital Planning Support',
    description:
      'Roof condition data translated into real priorities: replacement windows, phasing options, and budget numbers your capital plan can actually use.',
  },
  {
    number: '05',
    title: 'Warranty & Closeout Documentation',
    description:
      'Manufacturer and workmanship warranties, inspection records, and closeout packages delivered in a format that holds up for lenders, insurers, and future ownership transitions.',
  },
  {
    number: '06',
    title: 'Maintenance Programs',
    description:
      'Recurring inspection and maintenance built around defined checkpoints (year 3, year 5, year 10), with documentation that carries forward as the roof ages.',
  },
];

const reasons = [
  {
    title: 'GC-Ready Process',
    description:
      'We work inside your construction schedule, not around it. Clear specs, submittals, and communication your project team can rely on.',
  },
  {
    title: 'Licensed, Vetted Crews',
    description:
      'Every crew on site carries its own general liability and workers’ comp coverage, with certificates provided before work begins.',
  },
  {
    title: 'Supplier Relationships That Protect Your Timeline',
    description:
      'Established accounts with major manufacturers and distributors mean material availability and pricing you can plan around.',
  },
  {
    title: 'One Point of Contact',
    description:
      'No chasing subcontractors or translating between trades. One team owns the job from bid to warranty.',
  },
  {
    title: 'Manufacturer-Backed Warranties',
    description:
      'Material and workmanship warranties documented and delivered at closeout, not promised and forgotten.',
  },
];

function Brand() {
  return (
    <a href="#home" className="brand" data-testid="link-brand">
      <img className="brand-logo" src={brandLogo} alt="Multifamily Roofing Specialists" />
    </a>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="container-shell header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link"
              data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="btn-primary header-cta" data-testid="button-header-request-bid">
          Request a Bid <ArrowRight size={15} aria-hidden="true" />
        </a>
        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          data-testid="button-mobile-menu"
        >
          {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>
      <nav className={`mobile-menu ${menuOpen ? 'open' : ''}`} aria-label="Mobile navigation">
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={closeMenu} data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(' ', '-')}`}>
            {item.label}
          </a>
        ))}
        <a href="#contact" className="btn-primary" onClick={closeMenu} data-testid="button-mobile-request-bid">
          Request a Bid <ArrowRight size={15} aria-hidden="true" />
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="hero"
      aria-labelledby="hero-title"
      style={{ '--hero-image': `url(${roofInstall})` } as CSSProperties}
    >
      <div className="container-shell hero-content">
        <div className="hero-heading">
          <h1 id="hero-title" className="serif" data-testid="text-hero-headline">
            Multifamily
            <br />
            Roofing
            <br />
            Specialists
          </h1>
        </div>
        <div className="hero-support">
          <p className="hero-tagline serif" data-testid="text-hero-tagline">
            Not Generalists. Multifamily Specialists.
          </p>
          <div className="hero-copy">
            <p>
              We don&apos;t split our attention across residential, commercial, and industrial work. That focus means crews who&apos;ve seen the same building types over and over, and pricing built on real production data instead of a generalist&apos;s guess.
            </p>
          </div>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary" data-testid="button-hero-request-bid">
              Request a Bid <ArrowRight size={15} aria-hidden="true" />
            </a>
            <a href="#services" className="btn-secondary" data-testid="button-hero-see-work">
              See Our Work <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const [experience, setExperience] = useState(0);
  const [transactions, setTransactions] = useState(0);

  useEffect(() => {
    const finalValues = { experience: 50, transactions: 5.5 };
    const duration = 1800;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setExperience(finalValues.experience);
      setTransactions(finalValues.transactions);
      return;
    }

    let frameId = 0;
    const startTime = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setExperience(finalValues.experience * easedProgress);
      setTransactions(finalValues.transactions * easedProgress);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <section className="stats" aria-label="Company experience">
      <div className="container-shell stats-inner">
        <div className="stat" data-testid="stat-experience">
          <div className="stat-number serif">{`${Math.round(experience)}+`}</div>
          <div className="stat-label">Years of Combined Roofing Experience</div>
        </div>
        <div className="stat" data-testid="stat-transactions">
          <div className="stat-number serif">{`$${transactions.toFixed(1)}B+`}</div>
          <div className="stat-label">In Multifamily Transaction Experience</div>
        </div>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section id="about" className="intro" aria-labelledby="about-title">
      <div className="container-shell intro-grid">
        <div className="intro-heading">
          <div className="eyebrow">The partner behind the roof</div>
          <h2 id="about-title" className="serif" data-testid="text-about-headline">
            One Community Deserves One Connected Roofing Strategy
          </h2>
          <figure className="section-photo intro-photo">
            <img
              src={roofDetail}
              alt="Close-up of a connected asphalt shingle roof system"
            />
            <figcaption>Multibuilding communities require one coordinated roof plan.</figcaption>
          </figure>
        </div>
        <div className="intro-text">
          <p>
            Most roofing companies are built for homeowners. We&apos;re built for the people who build and own apartment communities.
          </p>
          <p>
            We work exclusively on multifamily properties, which means we understand what a general contractor&apos;s schedule actually requires, what a REIT&apos;s capital planning process looks like, and why a property manager can&apos;t afford a crew that shows up unannounced. Every job runs on clear specs, real documentation, and a single point of accountability from bid to closeout.
          </p>
          <p>
            Whether you&apos;re breaking ground on a new development or managing roof replacement across a growing portfolio, we scope it, price it, and deliver it the way an institutional partner expects.
          </p>
          <a href="#services" className="text-link" data-testid="link-see-services">
            See Our Services <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Programs() {
  return (
    <section id="services" className="programs" aria-labelledby="programs-title">
      <div className="container-shell">
        <div className="section-lead">
          <div>
            <div className="eyebrow">Six Core Programs</div>
            <h2 id="programs-title" className="serif" data-testid="text-programs-headline">
              From Groundbreaking to Long-Term Reserve
            </h2>
          </div>
          <p className="section-note">
            A roofing partner for every phase of the asset lifecycle, with the field discipline and documentation to keep the next phase moving.
          </p>
        </div>
        <figure className="wide-photo programs-photo">
          <img
            src={roofCraft}
            alt="Roofer installing flashing and finishing a shingle roof"
          />
          <figcaption>New construction, occupied assets, and portfolio-scale programs.</figcaption>
        </figure>
        <div className="program-grid">
          {programs.map((program) => (
            <article className="program" key={program.number} data-testid={`program-${program.number}`}>
              <div className="program-number">{program.number}</div>
              <div>
                <h3>{program.title}</h3>
                <p>{program.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FieldIntelligence() {
  return (
    <section className="field" aria-labelledby="field-title">
      <div className="container-shell field-grid">
        <div>
          <div className="eyebrow">AI-Assisted. Experience-Led.</div>
          <h2 id="field-title" className="serif" data-testid="text-field-headline">
            Better Field Information. Cleaner Ownership Decisions.
          </h2>
          <figure className="section-photo field-photo">
            <img
              src={roofRepair}
              alt="Roofer repairing an asphalt shingle roof"
            />
            <figcaption>Field conditions documented at the roof-system level.</figcaption>
          </figure>
        </div>
        <div className="field-copy">
          <p>
            Our inspection workflows use AI-assisted organization and automation to help structure imagery, observations, building-level conditions, and follow-up. That means less friction between the field, the report, and the capital plan, while experienced people remain responsible for every conclusion.
          </p>
          <ul className="field-list">
            {[
              'Building-by-building condition organization',
              'Photo-supported documentation',
              'Repeatable inspection checkpoints',
              'Clearer priorities and next actions',
            ].map((item, index) => (
              <li key={item} data-testid={`field-capability-${index + 1}`}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section className="why" aria-labelledby="why-title">
      <div className="container-shell">
        <div className="why-head">
          <div className="eyebrow">The standard we work to</div>
          <h2 id="why-title" className="serif" data-testid="text-why-headline">
            Built for Institutional Multifamily, Not Retail Roofing
          </h2>
        </div>
        <div className="why-list">
          {reasons.map((reason, index) => (
            <article className="why-item" key={reason.title} data-testid={`reason-${index + 1}`}>
              <h3 className="serif">{reason.title}</h3>
              <p>{reason.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceArea() {
  return (
    <section id="service-area" className="area" aria-labelledby="area-title">
      <div className="container-shell area-grid">
        <div>
          <div className="eyebrow">Where we work</div>
          <h2 id="area-title" className="serif" data-testid="text-area-headline">
            Serving the Southeast, Based in Charlotte
          </h2>
        </div>
        <div className="area-copy">
          <p>
            Multifamily Roofing Specialists is based in Charlotte, NC and serves institutional multifamily owners, developers, and general contractors across North Carolina, South Carolina, Tennessee, and Georgia.
          </p>
          <figure className="area-photo">
            <img
              src={roofInspection}
              alt="Roofer inspecting a roof during field work"
            />
            <figcaption>Charlotte-based coverage across the Southeast.</figcaption>
          </figure>
            <div className="region-states" aria-label="Service region: North Carolina, South Carolina, Tennessee and Georgia" role="img">
              <span>North Carolina</span>
              <span>South Carolina</span>
              <span>Tennessee</span>
              <span>Georgia</span>
          </div>
          <a href="#contact" className="btn-secondary area-button" data-testid="button-area-contact">
            Contact Us About Your Project <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

function BottomCta() {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="container-shell cta-grid">
        <div>
          <h2 id="cta-title" className="serif" data-testid="text-cta-headline">
            Have a Multifamily Roofing Project on the Schedule?
          </h2>
          <p>
            Whether it&apos;s one building or a full portfolio, let&apos;s talk about scope, timeline, and budget before you finalize your bid list.
          </p>
        </div>
        <a href="#contact" className="btn-primary" data-testid="button-cta-request-bid">
          Request a Bid <ArrowRight size={15} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="container-shell contact-grid">
        <div>
          <div className="eyebrow">Start a conversation</div>
          <h2 id="contact-title" className="serif" data-testid="text-contact-headline">
            Let&apos;s Talk About the Work Ahead
          </h2>
          <p className="contact-note">
            Tell us what you&apos;re planning. We&apos;ll come prepared to talk scope, schedule, and the level of documentation your project requires.
          </p>
          <div className="contact-details">
            <a href="tel:+17045550184" data-testid="link-contact-phone">[Phone]</a>
            <a href="mailto:projects@multifamilyroofingspecialists.com" data-testid="link-contact-email">[Email]</a>
          </div>
        </div>
        <div>
          {submitted ? (
            <div className="success-state" role="status" data-testid="status-form-success">
              <div className="success-mark" aria-hidden="true"><Check size={17} /></div>
              <h3 className="serif">Message received.</h3>
              <p>
                Thank you for reaching out. Our team will review the project details and follow up to discuss scope, schedule, and next steps.
              </p>
              <button type="button" className="btn-reset" onClick={() => setSubmitted(false)} data-testid="button-submit-another">
                Send another message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} aria-label="Request a bid form">
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="name">Name</label>
                  <input id="name" name="name" type="text" placeholder="Your name" required data-testid="input-name" />
                </div>
                <div className="form-field">
                  <label htmlFor="company">Company</label>
                  <input id="company" name="company" type="text" placeholder="Company name" required data-testid="input-company" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" placeholder="you@company.com" required data-testid="input-email" />
                </div>
                <div className="form-field">
                  <label htmlFor="phone">Phone</label>
                  <input id="phone" name="phone" type="tel" placeholder="(555) 555-5555" data-testid="input-phone" />
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="project-type">Project Type</label>
                <select id="project-type" name="projectType" defaultValue="" required data-testid="select-project-type">
                  <option value="" disabled>Select a project type</option>
                  <option value="new-construction">New Construction</option>
                  <option value="reroofing">Reroofing</option>
                  <option value="storm-damage">Storm Damage</option>
                  <option value="capital-planning">Capital Planning</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" placeholder="Tell us about the property, scope, and timeline." required data-testid="textarea-message" />
              </div>
              <button type="submit" className="btn-primary form-submit" data-testid="button-submit-form">
                Send Message <ArrowRight size={15} aria-hidden="true" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container-shell">
        <div className="footer-grid">
          <div>
            <Brand />
            <p className="footer-brand-copy">
              Not Generalists. Multifamily Specialists.
              <br />
              Roofing for apartment communities. New construction, capital projects, and portfolio roofing across the Southeast.
            </p>
          </div>
          <div>
            <h3>Services</h3>
            <ul>
              <li><a href="#services" data-testid="link-footer-new-construction">New Construction Roofing</a></li>
              <li><a href="#services" data-testid="link-footer-portfolio">Portfolio Reroofing &amp; Capital Projects</a></li>
              <li><a href="#services" data-testid="link-footer-inspections">Roof Inspections &amp; Condition Reports</a></li>
              <li><a href="#services" data-testid="link-footer-maintenance">Repairs &amp; Maintenance</a></li>
            </ul>
          </div>
          <div>
            <h3>Quick Links</h3>
            <ul>
              {navItems.map((item) => (
                <li key={item.href}><a href={item.href} data-testid={`link-footer-${item.label.toLowerCase().replaceAll(' ', '-')}`}>{item.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Get in Touch</h3>
            <ul>
              <li><a href="tel:+17045550184" data-testid="link-footer-phone">[Phone]</a></li>
              <li><a href="mailto:projects@multifamilyroofingspecialists.com" data-testid="link-footer-email">[Email]</a></li>
              <li>Serving Charlotte, NC and the greater NC, SC, TN, GA region</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom" data-testid="text-copyright">© {year} Multifamily Roofing Specialists. All Rights Reserved.</div>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <div className="noise">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Intro />
        <Programs />
        <FieldIntelligence />
        <WhyUs />
        <ServiceArea />
        <BottomCta />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ErrorBoundary resetKey="home">
          <Home />
        </ErrorBoundary>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;