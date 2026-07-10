import { Link, useSearchParams } from "react-router-dom";
import { usePreferences } from "../app/PreferencesContext";
import { CodeBlock } from "../components/CodeBlock";
import { Icon } from "../components/Icon";
import { PageMeta } from "../components/PageMeta";
import { siteConfig } from "../config/site";

const sections = [
  ["quickstart", "Quickstart", "快速开始"],
  ["configuration", "Configuration", "配置"],
  ["catalog", "Catalog data", "目录数据"],
  ["status", "Status adapter", "状态适配器"],
  ["deployment", "Deployment", "部署"],
];

export function DocsPage() {
  const [params] = useSearchParams();
  const { language } = usePreferences();
  const requested = params.get("section") || "quickstart";
  const section = sections.some(([id]) => id === requested) ? requested : "quickstart";

  return (
    <>
      <PageMeta
        title={language === "zh" ? "使用文档" : "Documentation"}
        description={language === "zh" ? "运行、配置、替换示例数据、连接状态接口并部署 Starter。" : "Start, configure, replace sample data, connect a status adapter, and deploy the starter."}
      />
      <div className="container docs-layout">
        <aside className="docs-nav">
          <span className="eyebrow">{language === "zh" ? "使用文档" : "Documentation"}</span>
          <nav aria-label={language === "zh" ? "文档章节" : "Documentation sections"}>
            {sections.map(([id, en, zh]) => (
              <Link className={section === id ? "is-active" : ""} key={id} to={`/docs?section=${id}`}>
                {language === "zh" ? zh : en}
              </Link>
            ))}
          </nav>
        </aside>
        <article className="docs-content">
          <DocsSection section={section} language={language} />
        </article>
      </div>
    </>
  );
}

function DocsSection({ section, language }) {
  if (section === "quickstart") {
    return (
      <>
        <span className="eyebrow">{language === "zh" ? "十分钟配置" : "10-minute setup"}</span>
        <h1>{language === "zh" ? "快速开始" : "Quickstart"}</h1>
        <p className="lead">{language === "zh" ? "先运行中性 Starter，再替换配置和示例内容。" : "Run the neutral starter first, then replace configuration and sample content."}</p>
        <h2>1. {language === "zh" ? "安装并运行" : "Install and run"}</h2>
        <CodeBlock label={language === "zh" ? "终端" : "Terminal"} code={`npm install\nnpm run dev`} />
        <h2>2. {language === "zh" ? "执行完整检查" : "Run the complete check"}</h2>
        <CodeBlock label={language === "zh" ? "终端" : "Terminal"} code="npm run check" />
        <h2>3. {language === "zh" ? "打开主要页面" : "Open the main routes"}</h2>
        <ul className="docs-list">
          <li><code>/</code> — {language === "zh" ? "营销首页" : "marketing landing page"}</li>
          <li><code>/models</code> — {language === "zh" ? "示例目录" : "sample catalog"}</li>
          <li><code>/pricing</code> — {language === "zh" ? "示例套餐版式" : "sample plan layout"}</li>
          <li><code>/docs</code> — {language === "zh" ? "当前文档" : "these docs"}</li>
          <li><code>/status</code> — {language === "zh" ? "示例或接口状态" : "demo or API-backed status"}</li>
          <li><code>/demo/dashboard</code> — {language === "zh" ? "带明确标识的本地演示" : "clearly labeled local demo"}</li>
        </ul>
      </>
    );
  }

  if (section === "configuration") {
    return (
      <>
        <span className="eyebrow">{language === "zh" ? "仅限公开值" : "Public values only"}</span>
        <h1>{language === "zh" ? "配置" : "Configuration"}</h1>
        <p className="lead">{language === "zh" ? "所有 VITE_ 变量都会进入浏览器。这里绝不能放真实 API Key。" : "Every VITE_ variable is shipped to the browser. Never put a real API key here."}</p>
        <CodeBlock label=".env.local" code={`VITE_SITE_NAME=Your Product\nVITE_SITE_DESCRIPTION=A concise product description.\nVITE_SITE_URL=https://product.example\nVITE_REPOSITORY_URL=https://github.com/your-name/your-project\nVITE_STATUS_ENDPOINT=https://status.product.example/api\nVITE_ENABLE_DEMO=true`} />
        <div className="docs-note"><Icon name="shield" /> <p><strong>{language === "zh" ? "边界：" : "Boundary:"}</strong> {language === "zh" ? "认证秘密、支付密钥和上游供应商凭据必须放在服务端，而不是这个仓库。" : "authentication secrets, payment keys, and upstream provider credentials belong in a server-side service—not this repository."}</p></div>
      </>
    );
  }

  if (section === "catalog") {
    return (
      <>
        <span className="eyebrow">{language === "zh" ? "可替换的数据源" : "Replaceable source"}</span>
        <h1>{language === "zh" ? "模型与价格目录" : "Model and pricing catalog"}</h1>
        <p className="lead">{language === "zh" ? "默认目录完全虚构，唯一职责是展示数据形状。" : "The bundled catalog is entirely fictional and exists only to demonstrate the data shape."}</p>
        <CodeBlock label="src/data/catalog.js" code={`export const sampleModels = [{\n  id: "your-model-id",\n  provider: "Your provider",\n  family: "a",\n  input: 1.25,\n  output: 5,\n  context: "128K",\n  use: "Everyday chat"\n}];`} />
        <p>{language === "zh" ? "生产项目应选择一个明确的真实来源：版本控制的数据文件、CMS，或带验证和失败状态的目录 API。" : "A production project should choose one explicit source of truth: a versioned file, CMS, or a catalog API with validation and error states."}</p>
      </>
    );
  }

  if (section === "status") {
    return (
      <>
        <span className="eyebrow">{language === "zh" ? "可选适配器" : "Optional adapter"}</span>
        <h1>{language === "zh" ? "状态接口" : "Status adapter"}</h1>
        <p className="lead">{language === "zh" ? "未配置接口时，页面明确显示 Demo；配置后，页面才展示远端结果。" : "Without an endpoint the page says Demo. It displays remote results only after an endpoint is configured."}</p>
        <CodeBlock label={language === "zh" ? "预期 JSON" : "Expected JSON"} code={`{\n  "services": [\n    {\n      "id": "gateway",\n      "name": "API gateway",\n      "status": "operational",\n      "latencyMs": 184,\n      "note": "All regions healthy"\n    }\n  ]\n}`} />
        <p>{language === "zh" ? "允许的状态值：" : "Allowed status values:"} <code>operational</code>, <code>degraded</code>, <code>maintenance</code>, <code>outage</code>.</p>
      </>
    );
  }

  return (
    <>
      <span className="eyebrow">{language === "zh" ? "静态托管" : "Static hosting"}</span>
      <h1>{language === "zh" ? "部署" : "Deployment"}</h1>
      <p className="lead">{language === "zh" ? "构建输出位于 dist/，可部署到任何支持 SPA 回退的静态主机。" : "The build output lives in dist/ and can be deployed to any static host with SPA fallback."}</p>
      <CodeBlock label={language === "zh" ? "构建" : "Build"} code="npm ci\nnpm run check" />
      <p>{language === "zh" ? "部署前设置正确的 VITE_SITE_URL。后处理脚本会生成 robots.txt 和只包含公共路由的 sitemap.xml。" : "Set the correct VITE_SITE_URL before deploying. The post-build script generates robots.txt and a sitemap containing public routes only."}</p>
      <p><a className="text-link" href={`${siteConfig.repositoryUrl}/blob/main/docs/DEPLOYMENT.md`}>{language === "zh" ? "详细部署指南" : "Detailed deployment guide"} <Icon name="external" size={15} /></a></p>
    </>
  );
}
