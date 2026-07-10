import { usePreferences } from "../app/PreferencesContext";
import { ActionLink } from "../components/ActionLink";
import { PageMeta } from "../components/PageMeta";

export function NotFoundPage() {
  const { language } = usePreferences();
  return (
    <section className="not-found container">
      <PageMeta title={language === "zh" ? "页面不存在" : "Not found"} description={language === "zh" ? "请求的 Starter 页面不存在。" : "The requested starter page does not exist."} noIndex />
      <span>404</span>
      <h1>{language === "zh" ? "这个页面不存在。" : "This page does not exist."}</h1>
      <p>{language === "zh" ? "检查地址，或返回 Starter 首页。" : "Check the address or return to the starter home page."}</p>
      <ActionLink className="button button--primary" to="/">{language === "zh" ? "返回首页" : "Back home"}</ActionLink>
    </section>
  );
}
