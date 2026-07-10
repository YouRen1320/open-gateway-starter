import { NavLink, Outlet } from "react-router-dom";
import { usePreferences } from "../app/PreferencesContext";
import { ActionLink } from "../components/ActionLink";
import { BrandMark } from "../components/Brand";
import { Icon } from "../components/Icon";
import { siteConfig } from "../config/site";

// Demo routes use a distinct shell and persistent warning so sample UI cannot look live.
export function DemoLayout() {
  const { language } = usePreferences();

  return (
    <div className="demo-shell">
      <a className="skip-link" href="#demo-content">{language === "zh" ? "跳到演示内容" : "Skip to demo content"}</a>
      <header className="demo-banner" role="status">
        <Icon name="warning" size={18} />
        <span>
          {language === "zh"
            ? "仅本地界面演示：全部数据均为虚构，不会调用 API、充值或保存账户信息。"
            : "Local interface demo only: all data is fictional; no API, payment, or account data is used."}
        </span>
        <ActionLink to="/docs?section=configuration">
          {language === "zh" ? "查看接入边界" : "Read integration boundaries"}
        </ActionLink>
      </header>

      <div className="demo-frame">
        <aside className="demo-sidebar">
          <ActionLink className="brand" to="/">
            <BrandMark />
            <span>{siteConfig.name}</span>
          </ActionLink>
          <nav aria-label={language === "zh" ? "演示导航" : "Demo navigation"}>
            <NavLink to="/demo/dashboard"><Icon name="grid" />{language === "zh" ? "控制台演示" : "Dashboard demo"}</NavLink>
            <NavLink to="/demo/chat"><Icon name="chat" />{language === "zh" ? "聊天演示" : "Chat demo"}</NavLink>
          </nav>
          <ActionLink className="demo-sidebar__back" to="/"><Icon name="arrowRight" />{language === "zh" ? "返回公开站" : "Back to public site"}</ActionLink>
        </aside>

        <main id="demo-content" className="demo-main" tabIndex="-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
