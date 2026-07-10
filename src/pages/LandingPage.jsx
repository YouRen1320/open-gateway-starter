import { usePreferences } from "../app/PreferencesContext";
import { ActionLink } from "../components/ActionLink";
import { CodeBlock } from "../components/CodeBlock";
import { Icon } from "../components/Icon";
import { PageMeta } from "../components/PageMeta";
import { siteConfig } from "../config/site";

export function LandingPage() {
  const { text, language } = usePreferences();
  const configExample = `# .env.local\nVITE_SITE_NAME=Your Product\nVITE_SITE_DESCRIPTION=A concise product description.\nVITE_SITE_URL=https://your-product.example\nVITE_REPOSITORY_URL=https://github.com/your-name/your-project\nVITE_STATUS_ENDPOINT=https://status.your-product.example/api`;
  const previewNavigation = language === "zh" ? ["概览", "目录", "文档", "状态"] : ["Overview", "Catalog", "Docs", "Status"];
  const previewHealth = language === "zh"
    ? [["配置", "已集中"], ["演示数据", "已隔离"], ["路由", "可分享"], ["凭据", "无"]]
    : [["Configuration", "Centralized"], ["Demo data", "Isolated"], ["Routes", "Shareable"], ["Credentials", "None"]];

  return (
    <>
      <PageMeta
        title={language === "zh" ? "可复用 AI 网关 React Starter" : "Reusable AI gateway React starter"}
        description={text.landing.sub}
      />

      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <div className="eyebrow-row">
              <span className="badge badge--accent">Starter</span>
              <span className="eyebrow">{text.landing.kicker}</span>
            </div>
            <h1>{text.landing.title}</h1>
            <p>{text.landing.sub}</p>
            <div className="button-row">
              {siteConfig.demoEnabled && (
                <ActionLink className="button button--primary button--large" to="/demo/dashboard">
                  {text.common.openDemo}<Icon name="arrowRight" size={18} />
                </ActionLink>
              )}
              <ActionLink className="button button--secondary button--large" to="/docs">
                {text.common.viewDocs}
              </ActionLink>
            </div>
            <dl className="hero__metrics">
              {text.landing.metrics.map(([value, label]) => (
                <div key={label}>
                  <dt>{value}</dt>
                  <dd>{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="product-preview" aria-label={language === "zh" ? "Starter 架构预览" : "Starter architecture preview"}>
            <div className="product-preview__topbar">
              <span className="product-preview__lights" aria-hidden="true"><i /><i /><i /></span>
              <span>starter.config.js</span>
              <span className="badge badge--success"><Icon name="check" size={14} /> {language === "zh" ? "就绪" : "Ready"}</span>
            </div>
            <div className="product-preview__body">
              <div className="preview-sidebar" aria-hidden="true">
                <span className="active"><Icon name="home" /> {previewNavigation[0]}</span>
                <span><Icon name="cube" /> {previewNavigation[1]}</span>
                <span><Icon name="book" /> {previewNavigation[2]}</span>
                <span><Icon name="activity" /> {previewNavigation[3]}</span>
              </div>
              <div className="preview-content">
                <span className="eyebrow">{language === "zh" ? "项目健康度" : "Project health"}</span>
                <h2>{language === "zh" ? "默认提供清晰边界。" : "Clear boundaries by default."}</h2>
                <div className="preview-health-grid">
                  {previewHealth.map(([label, value]) => (
                    <div key={label}><span>{label}</span><strong>{value}</strong></div>
                  ))}
                </div>
                <div className="preview-terminal">
                  <span>$ npm run check</span>
                  <strong><Icon name="check" size={15} /> lint · test · build</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section container" aria-labelledby="features-title">
        <div className="section-heading">
          <span className="eyebrow">{language === "zh" ? "包含内容" : "What ships"}</span>
          <h2 id="features-title">{text.landing.featuresTitle}</h2>
        </div>
        <div className="feature-grid">
          {text.landing.features.map(([icon, title, description]) => (
            <article className="feature-card" key={title}>
              <span className="feature-card__icon"><Icon name={icon} /></span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--tinted">
        <div className="container configuration-grid">
          <div className="section-heading">
            <span className="eyebrow">{language === "zh" ? "配置优先" : "Configuration first"}</span>
            <h2>{text.common.configure}</h2>
            <p>
              {language === "zh"
                ? "公开运行时配置只包含可以安全进入浏览器的值。真实密钥必须留在后端。"
                : "Public runtime configuration contains only values safe for a browser bundle. Real credentials must stay on the server."}
            </p>
            <ActionLink className="text-link" to="/docs?section=configuration">
              {text.common.viewDocs}<Icon name="arrowRight" size={16} />
            </ActionLink>
          </div>
          <CodeBlock code={configExample} label=".env.local" />
        </div>
      </section>

      <section className="section container">
        <div className="cta-panel">
          <div>
            <span className="eyebrow">{language === "zh" ? "从清晰边界开始" : "Start from a clean boundary"}</span>
            <h2>{language === "zh" ? "先替换配置，再接入真实服务。" : "Replace configuration first. Connect real services second."}</h2>
          </div>
          <div className="button-row">
            <ActionLink className="button button--light" to="/docs">{text.common.viewDocs}</ActionLink>
            <ActionLink className="button button--accent" to="/models">{text.common.viewModels}</ActionLink>
          </div>
        </div>
      </section>
    </>
  );
}
