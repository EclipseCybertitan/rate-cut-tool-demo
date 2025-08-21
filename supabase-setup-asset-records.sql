-- 创建资产数据记录表
CREATE TABLE IF NOT EXISTS asset_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL,
  user_id UUID,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  total_assets DECIMAL(15,2) NOT NULL,
  asset_allocation JSONB NOT NULL,
  selected_methodology TEXT NOT NULL,
  selected_risk_level TEXT NOT NULL,
  user_agent TEXT,
  language TEXT NOT NULL,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_asset_records_session_id ON asset_records(session_id);
CREATE INDEX IF NOT EXISTS idx_asset_records_user_id ON asset_records(user_id);
CREATE INDEX IF NOT EXISTS idx_asset_records_timestamp ON asset_records(timestamp);
CREATE INDEX IF NOT EXISTS idx_asset_records_language ON asset_records(language);

-- 启用行级安全策略
ALTER TABLE asset_records ENABLE ROW LEVEL SECURITY;

-- 创建策略：允许匿名用户插入数据（用于未登录用户）
CREATE POLICY "Allow anonymous insert" ON asset_records
  FOR INSERT WITH CHECK (true);

-- 创建策略：允许用户查看自己的数据
CREATE POLICY "Users can view own records" ON asset_records
  FOR SELECT USING (
    user_id IS NULL OR 
    user_id::text = auth.uid()::text
  );

-- 创建策略：允许用户更新自己的数据
CREATE POLICY "Users can update own records" ON asset_records
  FOR UPDATE USING (
    user_id IS NULL OR 
    user_id::text = auth.uid()::text
  );

-- 创建策略：允许用户删除自己的数据
CREATE POLICY "Users can delete own records" ON asset_records
  FOR DELETE USING (
    user_id IS NULL OR 
    user_id::text = auth.uid()::text
  );

-- 创建更新时间触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_asset_records_updated_at 
    BEFORE UPDATE ON asset_records 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 添加注释
COMMENT ON TABLE asset_records IS '用户资产配置数据记录表';
COMMENT ON COLUMN asset_records.session_id IS '会话ID，用于匿名用户识别';
COMMENT ON COLUMN asset_records.user_id IS '用户ID，登录后关联';
COMMENT ON COLUMN asset_records.total_assets IS '总资产金额';
COMMENT ON COLUMN asset_records.asset_allocation IS '资产配置详情（JSON格式）';
COMMENT ON COLUMN asset_records.selected_methodology IS '选择的投资哲学';
COMMENT ON COLUMN asset_records.selected_risk_level IS '选择的风险等级';
COMMENT ON COLUMN asset_records.language IS '界面语言';
