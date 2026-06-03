# Lumio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished, static, bilingual Lumio official website that deploys quickly to Zeabur.

**Architecture:** Use a Vite + React single-page app. Keep all copy in `src/content.js`, all rendering in `src/App.jsx`, and all visual styling in `src/styles.css`.

**Tech Stack:** Vite, React, CSS, Vitest, Testing Library, jsdom.

---

## File Structure

- `package.json`: scripts and dependencies.
- `vite.config.js`: React plugin and jsdom test environment.
- `index.html`: SEO metadata and React mount point.
- `src/main.jsx`: React entry point.
- `src/content.js`: bilingual content, navigation, and `support@lumio.games`.
- `src/App.jsx`: page sections, language switcher, contact links, and subscribe fallback.
- `src/App.test.jsx`: rendering, language, contact, and honesty tests.
- `src/styles.css`: glassmorphism game-company visual system.
- `README.md`: local and Zeabur deployment instructions.

---

### Task 1: Scaffold The Vite React App

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`
- Create: `src/main.jsx`
- Create: `src/App.jsx`
- Create: `src/App.test.jsx`
- Create: `src/styles.css`

- [ ] **Step 1: Create the initial failing test**

Create `src/App.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import App from './App.jsx';

test('renders the Lumio homepage shell', () => {
  render(<App />);

  expect(screen.getByText('LumioGames')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Original games, global players/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Create project scripts and dependencies**

Create `package.json`:

```json
{
  "name": "lumio-official-website",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite --host 0.0.0.0",
    "build": "vite build",
    "preview": "vite preview --host 0.0.0.0",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "react": "latest",
    "react-dom": "latest"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "latest",
    "@testing-library/react": "latest",
    "@vitejs/plugin-react": "latest",
    "jsdom": "latest",
    "vite": "latest",
    "vitest": "latest"
  }
}
```

- [ ] **Step 3: Create Vite config**

Create `vite.config.js`:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
});
```

- [ ] **Step 4: Create the HTML shell**

Create `index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="LumioGames is an early-stage independent game company in the United States building original games for global players."
    />
    <meta name="theme-color" content="#5368ff" />
    <title>LumioGames | Independent Game Company</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 5: Create the React entry point**

Create `src/main.jsx`:

```jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

- [ ] **Step 6: Create the minimal app**

Create `src/App.jsx`:

```jsx
export default function App() {
  return (
    <main>
      <header>
        <a href="#home" aria-label="LumioGames home">LumioGames</a>
      </header>
      <section id="home">
        <p>Independent Game Company · United States</p>
        <h1>Original games, global players.</h1>
      </section>
    </main>
  );
}
```

- [ ] **Step 7: Create minimal base CSS**

Create `src/styles.css`:

```css
:root {
  color: #07164a;
  background: #f7fbff;
  font-family: "Trebuchet MS", "Segoe UI", sans-serif;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
}
```

- [ ] **Step 8: Install and verify the scaffold**

Run: `npm install`

Expected: command exits with code 0 and creates `package-lock.json`.

Run: `npm test`

Expected: PASS with `renders the Lumio homepage shell`.

- [ ] **Step 9: Commit the scaffold**

Run:

```bash
git add package.json package-lock.json vite.config.js index.html src/main.jsx src/App.jsx src/App.test.jsx src/styles.css
git commit -m "feat: scaffold Lumio React website"
```

Expected: commit succeeds.

---

### Task 2: Add Bilingual Content And Tests

**Files:**
- Create: `src/content.js`
- Modify: `src/App.test.jsx`

- [ ] **Step 1: Replace the tests with behavior coverage**

Replace `src/App.test.jsx`:

```jsx
import { fireEvent, render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import App from './App.jsx';
import { contactEmail, navItems, translations } from './content.js';

const bannedClaims = /millions of players|top grossing|already shipped|global hit|market-leading publisher|proven hitmaker/i;

test('content data keeps the official support email', () => {
  expect(contactEmail).toBe('support@lumio.games');
});

test('content data includes the expected navigation anchors', () => {
  expect(navItems.map((item) => item.href)).toEqual(['#home', '#services', '#games', '#publishing', '#about', '#contact']);
});

test('content avoids fake scale claims', () => {
  expect(JSON.stringify(translations)).not.toMatch(bannedClaims);
});

test('renders the Lumio homepage shell', () => {
  render(<App />);
  expect(screen.getByText('LumioGames')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Original games, global players/i })).toBeInTheDocument();
});

test('switches key visible copy to Chinese', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: '中文' }));
  expect(screen.getByRole('heading', { name: /原创游戏，走向全球玩家/i })).toBeInTheDocument();
  expect(screen.getByText(/美国独立游戏创业公司/i)).toBeInTheDocument();
});

test('renders six service cards', () => {
  render(<App />);
  expect(within(screen.getByTestId('services-grid')).getAllByTestId('service-card')).toHaveLength(6);
});

test('uses support email for contact and subscription fallback', () => {
  render(<App />);
  expect(screen.getByTestId('primary-contact')).toHaveAttribute('href', `mailto:${contactEmail}`);
  expect(screen.getByTestId('subscribe-form')).toHaveAttribute('action', `mailto:${contactEmail}`);
  expect(screen.getByText(contactEmail)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run tests and confirm the expected failure**

Run: `npm test`

Expected: FAIL because `src/content.js` and the full React UI are not implemented yet.

- [ ] **Step 3: Add the content module**

Create `src/content.js`:

```js
export const contactEmail = 'support@lumio.games';

export const navItems = [
  { key: 'home', href: '#home' },
  { key: 'services', href: '#services' },
  { key: 'games', href: '#games' },
  { key: 'publishing', href: '#publishing' },
  { key: 'about', href: '#about' },
  { key: 'contact', href: '#contact' },
];

const serviceKeys = ['Original IP', 'Publishing Strategy', 'Player Growth', 'Localization', 'Live Operations', 'Partnerships'];

export const translations = {
  en: {
    search: 'Search Lumio...',
    nav: { home: 'Home', services: 'Services', games: 'Games', publishing: 'Publishing', about: 'About', contact: 'Contact' },
    hero: {
      badge: 'Independent Game Company · United States',
      title: 'Original games, global players.',
      body: 'Lumio is an early-stage independent game company in the United States. We are building original worlds, testing sharp gameplay ideas, and preparing games for players across cultures and platforms.',
      primaryCta: 'Explore Lumio',
      secondaryCta: 'Contact the Team',
      note: 'Startup-stage, founder-led, and built for long-term creative independence.',
    },
    intro: {
      eyebrow: 'About the studio',
      title: 'A small team with a global publishing mindset.',
      body: 'We are not a giant publisher. Lumio is a focused startup that pairs original IP incubation with practical go-to-market work: positioning, community, localization, launch planning, and live operations.',
    },
    servicesTitle: 'What Lumio is building',
    servicesLead: 'Our current work blends game creation, publishing strategy, and partner-ready operations.',
    services: serviceKeys.map((title, index) => ({
      title,
      label: ['Studio', 'Market', 'Growth', 'Global', 'Live', 'Partner'][index],
      text: [
        'We prototype game worlds with memorable visual identity, clear mechanics, and space for community stories.',
        'We study markets, define launch positioning, plan platform beats, and shape practical release paths.',
        'We design creator outreach, community loops, UA experiments, and social campaigns for sustainable traction.',
        'We prepare English-first content with Chinese support, cultural adaptation, store pages, and launch messaging.',
        'We plan events, updates, retention loops, player feedback rhythms, and production habits for games after launch.',
        'We are open to developers, creators, vendors, and investors who believe independent games can travel further.',
      ][index],
    })),
    games: {
      eyebrow: 'Games in development',
      title: 'Original concepts are being shaped now.',
      body: 'Lumio is exploring prototype tracks rather than announcing finished releases.',
      cards: ['Arcade-first prototypes', 'World-driven concepts', 'Community-ready formats'].map((title) => ({ title, text: 'Compact game directions designed to learn from players before broad launch decisions.' })),
    },
    publishing: {
      eyebrow: 'Publishing approach',
      title: 'Launch craft for independent games.',
      body: 'Our publishing work starts before launch: audience definition, market fit, store presentation, creator seeding, localization, launch beats, and post-launch learning.',
      steps: ['Market clarity', 'Launch positioning', 'Creator and community growth', 'Live learning loops'],
    },
    about: {
      eyebrow: 'Startup story',
      title: 'Built in the US. Designed to collaborate worldwide.',
      body: 'Lumio is early, ambitious, and deliberately independent. We move fast, stay transparent about progress, and look for collaborators who care about player trust.',
      stats: [['US-based', 'Independent company'], ['Early-stage', 'Actively building'], ['Global-first', 'Publishing mindset']],
    },
    contact: {
      title: 'Partner, publish, or follow the build.',
      body: 'Reach the Lumio team for publishing conversations, creator collaborations, vendor introductions, and general questions.',
      emailLabel: 'Email us',
      subscribeTitle: 'Subscribe for updates',
      subscribeBody: 'Get studio notes, game development updates, publishing insights, and partner announcements.',
      inputPlaceholder: 'Enter your email',
      subscribeButton: 'Subscribe',
      subscribeStatus: 'Thanks. Until a mailing list is connected, please email support@lumio.games to join updates.',
    },
  },
  zh: {
    search: '搜索 Lumio...',
    nav: { home: '首页', services: '能力', games: '游戏', publishing: '发行', about: '关于', contact: '联系' },
    hero: {
      badge: '美国独立游戏创业公司',
      title: '原创游戏，走向全球玩家。',
      body: 'Lumio 是一家位于美国的早期独立游戏公司。我们正在构建原创世界，测试清晰有趣的玩法，并为跨文化、跨平台的玩家体验做准备。',
      primaryCta: '了解 Lumio',
      secondaryCta: '联系团队',
      note: '创业阶段，创始人驱动，坚持长期的创作独立性。',
    },
    intro: {
      eyebrow: '关于工作室',
      title: '小团队，也要有全球发行视野。',
      body: 'Lumio 不是大型发行商。我们是一家专注的创业公司，把原创 IP 孵化和务实的发行工作结合起来：定位、社区、本地化、上线规划和长期运营。',
    },
    servicesTitle: 'Lumio 正在建设的能力',
    servicesLead: '当前工作聚焦游戏创作、发行策略和可合作的运营能力。',
    services: serviceKeys.map((title, index) => ({
      title: ['原创 IP', '发行策略', '玩家增长', '本地化', '长期运营', '合作伙伴'][index],
      label: ['创作', '市场', '增长', '全球', '运营', '合作'][index],
      text: ['孵化有辨识度的游戏世界。', '研究市场并设计上线路径。', '设计创作者合作和社区循环。', '支持英文和中文表达及文化适配。', '规划活动、更新和玩家反馈节奏。', '欢迎开发者、创作者、供应商和投资相关伙伴。'][index],
    })),
    games: {
      eyebrow: '开发中的游戏方向',
      title: '原创概念正在形成。',
      body: 'Lumio 目前探索的是原型方向，而不是宣布已经完成的作品。',
      cards: ['街机感原型', '世界观概念', '社区友好形态'].map((title) => ({ title, text: '通过玩家反馈不断学习的小型游戏方向。' })),
    },
    publishing: {
      eyebrow: '发行方法',
      title: '为独立游戏打磨上线能力。',
      body: '我们的发行工作从上线前开始：定义用户、优化商店表达、铺设创作者合作、本地化和上线后的持续学习。',
      steps: ['市场清晰度', '上线定位', '创作者与社区增长', '运营学习循环'],
    },
    about: {
      eyebrow: '创业故事',
      title: '从美国出发，面向全球协作。',
      body: 'Lumio 还很早期，但目标明确，并坚持独立。我们快速推进，也诚实表达进展。',
      stats: [['美国公司', '独立游戏团队'], ['创业阶段', '正在积极建设'], ['全球视野', '发行能力导向']],
    },
    contact: {
      title: '合作、发行，或关注我们的进展。',
      body: '欢迎联系 Lumio 团队，沟通发行合作、创作者合作、服务商介绍和一般问题。',
      emailLabel: '发送邮件',
      subscribeTitle: '订阅 Lumio 更新',
      subscribeBody: '获取工作室笔记、游戏开发动态、发行观察和合作公告。',
      inputPlaceholder: '输入你的邮箱',
      subscribeButton: '订阅',
      subscribeStatus: '感谢关注。邮件列表接入前，请发送邮件到 support@lumio.games 加入更新。',
    },
  },
};
```

- [ ] **Step 4: Commit content and tests**

Run:

```bash
git add src/content.js src/App.test.jsx
git commit -m "feat: add Lumio bilingual content"
```

Expected: commit succeeds.

---

### Task 3: Build The React Page

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Replace `src/App.jsx` with the complete page**

Replace `src/App.jsx`:

```jsx
import { useState } from 'react';
import { contactEmail, navItems, translations } from './content.js';

function Header({ lang, setLang, t }) {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="LumioGames home"><span className="brand-mark">L</span><span>LumioGames</span></a>
      <nav className="nav-links" aria-label="Primary navigation">{navItems.map((item) => <a key={item.key} href={item.href}>{t.nav[item.key]}</a>)}</nav>
      <div className="header-tools"><div className="search-pill">{t.search}</div><button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button><button className={lang === 'zh' ? 'active' : ''} onClick={() => setLang('zh')}>中文</button></div>
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
        <div className="hero-actions"><a className="primary-button" href="#services">{t.hero.primaryCta}</a><a className="secondary-button" data-testid="primary-contact" href={`mailto:${contactEmail}`}>{t.hero.secondaryCta}</a></div>
        <p className="startup-note">{t.hero.note}</p>
      </div>
      <div className="gamepad" aria-hidden="true"><span /><span /><i /><i /><i /></div>
      <div className="voxel-world" aria-hidden="true" />
      <b className="float heart" aria-hidden="true" /><b className="float coin" aria-hidden="true" /><b className="float cube" aria-hidden="true" />
    </section>
  );
}

function Services({ t }) {
  return (
    <section className="section-card services-section" id="services">
      <div className="section-heading"><div><p className="eyebrow">Services</p><h2>{t.servicesTitle}</h2></div><span>{t.servicesLead}</span></div>
      <div className="services-grid" data-testid="services-grid">{t.services.map((service, index) => <article className="service-card" data-testid="service-card" key={service.title}><div className={`service-art art-${index + 1}`}><span>{String(index + 1).padStart(2, '0')}</span></div><div><p>{service.label}</p><h3>{service.title}</h3><small>{service.text}</small></div></article>)}</div>
    </section>
  );
}

function Games({ t }) {
  return <section className="split-section" id="games"><div className="section-card dark-card"><p className="eyebrow">{t.games.eyebrow}</p><h2>{t.games.title}</h2><p>{t.games.body}</p></div><div className="concept-list">{t.games.cards.map((card) => <article className="concept-card" key={card.title}><span /><h3>{card.title}</h3><p>{card.text}</p></article>)}</div></section>;
}

function Publishing({ t }) {
  return <section className="section-card publishing-section" id="publishing"><div><p className="eyebrow">{t.publishing.eyebrow}</p><h2>{t.publishing.title}</h2><p>{t.publishing.body}</p></div><div className="publishing-steps">{t.publishing.steps.map((step, index) => <div className="step-card" key={step}><span>{String(index + 1).padStart(2, '0')}</span><b>{step}</b></div>)}</div></section>;
}

function About({ t }) {
  return <section className="section-card about-section" id="about"><div><p className="eyebrow">{t.about.eyebrow}</p><h2>{t.about.title}</h2><p>{t.about.body}</p></div><div className="stat-grid">{t.about.stats.map(([value, label]) => <div className="stat-card" key={value}><strong>{value}</strong><span>{label}</span></div>)}</div></section>;
}

function Contact({ t, subscribed, setSubscribed }) {
  return (
    <section className="contact-section" id="contact">
      <div><p className="eyebrow">Contact</p><h2>{t.contact.title}</h2><p>{t.contact.body}</p><a href={`mailto:${contactEmail}`}>{t.contact.emailLabel}: <span>{contactEmail}</span></a></div>
      <form className="subscribe-card" data-testid="subscribe-form" action={`mailto:${contactEmail}`} method="post" encType="text/plain" onSubmit={(event) => { event.preventDefault(); setSubscribed(true); }}>
        <div className="mail-orb">@</div><div><h3>{t.contact.subscribeTitle}</h3><p>{t.contact.subscribeBody}</p></div><input type="email" name="email" placeholder={t.contact.inputPlaceholder} /><button type="submit">{t.contact.subscribeButton}</button>{subscribed && <p className="form-status">{t.contact.subscribeStatus}</p>}
      </form>
    </section>
  );
}

export default function App() {
  const [lang, setLang] = useState('en');
  const [subscribed, setSubscribed] = useState(false);
  const t = translations[lang];

  return <div className="app-shell"><Header lang={lang} setLang={setLang} t={t} /><main><div className="hero-layout"><Hero t={t} /><div className="intro-stack"><article className="intro-card"><p className="eyebrow">{t.intro.eyebrow}</p><h2>{t.intro.title}</h2><p>{t.intro.body}</p></article><Services t={t} /></div></div><Games t={t} /><Publishing t={t} /><About t={t} /><Contact t={t} subscribed={subscribed} setSubscribed={setSubscribed} /></main></div>;
}
```

- [ ] **Step 2: Run tests**

Run: `npm test`

Expected: PASS for all tests.

- [ ] **Step 3: Commit the React implementation**

Run:

```bash
git add src/App.jsx
git commit -m "feat: build Lumio single page app"
```

Expected: commit succeeds.

---

### Task 4: Add Visual Design And Responsive Styling

**Files:**
- Modify: `src/styles.css`

- [ ] **Step 1: Replace `src/styles.css` with the complete style system**

Replace `src/styles.css`:

```css
:root{--ink:#07164a;--muted:#52648d;--paper:#f7fbff;--card:rgba(255,255,255,.84);--line:#dfe8fb;--blue:#5368ff;--cyan:#4bd8c8;--orange:#ff9b3d;--pink:#ff4fa0;--shadow:0 24px 70px rgba(27,55,130,.16);color:var(--ink);background:var(--paper);font-family:"Trebuchet MS","Segoe UI",sans-serif;scroll-behavior:smooth}*{box-sizing:border-box}body{margin:0;min-width:320px;background:radial-gradient(circle at 8% 10%,rgba(105,215,255,.28),transparent 28%),radial-gradient(circle at 88% 5%,rgba(83,104,255,.18),transparent 30%),linear-gradient(135deg,#f8fbff,#edf6ff 46%,#f8fbff)}a{color:inherit;text-decoration:none}button,input{font:inherit}.app-shell{width:min(1240px,calc(100% - 32px));margin:18px auto;border:1px solid rgba(188,205,238,.78);border-radius:28px;background:rgba(255,255,255,.72);box-shadow:var(--shadow);overflow:hidden;backdrop-filter:blur(20px)}.site-header{position:sticky;top:0;z-index:10;min-height:72px;display:flex;align-items:center;gap:28px;padding:0 28px;border-bottom:1px solid rgba(223,232,251,.92);background:rgba(255,255,255,.88);backdrop-filter:blur(18px)}.brand{display:inline-flex;align-items:center;gap:11px;font-size:22px;font-weight:900;letter-spacing:-.04em}.brand-mark{width:36px;height:36px;display:grid;place-items:center;border-radius:11px;color:white;background:linear-gradient(135deg,#455fff,#8d99ff);clip-path:polygon(50% 0,96% 32%,82% 98%,18% 98%,4% 32%)}.nav-links{display:flex;gap:22px;color:#162657;font-size:13px;font-weight:800}.nav-links a{padding:26px 0}.header-tools{margin-left:auto;display:flex;align-items:center;gap:10px}.search-pill{width:210px;padding:11px 14px;border:1px solid #dbe5f7;border-radius:13px;color:#8d9cba;background:white;font-size:12px}.header-tools button{border:0;border-radius:999px;padding:9px 14px;background:transparent;color:#415079;font-size:12px;font-weight:900;cursor:pointer}.header-tools button.active{color:#3657ff;background:white;box-shadow:inset 0 0 0 1px #8297ff}main{display:grid;gap:18px;padding:18px}.hero-layout{display:grid;grid-template-columns:minmax(360px,.95fr) minmax(520px,1.45fr);gap:18px}.hero-panel,.section-card,.intro-card,.contact-section,.concept-card{border:1px solid var(--line);background:var(--card);box-shadow:0 14px 34px rgba(27,55,130,.08)}.hero-panel{position:relative;min-height:710px;overflow:hidden;border-radius:22px;padding:52px 46px;background:linear-gradient(135deg,rgba(234,245,255,.94),rgba(194,255,245,.94))}.pixel-field{position:absolute;inset:0;background-image:linear-gradient(90deg,rgba(83,104,255,.11) 1px,transparent 1px),linear-gradient(rgba(83,104,255,.11) 1px,transparent 1px),radial-gradient(circle,rgba(255,255,255,.9) 0 3px,transparent 4px);background-size:22px 22px,22px 22px,76px 76px;mask-image:linear-gradient(90deg,#000,rgba(0,0,0,.5) 45%,transparent 76%);opacity:.7}.hero-copy{position:relative;z-index:2}.eyebrow{width:fit-content;margin:0 0 16px;border:1px solid rgba(113,135,255,.34);border-radius:999px;padding:8px 12px;color:#3d59ff;background:rgba(255,255,255,.62);font-size:12px;font-weight:900}h1,h2,h3,p{margin-top:0}h1{max-width:520px;margin-bottom:18px;font-size:clamp(46px,5vw,68px);line-height:.94;letter-spacing:-.075em}h2{margin-bottom:12px;font-size:clamp(28px,3vw,42px);line-height:1;letter-spacing:-.055em}h3{margin-bottom:8px;font-size:18px;letter-spacing:-.03em}.hero-copy>p:not(.eyebrow):not(.startup-note),.intro-card p,.section-heading span,.dark-card p,.publishing-section p,.about-section p,.contact-section p,.concept-card p,.service-card small{color:var(--muted);line-height:1.55}.hero-actions{display:flex;flex-wrap:wrap;gap:14px;margin-top:28px}.primary-button,.secondary-button{display:inline-flex;align-items:center;justify-content:center;min-height:46px;border-radius:999px;padding:0 20px;font-size:14px;font-weight:900}.primary-button{color:white;background:linear-gradient(135deg,var(--blue),#7d8dff);box-shadow:0 15px 30px rgba(83,104,255,.35)}.secondary-button{color:#3f58ff;background:rgba(255,255,255,.62);box-shadow:inset 0 0 0 1px var(--blue)}.startup-note{margin-top:18px;max-width:430px;color:#38517e;font-size:13px;font-weight:800}.gamepad{position:absolute;left:48px;bottom:120px;z-index:3;width:168px;height:108px;border:8px solid rgba(255,255,255,.86);border-radius:40px 40px 48px 48px;background:linear-gradient(135deg,#eff4ff,#cddcff);transform:rotate(-13deg);box-shadow:0 22px 46px rgba(38,69,148,.22)}.gamepad span:first-child,.gamepad span:nth-child(2){position:absolute;left:34px;top:47px;background:#263b77;border-radius:4px}.gamepad span:first-child{width:42px;height:13px}.gamepad span:nth-child(2){width:13px;height:42px;left:48px;top:33px}.gamepad i{position:absolute;right:34px;top:38px;width:14px;height:14px;border-radius:50%;background:var(--pink);box-shadow:0 0 0 3px rgba(255,255,255,.7)}.gamepad i:nth-of-type(2){right:56px;top:58px;background:var(--orange)}.gamepad i:nth-of-type(3){right:32px;top:66px;background:#5e88ff}.voxel-world{position:absolute;left:38px;right:36px;bottom:0;height:245px;background:linear-gradient(135deg,rgba(120,146,255,.95),rgba(72,215,198,.9));clip-path:polygon(0 43%,18% 24%,34% 41%,50% 12%,66% 39%,82% 20%,100% 36%,100% 100%,0 100%)}.float{position:absolute;z-index:3;display:block;filter:drop-shadow(0 18px 25px rgba(38,69,148,.22))}.heart{right:190px;bottom:160px;width:44px;height:44px;background:var(--pink);transform:rotate(45deg)}.heart:before,.heart:after{content:"";position:absolute;width:44px;height:44px;border-radius:50%;background:var(--pink)}.heart:before{left:-22px}.heart:after{top:-22px}.coin{right:60px;bottom:205px;width:48px;height:48px;border-radius:50%;background:radial-gradient(circle,#ffe98f,#ff9b3d)}.cube{right:132px;bottom:292px;width:38px;height:38px;border-radius:9px;background:linear-gradient(135deg,#77c9ff,#6c7cff);transform:rotate(12deg)}.intro-stack{display:grid;gap:18px}.intro-card,.section-card,.contact-section{border-radius:22px;padding:24px}.services-section{padding:18px}.section-heading{display:flex;align-items:end;justify-content:space-between;gap:20px;margin-bottom:16px}.services-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.service-card{overflow:hidden;border:1px solid var(--line);border-radius:18px;background:white;box-shadow:0 12px 28px rgba(27,55,130,.07)}.service-art{position:relative;height:112px;overflow:hidden}.art-1{background:linear-gradient(135deg,#6375ff,#59d8d0)}.art-2{background:linear-gradient(135deg,#33c9b4,#51d6ca)}.art-3{background:linear-gradient(135deg,#ffad3f,#ff823a)}.art-4{background:linear-gradient(135deg,#4c8dff,#6ed2ff)}.art-5{background:linear-gradient(135deg,#725eff,#8c7dff)}.art-6{background:linear-gradient(135deg,#35cabc,#51d6ca)}.service-art span{position:absolute;left:18px;bottom:-20px;z-index:2;width:48px;height:48px;display:grid;place-items:center;border:5px solid white;border-radius:50%;color:#5368ff;background:white;font-size:13px;font-weight:900}.service-card div:last-child{padding:30px 16px 18px}.service-card p{margin-bottom:6px;color:#5368ff;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.08em}.service-card small{display:block;font-size:13px}.split-section{display:grid;grid-template-columns:.9fr 1.1fr;gap:18px}.dark-card{min-height:290px;color:white;background:radial-gradient(circle at 78% 20%,rgba(75,216,200,.45),transparent 28%),linear-gradient(135deg,#0a1b52,#3857ff)}.dark-card .eyebrow,.dark-card p{color:rgba(255,255,255,.82)}.concept-list{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.concept-card{min-height:230px;border-radius:22px;padding:24px}.concept-card span{width:38px;height:38px;display:block;margin-bottom:24px;border-radius:13px;background:linear-gradient(135deg,var(--orange),var(--pink))}.publishing-section,.about-section,.contact-section{display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:24px}.publishing-steps,.stat-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}.step-card,.stat-card{min-height:116px;border:1px solid #dce6fb;border-radius:18px;padding:18px;background:white}.step-card span{display:inline-grid;place-items:center;width:34px;height:34px;margin-bottom:18px;border-radius:50%;color:white;background:linear-gradient(135deg,var(--blue),var(--cyan));font-size:12px;font-weight:900}.stat-grid{grid-template-columns:repeat(3,1fr)}.stat-card strong{margin-bottom:10px;color:#3657ff;font-size:20px;letter-spacing:-.04em}.stat-card span{color:var(--muted);font-size:13px}.contact-section{background:linear-gradient(135deg,rgba(255,255,255,.88),rgba(244,248,255,.92))}.contact-section a{color:#3657ff;font-weight:900}.subscribe-card{display:grid;grid-template-columns:auto 1fr minmax(170px,.7fr) auto;align-items:center;gap:16px;border:1px solid var(--line);border-radius:20px;padding:18px;background:#f5f8ff}.mail-orb{width:52px;height:52px;display:grid;place-items:center;border-radius:50%;color:white;background:linear-gradient(135deg,var(--blue),#7d8dff);font-weight:900}.subscribe-card input{width:100%;border:1px solid #dbe5f7;border-radius:13px;padding:13px 14px}.subscribe-card button{border:0;border-radius:13px;padding:14px 18px;color:white;background:linear-gradient(135deg,var(--blue),#7d8dff);font-size:13px;font-weight:900}.form-status{grid-column:2/-1;margin:0;color:#2d6e64;font-size:13px;font-weight:800}@media(max-width:1100px){.hero-layout,.split-section,.publishing-section,.about-section,.contact-section{grid-template-columns:1fr}.hero-panel{min-height:620px}.services-grid,.concept-list{grid-template-columns:repeat(2,1fr)}.subscribe-card{grid-template-columns:auto 1fr}.subscribe-card input,.subscribe-card button,.form-status{grid-column:1/-1}}@media(max-width:760px){.app-shell{width:min(100% - 16px,1240px);margin:8px auto;border-radius:20px}.site-header{position:relative;flex-wrap:wrap;gap:14px;padding:16px}.nav-links{order:3;width:100%;overflow-x:auto;gap:16px}.nav-links a{padding:6px 0 10px;white-space:nowrap}.header-tools{margin-left:0}.search-pill{display:none}main{padding:10px}.hero-panel,.intro-card,.section-card,.contact-section{border-radius:18px;padding:24px}.hero-panel{min-height:590px}.gamepad{left:26px;bottom:98px;transform:rotate(-10deg) scale(.82);transform-origin:left bottom}.voxel-world{left:20px;right:20px;height:200px}.heart{right:132px;bottom:148px;transform:rotate(45deg) scale(.72)}.coin{right:34px;bottom:188px;transform:scale(.82)}.cube{display:none}.section-heading{display:block}.services-grid,.concept-list,.publishing-steps,.stat-grid{grid-template-columns:1fr}.contact-section a{display:block;word-break:break-word}}
```

- [ ] **Step 2: Verify tests and production build**

Run:

```bash
npm test
npm run build
```

Expected: both commands pass, and Vite writes production files to `dist`.

- [ ] **Step 3: Commit the visual system**

Run:

```bash
git add src/styles.css
git commit -m "feat: style Lumio glassmorphism website"
```

Expected: commit succeeds.

---

### Task 5: Add Deployment Documentation And Final Verification

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Replace README with deployment instructions**

Replace `README.md`:

```markdown
# LumioGames Official Website

Fast static website for LumioGames, an early-stage independent game company in the United States.

## Local Development

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production Build

```bash
npm run build
npm run preview
```

The production output is generated in `dist/`.

## Zeabur Deployment

Use the default Node static build flow:

- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`

After connecting the repository to Zeabur, configure the service to serve the `dist` directory.

## Contact

Lumio contact email: `support@lumio.games`
```

- [ ] **Step 2: Run final verification**

Run:

```bash
npm test
npm run build
git status --short
```

Expected: tests and build pass. `DevDoc/` may remain untracked because it existed before implementation and should not be modified unless requested.

- [ ] **Step 3: Commit docs**

Run:

```bash
git add README.md package-lock.json
git commit -m "docs: add Zeabur deployment guide"
```

Expected: commit succeeds when either file changed.

- [ ] **Step 4: Report completion**

Report:

```text
Implemented LumioGames official website as a static Vite + React app.
Verified npm test and npm run build.
Contact email support@lumio.games is wired into Contact and subscription fallback.
Zeabur settings: install npm install, build npm run build, output dist.
DevDoc/ was left untouched.
```
