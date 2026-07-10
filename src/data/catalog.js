// Catalog entries are fictional examples. Replace them with an API or maintained product data.
export const sampleModels = [
  { id: "reasoning-pro", provider: "Provider A", family: "a", name: "Reasoning Pro", input: 8, output: 24, context: "256K", use: "Reasoning" },
  { id: "fast-chat", provider: "Provider A", family: "a", name: "Fast Chat", input: 1.2, output: 4.8, context: "128K", use: "Everyday chat" },
  { id: "long-context", provider: "Provider B", family: "b", name: "Long Context", input: 4, output: 16, context: "1M", use: "Documents" },
  { id: "code-agent", provider: "Provider B", family: "b", name: "Code Agent", input: 5, output: 20, context: "200K", use: "Software work" },
  { id: "vision-plus", provider: "Provider C", family: "c", name: "Vision Plus", input: 3, output: 12, context: "512K", use: "Multimodal" },
  { id: "embed-lite", provider: "Provider C", family: "c", name: "Embed Lite", input: 0.2, output: 0, context: "32K", use: "Embeddings" },
];

export const samplePlans = [
  { id: "sandbox", name: "Sandbox", price: "Free", description: "A safe default for evaluating the starter.", features: ["Sample catalog", "Demo dashboard", "Community support"] },
  { id: "builder", name: "Builder", price: "$29", description: "Example copy for an individual developer plan.", features: ["Usage controls", "Multiple keys", "Email support"], featured: true },
  { id: "team", name: "Team", price: "$99", description: "Example copy for a shared workspace plan.", features: ["Member budgets", "Shared reporting", "Priority support"] },
  { id: "enterprise", name: "Enterprise", price: "Custom", description: "Replace this with your verified enterprise offer.", features: ["Custom limits", "Security review", "Service agreement"] },
];

export const demoServices = [
  { id: "gateway", name: "Example API gateway", status: "operational", latencyMs: 184, note: "Demo value" },
  { id: "console", name: "Example developer console", status: "operational", latencyMs: 96, note: "Demo value" },
  { id: "billing", name: "Example billing adapter", status: "maintenance", latencyMs: null, note: "Planned demo maintenance" },
];
