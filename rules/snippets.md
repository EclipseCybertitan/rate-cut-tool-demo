# 常用提示词集

## 生成首页
请在 /src/app/page.tsx 实现首页：
- 标题 FOUNDATION
- 三个选项卡（DUSK/ DAY/ DAWN）
- 点击切换主题 setTheme('dusk'|'day'|'dawn')

## 增加卡组
请在 /src/components/Card.tsx 增加卡牌组件：
- 支持资产类型（房产/股票/基金/保险/加密）
- 样式由主题变量驱动

## 创建API路由
请在 /src/api/ 目录创建新的API端点：
- 使用标准响应格式 ApiResponse<T>
- 包含完整的错误处理
- 添加TypeScript类型定义

## 添加新组件
请在 /src/components/ 创建新组件：
- 使用标准组件模板
- 包含完整的Props接口
- 支持主题切换
- 添加开发者签名

## 数据库操作
请在 /src/lib/database.ts 添加数据库操作：
- 使用Prisma ORM
- 包含事务处理
- 添加错误日志记录

## 主题切换组件
请在 /src/components/ThemeSwitcher.tsx 创建主题切换器：
- 支持DUSK/DAY/DAWN三种主题
- 使用CSS变量切换样式
- 保存用户主题偏好到localStorage

## 资产配置表单
请在 /src/components/AssetForm.tsx 创建资产配置表单：
- 支持六种资产类型输入
- 实时计算总资产和比例
- 表单验证和错误提示
- 响应式设计

## 投资建议生成器
请在 /src/components/InvestmentAdvisor.tsx 创建AI投资建议：
- 基于用户资产配置生成建议
- 支持多种投资理念
- 包含风险等级评估
- 可导出PDF报告
