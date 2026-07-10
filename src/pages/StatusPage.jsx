import { useCallback, useEffect, useRef, useState } from "react";
import { usePreferences } from "../app/PreferencesContext";
import { Icon } from "../components/Icon";
import { PageHeader } from "../components/PageHeader";
import { PageMeta } from "../components/PageMeta";
import { siteConfig } from "../config/site";
import { demoServices } from "../data/catalog";
import { normalizeServices } from "../data/statusAdapter";

const localizedStatuses = {
  en: { operational: "Operational", degraded: "Degraded", maintenance: "Maintenance", outage: "Outage" },
  zh: { operational: "正常", degraded: "性能下降", maintenance: "维护中", outage: "中断" },
};
const statusTimeoutMs = 10_000;

export function StatusPage() {
  const { language, text } = usePreferences();
  const activeRequest = useRef(null);
  const [state, setState] = useState({
    services: demoServices,
    source: "demo",
    loading: false,
    error: "",
  });

  const cancelStatusRequest = useCallback(() => {
    const request = activeRequest.current;
    activeRequest.current = null;
    if (!request) return;
    window.clearTimeout(request.timeout);
    request.controller.abort();
  }, []);

  // The adapter validates the response instead of treating any opaque network response as healthy.
  const loadStatus = useCallback(async () => {
    if (!siteConfig.statusEndpoint) return;
    cancelStatusRequest();
    const controller = new AbortController();
    const request = { controller, timedOut: false, timeout: null };
    request.timeout = window.setTimeout(() => {
      request.timedOut = true;
      controller.abort();
    }, statusTimeoutMs);
    activeRequest.current = request;
    setState((current) => ({ ...current, loading: true, error: "" }));
    try {
      const response = await fetch(siteConfig.statusEndpoint, {
        signal: controller.signal,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(`Status endpoint returned ${response.status}.`);
      const services = normalizeServices(await response.json());
      if (activeRequest.current !== request) return;
      setState({ services, source: "remote", loading: false, error: "" });
    } catch (error) {
      if (activeRequest.current !== request) return;
      if (controller.signal.aborted && !request.timedOut) return;
      const message = request.timedOut
        ? "Status request timed out after 10 seconds."
        : error instanceof Error ? error.message : "Unknown status error.";
      setState((current) => ({ ...current, loading: false, error: message }));
    } finally {
      window.clearTimeout(request.timeout);
      if (activeRequest.current === request) activeRequest.current = null;
    }
  }, [cancelStatusRequest]);

  useEffect(() => {
    // Defer the initial request one task so the effect only schedules external synchronization.
    const timer = window.setTimeout(loadStatus, 0);
    return () => {
      window.clearTimeout(timer);
      cancelStatusRequest();
    };
  }, [cancelStatusRequest, loadStatus]);

  const hasIncident = state.services.some((service) => service.status !== "operational");

  return (
    <>
      <PageMeta
        title={language === "zh" ? "服务状态" : "Service status"}
        description={language === "zh" ? "默认诚实显示示例数据，并支持经过校验的可选 JSON 状态接口。" : "An honest demo-by-default status page with an optional validated JSON adapter."}
      />
      <PageHeader
        eyebrow={language === "zh" ? "状态页结构" : "Status pattern"}
        badge={state.source === "demo" ? text.common.example : (language === "zh" ? "远端数据" : "Remote data")}
        title={language === "zh" ? "未连接接口时，不假装实时。" : "No live endpoint, no live claim."}
        description={language === "zh" ? "默认展示有明确标签的示例状态。设置 VITE_STATUS_ENDPOINT 后才会请求并验证远端 JSON。" : "The default view is explicitly labeled sample data. Remote JSON is fetched and validated only after VITE_STATUS_ENDPOINT is set."}
      />
      <section className="container page-section status-stack">
        <div className={`status-summary${hasIncident ? " status-summary--attention" : ""}`}>
          <span className="status-summary__icon"><Icon name={hasIncident ? "warning" : "check"} /></span>
          <div>
            <h2>{hasIncident ? (language === "zh" ? "示例中存在维护项" : "Sample includes a maintenance item") : (language === "zh" ? "所有服务正常" : "All services operational")}</h2>
            <p>{state.source === "demo" ? (language === "zh" ? "这是示例状态，不代表任何生产系统。" : "This is sample state and does not represent a production system.") : (language === "zh" ? "数据来自已配置的状态接口。" : "Data comes from the configured status endpoint.")}</p>
          </div>
          {siteConfig.statusEndpoint && (
            <button className="button button--secondary" type="button" disabled={state.loading} onClick={() => loadStatus()}>
              <Icon name="refresh" size={17} />
              {state.loading ? (language === "zh" ? "加载中…" : "Loading…") : (language === "zh" ? "刷新" : "Refresh")}
            </button>
          )}
        </div>

        {state.error && <div className="error-banner" role="alert"><Icon name="warning" /><span>{state.error} {language === "zh" ? "页面继续保留上一次有效视图。" : "The last valid view remains visible."}</span></div>}

        <div className="service-list">
          {state.services.map((service) => (
            <article className="service-row" key={service.id}>
              <span className={`service-dot service-dot--${service.status}`} aria-hidden="true" />
              <div><h2>{service.name}</h2><p>{service.note}</p></div>
              <strong className={`status-label status-label--${service.status}`}>{localizedStatuses[language][service.status]}</strong>
              <span className="service-latency">{service.latencyMs === null ? "—" : `${service.latencyMs} ms`}</span>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
