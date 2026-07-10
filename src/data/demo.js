// All values in this module are intentionally fictional and safe to ship in a public demo.
export const demoStats = [
  { label: "Demo balance", value: "$184.76", change: "Example only" },
  { label: "Calls today", value: "12,482", change: "+8.4% sample trend" },
  { label: "Tokens today", value: "8.2M", change: "+11.2% sample trend" },
  { label: "Median latency", value: "284 ms", change: "Synthetic metric" },
];

export const demoUsage = [
  { day: "Mon", calls: 42 },
  { day: "Tue", calls: 58 },
  { day: "Wed", calls: 51 },
  { day: "Thu", calls: 76 },
  { day: "Fri", calls: 68 },
  { day: "Sat", calls: 49 },
  { day: "Sun", calls: 82 },
];

export const demoKeys = [
  { id: "alpha", name: "example-web", token: "demo_key_alpha_invalid", quota: "$100", status: "Active" },
  { id: "beta", name: "example-worker", token: "demo_key_beta_invalid", quota: "$50", status: "Paused" },
];

export const demoCalls = [
  { id: 1, model: "reasoning-pro", key: "example-web", tokens: "1,284 / 412", latency: "306 ms", cost: "$0.0184" },
  { id: 2, model: "fast-chat", key: "example-web", tokens: "642 / 188", latency: "142 ms", cost: "$0.0021" },
  { id: 3, model: "code-agent", key: "example-worker", tokens: "2,841 / 1,062", latency: "618 ms", cost: "$0.0617" },
];
