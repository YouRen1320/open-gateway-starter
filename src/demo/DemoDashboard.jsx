import { useEffect, useMemo, useRef, useState } from "react";
import { usePreferences } from "../app/PreferencesContext";
import { Icon } from "../components/Icon";
import { PageMeta } from "../components/PageMeta";
import { sampleModels } from "../data/catalog";
import { demoCalls, demoKeys, demoStats, demoUsage } from "../data/demo";

const dashboardText = {
  en: {
    title: "Dashboard overview",
    description: "Every number, key, and call below comes from src/data/demo.js.",
    filter: "Filter calls",
    allModels: "All sample models",
    stats: "Example statistics",
    trend: "Example trend",
    sevenDays: "Seven-day calls",
    synthetic: "Synthetic",
    chartLabel: "Example call volume: Monday 42, Tuesday 58, Wednesday 51, Thursday 76, Friday 68, Saturday 49, Sunday 82",
    chartTable: "View chart data table",
    day: "Day",
    calls: "Calls",
    invalidTokens: "Invalid tokens",
    keys: "Demo keys",
    copyKey: (name) => `Copy ${name} demo key`,
    copyTitle: "Copy invalid demo key",
    pause: "Pause",
    enable: "Enable",
    clipboardError: "Clipboard unavailable",
    copied: "Copied invalid demo key",
    records: "Example records",
    recentCalls: "Recent calls",
    rows: (count) => `${count} rows`,
    headers: ["Model", "Key", "Input / output", "Latency", "Cost"],
    empty: "No sample calls match this filter.",
    statLabels: {},
    statChanges: {},
    dayLabels: {},
    statusLabels: { Active: "Active", Paused: "Paused" },
  },
  zh: {
    title: "控制台概览",
    description: "所有数字、密钥和调用记录均来自 src/data/demo.js。",
    filter: "调用筛选",
    allModels: "全部示例模型",
    stats: "示例统计数据",
    trend: "示例趋势",
    sevenDays: "七天调用",
    synthetic: "合成数据",
    chartLabel: "示例调用量：周一 42、周二 58、周三 51、周四 76、周五 68、周六 49、周日 82",
    chartTable: "查看图表数据表",
    day: "日期",
    calls: "调用量",
    invalidTokens: "无效令牌",
    keys: "演示密钥",
    copyKey: (name) => `复制 ${name} 演示密钥`,
    copyTitle: "复制无效的演示密钥",
    pause: "暂停",
    enable: "启用",
    clipboardError: "剪贴板不可用",
    copied: "已复制无效的演示密钥",
    records: "示例记录",
    recentCalls: "最近调用",
    rows: (count) => `${count} 行`,
    headers: ["模型", "密钥", "输入 / 输出", "延迟", "费用"],
    empty: "这个筛选条件没有示例调用。",
    statLabels: { "Demo balance": "演示余额", "Calls today": "今日调用", "Tokens today": "今日 Token", "Median latency": "延迟中位数" },
    statChanges: { "Example only": "仅作示例", "+8.4% sample trend": "+8.4% 示例趋势", "+11.2% sample trend": "+11.2% 示例趋势", "Synthetic metric": "合成指标" },
    dayLabels: { Mon: "周一", Tue: "周二", Wed: "周三", Thu: "周四", Fri: "周五", Sat: "周六", Sun: "周日" },
    statusLabels: { Active: "已启用", Paused: "已暂停" },
  },
};

export default function DemoDashboard() {
  const { language } = usePreferences();
  const t = dashboardText[language];
  const [modelFilter, setModelFilter] = useState("all");
  const [keys, setKeys] = useState(demoKeys);
  const [copyState, setCopyState] = useState("");
  const copyTimer = useRef(null);
  const maxUsage = Math.max(...demoUsage.map((entry) => entry.calls));
  // Every displayed record is derived from the fictional demo module; no request is made here.
  const visibleCalls = useMemo(
    () => (modelFilter === "all" ? demoCalls : demoCalls.filter((call) => call.model === modelFilter)),
    [modelFilter],
  );

  useEffect(() => () => window.clearTimeout(copyTimer.current), []);

  const copyKey = async (key) => {
    try {
      await navigator.clipboard.writeText(key.token);
      setCopyState(key.id);
    } catch {
      setCopyState("error");
    }
    // Copy feedback is temporary and its timer is cleaned up if the route unmounts.
    window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => setCopyState(""), 1600);
  };

  const toggleKey = (id) => {
    // Local state demonstrates the control without mutating an account or remote credential.
    setKeys((current) => current.map((key) => (
      key.id === id ? { ...key, status: key.status === "Active" ? "Paused" : "Active" } : key
    )));
  };

  return (
    <>
      <PageMeta title={language === "zh" ? "控制台演示" : "Dashboard demo"} description={language === "zh" ? "带有明确标识、仅在本地运行的控制台演示。" : "A clearly labeled, local-only dashboard demonstration."} noIndex />
      <header className="demo-page-header">
        <div><span className="eyebrow">{language === "zh" ? "本地演示" : "Local demo"}</span><h1>{t.title}</h1><p>{t.description}</p></div>
        <label className="select-field">
          <span>{t.filter}</span>
          <select value={modelFilter} onChange={(event) => setModelFilter(event.target.value)}>
            <option value="all">{t.allModels}</option>
            {sampleModels.slice(0, 3).map((model) => <option key={model.id} value={model.id}>{model.name}</option>)}
          </select>
        </label>
      </header>

      <section aria-labelledby="demo-stats-title">
        <h2 className="sr-only" id="demo-stats-title">{t.stats}</h2>
        <div className="demo-stat-grid">
          {demoStats.map((stat, index) => (
            <article className={`demo-stat${index === 0 ? " demo-stat--primary" : ""}`} key={stat.label}>
              <span>{t.statLabels[stat.label] || stat.label}</span><strong>{stat.value}</strong><small>{t.statChanges[stat.change] || stat.change}</small>
            </article>
          ))}
        </div>
      </section>

      <div className="demo-dashboard-grid">
        <section className="demo-card" aria-labelledby="usage-title">
          <div className="demo-card__header"><div><span className="eyebrow">{t.trend}</span><h2 id="usage-title">{t.sevenDays}</h2></div><span className="badge badge--notice">{t.synthetic}</span></div>
          <div className="bar-chart" role="img" aria-label={t.chartLabel}>
            {demoUsage.map((entry) => (
              <div className="bar-chart__item" key={entry.day}>
                <span className="bar-chart__value">{entry.calls}</span>
                <span className="bar-chart__bar" style={{ "--bar-height": `${(entry.calls / maxUsage) * 100}%` }} />
                <span>{t.dayLabels[entry.day] || entry.day}</span>
              </div>
            ))}
          </div>
          <details className="chart-data">
            <summary>{t.chartTable}</summary>
            <table><thead><tr><th>{t.day}</th><th>{t.calls}</th></tr></thead><tbody>{demoUsage.map((entry) => <tr key={entry.day}><td>{t.dayLabels[entry.day] || entry.day}</td><td>{entry.calls}</td></tr>)}</tbody></table>
          </details>
        </section>

        <section className="demo-card" aria-labelledby="keys-title">
          <div className="demo-card__header"><div><span className="eyebrow">{t.invalidTokens}</span><h2 id="keys-title">{t.keys}</h2></div></div>
          <div className="demo-key-list">
            {keys.map((key) => (
              <article key={key.id}>
                <div><strong>{key.name}</strong><code>{key.token.replace("_invalid", "_••••••")}</code></div>
                <span className={`status-label status-label--${key.status.toLowerCase()}`}>{t.statusLabels[key.status]}</span>
                <div className="compact-actions">
                  <button className="icon-button" type="button" onClick={() => copyKey(key)} aria-label={t.copyKey(key.name)} title={t.copyTitle}><Icon name={copyState === key.id ? "check" : "copy"} size={17} /></button>
                  <button className="button button--small button--secondary" type="button" onClick={() => toggleKey(key.id)}>{key.status === "Active" ? t.pause : t.enable}</button>
                </div>
              </article>
            ))}
          </div>
          <p className="sr-only" aria-live="polite">{copyState === "error" ? t.clipboardError : copyState ? t.copied : ""}</p>
        </section>
      </div>

      <section className="demo-card" aria-labelledby="calls-title">
        <div className="demo-card__header"><div><span className="eyebrow">{t.records}</span><h2 id="calls-title">{t.recentCalls}</h2></div><span>{t.rows(visibleCalls.length)}</span></div>
        {visibleCalls.length ? (
          <div className="table-scroll"><table className="data-table"><thead><tr>{t.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{visibleCalls.map((call) => <tr key={call.id}><td><code>{call.model}</code></td><td>{call.key}</td><td>{call.tokens}</td><td>{call.latency}</td><td>{call.cost}</td></tr>)}</tbody></table></div>
        ) : <div className="empty-state"><Icon name="activity" /><p>{t.empty}</p></div>}
      </section>
    </>
  );
}
