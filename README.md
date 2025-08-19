# 🚀 降息资产配置博弈工具

专业的降息情景资产配置分析工具，为投资者提供数据驱动的决策支持。

## ✨ 功能特色

- 🎯 **精准计算**: 基于历史数据和启发式模型的降息情景分析
- 🤖 **AI 建议**: 个性化投资策略建议，助您做出明智决策  
- 📊 **详细报告**: 完整的分析报告，支持 PDF 导出和分享
- 💰 **多种支付**: 支持 Coinbase Commerce、NOWPayments、BTCPay Server
- 🔒 **安全可靠**: 企业级安全标准，保护您的隐私和数据

## 🛠️ 技术栈

- **前端**: Vite + React + TypeScript
- **样式**: Tailwind CSS
- **部署**: Vercel / Netlify / CodeSandbox
- **支付**: Coinbase Commerce, NOWPayments, BTCPay Server

## 🚀 快速开始

### 本地开发

```bash
# 克隆项目
git clone <your-repo-url>
cd rate-cut-tool-demo

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000 查看应用

### 构建生产版本

```bash
npm run build
npm run preview
```

## 🌐 部署指南

### 1. Vercel 部署 (推荐)

1. 在 [Vercel](https://vercel.com) 创建账户
2. 导入 GitHub 仓库
3. 配置环境变量 (如需要)
4. 自动部署完成

**环境变量设置**:
```bash
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id  
VERCEL_PROJECT_ID=your_project_id
```

### 2. Netlify 部署

1. 在 [Netlify](https://netlify.com) 创建账户
2. 连接 GitHub 仓库
3. 构建命令: `npm run build`
4. 发布目录: `dist`

**环境变量设置**:
```bash
NETLIFY_AUTH_TOKEN=your_netlify_token
NETLIFY_SITE_ID=your_site_id
```

### 3. CodeSandbox 部署

1. 访问 [CodeSandbox](https://codesandbox.io)
2. 点击 "Create Sandbox"
3. 选择 "Import Repository"
4. 输入 GitHub 仓库地址
5. 自动同步和部署

## 🔧 支付网关配置

### Coinbase Commerce
- 支持: USDC, ETH, BTC
- 费率: 1% + 网络费用
- 设置: 在 Coinbase Commerce 后台配置 Webhook

### NOWPayments  
- 支持: USDT-TRC20, 多种加密货币
- 费率: 0.5% + 网络费用
- 设置: 配置 Webhook 和 API 密钥

### BTCPay Server
- 支持: 自托管比特币支付
- 费率: 仅网络费用
- 设置: 自建服务器，完全控制

## 📋 环境变量

创建 `.env.local` 文件:

```bash
# 支付网关配置
COINBASE_COMMERCE_API_KEY=your_key
NOWPAYMENTS_API_KEY=your_key
BTCPAY_SERVER_URL=your_url

# AI 服务配置 (可选)
OPENAI_API_KEY=your_key

# 应用配置
NODE_ENV=development
```

## 🧪 测试

```bash
# 运行测试
npm test

# 代码检查
npm run lint

# 类型检查
npx tsc --noEmit
```

## 📱 PWA 支持

本应用支持 PWA (Progressive Web App) 功能:
- 离线访问
- 主屏幕安装
- 推送通知 (可选)

## 🔒 安全特性

- CSP (Content Security Policy)
- HTTPS 强制
- XSS 防护
- CSRF 防护
- 输入验证 (Zod)

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🤝 贡献

欢迎提交 Issue 和 Pull Request!

## 📞 支持

- 邮箱: support@example.com
- 文档: [项目 Wiki](../../wiki)
- 社区: [Discord](https://discord.gg/example)

---

**开发者**: @eclipsecybertitan  
**版本**: 1.0.0  
**最后更新**: 2024-08-19 