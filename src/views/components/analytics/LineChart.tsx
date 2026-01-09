'use client'

import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

/**
 * Line Chart Component
 * 
 * Componente de gráfico de linha usando Recharts
 */

interface LineChartData {
  date: string | Date
  count: number
  [key: string]: string | Date | number
}

interface LineChartProps {
  data: LineChartData[]
  dataKey: string
  title?: string
  color?: string
  height?: number
}

export function LineChart({ data, dataKey, title, color = '#10b981', height = 300 }: LineChartProps) {
  // Formatar datas para exibição
  const formattedData = data.map((item) => {
    let dateStr = ''
    if (typeof item.date === 'string') {
      try {
        const date = new Date(item.date)
        dateStr = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
      } catch {
        dateStr = item.date
      }
    } else if (item.date instanceof Date) {
      dateStr = item.date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
    } else {
      dateStr = String(item.date)
    }
    
    return {
      ...item,
      date: dateStr,
    }
  })

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-lg font-semibold text-light-50 mb-4">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="date" 
            stroke="#9ca3af"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#9ca3af"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1f2937', 
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#f3f4f6',
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey={dataKey} 
            stroke={color} 
            strokeWidth={2}
            dot={{ fill: color, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  )
}
