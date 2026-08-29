
import styles from "./LandingPage.module.css";

import {
  testimonials,
  stats,
  features,
} from "@/constants/landingpage-constants";

import {
  NavLinkBtn,
  NavActions,
  CtaActions,
  HeroActions,
  FooterLinks,
} from "@/components/features/landingbtn";


export default function LandingPage() {
  return (
    <div className={styles.root}>
      {/* Navbar */}
      <nav className={styles.nav}>
        <div className={styles.navLogo}>
          <div className={styles.navLogoMark}>L</div>
          LibraryOS
        </div>

        <div className={styles.navLinks}>
          {["Features", "Pricing", "Docs", "Blog"].map((l) => (
            <NavLinkBtn key={l} name={l} />
          ))}
        </div>

        <NavActions />
      </nav>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBadge}>
          <span className={styles.heroDot} />
          Now with AI-powered recommendations
        </div>
        <h1 className={styles.heroHeadline}>
          The modern library
          <br />
          management system for{" "}
          <span className={styles.heroAccent}>every institution</span>
        </h1>
        <p className={styles.heroSub}>
          Catalog, loans, members, analytics — all in one place. Built for
          librarians who want software that gets out of the way.
        </p>
        <HeroActions />
        <p className={styles.heroNote}>
          No credit card required · Free for up to 500 books
        </p>
      </section>

      {/* Stats bar */}
      <div className={styles.statsBar}>
        {stats.map((s) => (
          <div key={s.label} className={styles.statItem}>
            <div className={styles.statValue}>{s.value}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <section className={styles.features}>
        <div className={styles.sectionLabel}>Everything you need</div>
        <h2 className={styles.sectionTitle}>Built for real libraries</h2>
        <p className={styles.sectionSub}>
          Every feature was designed around actual librarian workflows — not
          assumptions.
        </p>
        <div className={styles.featureGrid}>
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <Icon size={18} />
                </div>
                <div className={styles.featureTitle}>{f.title}</div>
                <div className={styles.featureDesc}>{f.desc}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.social}>
        <div className={styles.sectionLabel}>Trusted by librarians</div>
        <h2 className={styles.sectionTitle}>Loved by institutions worldwide</h2>
        <p className={styles.sectionSub}>
          Join over 2,400 libraries that have modernized their operations with
          LibraryOS.
        </p>
        <div className={styles.testimonialGrid}>
          {testimonials.map((t) => (
            <div key={t.name} className={styles.testimonial}>
              <p className={styles.testimonialQuote}>"{t.quote}"</p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>{t.initials}</div>
                <div>
                  <div className={styles.testimonialName}>{t.name}</div>
                  <div className={styles.testimonialRole}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>Ready to modernize your library?</h2>
        <p className={styles.ctaSub}>
          Get started in minutes. No installation, no IT team required.
        </p>
        <CtaActions />
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerLogo}>
          <div className={styles.navLogoMark}>L</div>
          LibraryOS
        </div>
        <FooterLinks />
        <div className={styles.footerCopy}>© 2026 LibraryOS, Inc.</div>
      </footer>
    </div>
  );
}
