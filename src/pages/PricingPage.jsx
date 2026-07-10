import { usePreferences } from "../app/PreferencesContext";
import { ActionLink } from "../components/ActionLink";
import { Icon } from "../components/Icon";
import { PageHeader } from "../components/PageHeader";
import { PageMeta } from "../components/PageMeta";
import { siteConfig } from "../config/site";
import { samplePlans } from "../data/catalog";

export function PricingPage() {
  const { language, text } = usePreferences();
  // When demos are disabled, sample plan actions lead to configuration instead of a blocked route.
  const pricingAction = siteConfig.demoEnabled
    ? { label: text.common.openDemo, to: "/demo/dashboard" }
    : { label: text.common.configure, to: "/docs?section=configuration" };

  return (
    <>
      <PageMeta title={language === "zh" ? "示例价格页" : "Sample pricing page"} description={language === "zh" ? "带有明确示例标识、可复用的价格卡片结构。" : "Clearly labeled sample pricing cards for a reusable starter."} />
      <PageHeader
        eyebrow={language === "zh" ? "价格页结构" : "Pricing pattern"}
        badge={text.common.example}
        title={language === "zh" ? "把价格页当作结构，不要把示例当作承诺。" : "Treat pricing as structure—not as an inherited promise."}
        description={language === "zh" ? "所有金额、权益和支持等级都是占位内容。发布前必须替换并由业务、财务和法律团队确认。" : "All amounts, entitlements, and support levels are placeholders. Replace and verify them before publishing."}
      />
      <section className="container page-section">
        <div className="pricing-grid">
          {samplePlans.map((plan) => (
            <article className={`pricing-card${plan.featured ? " pricing-card--featured" : ""}`} key={plan.id}>
              {plan.featured && <span className="badge badge--accent">{language === "zh" ? "重点版式" : "Layout emphasis"}</span>}
              <h2>{plan.name}</h2>
              <p>{plan.description}</p>
              <strong className="pricing-card__price">{plan.price}</strong>
              <ActionLink className={`button ${plan.featured ? "button--primary" : "button--secondary"}`} to={pricingAction.to}>
                {pricingAction.label}
              </ActionLink>
              <ul>
                {plan.features.map((feature) => <li key={feature}><Icon name="check" size={17} />{feature}</li>)}
              </ul>
            </article>
          ))}
        </div>
        <p className="disclaimer"><Icon name="warning" size={17} /> {language === "zh" ? "示例价格。不要在未核验的情况下用于商业销售。" : "Example pricing. Do not use for commercial offers without verification."}</p>
      </section>
    </>
  );
}
