# OpenGateway Starter

[English](./README.md)

一个中性、可访问、可复用的 AI 网关 React Starter，包含营销站、文档、状态页，以及有明确标识的产品界面演示。

这个仓库解决两个问题：

1. 创建新项目时，不再携带上一套产品的品牌、域名、承诺、凭据和部署细节。
2. 陌生维护者不依赖私人背景，也能运行、配置、测试和部署项目。

仓库里的模型、价格、用量、密钥、状态和聊天回复全部是虚构示例，不代表任何生产服务。

## 已包含

- 五个可抓取公共路由：`/`、`/models`、`/pricing`、`/docs`、`/status`。
- `/demo/*` 下按路由延迟加载的控制台和本地聊天演示。
- `src/config/site.js` 中集中的浏览器公开配置。
- 独立的共享双语内容、已本地化的功能控件、虚构目录数据和演示数据。
- 基于语义化变量的深浅主题。
- 键盘导航、可见焦点、跳过导航、reduced motion 和移动端布局。
- ESLint、Vitest、生产构建、CI 和 Dependabot。
- Apache-2.0、安全策略、贡献指南和品牌边界。

## 明确不包含

- 认证、账户存储、账单和支付处理。
- 模型供应商代理或任何后端 API 实现。
- 生产凭据，或在前端保存生产凭据的方法。
- 对可用率、合规、价格准确性、客户数量或 SLA 的承诺。
- 使用其他产品名称、Logo、域名或商业身份的许可。

## 快速开始

需要仍受支持的 Node.js 22 或 24 LTS，以及 npm。Node.js 20 已结束生命周期，因此不再支持。

```bash
npm install
npm run dev
```

提交或部署前运行：

```bash
npm run check
```

该命令依次执行 ESLint、公开文件安全扫描、Vitest 和生产构建。

`package.json` 中的 `"private": true` 是有意设置：这是项目模板，不是 npm 包。它可以防止误发布到 npm，不影响 GitHub Release 或正常部署。

## 从 Starter 创建新项目

把仓库上传到 GitHub 后，建议标记为 **Template repository**，通过 **Use this template** 创建新项目，而不是 fork。新项目会获得独立历史。

创建后按顺序处理：

1. 将 `.env.example` 复制为 `.env.local`。
2. 替换 `VITE_SITE_NAME`、`VITE_SITE_DESCRIPTION`、`VITE_SITE_URL` 和 `VITE_REPOSITORY_URL`。
3. 替换 `src/content/copy.js` 中的产品文案。
4. 将 `src/data/catalog.js` 和 `src/data/demo.js` 替换为经过核验的数据或 API 适配器。
5. 替换 `O` 品牌标记并更新 `TRADEMARKS.md`。
6. 决定是否保留演示；设置 `VITE_ENABLE_DEMO=false` 会隐藏并阻止 Demo 路由。
7. 替换仓库地址，并检查 Footer 中的全部法律链接。
8. 运行 `npm run check`，公开前再执行一次秘密扫描。

## 配置

所有 `VITE_` 变量都会进入浏览器 bundle，因此只能存放公开值。

```dotenv
VITE_SITE_NAME=Your Product
VITE_SITE_DESCRIPTION=A concise, verified description of your product.
VITE_SITE_URL=https://product.example
VITE_REPOSITORY_URL=https://github.com/your-name/your-project
VITE_STATUS_ENDPOINT=
VITE_ENABLE_DEMO=true
```

不要在这些变量中写模型供应商 Key、支付 Key、Session Secret 或私有 Token。它们必须放在后端服务中。

完整契约见 [配置说明](./docs/CONFIGURATION.md)。

## 状态接口

没有配置 `VITE_STATUS_ENDPOINT` 时，状态页会明确显示“示例数据”。配置后，接口必须返回：

```json
{
  "services": [
    {
      "id": "gateway",
      "name": "API gateway",
      "status": "operational",
      "latencyMs": 184,
      "note": "All regions healthy"
    }
  ]
}
```

合法状态为 `operational`、`degraded`、`maintenance`、`outage`。无效响应或十秒超时会显示错误并保留上一次有效视图，不会被静默当作“正常”。

## 目录结构

```text
src/
├── app/          路由副作用和持久化 UI 偏好
├── components/   可复用视觉与行为组件
├── config/       可安全进入浏览器的站点配置
├── content/      双语产品文案
├── data/         虚构数据和 API 边界校验
├── demo/         延迟加载的本地产品演示
├── layouts/      公开站和 Demo 导航外壳
├── pages/        可抓取公共页面
├── styles/       语义化变量和响应式样式
└── test/         测试公共设置
```

模块边界和扩展规则见 [架构说明](./docs/ARCHITECTURE.md)。

## 常用命令

| 命令 | 用途 |
|---|---|
| `npm run dev` | 启动 Vite 开发服务器。 |
| `npm run build` | 构建并生成 SPA 回退、抓取文件和捆绑依赖许可证。 |
| `npm run preview` | 本地预览生产构建。 |
| `npm run lint` | 运行 ESLint。 |
| `npm run test` | 单次运行全部测试。 |
| `npm run test:watch` | 监听模式运行测试。 |
| `npm run scan:public` | 扫描高置信度秘密、个人邮箱和用户主目录路径。 |
| `npm run check` | 运行 Lint、公开文件扫描、测试和生产构建。 |
| `npm run verify:release` | 拒绝缺失、不安全或仍含占位符的生产配置。 |
| `npm run release:check` | 先验证生产配置，再执行完整检查。 |

## 部署

构建输出位于 `dist/`。静态主机需要把 `/models`、`/docs` 等前端路由回退到 `index.html`。

构建前设置正确的 `VITE_SITE_URL`，确保 canonical、`robots.txt` 和 `sitemap.xml` 使用真实域名。创建 `.env.production` 后运行 `npm run release:check`；只要默认名称、示例域名、仓库占位符或 Demo 决策尚未替换，该命令就会有意失败。详见 [部署说明](./docs/DEPLOYMENT.md)。

## 安全边界

这个项目是前端 Starter，不是供应商凭据的安全边界。浏览器无法保守内嵌秘密。

- 模型供应商和支付凭据保存在服务端。
- 所有 Demo Token 都是无效展示字符串。
- 在 GitHub 开启 secret scanning 和 push protection。
- 在 CI 中运行依赖审计。
- 安全问题按 [SECURITY.md](./SECURITY.md) 提交。

## 贡献、许可证与品牌

提交 PR 或支持请求前请阅读 [CONTRIBUTING.md](./CONTRIBUTING.md)、[CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) 和 [SUPPORT.md](./SUPPORT.md)。贡献内容不得加入真实凭据、个人信息、未经核验的商业承诺或产品专属部署设施。

源码采用 [Apache License 2.0](./LICENSE)。许可证不授予贡献者商号、商标、服务标志或产品名称的使用许可，合理描述作品来源的情况除外。

这个 Starter 使用占位身份，生产使用前必须替换。每次生产构建都会生成包含完整依赖许可证文本的 `dist/third-party-licenses.md`。详见 [TRADEMARKS.md](./TRADEMARKS.md) 和 [NOTICE](./NOTICE)。
