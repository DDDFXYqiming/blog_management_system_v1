// 柱状图组件
import * as echarts from "echarts";
import { useEffect, useRef } from "react";
// 可变部分抽象成prop参数
const BarChart = ({title}) => {
  const chartRef = useRef(null);
  
  useEffect(() => {
    // 保证dom可用 才进行图表的渲染
    // 获取要渲图表的dom结点
    const chartDom = chartRef.current;
    // 图标初始化生成图表实例对象
    const myChart = echarts.init(chartDom);
    // 准备图标参数
    const option = {
      title: {
        text: title,
      },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150],
          type: "bar",
        },
      ],
    };

    // 使用图标参数 完成图标渲染
    option && myChart.setOption(option);
  }, []);
  return <div id="chart" ref={chartRef}></div>;
};

export default BarChart;
