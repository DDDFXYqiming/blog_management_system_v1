import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

interface BarChartProps {
  title: string
}

/** 阅读量柱状图组件 */
const BarChart = ({ title }: BarChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const chartDom = chartRef.current
    if (!chartDom) return
    const myChart = echarts.init(chartDom)
    myChart.setOption({
      title: { text: title },
      xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed'] },
      yAxis: { type: 'value' },
      series: [{ data: [120, 200, 150], type: 'bar' }],
    })
    return () => {
      myChart.dispose()
    }
  }, [title])

  return <div ref={chartRef} style={{ width: '100%', height: 200 }} />
}

export default BarChart
