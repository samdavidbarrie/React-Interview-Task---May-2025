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
import { CHART_RESPONSIVE } from '../responsive'
import { useIsMobile } from '../hooks/useIsMobile'

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
  const isMobile = useIsMobile()
  // Ensure tuple for barRadius
  const barRadius: [number, number, number, number] = isMobile
    ? [...CHART_RESPONSIVE.barRadius.mobile] as [number, number, number, number]
    : [...CHART_RESPONSIVE.barRadius.desktop] as [number, number, number, number]
  // AnimationTiming type for animationEasing
  const animationDuration = isMobile
    ? CHART_RESPONSIVE.animationDuration.mobile
    : CHART_RESPONSIVE.animationDuration.desktop
  const animationEasing: 'ease' | 'ease-in' | 'ease-out' | 'linear' = isMobile
    ? 'linear'
    : 'ease-out'
  const yAxisTicks = isMobile
    ? CHART_RESPONSIVE.yAxisTicks.mobile
    : CHART_RESPONSIVE.yAxisTicks.desktop
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
            tickCount={yAxisTicks}
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
            radius={barRadius}
            className="shadow-md"
            maxBarSize={48}
            isAnimationActive={true}
            animationDuration={animationDuration}
            animationEasing={animationEasing}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
