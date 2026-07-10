import { useMemo, useState } from "react";
import { usePreferences } from "../app/PreferencesContext";
import { ModelGlyph } from "../components/Brand";
import { PageHeader } from "../components/PageHeader";
import { PageMeta } from "../components/PageMeta";
import { sampleModels } from "../data/catalog";

export function ModelsPage() {
  const [provider, setProvider] = useState("All");
  const { language, text } = usePreferences();
  // Filters operate on the fictional catalog; production adapters should validate remote data first.
  const providers = useMemo(() => ["All", ...new Set(sampleModels.map((model) => model.provider))], []);
  const models = provider === "All" ? sampleModels : sampleModels.filter((model) => model.provider === provider);

  return (
    <>
      <PageMeta
        title={language === "zh" ? "示例模型目录" : "Sample model catalog"}
        description={language === "zh" ? "使用虚构目录数据展示可配置的模型目录。" : "Fictional catalog data demonstrating a configurable model directory."}
      />
      <PageHeader
        eyebrow={language === "zh" ? "目录结构" : "Catalog pattern"}
        badge={text.common.example}
        title={language === "zh" ? "可替换的数据目录，不是实时价格承诺。" : "A replaceable catalog, not a live pricing claim."}
        description={language === "zh" ? "以下模型、供应商和价格均为虚构示例。你可以改为维护过的本地数据，也可以连接自己的目录 API。" : "Every model, provider, and price below is fictional. Replace the module with maintained local data or your own catalog API."}
      />

      <section className="container page-section">
        <div className="filter-row" aria-label={language === "zh" ? "按供应商筛选模型" : "Filter models by provider"}>
          {providers.map((item) => (
            <button
              className={`filter-chip${provider === item ? " is-active" : ""}`}
              type="button"
              key={item}
              aria-pressed={provider === item}
              onClick={() => setProvider(item)}
            >
              {item === "All" && language === "zh" ? "全部" : item} <span>{item === "All" ? sampleModels.length : sampleModels.filter((model) => model.provider === item).length}</span>
            </button>
          ))}
        </div>

        <div className="model-grid">
          {models.map((model) => (
            <article className="model-card" key={model.id}>
              <div className="model-card__title">
                <ModelGlyph family={model.family} />
                <div><h2>{model.name}</h2><code>{model.id}</code></div>
              </div>
              <p>{model.use}</p>
              <dl>
                <div><dt>{language === "zh" ? "供应商" : "Provider"}</dt><dd>{model.provider}</dd></div>
                <div><dt>{language === "zh" ? "上下文" : "Context"}</dt><dd>{model.context}</dd></div>
                <div><dt>{language === "zh" ? "输入 / 1M" : "Input / 1M"}</dt><dd>${model.input.toFixed(2)}</dd></div>
                <div><dt>{language === "zh" ? "输出 / 1M" : "Output / 1M"}</dt><dd>{model.output ? `$${model.output.toFixed(2)}` : "—"}</dd></div>
              </dl>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
