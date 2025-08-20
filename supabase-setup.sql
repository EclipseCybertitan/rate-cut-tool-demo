-- Supabase 数据库设置脚本
-- 在 Supabase 控制台的 SQL Editor 中运行此脚本

-- 1. 创建 portfolios 表
CREATE TABLE IF NOT EXISTS portfolios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  config JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 创建 users 表
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 创建 updated_at 触发器函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 4. 为 portfolios 表添加 updated_at 触发器
CREATE TRIGGER update_portfolios_updated_at 
    BEFORE UPDATE ON portfolios 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 5. 为 users 表添加 updated_at 触发器
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 6. 启用 Row Level Security (RLS)
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- 7. 创建 portfolios 表的 RLS 策略
-- 用户只能访问自己的投资组合
CREATE POLICY "Users can only access their own portfolios"
ON portfolios FOR ALL
USING (auth.uid()::text = user_id::text);

-- 8. 创建 users 表的 RLS 策略
-- 用户只能访问自己的信息
CREATE POLICY "Users can only access their own user data"
ON users FOR ALL
USING (auth.uid()::text = id::text);

-- 9. 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_portfolios_user_id ON portfolios(user_id);
CREATE INDEX IF NOT EXISTS idx_portfolios_created_at ON portfolios(created_at);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- 10. 添加注释
COMMENT ON TABLE portfolios IS '用户投资组合配置表';
COMMENT ON TABLE users IS '用户信息表';
COMMENT ON COLUMN portfolios.config IS '投资组合配置JSON数据';
COMMENT ON COLUMN portfolios.user_id IS '关联用户ID';

-- 11. 验证表结构
SELECT 
    table_name, 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name IN ('portfolios', 'users')
ORDER BY table_name, ordinal_position;

-- 12. 验证 RLS 状态
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE tablename IN ('portfolios', 'users');
