import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import { Card } from '../layout'
import { CustomTooltip } from '../components/CustomTooltip'
import type { WeekData } from '../types'

interface SightingsChartProps {
  weekData: WeekData[]
  weeks: string[]
  currentWeekIndex: number
}

export function SightingsChart({
  weekData,
  weeks,
  currentWeekIndex,
}: SightingsChartProps) {
  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={weekData}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="day"
            stroke="#cbd5e1"
            className="text-sm font-medium"
            tick={{ fill: '#cbd5e1', fontSize: 14, fontWeight: 500 }}
            axisLine={{ stroke: '#475569' }}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            stroke="#cbd5e1"
            className="text-sm font-medium"
            tick={{ fill: '#cbd5e1', fontSize: 14, fontWeight: 500 }}
            axisLine={{ stroke: '#475569' }}
            tickLine={false}
          />
          <Tooltip
            content={
              <CustomTooltip
                weeks={weeks}
                currentWeekIndex={currentWeekIndex}
              />
            }
            cursor={{ fill: '#334155', opacity: 0.2 }}
          />
          <Bar
            dataKey="sightings"
            fill="#38bdf8"
            radius={[6, 6, 0, 0]} // Slightly rounded
            className="shadow-md"
            maxBarSize={48}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
