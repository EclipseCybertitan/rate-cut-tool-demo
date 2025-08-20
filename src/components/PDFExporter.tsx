/**
 * PDF导出功能组件
 * 支持投资报告和模拟结果的PDF导出
 * @author @eclipsecybertitan
 */

import { useState } from 'react'
import { DocumentArrowDownIcon, DocumentTextIcon, ChartBarIcon, CogIcon } from '@heroicons/react/24/outline'
import { UserType, canUserExportPDF } from '../types/user'
import FeatureGate from './FeatureGate'

interface PDFExporterProps {
  userType: UserType
  reportData: any
  reportType: 'simulation' | 'analysis' | 'portfolio' | 'custom'
  onExport?: (pdfBlob: Blob) => void
}

interface ExportOptions {
  includeCharts: boolean
  includeTables: boolean
  includeSummary: boolean
  includeRecommendations: boolean
  format: 'A4' | 'Letter'
  orientation: 'portrait' | 'landscape'
  watermark: boolean
}

export default function PDFExporter({ 
  userType, 
  reportData, 
  reportType, 
  onExport 
}: PDFExporterProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    includeCharts: true,
    includeTables: true,
    includeSummary: true,
    includeRecommendations: true,
    format: 'A4',
    orientation: 'portrait',
    watermark: false
  })

  const handleExport = async () => {
    if (!canUserExportPDF(userType)) {
      return
    }

    setIsExporting(true)
    
    try {
      // 模拟PDF生成过程
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // 创建模拟PDF Blob
      const pdfContent = generatePDFContent(reportData, reportType, exportOptions)
      const pdfBlob = new Blob([pdfContent], { type: 'application/pdf' })
      
      onExport?.(pdfBlob)
      
      // 自动下载
      downloadPDF(pdfBlob, `investment_report_${reportType}_${new Date().toISOString().split('T')[0]}.pdf`)
      
    } catch (error) {
      console.error('PDF导出失败:', error)
    } finally {
      setIsExporting(false)
    }
  }

  const generatePDFContent = (_data: any, type: string, options: ExportOptions): string => {
    // 这里应该使用真实的PDF生成库，如jsPDF或react-pdf
    // 目前返回模拟内容
    return `PDF Content for ${type} report with options: ${JSON.stringify(options)}`
  }

  const downloadPDF = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const getReportTitle = () => {
    switch (reportType) {
      case 'simulation':
        return '投资模拟报告'
      case 'analysis':
        return '资产配置分析报告'
      case 'portfolio':
        return '投资组合评估报告'
      case 'custom':
        return '自定义投资报告'
      default:
        return '投资报告'
    }
  }

  const getReportIcon = () => {
    switch (reportType) {
      case 'simulation':
        return <ChartBarIcon className="w-6 h-6 text-blue-500" />
      case 'analysis':
        return <DocumentTextIcon className="w-6 h-6 text-green-500" />
      case 'portfolio':
        return <CogIcon className="w-6 h-6 text-purple-500" />
      case 'custom':
        return <DocumentTextIcon className="w-6 h-6 text-orange-500" />
      default:
        return <DocumentTextIcon className="w-6 h-6 text-gray-500" />
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          {getReportIcon()}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {getReportTitle()}
            </h3>
            <p className="text-sm text-gray-600">
              生成专业的PDF投资报告
            </p>
          </div>
        </div>
        
        <FeatureGate feature="pdf_export" userType={userType}>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            <DocumentArrowDownIcon className="w-5 h-5" />
            <span>{isExporting ? '生成中...' : '导出PDF'}</span>
          </button>
        </FeatureGate>
      </div>

      {/* 导出选项 */}
      <FeatureGate feature="pdf_export" userType={userType}>
        <div className="border-t pt-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">导出选项</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 内容选项 */}
            <div className="space-y-3">
              <h5 className="text-sm font-medium text-gray-700">内容选择</h5>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={exportOptions.includeCharts}
                  onChange={(e) => setExportOptions(prev => ({ ...prev, includeCharts: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">包含图表</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={exportOptions.includeTables}
                  onChange={(e) => setExportOptions(prev => ({ ...prev, includeTables: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">包含数据表格</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={exportOptions.includeSummary}
                  onChange={(e) => setExportOptions(prev => ({ ...prev, includeSummary: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">包含执行摘要</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={exportOptions.includeRecommendations}
                  onChange={(e) => setExportOptions(prev => ({ ...prev, includeRecommendations: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">包含投资建议</span>
              </label>
            </div>

            {/* 格式选项 */}
            <div className="space-y-3">
              <h5 className="text-sm font-medium text-gray-700">格式设置</h5>
              
              <div>
                <label className="block text-sm text-gray-700 mb-1">页面格式</label>
                <select
                  value={exportOptions.format}
                  onChange={(e) => setExportOptions(prev => ({ ...prev, format: e.target.value as 'A4' | 'Letter' }))}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="A4">A4</option>
                  <option value="Letter">Letter</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 mb-1">页面方向</label>
                <select
                  value={exportOptions.orientation}
                  onChange={(e) => setExportOptions(prev => ({ ...prev, orientation: e.target.value as 'portrait' | 'landscape' }))}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="portrait">纵向</option>
                  <option value="landscape">横向</option>
                </select>
              </div>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={exportOptions.watermark}
                  onChange={(e) => setExportOptions(prev => ({ ...prev, watermark: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">添加水印</span>
              </label>
            </div>
          </div>
        </div>
      </FeatureGate>

      {/* 报告预览 */}
      <div className="border-t pt-6 mt-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">报告预览</h4>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <DocumentTextIcon className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">报告内容概览</span>
          </div>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div>• 报告类型: {getReportTitle()}</div>
            <div>• 生成时间: {new Date().toLocaleString('zh-CN')}</div>
            <div>• 包含图表: {exportOptions.includeCharts ? '是' : '否'}</div>
            <div>• 包含表格: {exportOptions.includeTables ? '是' : '否'}</div>
            <div>• 页面格式: {exportOptions.format} {exportOptions.orientation}</div>
            <div>• 水印: {exportOptions.watermark ? '是' : '否'}</div>
          </div>
        </div>
      </div>

      {/* 使用说明 */}
      <div className="border-t pt-6 mt-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">使用说明</h4>
        
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-sm text-blue-800 space-y-2">
            <div>• PDF报告将自动下载到您的设备</div>
            <div>• 报告包含专业的投资分析和建议</div>
            <div>• 可根据需要调整导出选项</div>
            <div>• 支持多种页面格式和方向</div>
          </div>
        </div>
      </div>
    </div>
  )
}
