# Supabase 集成指南

## 🚀 快速开始

### 1. 环境变量配置

在项目根目录创建 `.env.local` 文件：

```bash
NEXT_PUBLIC_SUPABASE_URL=https://ydyixpbltpvvjddpnwji.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkeWl4cGJsdHB2dmpkZHBud2ppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2NjQ5NjAsImV4cCI6MjA3MTI0MDk2MH0.PGLLMhGN7266E35kb4GL_-MMDsZUXK2p4Fmx4rh8Hn0
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkeWl4cGJsdHB2dmpkZHBud2ppIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTY2NDk2MCwiZXhwIjoyMDcxMjQwOTYwfQ.g6fAlqx7YQnINSdBtAM6fwMudOI1gByHDG2H2K53Vcw
```

### 2. 安装依赖

```bash
npm install
```

### 3. 数据库设置

在 Supabase 控制台的 SQL Editor 中运行 `supabase-setup.sql` 脚本：

```sql
-- 创建表结构
CREATE TABLE portfolios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  config JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 启用 RLS
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- 创建策略
CREATE POLICY "Users can only access their own portfolios"
ON portfolios FOR ALL
USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can only access their own user data"
ON users FOR ALL
USING (auth.uid()::text = id::text);
```

## 📁 文件结构

```
src/
├── lib/
│   └── supabase.ts          # Supabase 客户端配置
├── pages/
│   └── api/
│       ├── portfolio.ts     # 投资组合 API
│       └── users.ts         # 用户管理 API
├── hooks/
│   ├── usePortfolios.ts     # 投资组合数据管理
│   └── useUsers.ts          # 用户数据管理
└── components/
    └── PortfolioManager.tsx # 投资组合管理组件
```

## 🔧 API 接口

### 投资组合管理

- `GET /api/portfolio?userId={id}` - 获取用户投资组合
- `POST /api/portfolio` - 创建新投资组合
- `PUT /api/portfolio` - 更新投资组合
- `DELETE /api/portfolio?id={id}` - 删除投资组合

### 用户管理

- `GET /api/users?email={email}` - 获取用户信息
- `POST /api/users` - 创建或获取用户

## 🎯 使用示例

### 基本用法

```tsx
import { usePortfolios } from '../hooks/usePortfolios'
import { useUser } from '../hooks/useUsers'

function MyComponent() {
  const { user } = useUser('user@example.com')
  const { portfolios, isLoading } = usePortfolios(user?.id || '')
  
  if (isLoading) return <div>加载中...</div>
  
  return (
    <div>
      {portfolios.map(portfolio => (
        <div key={portfolio.id}>
          {JSON.stringify(portfolio.config)}
        </div>
      ))}
    </div>
  )
}
```

### 创建投资组合

```tsx
import { createPortfolio } from '../hooks/usePortfolios'

const handleCreate = async () => {
  try {
    await createPortfolio(userId, {
      name: '我的投资组合',
      realEstate: 30,
      equity: 50,
      cash: 20
    })
  } catch (error) {
    console.error('创建失败:', error)
  }
}
```

## 🔒 安全特性

- **Row Level Security (RLS)**: 用户只能访问自己的数据
- **环境变量**: 敏感信息通过环境变量管理
- **类型安全**: 完整的 TypeScript 类型定义
- **错误处理**: 统一的错误处理和响应格式

## 🚨 注意事项

1. **环境变量**: 确保 `.env.local` 文件存在且包含正确的 Supabase 配置
2. **数据库权限**: 在 Supabase 中正确设置 RLS 策略
3. **CORS**: 确保 Supabase 项目允许您的域名访问
4. **API 限制**: 注意 Supabase 的 API 调用限制

## 🔍 故障排除

### 常见问题

1. **连接失败**: 检查环境变量和网络连接
2. **权限错误**: 确认 RLS 策略配置正确
3. **类型错误**: 确保 TypeScript 类型定义完整

### 调试技巧

```tsx
// 启用 Supabase 调试日志
const supabase = createClient(url, key, {
  auth: {
    debug: true
  }
})

// 检查 API 响应
console.log('API Response:', data)
console.log('API Error:', error)
```

## 📚 相关资源

- [Supabase 官方文档](https://supabase.com/docs)
- [SWR 数据获取](https://swr.vercel.app/)
- [Next.js API 路由](https://nextjs.org/docs/api-routes/introduction)
