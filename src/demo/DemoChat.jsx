import { useEffect, useRef, useState } from "react";
import { usePreferences } from "../app/PreferencesContext";
import { ModelGlyph } from "../components/Brand";
import { Icon } from "../components/Icon";
import { PageMeta } from "../components/PageMeta";
import { sampleModels } from "../data/catalog";

const suggestions = {
  en: ["Explain the configuration boundary", "Show a safe status response", "Plan a new starter project"],
  zh: ["解释公开配置与服务端秘密的边界", "展示一个安全的状态响应", "规划一个新的 Starter 项目"],
};

export default function DemoChat() {
  const { language } = usePreferences();
  const [modelId, setModelId] = useState(sampleModels[0].id);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [pending, setPending] = useState(false);
  const timeoutRef = useRef(null);
  const currentModel = sampleModels.find((model) => model.id === modelId) || sampleModels[0];

  // The simulated response timer is always cancelled on unmount to avoid stale state updates.
  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  const send = (rawText) => {
    const value = rawText.trim();
    if (!value || pending) return;
    setMessages((current) => [...current, { id: crypto.randomUUID(), role: "user", text: value }]);
    setInput("");
    setPending(true);
    timeoutRef.current = window.setTimeout(() => {
      const reply = language === "zh"
        ? "这是本地静态回复。生产接入时，请由你自己的后端代理模型请求，并在服务器端保存供应商凭据。"
        : "This is a local static reply. In production, proxy model requests through your own backend and keep provider credentials server-side.";
      setMessages((current) => [...current, { id: crypto.randomUUID(), role: "assistant", text: reply }]);
      setPending(false);
    }, 420);
  };

  const submit = (event) => {
    event.preventDefault();
    send(input);
  };

  return (
    <>
      <PageMeta
        title={language === "zh" ? "聊天演示" : "Chat demo"}
        description={language === "zh" ? "完全在本地运行、不会调用模型 API 的聊天界面演示。" : "A local-only chat interface that never calls a model API."}
        noIndex
      />
      <div className="chat-demo">
        <header className="chat-demo__header">
          <div><span className="eyebrow">Local simulation</span><h1>{language === "zh" ? "聊天界面演示" : "Chat interface demo"}</h1></div>
          <label className="select-field">
            <span>{language === "zh" ? "示例模型" : "Sample model"}</span>
            <select value={modelId} onChange={(event) => setModelId(event.target.value)}>{sampleModels.slice(0, 4).map((model) => <option key={model.id} value={model.id}>{model.name}</option>)}</select>
          </label>
        </header>

        <div className="chat-demo__canvas" role="log" aria-live="polite" aria-label={language === "zh" ? "本地演示对话" : "Local demo conversation"}>
          {messages.length === 0 ? (
            <div className="chat-welcome">
              <ModelGlyph family={currentModel.family} />
              <h2>{language === "zh" ? "选择一个示例问题" : "Choose a sample prompt"}</h2>
              <p>{language === "zh" ? "不会发送网络请求。" : "No network request will be sent."}</p>
              <div>{suggestions[language].map((suggestion) => <button type="button" key={suggestion} onClick={() => send(suggestion)}>{suggestion}</button>)}</div>
            </div>
          ) : (
            <div className="message-list">
              {messages.map((message) => (
                <article className={`message message--${message.role}`} key={message.id}>
                  {message.role === "assistant" && <ModelGlyph family={currentModel.family} />}
                  <div><span>{message.role === "user" ? (language === "zh" ? "你" : "You") : currentModel.name}</span><p>{message.text}</p></div>
                </article>
              ))}
              {pending && <div className="thinking"><span /><span /><span /><em>{language === "zh" ? "本地生成中" : "Simulating locally"}</em></div>}
            </div>
          )}
        </div>

        <form className="composer" onSubmit={submit}>
          <label className="sr-only" htmlFor="demo-message">{language === "zh" ? "输入演示消息" : "Enter a demo message"}</label>
          <textarea id="demo-message" value={input} onChange={(event) => setInput(event.target.value)} placeholder={language === "zh" ? "输入内容，仅在本地使用…" : "Type a message; it stays local…"} rows="2" />
          <button type="submit" className="button button--primary" disabled={!input.trim() || pending}><Icon name="send" />{language === "zh" ? "发送" : "Send"}</button>
          <button type="button" className="button button--secondary" onClick={() => { setMessages([]); setPending(false); window.clearTimeout(timeoutRef.current); }}>{language === "zh" ? "新对话" : "New chat"}</button>
        </form>
      </div>
    </>
  );
}
