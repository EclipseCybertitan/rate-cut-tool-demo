# 🚀 降息资产配置博弈工具

专业的降息情景资产配置分析工具，为投资者提供数据驱动的决策支持。

## 🎭 角色分工系统

本项目采用角色分工开发模式，确保代码质量和开发效率：

### 👑 执政官(Orchestrator)——Eclipsever
- **职责**: 需求分析、任务分配、跨角色协调、质量把控
- **权限**: 全栈开发、角色切换、架构决策
- **特点**: 全局视角、高效协调、质量优先

### 🎨 前端工程师(Frontend Engineer)——Mars
- **职责**: React组件开发、UI交互设计、主题系统实现
- **技术栈**: React 18 + TypeScript + Tailwind CSS
- **输出**: 组件文件、样式文件、交互逻辑

### ⚙️ 后端工程师(Backend Engineer)——Mart
- **职责**: API路由开发、数据库操作、业务逻辑实现
- **技术栈**: Node.js + Express + Prisma + PostgreSQL
- **输出**: API端点、数据模型、业务服务

### 🧮 算法工程师(Algorithm Engineer)——Coser
- **职责**: 模拟引擎开发、计算逻辑、数据处理算法
- **技术栈**: TypeScript + 数学库 + 性能优化
- **输出**: 核心算法、模拟函数、计算模块

### 🧪 测试工程师(QA Engineer)——HF218
- **职责**: 单元测试、集成测试、质量保证
- **技术栈**: Vitest + Testing Library + 测试策略
- **输出**: 测试用例、测试报告、质量指标

### 🎯 架构师(Architect)——没头脑和不高兴
- **职责**: 系统设计、技术选型、架构决策
- **技术栈**: 系统设计 + 技术评估 + 架构规划
- **输出**: 架构文档、技术方案、设计决策

## 📋 开发工作流

### 1. 需求接收
- 接收用户或GPT助理的反馈需求
- 分析需求的技术复杂度和影响范围

### 2. 角色判断
- 确定主要执行角色
- 评估是否需要跨角色协作

### 3. 代码输出
- 输出对应角色的代码实现
- 确保符合项目规范和最佳实践

### 4. 测试生成
- 自动生成必要的单元测试
- 确保测试覆盖率符合要求

### 5. 规范确认
- 验证代码符合RULES.md规范
- 确保代码质量和一致性

## 🔄 角色切换规则

### 弱约束原则
- 执政官可以在必要时切换角色
- 跨角色协作时优先保持角色专注
- 复杂任务允许角色间协调开发

### 角色专注原则
- 每个角色专注于自己的职责范围
- 避免角色职责混淆和代码混乱
- 保持代码的清晰性和可维护性

## ✨ 功能特色

- 🎯 **精准计算**: 基于历史数据和启发式模型的降息情景分析
- 🤖 **AI 建议**: 个性化投资策略建议，助您做出明智决策  
- 📊 **详细报告**: 完整的分析报告，支持 PDF 导出和分享
- 💰 **多种支付**: 支持 Coinbase Commerce、NOWPayments、BTCPay Server
- 🔒 **安全可靠**: 企业级安全标准，保护您的隐私和数据
- 🎨 **三主题系统**: DUSK学院雅典风、DAY华尔街黑金风、DAWN赛博像素风
- 🎵 **多媒体支持**: 主题音乐、字体、图片资源管理

## 🛠️ 技术栈

- **前端**: Vite + React + TypeScript
- **样式**: Tailwind CSS + CSS变量主题系统
- **后端**: Node.js + Express + Prisma ORM
- **数据库**: PostgreSQL + Supabase
- **部署**: Vercel / Netlify / CodeSandbox
- **支付**: Coinbase Commerce, NOWPayments, BTCPay Server
- **媒体**: 自定义媒体加载器 + 字体注入系统
- **测试**: Vitest + Testing Library

## 🚀 快速开始

### 在线访问
🌐 **生产环境**: https://eclipsever.online  
🔗 **Vercel部署**: https://rate-cut-tool-demo.vercel.app

### 📧 邮件服务配置

#### EmailJS 配置信息
- **Service ID**: `service_4wadqb5`
- **Template ID**: `template_fp1z1fl`
- **User ID**: `q0sJaN7orl4-csdon`

#### Namecheap Private Email 配置
- **SMTP Host**: `mail.privateemail.com`
- **SMTP Port**: `587`
- **SSL/TLS**: 使用 STARTTLS（不勾选"My SMTP server supports SSL"）
- **邮箱地址**: `noreply@eclipsever.online`
- **认证方式**: App Password

#### 邮件模板配置
- **模板类型**: Contact Us（已修改为报告发送模板）
- **HTML内容**: 包含完整的降息分析报告HTML结构
- **变量支持**: 
  - `{{to_email}}`: 收件人邮箱
  - `{{subject}}`: 邮件主题
  - `{{message}}`: 邮件正文
  - `{{report_html}}`: 报告HTML内容
  - `{{from_name}}`: 发件人名称

#### 邮件发送功能特性
- ✅ **EmailJS集成**: 使用Namecheap SMTP服务
- ✅ **收件人输入**: 用户友好的模态框界面
- ✅ **发送状态**: 实时显示发送进度
- ✅ **错误处理**: 完善的错误提示
- ✅ **多语言支持**: 中英文界面
- ✅ **品牌展示**: 包含eclipsever品牌信息

### 当前版本
🎯 **v1.3.9**: 手机端UI全面优化 + 多语言支持完善 + 响应式设计升级

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

## 🎨 人类介入资产入口操作指南

### 📁 媒体资源管理

项目支持人类介入的媒体资源配置，所有资源文件位于 `/public/assets/` 目录：

```
public/assets/
├── audio/           # 音频文件
│   ├── dusk/        # DUSK主题音频
│   ├── day/         # DAY主题音频
│   └── dawn/        # DAWN主题音频
├── fonts/           # 字体文件
│   ├── dusk/        # DUSK主题字体
│   ├── day/         # DAY主题字体
│   └── dawn/        # DAWN主题字体
├── images/          # 图片资源
│   ├── dusk/        # DUSK主题图片
│   ├── day/         # DAY主题图片
│   └── dawn/        # DAWN主题图片
└── manifests/       # 配置文件
    └── media.json   # 媒体资源配置
```

### 🔧 如何添加新资源

#### 1. 添加音频文件

```bash
# 将音频文件放入对应主题目录
cp your_audio.mp3 public/assets/audio/dusk/
cp your_audio.mp3 public/assets/audio/day/
cp your_audio.mp3 public/assets/audio/dawn/
```

#### 2. 添加字体文件

```bash
# 将字体文件放入对应主题目录（推荐.woff2格式）
cp your_font.woff2 public/assets/fonts/dusk/
cp your_font.woff2 public/assets/fonts/day/
cp your_font.woff2 public/assets/fonts/dawn/
```

#### 3. 添加图片资源

```bash
# 将图片文件放入对应主题目录
cp your_image.png public/assets/images/dusk/
cp your_image.png public/assets/images/day/
cp your_image.png public/assets/images/dawn/
```

#### 4. 更新配置文件

编辑 `public/assets/manifests/media.json`，添加新资源信息：

```json
{
  "music": {
    "dusk": {
      "tracks": [
        {
          "id": "dusk_new_track",
          "title": "新音频标题",
          "artist": "艺术家名称",
          "url": "/assets/audio/dusk/your_audio.mp3",
          "duration": "3:45",
          "mood": "contemplative",
          "license": "CC BY-NC-SA 3.0"
        }
      ]
    }
  }
}
```

### 📋 资源检查

项目包含自动资源检查脚本：

```bash
# 检查媒体资源完整性
npm run check-media

# 构建后自动检查
npm run build
```

### 🎯 主题配置

#### CSS变量系统

主题通过CSS变量实现，在 `src/app/globals.css` 中定义：

```css
:root[data-theme="dusk"] {
  --color-bg-primary: #1a1a2e;
  --color-bg-secondary: #16213e;
  --color-accent-primary: #e94560;
  --color-text-primary: #e94560;
  --color-text-secondary: #533483;
}
```

#### 组件主题支持

所有组件必须支持主题切换：

```tsx
import { useTheme } from '../contexts/ThemeContext'

export default function MyComponent() {
  const { theme } = useTheme()
  
  return (
    <div className={`theme-${theme} bg-[var(--color-bg-primary)]`}>
      {/* 组件内容 */}
    </div>
  )
}
```

### 🔄 动态资源加载

#### 媒体加载器

```tsx
import { mediaLoader } from '../lib/media'

// 加载主题音乐
const tracks = await mediaLoader.getThemeMusic('dusk')

// 预加载资源
await mediaLoader.preloadResources('dusk')
```

#### 字体注入器

```tsx
import { fontInjector } from '../lib/fonts'

// 注入主题字体
await fontInjector.injectThemeFonts('dusk')

// 预加载字体
await fontInjector.preloadFonts('dusk')
```

### 📱 音频播放器

项目支持多种音频源：

```tsx
import AudioSlot from '../components/AudioSlot'

// HTML5音频
<AudioSlot type="html5" theme="dusk" trackId="dusk_01" />

// Spotify嵌入
<AudioSlot type="spotify" trackId="spotify_track_id" />

// SoundCloud嵌入
<AudioSlot type="soundcloud" trackId="soundcloud_track_id" />
```

### ⚠️ 注意事项

1. **文件格式**: 音频推荐MP3，字体推荐WOFF2，图片推荐PNG/WebP
2. **文件大小**: 单个文件建议不超过10MB
3. **许可证**: 确保所有资源有合适的许可证
4. **回退资源**: 提供默认回退资源以防加载失败
5. **性能优化**: 启用CDN和压缩以提高加载速度

### 🚀 部署配置

#### 环境变量

```bash
# .env.local
VITE_MEDIA_CDN_URL=https://your-cdn.com
VITE_MEDIA_COMPRESSION=true
VITE_MEDIA_CACHE_ENABLED=true
```

#### 构建优化

```bash
# 构建时检查资源
npm run build

# 手动检查资源
npm run check-media
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

# 媒体资源配置
VITE_MEDIA_CDN_URL=https://your-cdn.com
VITE_MEDIA_COMPRESSION=true
VITE_MEDIA_CACHE_ENABLED=true
```

## 🧪 测试

```bash
# 运行测试
npm test

# 运行测试并显示UI
npm run test:ui

# 生成测试覆盖率报告
npm run test:coverage

# 运行测试（不监听）
npm run test:run

# 代码检查
npm run lint

# 类型检查
npx tsc --noEmit

# 媒体资源检查
npm run check-media

# 代码格式化
npm run format
```

### 测试覆盖率要求

- **单元测试覆盖率**: ≥80%
- **测试框架**: Vitest + Testing Library
- **测试环境**: jsdom (浏览器环境模拟)
- **覆盖率报告**: HTML + JSON + 控制台输出

### 测试结构

```
src/
├── __tests__/           # 测试文件目录
│   ├── components/      # 组件测试
│   ├── lib/            # 库函数测试
│   └── api/            # API测试
├── test/               # 测试配置和工具
│   └── setup.ts        # 测试环境设置
└── vitest.config.ts    # Vitest配置
```

### 运行测试示例

```bash
# 运行所有测试
npm test

# 运行特定测试文件
npm test engine.test.ts

# 运行特定测试套件
npm test -- --grep "模拟引擎"

# 生成覆盖率报告
npm run test:coverage
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

## 💰 商业定价体系

### 🎯 目标用户与服务层级

| 用户类型 | 使用场景 | 定价模式 | 收费区间 | 附加服务 |
|---------|---------|---------|---------|---------|
| **个人投资者** | 想快速了解降息周期对自己资产的影响 | 一次性报告（按次付费） | **\$5–10/次** | PDF 报告导出、基础 AI 建议 |
| **进阶用户** | 持续追踪资产配置与利率变化 | 月度订阅制 | **\$20–30/月** | 无限次生成报告、历史回测、个性化投资建议 |
| **专业理财顾问** | 为客户提供投资组合建议 | 高级订阅 / 帐号制 | **\$99–199/月/账号** | AI 辅助顾问、客户资产批量管理、白标报告 |
| **金融机构 / B2B** | 内部风控/客户教育/投资培训 | 定制化 License | **\$10k–50k/年** | API 接口集成、专属支持、私有部署 |

### 🔒 功能访问控制

- **免费用户**: 基础模拟、有限次数
- **付费用户**: 完整功能、无限次数、高级分析
- **企业用户**: 定制化功能、API访问、专属支持

### 📊 收入模型

- **订阅收入**: 月度/年度订阅服务
- **按次付费**: 单次报告生成
- **企业授权**: 定制化解决方案
- **API服务**: 第三方集成接口
- **咨询服务**: 专业投资建议

## 📋 版本历史

### v1.3.9 (2024-12-19)
- **手机端UI全面优化**: 针对iPhone等移动设备进行专门的响应式设计优化
- **多语言支持完善**: 所有界面元素都支持中英文双语显示
- **响应式布局升级**: 使用Tailwind CSS的响应式类优化各种屏幕尺寸的显示效果
- **资产配置界面优化**: 核心资产、扩展资产等区域的手机端显示优化
- **智能配置选项优化**: 年龄风险调整、房产策略、债务负担等选项的手机端布局优化
- **偏差分析界面优化**: 配置偏差分析、推荐配置等区域的响应式设计
- **付费服务界面优化**: 投资组合分析服务等付费选项的手机端显示优化

### v1.3.8 (2024-12-19)
- 🚀 **新增**: 完整的降息资产配置博弈工具页面
- ⚠️ **新增**: 降息幅度限制提示（超过600基点警告）
- 📊 **新增**: 高度现代化的分析结果展示界面
- 💰 **新增**: 下载/邮件报告选项和付费解锁高级模式
- 🔓 **新增**: 测试阶段高级模式开放，提升客户付费意愿
- 🎨 **优化**: 品牌形象升级，网站标题改为"World of InvestCraft"
- 🖼️ **新增**: 科技感SVG图标，体现投资组合和金融科技
- 🌐 **优化**: 语言切换按钮改为"简体中文+🇸🇬"，国际化优化
- 📚 **新增**: 完整的角色分工系统文档，明确开发团队职责

### v1.3.5 (2024-12-19)
- 🎨 **优化**: 投资哲学界面UI美化
- 🌈 **新增**: psychological卡片选定背景白色主题
- 🌐 **完善**: 第一页降息资产配置博弈工具语言适配
- 🔧 **修复**: 语言切换器在所有页面正常工作
- 🎯 **优化**: 选定状态背景逻辑统一
- ✨ **改进**: 用户体验和视觉一致性

### v1.3.3 (2024-12-19)
- 🚀 **新增**: 降息资产配置博弈工具
- 🎯 **新增**: 多档位降息情景计算器（25/50/75/100基点）
- 💰 **新增**: 付费解锁自定义模块和高级分析
- 🔍 **新增**: 投资策略+风险等级智能匹配系统
- 📊 **新增**: 实时市场数据API集成
- 🛡️ **新增**: 技术指标和风险评估工具
- 👥 **新增**: 完整付费用户权限管理系统
- ⚡ **优化**: 大数据渲染性能优化
- 🎨 **优化**: 第三页诊断界面逻辑重构
- 🔐 **优化**: 加密资产配置策略（学院派1%、商业实战派5%、心理史学7%）

### v1.3.2 (2024-12-19)
- 🚀 **新增**: Supabase数据库完整集成
- 🗄️ **新增**: 用户管理和投资组合数据持久化
- 🖼️ **新增**: 图片资源自动上传系统
- 🌐 **新增**: 完整Vercel部署流程
- 🔗 **新增**: 域名eclipsever.online解析验证
- 🔧 **新增**: 自动化工作流部署
- 📱 **新增**: 移动端响应式优化

### v1.3.0 (2024-12-19)
- 🚀 **新增**: 商业定价体系与用户分层
- 💰 **新增**: 多层级收费模式设计
- 🎯 **新增**: 目标用户画像与使用场景
- 🔒 **新增**: 功能访问控制机制
- 📊 **新增**: 收入模型规划
- 🎭 **新增**: 角色分工系统和工作流程
- 🎨 **新增**: 三主题系统（DUSK/DAY/DAWN）
- 🎵 **新增**: 人类介入资产入口系统
- 🔤 **新增**: 动态字体注入和主题字体切换
- 🎧 **新增**: 多源音频播放器（HTML5/Spotify/SoundCloud）
- 📁 **新增**: 媒体资源管理系统
- 🔧 **新增**: 媒体资源检查脚本
- 📚 **新增**: 完整的项目规则库

### v1.2.4 (2024-12-19)
- 🎨 **新增**: 三主题系统（DUSK/DAY/DAWN）
- 🎵 **新增**: 人类介入资产入口系统
- 🔤 **新增**: 动态字体注入和主题字体切换
- 🎧 **新增**: 多源音频播放器（HTML5/Spotify/SoundCloud）
- 📁 **新增**: 媒体资源管理系统
- 🔧 **新增**: 媒体资源检查脚本
- 📚 **新增**: 完整的项目规则库
- 🎭 **新增**: 角色分工系统和工作流程

### v1.2.3 (2024-12-19)
- ✨ **新增**: 投资哲学页面集成真实插图
- 🎨 **优化**: 更新图片显示逻辑，使用本地图片资源
- 🖼️ **新增**: 教科书理念、华尔街标准战术、心理史学派三张专业插图
- 🔧 **改进**: 图片路径配置，支持本地图片资源管理

### v1.2.2 (2024-12-19)
- 🎵 **新增**: 投资哲学音乐试听功能
- 🎧 **新增**: 支持 Spotify 嵌入播放器
- 🎼 **新增**: 风险等级音乐配置系统
- 📱 **优化**: 移动端音乐播放体验

### v1.2.1 (2024-12-19)
- 🎯 **新增**: 投资哲学选择页面
- 🧠 **新增**: 三种投资理念（教科书、华尔街、心理史学）
- 🎨 **新增**: 电幻国度风格UI设计
- 📊 **新增**: 风险等级配置建议

**开发者**: @eclipsecybertitan  
**版本**: 1.3.0  
**最后更新**: 2024-12-19 

## 🚀 最新版本 v1.3.9 (2024-12-19)

### ✨ 新功能
- 🎨 **美化Export & Advanced Features界面**: 重新设计导出和高级功能界面
- 🖨️ **优化打印功能**: 支持分页打印，避免内容割裂
- 🏷️ **添加品牌Logo**: 所有报告和打印内容都包含"Powered by eclipsever"
- 📥 **PDF报告下载**: 完整的分析报告下载功能（HTML格式）
- 📧 **EmailJS邮件发送**: 集成EmailJS服务，支持直接发送邮件报告
- 🔐 **SMTP集成**: 使用Namecheap Private Email SMTP服务
- 📧 **邮件模板**: 专业的HTML邮件模板，支持变量替换
- 🌐 **推广裂变界面**: 社交媒体分享功能，支持Twitter、Facebook、Instagram
- 🔗 **链接复制功能**: 一键复制分享链接
- 📱 **响应式设计**: 优化移动端体验

### 🔧 技术改进
- 📄 **打印样式优化**: 添加专门的打印CSS样式
- 📊 **分页支持**: 使用CSS分页控制，确保打印美观
- 🎯 **状态管理**: 完善页面状态流转逻辑
- 🌍 **多语言支持**: 中英文界面完整支持
- 📧 **EmailJS集成**: 完整的邮件发送服务集成
- 🔐 **SMTP配置**: 专业的邮件服务器配置和错误处理
- 📧 **邮件模板系统**: 支持HTML内容的邮件模板

### 📋 功能接口说明

#### PDF下载接口
```typescript
downloadPDFReport(): void
// 功能: 生成并下载分析报告
// 格式: TXT文件（包含完整分析结果）
// 内容: 分析参数、资产影响、策略建议、品牌信息
```

#### EmailJS邮件发送接口
```typescript
sendEmailReport(): Promise<void>
// 功能: 通过EmailJS服务发送邮件报告
// 服务: 集成Namecheap Private Email SMTP
// 模板: 使用专业HTML邮件模板
// 内容: 完整的分析报告HTML内容
// 状态: 实时发送状态显示和错误处理
```

#### 社交媒体分享接口
```typescript
shareToSocial(platform: 'twitter' | 'facebook' | 'instagram'): void
// 功能: 分享到指定社交媒体平台
// 支持: Twitter、Facebook、Instagram
// 内容: 预设分享文案 + 当前页面链接
```

#### 链接复制接口
```typescript
copyLink(): Promise<void>
// 功能: 复制当前页面链接到剪贴板
// 降级: 支持现代浏览器和旧版浏览器
// 反馈: 复制成功提示
```

### 🎯 推广裂变机制
- **免费解锁**: 分享工具即可免费解锁高级功能
- **社交传播**: 支持主流社交媒体平台分享
- **病毒传播**: 通过用户分享实现产品推广
- **品牌曝光**: 所有分享内容都包含"Powered by eclipsever"

### 📧 邮件服务配置详情

#### EmailJS服务配置
- **Service ID**: `service_4wadqb5`
- **Template ID**: `template_fp1z1fl`
- **User ID**: `q0sJaN7orl4-csdon`

#### SMTP服务器配置
- **Host**: `mail.privateemail.com`
- **Port**: `587`
- **Security**: STARTTLS（不勾选SSL）
- **Authentication**: App Password
- **From Email**: `noreply@eclipsever.online`

#### 邮件模板变量
- `{{to_email}}`: 收件人邮箱地址
- `{{subject}}`: 邮件主题
- `{{message}}`: 邮件正文内容
- `{{report_html}}`: 完整的HTML报告内容
- `{{from_name}}`: 发件人名称

#### 邮件发送流程
1. 用户点击"Email Report"按钮
2. 弹出收件人邮箱输入模态框
3. 用户输入收件人邮箱地址
4. 系统调用EmailJS服务发送邮件
5. 实时显示发送状态和进度
6. 发送完成后显示成功提示

### 🖨️ 打印功能特性
- **分页支持**: 自动分页，避免内容割裂
- **品牌Logo**: 每页都包含"Powered by eclipsever"
- **专业格式**: 适合A4纸张打印
- **内容完整**: 包含所有分析结果和建议

---

## 📚 历史版本
