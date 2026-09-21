import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react';
import { Check, Menu, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import roofDetail from '@assets/image_1788528449639.png';
import brandLogo from '@assets/3_1788871577496.png';
import heroImage from '@assets/ChatGPT_Image_Sep_8,_2026,_08_57_09_AM_1788872235177.png';
import programsImage from '@assets/ChatGPT_Image_Sep_8,_2026,_08_59_06_AM_1788872386373.png';
import areaImage from '@assets/ChatGPT_Image_Sep_8,_2026,_09_00_43_AM_1788872448627.png';
import fieldImage from '@assets/c2e03dc0-e0cc-400b-bfcf-d2b8d0d1c3c2_1789407233528.png';
import constructionImage from '@assets/Gemini_Generated_Image_xkwxflxkwxflxkwx_1790002833976.jpg';

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
    image: programsImage,
    description:
      'Production roofing coordinated to your schedule, materials, and closeout requirements.',
  },
  {
    number: '02',
    title: 'Occupied Rehabs & Portfolio Reroofing',
    description:
      'Reroofing sequenced around residents, access, parking, cleanup, and property teams.',
  },
  {
    number: '03',
    title: 'Storm & Damage Inspections',
    description:
      'Photo-documented inspections organized by building, with clear next actions.',
  },
  {
    number: '04',
    title: 'Capital Planning Support',
    image: constructionImage,
    description:
      'Roof condition data turned into replacement windows, phasing, and usable budgets.',
  },
  {
    number: '05',
    title: 'Warranty & Closeout Documentation',
    description:
      'Warranty, inspection, and closeout records ready for lenders, insurers, and ownership.',
  },
  {
    number: '06',
    title: 'Maintenance Programs',
    description:
      'Scheduled inspections and maintenance that keep roof conditions visible over time.',
  },
];

const reasons = [
  {
    title: 'GC-Ready Process',
    description:
      'Specs, submittals, and communication that fit your schedule.',
  },
  {
    title: 'Licensed, Vetted Crews',
    description:
      'Vetted crews with required liability and workers’ comp coverage.',
  },
  {
    title: 'Supplier Relationships That Protect Your Timeline',
    description:
      'Established relationships that protect material availability and pricing.',
  },
  {
    title: 'One Point of Contact',
    description:
      'One team owns the job from bid to warranty.',
  },
  {
    title: 'Manufacturer-Backed Warranties',
    description:
      'Documented material and workmanship warranties at closeout.',
  },
];

function useInView() {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function Brand() {
  return (
    <a href="#home" className="brand" data-testid="link-brand">
      <img className="brand-logo" src={brandLogo} alt="Multifamily Roofing Specialists" />
    </a>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
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
          Request a Bid
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
          Request a Bid
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
      style={{ '--hero-image': `url(${heroImage})` } as CSSProperties}
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
              We focus exclusively on multifamily roofing, so our crews know the buildings, schedules, and budgets that keep projects moving.
            </p>
          </div>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary" data-testid="button-hero-request-bid">
              Request a Bid
            </a>
            <a href="#services" className="btn-secondary" data-testid="button-hero-see-work">
              See Our Work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const [progress, setProgress] = useState(0);
  const { ref, isVisible } = useInView();

  useEffect(() => {
    if (!isVisible) return;

    const duration = 1800;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setProgress(1);
      return;
    }

    let frameId = 0;
    const startTime = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setProgress(easedProgress);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isVisible]);

  return (
    <section ref={ref} className="stats" aria-label="Company experience">
      <div className="container-shell stats-inner">
        <div className="stat" data-testid="stat-experience">
          <div className="stat-number serif">{`${Math.round(50 * progress)}+`}</div>
          <div className="stat-label">Years Combined Experience</div>
        </div>
        <div className="stat" data-testid="stat-transactions">
          <div className="stat-number serif">{`$${(5.5 * progress).toFixed(1)}B+`}</div>
          <div className="stat-label">Multifamily Transactions</div>
        </div>
        <div className="stat" data-testid="stat-states">
          <div className="stat-number serif">{`${Math.round(4 * progress)}`}</div>
          <div className="stat-label">Southeast States</div>
        </div>
        <div className="stat" data-testid="stat-focus">
          <div className="stat-number serif">{`${Math.round(100 * progress)}%`}</div>
          <div className="stat-label">Multifamily Focus</div>
        </div>
      </div>
    </section>
  );
}

function Intro() {
  const { ref, isVisible } = useInView();

  return (
    <section ref={ref} id="about" className={`intro reveal ${isVisible ? 'is-visible' : ''}`} aria-labelledby="about-title">
      <div className="container-shell intro-grid">
        <div className="intro-heading">
          <span className="eyebrow">About the Work</span>
          <h2 id="about-title" className="serif" data-testid="text-about-headline">
            One Roofing Strategy for Every Community
          </h2>
          <figure className="section-photo intro-photo">
            <img
              src={roofDetail}
              alt="Close-up of a connected asphalt shingle roof system"
            />
          </figure>
        </div>
        <div className="intro-text">
          <p>
            Most roofing companies serve homeowners. We work exclusively with the people who build, own, and manage apartment communities.
          </p>
          <p>
            From new development to portfolio reroofing, we scope, price, document, and deliver with one accountable team.
          </p>
          <a href="#services" className="text-link" data-testid="link-see-services">
            See Our Services
          </a>
        </div>
      </div>
    </section>
  );
}

function Programs() {
  const { ref, isVisible } = useInView();

  return (
    <section ref={ref} id="services" className={`programs reveal ${isVisible ? 'is-visible' : ''}`} aria-labelledby="programs-title">
      <div className="container-shell">
        <div className="section-lead">
          <div>
            <span className="eyebrow">Our Markets</span>
            <h2 id="programs-title" className="serif" data-testid="text-programs-headline">
              From Groundbreaking to Long-Term Reserve
            </h2>
          </div>
          <p className="section-note">
            Roofing support across the full asset lifecycle.
          </p>
        </div>
        <div className="program-grid">
          {programs.map((program) => (
            <article
              className={`program program-card ${program.image ? '' : 'program-card--plain'} reveal-item`}
              key={program.number}
              style={{
                '--reveal-delay': `${Number(program.number) * 70}ms`,
                ...(program.image ? { '--program-image': `url(${program.image})` } : {}),
              } as CSSProperties}
              data-testid={`program-${program.number}`}
            >
              <div className="program-card-content">
                <div className="program-number">{program.number}</div>
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
  const { ref, isVisible } = useInView();

  return (
    <section ref={ref} className={`field reveal ${isVisible ? 'is-visible' : ''}`} aria-labelledby="field-title">
      <div className="container-shell field-grid">
        <div>
          <span className="eyebrow">Field Intelligence</span>
          <h2 id="field-title" className="serif" data-testid="text-field-headline">
            Better Field Information. Cleaner Decisions.
          </h2>
          <figure className="section-photo field-photo">
            <img
              src={fieldImage}
              alt="Roofing crews working across a multifamily community at sunset"
            />
          </figure>
        </div>
        <div className="field-copy">
          <p>
            AI-assisted organization structures photos, observations, and building conditions. Experienced people remain responsible for every conclusion.
          </p>
          <ul className="field-list">
            {[
              'Building-level condition organization',
              'Photo-supported reports',
              'Repeatable checkpoints',
              'Clear next actions',
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
  const { ref, isVisible } = useInView();

  return (
    <section ref={ref} className={`why reveal ${isVisible ? 'is-visible' : ''}`} aria-labelledby="why-title">
      <div className="container-shell">
        <div className="why-head">
          <span className="eyebrow">Our Approach</span>
          <h2 id="why-title" className="serif" data-testid="text-why-headline">
            Built for Institutional Multifamily
          </h2>
        </div>
        <div className="why-list">
          {reasons.map((reason, index) => (
            <article
              className="why-item reveal-item"
              key={reason.title}
              style={{ '--reveal-delay': `${index * 70}ms` } as CSSProperties}
              data-testid={`reason-${index + 1}`}
            >
              <div className="why-value">
                <span className="eyebrow">Value</span>
                <h3 className="serif">{reason.title}</h3>
              </div>
              <div className="why-commitment">
                <span className="eyebrow">Commitment</span>
                <p>{reason.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceArea() {
  const { ref, isVisible } = useInView();

  return (
    <section ref={ref} id="service-area" className={`area reveal ${isVisible ? 'is-visible' : ''}`} aria-labelledby="area-title">
      <div className="container-shell area-grid">
        <div>
          <span className="eyebrow">Service Area</span>
          <h2 id="area-title" className="serif" data-testid="text-area-headline">
            Serving the Southeast from Charlotte
          </h2>
        </div>
        <div className="area-copy">
          <p>
            Charlotte-based roofing support for multifamily owners, developers, and GCs across NC, SC, TN, and GA.
          </p>
          <figure className="area-photo">
            <img
              src={areaImage}
              alt="Sunset view across a multifamily apartment community and connected rooflines"
            />
          </figure>
            <div className="region-states" aria-label="Service region: North Carolina, South Carolina, Tennessee and Georgia" role="img">
              <span>North Carolina</span>
              <span>South Carolina</span>
              <span>Tennessee</span>
              <span>Georgia</span>
          </div>
          <a href="#contact" className="btn-secondary area-button" data-testid="button-area-contact">
            Contact Us About Your Project
          </a>
        </div>
      </div>
    </section>
  );
}

function BottomCta() {
  const { ref, isVisible } = useInView();

  return (
    <section ref={ref} className={`cta reveal ${isVisible ? 'is-visible' : ''}`} aria-labelledby="cta-title">
      <div className="container-shell cta-grid">
        <div>
          <h2 id="cta-title" className="serif" data-testid="text-cta-headline">
            Have a Roofing Project Ahead?
          </h2>
          <p>
            Let&apos;s talk scope, timeline, and budget before you finalize your bid list.
          </p>
        </div>
        <a href="#contact" className="btn-primary" data-testid="button-cta-request-bid">
          Request a Bid
        </a>
      </div>
    </section>
  );
}

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const { ref, isVisible } = useInView();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section ref={ref} id="contact" className={`contact reveal ${isVisible ? 'is-visible' : ''}`} aria-labelledby="contact-title">
      <div className="container-shell contact-grid">
        <div>
          <span className="eyebrow">Start a Conversation</span>
          <h2 id="contact-title" className="serif" data-testid="text-contact-headline">
            Let&apos;s Nail Down Your Roofing Plan
          </h2>
          <p className="contact-note">
            Tell us what you&apos;re planning. We&apos;ll come prepared to talk scope and schedule.
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
                Thank you. Our team will review the details and follow up on scope and next steps.
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
                Send Message
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
              Roofing for apartment communities across the Southeast.
            </p>
          </div>
          <div>
            <h3>Services</h3>
            <ul>
              <li><a href="#services" data-testid="link-footer-new-construction">New Construction</a></li>
              <li><a href="#services" data-testid="link-footer-portfolio">Portfolio Reroofing</a></li>
              <li><a href="#services" data-testid="link-footer-inspections">Roof Inspections</a></li>
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
    <div>
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