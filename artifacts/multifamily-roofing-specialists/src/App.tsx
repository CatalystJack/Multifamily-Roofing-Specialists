import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react';
import { Check, Menu, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import brandLogo from '@assets/3_1788871577496.png';
import roofDetail from '@assets/image_1788528449639.png';
import heroImage from '@assets/ChatGPT_Image_Sep_8,_2026,_08_57_09_AM_1788872235177.png';
import fieldImage from '@assets/c2e03dc0-e0cc-400b-bfcf-d2b8d0d1c3c2_1789407233528.png';
import teamPlanningImage from '@assets/Gemini_Generated_Image_oswqyioswqyioswq_1790081808886.jpg';
import fieldConditionsImage from '@assets/Gemini_Generated_Image_3attqx3attqx3att_1790082057846.jpg';
import fieldReportsImage from '@assets/Gemini_Generated_Image_oj6lw4oj6lw4oj6l_1790082074140.jpg';
import fieldCheckpointsImage from '@assets/Gemini_Generated_Image_b2ftsib2ftsib2ft_1790082093705.jpg';
import fieldActionsImage from '@assets/Gemini_Generated_Image_irlxrqirlxrqirlx_1790082106322.jpg';
import constructionImage from '@assets/Gemini_Generated_Image_xkwxflxkwxflxkwx_1790002833976.jpg';
import newConstructionImage from '@assets/image_1790003076677.png';
import occupiedRehabsImage from '@assets/image_1790013020294.png';
import stormInspectionImage from '@assets/image_1790003116172.png';
import maintenanceImage from '@assets/image_1790003123704.png';
import warrantyImage from '@assets/image_1790003170403.png';

const queryClient = new QueryClient();

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

const programs = [
  {
    number: '01',
    title: 'New Construction',
    image: newConstructionImage,
    description:
      'Production roofing coordinated to your schedule, materials, and closeout requirements.',
  },
  {
    number: '02',
    title: 'Occupied Rehabs & Portfolio Reroofing',
    image: occupiedRehabsImage,
    description:
      'Reroofing sequenced around residents, access, parking, cleanup, and property teams.',
  },
  {
    number: '03',
    title: 'Storm & Damage Inspections',
    image: stormInspectionImage,
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
    image: warrantyImage,
    description:
      'Warranty, inspection, and closeout records ready for lenders, insurers, and ownership.',
  },
  {
    number: '06',
    title: 'Maintenance Programs',
    image: maintenanceImage,
    description:
      'Scheduled inspections and maintenance that keep roof conditions visible over time.',
  },
];

const reasons = [
  {
    title: 'Check your ego at the door',
    description:
      'Bring curiosity, accountability, and a willingness to do the work together.',
  },
  {
    title: 'Relentless pursuit of excellence',
    description:
      'Raise the standard in every scope, inspection, handoff, and closeout.',
  },
  {
    title: 'Partner first, always',
    description:
      'Make decisions around what protects the partner’s project and long-term goals.',
  },
  {
    title: 'Do what you say you’ll do',
    description:
      'Communicate clearly, follow through, and own the outcome.',
  },
  {
    title: 'Take care of the crew, take care of the partner',
    description:
      'Respect the people doing the work and the people trusting us with it.',
  },
];

const approachCards = [
  {
    label: 'How we work',
    title: 'Teams aligned in every phase.',
    description:
      'Bring curiosity, accountability, and care to the crew into every scope, handoff, and partner conversation.',
    image: teamPlanningImage,
    values: [reasons[0].title, reasons[2].title, reasons[4].title],
    cta: 'Meet the team',
  },
  {
    label: 'How we decide',
    title: 'Follow-through that keeps projects moving.',
    description:
      'Raise the standard, communicate clearly, and own the outcome from the first inspection through closeout.',
    image: fieldActionsImage,
    values: [reasons[1].title, reasons[3].title],
    cta: 'Talk through your project',
  },
];

const fieldCapabilities = [
  {
    id: 'conditions',
    label: 'Building conditions',
    title: 'See the condition of every building clearly.',
    description:
      'Organize observations at the building level so the next decision starts with usable field information.',
    image: fieldConditionsImage,
    imageAlt: 'Roofing inspector documenting conditions across a multifamily roof',
  },
  {
    id: 'reports',
    label: 'Photo-supported reports',
    title: 'Turn field photos into clear reporting.',
    description:
      'Bring photos, observations, and scope notes together in a format owners, GCs, and property teams can use.',
    image: fieldReportsImage,
    imageAlt: 'Roofing specialist photographing a roof vent while reviewing tablet notes',
  },
  {
    id: 'checkpoints',
    label: 'Repeatable checkpoints',
    title: 'Create consistency across every visit.',
    description:
      'Use repeatable checkpoints to compare conditions over time and keep projects moving with fewer surprises.',
    image: fieldCheckpointsImage,
    imageAlt: 'Two roofing professionals reviewing a roof checkpoint together',
  },
  {
    id: 'actions',
    label: 'Clear next actions',
    title: 'Move from issue to informed action.',
    description:
      'Make the next step visible, practical, and connected to the project’s timeline and budget.',
    image: fieldActionsImage,
    imageAlt: 'Roofing team discussing next steps on a multifamily roof',
  },
];

const operatingStates = [
  {
    code: 'NC',
    name: 'North Carolina',
    description: 'Charlotte-based coverage for owners, developers, and GCs.',
    image: fieldImage,
  },
  {
    code: 'SC',
    name: 'South Carolina',
    description: 'Roofing support for new construction and occupied rehabs.',
    image: constructionImage,
  },
  {
    code: 'TN',
    name: 'Tennessee',
    description: 'Inspections, reroofing, and capital planning support.',
    image: newConstructionImage,
  },
  {
    code: 'GA',
    name: 'Georgia',
    description: 'Portfolio-wide coordination from scope through closeout.',
    image: maintenanceImage,
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

function AboutUs() {
  const { ref, isVisible } = useInView();

  return (
    <section ref={ref} id="about" className={`about-us reveal ${isVisible ? 'is-visible' : ''}`} aria-labelledby="about-title">
      <div className="about-us-split">
        <figure className="about-us-photo">
          <img src={teamPlanningImage} alt="Multifamily roofing team reviewing plans together on a roof" />
        </figure>
        <div className="about-us-panel">
          <div className="about-us-panel-inner">
            <div className="about-us-kicker" aria-hidden="true">
              <span>01 / About us</span>
            </div>
            <h2 id="about-title" className="serif" data-testid="text-about-headline">
              <span>Extraordinary teams</span>
              <span>building inspiring</span>
              <span>projects.</span>
            </h2>
            <div className="about-us-panel-label">Built exclusively for multifamily</div>
            <p>
              Most roofing companies serve homeowners. We work with the people who build, own, and manage apartment communities.
            </p>
            <p>
              That focus shapes how we plan, communicate, document, and deliver—from the first scope through the final warranty.
            </p>
            <a href="#services" className="btn-primary about-us-link" data-testid="link-about-services">
              Who we are
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Programs() {
  const { ref, isVisible } = useInView();

  return (
    <section ref={ref} id="services" className={`programs reveal ${isVisible ? 'is-visible' : ''}`} aria-label="Services and scope of work">
      <div className="programs-body">
        <div className="container-shell">
          <div className="programs-body-head">
            <span>Scope of work</span>
            <span>Six ways we keep the roofline moving</span>
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
      </div>
    </section>
  );
}

function FieldIntelligence() {
  const { ref, isVisible } = useInView();
  const [activeCapabilityId, setActiveCapabilityId] = useState(fieldCapabilities[0].id);
  const activeCapability = fieldCapabilities.find((capability) => capability.id === activeCapabilityId) ?? fieldCapabilities[0];
  const activeCapabilityIndex = fieldCapabilities.findIndex((capability) => capability.id === activeCapability.id) + 1;

  return (
    <section ref={ref} id="field-intelligence" className={`field reveal ${isVisible ? 'is-visible' : ''}`} aria-labelledby="field-title">
      <div className="container-shell field-experience">
        <div className="field-intro">
          <span className="eyebrow">Field Intelligence</span>
          <h2 id="field-title" className="serif" data-testid="text-field-headline">
            Better Field Information.
            <br />
            Cleaner Decisions.
          </h2>
          <div className="field-tabs" role="tablist" aria-label="Field intelligence capabilities">
            {fieldCapabilities.map((capability, index) => (
              <button
                key={capability.id}
                type="button"
                role="tab"
                aria-selected={activeCapability.id === capability.id}
                aria-controls="field-capability-panel"
                className={`field-tab ${activeCapability.id === capability.id ? 'is-active' : ''}`}
                onClick={() => setActiveCapabilityId(capability.id)}
                data-testid={`field-tab-${index + 1}`}
              >
                {capability.label}
              </button>
            ))}
          </div>
        </div>
        <article
          id="field-capability-panel"
          className="field-feature"
          role="tabpanel"
          aria-labelledby={`field-tab-${activeCapability.id}`}
        >
          <img
            src={activeCapability.image}
            alt={activeCapability.imageAlt}
          />
          <div className="field-feature-overlay">
            <div className="field-feature-topline">
              <span>{String(activeCapabilityIndex).padStart(2, '0')} / 04</span>
            </div>
            <div className="field-feature-copy">
              <h3 className="serif">{activeCapability.title}</h3>
              <p>{activeCapability.description}</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function WhyUs() {
  const { ref, isVisible } = useInView();

  return (
    <section ref={ref} id="approach" className={`why reveal ${isVisible ? 'is-visible' : ''}`} aria-labelledby="why-title">
      <div className="container-shell">
        <div className="why-head">
          <span className="eyebrow">Our Approach</span>
          <h2 id="why-title" className="serif" data-testid="text-why-headline">
            Built for Institutional Multifamily
          </h2>
        </div>
        <div className="why-cards">
          {approachCards.map((card, index) => (
            <article
              className="why-card reveal-item"
              key={card.title}
              style={{
                '--reveal-delay': `${index * 100}ms`,
                '--why-image': `url(${card.image})`,
              } as CSSProperties}
              data-testid={`approach-card-${index + 1}`}
            >
              <div className="why-card-content">
                <span className="why-card-label">{card.label}</span>
                <h3 className="serif">{card.title}</h3>
                <p>{card.description}</p>
                <div className="why-card-values" aria-label="Values represented">
                  {card.values.map((value) => (
                    <span key={value}>{value}</span>
                  ))}
                </div>
                <a href="#contact" className="btn-primary why-card-link" data-testid={`link-approach-card-${index + 1}`}>
                  {card.cta}
                </a>
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
        <div className="area-heading">
          <span className="eyebrow">Service Area</span>
          <h2 id="area-title" className="serif" data-testid="text-area-headline">
            Serving the Southeast from Charlotte
          </h2>
          <div className="area-heading-line" aria-hidden="true">
            <span>04</span>
            <span>Regional coverage</span>
          </div>
        </div>
        <div className="area-content">
          <p>
            Charlotte-based roofing support for multifamily owners, developers, and GCs across NC, SC, TN, and GA.
          </p>
          <div className="area-map-card">
            <div className="area-map-topline">
              <span>Coverage network</span>
              <span>HQ / Charlotte</span>
            </div>
            <div className="area-map-stage">
              <svg className="area-map" viewBox="0 0 520 350" role="img" aria-labelledby="area-map-title area-map-description">
                <title id="area-map-title">Southeast project coverage map</title>
                <desc id="area-map-description">Animated coverage map highlighting North Carolina, South Carolina, Tennessee, and Georgia from Charlotte.</desc>
                <g className="area-state area-state--tn">
                  <path d="M96 116 L250 116 L278 135 L260 157 L209 165 L154 158 L112 146 L86 130 Z" />
                  <text x="177" y="137">TN</text>
                </g>
                <g className="area-state area-state--nc">
                  <path d="M279 129 L353 115 L424 125 L458 153 L438 169 L393 167 L366 184 L321 170 L281 153 Z" />
                  <text x="370" y="143">NC</text>
                </g>
                <g className="area-state area-state--sc">
                  <path d="M321 172 L366 185 L393 171 L415 188 L399 225 L360 243 L326 222 L302 194 Z" />
                  <text x="352" y="205">SC</text>
                </g>
                <g className="area-state area-state--ga">
                  <path d="M218 168 L302 174 L326 222 L310 291 L261 310 L221 278 L203 225 Z" />
                  <text x="260" y="246">GA</text>
                </g>
                <g className="area-origin">
                  <circle cx="285" cy="151" r="7" />
                  <circle className="area-origin-pulse" cx="285" cy="151" r="14" />
                  <text x="298" y="146">CHARLOTTE</text>
                </g>
              </svg>
            </div>
            <div className="area-map-key">
              <span><i className="area-key-dot area-key-dot--hq" />Charlotte HQ</span>
              <span><i className="area-key-dot area-key-dot--route" />Active project states</span>
            </div>
          </div>
          <div className="region-states" aria-label="Service region: North Carolina, South Carolina, Tennessee and Georgia" role="list">
            {operatingStates.map((state) => (
              <article
                key={state.code}
                className={`region-card region-card--${state.code.toLowerCase()}`}
                style={{ '--state-image': `url(${state.image})` } as CSSProperties}
                role="listitem"
              >
                <div className="region-card-topline">
                  <span>{state.code}</span>
                  <span aria-hidden="true" />
                </div>
                <div className="region-card-copy">
                  <h3>{state.name}</h3>
                  <p>{state.description}</p>
                </div>
              </article>
            ))}
          </div>
          <a href="#contact" className="btn-primary area-button" data-testid="button-area-contact">
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
              <button type="button" className="btn-primary btn-reset" onClick={() => setSubmitted(false)} data-testid="button-submit-another">
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
      <div className="container-shell footer-shell">
        <div className="footer-main">
          <div className="footer-branding">
            <Brand />
            <p className="footer-description">
              Multifamily roofing for the people who build, own, and manage apartment communities.
            </p>
            <div className="footer-region">
              <span>Based in Charlotte, NC</span>
              <span>Serving NC · SC · TN · GA</span>
            </div>
          </div>
          <div className="footer-link-groups">
            <nav className="footer-nav" aria-label="Footer navigation">
              <span className="footer-column-title">Explore</span>
              <a href="#home" data-testid="link-footer-home">Home</a>
              <a href="#about" data-testid="link-footer-about">About Us</a>
              <a href="#services" data-testid="link-footer-services">Services</a>
              <a href="#contact" data-testid="link-footer-contact">Contact</a>
            </nav>
            <nav className="footer-nav" aria-label="Footer capabilities">
              <span className="footer-column-title">Capabilities</span>
              <a href="#services" data-testid="link-footer-projects">Our Work</a>
              <a href="#field-intelligence" data-testid="link-footer-field-intelligence">Field Intelligence</a>
              <a href="#approach" data-testid="link-footer-approach">Our Approach</a>
            </nav>
          </div>
          <div className="footer-contact">
            <span className="footer-column-title">Start a conversation</span>
            <p>Tell us what you&apos;re planning. We&apos;ll come prepared to talk scope and schedule.</p>
            <a href="mailto:projects@multifamilyroofingspecialists.com" data-testid="link-footer-email">
              projects@multifamilyroofingspecialists.com
            </a>
            <a href="#contact" className="btn-primary footer-contact-link" data-testid="link-footer-request-bid">
              Request a Bid
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-legal-note">
            Multifamily Roofing Specialists is an Equal Opportunity Employer — race, color, religion, sex, sexual orientation, gender identity, national origin, disability, status as a protected veteran, or other characteristics protected by applicable law.
          </p>
          <div className="footer-bottom-meta">
            <span data-testid="text-copyright">© {year} Multifamily Roofing Specialists</span>
            <span>All rights reserved</span>
          </div>
        </div>
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
        <AboutUs />
        <Programs />
        <FieldIntelligence />
        <WhyUs />
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