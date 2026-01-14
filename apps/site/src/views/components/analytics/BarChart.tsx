'use client'

import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { FONT_SIZE, SPACE } from '@decyphra/tokens'

/**
 * Bar Chart Component
 * 
 * Componente de gráfico de barras usando Recharts
 */

interface BarChartData {
  name: string
  count: number
  [key: string]: string | number
}

interface BarChartProps {
  data: BarChartData[]
  dataKey?: string
  title?: string
  color?: string
  height?: number
}

export function BarChart({ data, dataKey = 'count', title, color = '#10b981', height = 300 }: BarChartProps) {
  return (
    <div className="w-full">
      {title && (
        <h3 className="text-lg font-semibold text-light-50 mb-4">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="name" 
            stroke="#9ca3af"
            style={{ fontSize: FONT_SIZE.sm }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            stroke="#9ca3af"
            style={{ fontSize: FONT_SIZE.sm }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1f2937', 
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#f3f4f6',
              padding: SPACE.sm,
            }}
          />
          <Legend />
          <Bar 
            dataKey={dataKey} 
            fill={color}
            radius={[4, 4, 0, 0]}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}
