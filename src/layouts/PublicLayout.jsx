import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { usePreferences } from "../app/PreferencesContext";
import { ActionLink } from "../components/ActionLink";
import { BrandMark } from "../components/Brand";
import { Icon } from "../components/Icon";
import { siteConfig } from "../config/site";

const navItems = [
  ["/", "home"],
  ["/models", "models"],
  ["/pricing", "pricing"],
  ["/docs", "docs"],
  ["/status", "status"],
];

export function PublicLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage, theme, setTheme, text } = usePreferences();

  const renderNav = (className = "") => (
    <nav className={className} aria-label={text.common.primaryNavigation}>
      {navItems.map(([to, key]) => (
        <NavLink key={to} to={to} end={to === "/"} onClick={() => setMenuOpen(false)}>
          {text.nav[key]}
        </NavLink>
      ))}
      {siteConfig.demoEnabled && <NavLink to="/demo/dashboard" onClick={() => setMenuOpen(false)}>{text.nav.demo}</NavLink>}
    </nav>
  );

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">{text.common.skipMain}</a>
      <header className="topbar">
        <div className="container topbar__inner">
          <Link className="brand" to="/" aria-label={`${siteConfig.name} home`}>
            <BrandMark />
            <span>{siteConfig.name}</span>
          </Link>

          {renderNav("desktop-nav")}

          <div className="topbar__actions">
            <button
              className="icon-button"
              type="button"
              onClick={() => setLanguage(language === "en" ? "zh" : "en")}
              aria-label={text.common.language}
              title={text.common.language}
            >
              <Icon name="globe" />
            </button>
            <button
              className="icon-button"
              type="button"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              aria-label={text.common.theme}
              title={text.common.theme}
            >
              <Icon name={theme === "light" ? "moon" : "sun"} />
            </button>
            {siteConfig.demoEnabled && (
              <ActionLink className="button button--primary desktop-cta" to="/demo/dashboard">
                {text.common.openDemo}
              </ActionLink>
            )}
            <button
              className="icon-button mobile-menu-button"
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? text.common.closeMenu : text.common.menu}
            >
              <Icon name={menuOpen ? "close" : "menu"} />
            </button>
          </div>
        </div>
        {menuOpen && <div id="mobile-navigation" className="mobile-nav container">{renderNav()}</div>}
      </header>

      <main id="main-content" tabIndex="-1">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container footer__grid">
          <div>
            <Link className="brand" to="/">
              <BrandMark size={28} />
              <span>{siteConfig.name}</span>
            </Link>
            <p className="footer__summary">{text.footer.summary}</p>
          </div>
          <div>
            <h2>{text.footer.project}</h2>
            <Link to="/models">{text.nav.models}</Link>
            <Link to="/pricing">{text.nav.pricing}</Link>
            <Link to="/status">{text.nav.status}</Link>
          </div>
          <div>
            <h2>{text.footer.resources}</h2>
            <Link to="/docs">{text.nav.docs}</Link>
            {siteConfig.demoEnabled && <Link to="/demo/dashboard">{text.nav.demo}</Link>}
            <a href={siteConfig.repositoryUrl} rel="noreferrer">{text.common.repository}</a>
          </div>
          <div>
            <h2>{text.footer.legal}</h2>
            <a href="https://www.apache.org/licenses/LICENSE-2.0" rel="noreferrer">Apache-2.0</a>
            <a href={`${siteConfig.repositoryUrl}/blob/main/SECURITY.md`} rel="noreferrer">{text.common.security}</a>
            <a href={`${siteConfig.repositoryUrl}/blob/main/TRADEMARKS.md`} rel="noreferrer">{text.common.brandPolicy}</a>
            <a href="/third-party-licenses.md">{text.common.thirdPartyLicenses}</a>
          </div>
        </div>
        <div className="container footer__bottom">
          <span>© {new Date().getFullYear()} {siteConfig.name}</span>
          <span>{text.common.sampleDisclaimer}</span>
        </div>
      </footer>
    </div>
  );
}
