import { useState } from 'react';
import { contactEmail, navItems, translations } from './content.js';

function Header({ lang, setLang, t }) {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="LumioGames home">
        <span className="brand-mark" aria-hidden="true">L</span>
        <span>LumioGames</span>
      </a>
      <nav className="nav-links" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item.key} href={item.href}>{t.nav[item.key]}</a>
        ))}
      </nav>
      <div className="header-tools">
        <div className="search-pill" aria-label={t.search}>{t.search}</div>
        <div className="language-toggle" aria-label="Language switcher">
          <button type="button" className={lang === 'en' ? 'active' : ''} aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
          <button type="button" className={lang === 'zh' ? 'active' : ''} aria-pressed={lang === 'zh'} onClick={() => setLang('zh')}>中文</button>
        </div>
      </div>
    </header>
  );
}

function Hero({ t }) {
  return (
    <section className="hero-panel" id="home">
      <div className="pixel-field" aria-hidden="true" />
      <div className="hero-copy">
        <p className="eyebrow">{t.hero.badge}</p>
        <h1>{t.hero.title}</h1>
        <p>{t.hero.body}</p>
        <div className="hero-actions">
          <a className="primary-button" href="#services">{t.hero.primaryCta}</a>
          <a className="secondary-button" data-testid="primary-contact" href={`mailto:${contactEmail}`}>{t.hero.secondaryCta}</a>
        </div>
        <p className="startup-note">{t.hero.note}</p>
      </div>
      <div className="gamepad" aria-hidden="true">
        <span className="dpad horizontal" />
        <span className="dpad vertical" />
        <span className="button one" />
        <span className="button two" />
        <span className="button three" />
      </div>
      <div className="voxel-world" aria-hidden="true" />
      <span className="floating-shape heart" aria-hidden="true" />
      <span className="floating-shape coin" aria-hidden="true" />
      <span className="floating-shape cube" aria-hidden="true" />
    </section>
  );
}

function Services({ t }) {
  return (
    <section className="section-card services-section" id="services">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Services</p>
          <h2>{t.servicesTitle}</h2>
        </div>
        <span>{t.servicesLead}</span>
      </div>
      <div className="services-grid" data-testid="services-grid">
        {t.services.map((service, index) => (
          <article className="service-card" data-testid="service-card" key={service.title}>
            <div className={`service-art art-${index + 1}`}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <i aria-hidden="true" />
            </div>
            <div className="service-body">
              <p>{service.label}</p>
              <h3>{service.title}</h3>
              <small>{service.text}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Games({ t }) {
  return (
    <section className="split-section" id="games">
      <div className="section-card dark-card">
        <p className="eyebrow">{t.games.eyebrow}</p>
        <h2>{t.games.title}</h2>
        <p>{t.games.body}</p>
      </div>
      <div className="concept-list">
        {t.games.cards.map((card) => (
          <article className="concept-card" key={card.title}>
            <span aria-hidden="true" />
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Publishing({ t }) {
  return (
    <section className="section-card publishing-section" id="publishing">
      <div>
        <p className="eyebrow">{t.publishing.eyebrow}</p>
        <h2>{t.publishing.title}</h2>
        <p>{t.publishing.body}</p>
      </div>
      <div className="publishing-steps">
        {t.publishing.steps.map((step, index) => (
          <div className="step-card" key={step}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <b>{step}</b>
          </div>
        ))}
      </div>
    </section>
  );
}

function About({ t }) {
  return (
    <section className="section-card about-section" id="about">
      <div>
        <p className="eyebrow">{t.about.eyebrow}</p>
        <h2>{t.about.title}</h2>
        <p>{t.about.body}</p>
      </div>
      <div className="stat-grid">
        {t.about.stats.map(([value, label]) => (
          <div className="stat-card" key={value}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact({ t, subscribed, setSubscribed }) {
  function handleSubmit(event) {
    event.preventDefault();
    setSubscribed(true);
  }

  return (
    <section className="contact-section" id="contact">
      <div className="contact-copy">
        <p className="eyebrow">Contact</p>
        <h2>{t.contact.title}</h2>
        <p>{t.contact.body}</p>
        <a href={`mailto:${contactEmail}`}>{t.contact.emailLabel}: <span>{contactEmail}</span></a>
      </div>
      <form className="subscribe-card" data-testid="subscribe-form" action={`mailto:${contactEmail}`} method="post" encType="text/plain" onSubmit={handleSubmit}>
        <div className="mail-orb" aria-hidden="true">@</div>
        <div>
          <h3>{t.contact.subscribeTitle}</h3>
          <p>{t.contact.subscribeBody}</p>
        </div>
        <label>
          <span className="sr-only">{t.contact.inputPlaceholder}</span>
          <input type="email" name="email" placeholder={t.contact.inputPlaceholder} />
        </label>
        <button type="submit">{t.contact.subscribeButton}</button>
        {subscribed && <p className="form-status">{t.contact.subscribeStatus}</p>}
      </form>
    </section>
  );
}

export default function App() {
  const [lang, setLang] = useState('en');
  const [subscribed, setSubscribed] = useState(false);
  const t = translations[lang];

  return (
    <div className="app-shell">
      <Header lang={lang} setLang={setLang} t={t} />
      <main>
        <div className="hero-layout">
          <Hero t={t} />
          <div className="intro-stack">
            <article className="intro-card">
              <p className="eyebrow">{t.intro.eyebrow}</p>
              <h2>{t.intro.title}</h2>
              <p>{t.intro.body}</p>
            </article>
            <Services t={t} />
          </div>
        </div>
        <Games t={t} />
        <Publishing t={t} />
        <About t={t} />
        <Contact t={t} subscribed={subscribed} setSubscribed={setSubscribed} />
      </main>
    </div>
  );
}
