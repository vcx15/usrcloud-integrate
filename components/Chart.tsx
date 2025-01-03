import { Ref, useEffect, useRef } from "react";
import * as echarts from "echarts/core";

import { MapChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  ToolboxComponent,
  VisualMapComponent,
  GeoComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

// // 注册必须的组件
echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent,
  GeoComponent,
  MapChart,
  CanvasRenderer,
]);

type Prop = {
  onChartClick?: () => boolean | void;
  options: echarts.EChartsCoreOption;
};

function Chart({ options }: Prop) {
  const chartRef = useRef<HTMLDivElement>(null);
  let chartInstance: echarts.ECharts;

  // 定义渲染函数
  function renderChart() {
    try {
      // `echarts.getInstanceByDom` 可以从已经渲染成功的图表中获取实例，其目的就是在 options 发生改变的时候，不需要
      // 重新创建图表，而是复用该图表实例，提升性能
      const renderedInstance = echarts.getInstanceByDom(
        chartRef.current as HTMLElement
      );
      if (renderedInstance) {
        chartInstance = renderedInstance;
      } else {
        chartInstance = echarts.init(chartRef.current as HTMLElement);
      }
      chartInstance.setOption(options, false);
      // chartInstance.on('click', onChartClick)
    } catch (error) {
      console.error("error", error);
      if (chartInstance) {
        chartInstance.dispose();
      }
    }
  }

  // 定义窗口大小发生改变执行的回调函数
  function resizeHandler() {
    chartInstance.resize();
  }

  // 页面初始化时，开始渲染图表
  useEffect(() => {
    renderChart();
    // onChartRef(chartRef)

    return () => {
      // 销毁图表实例，释放内存
      if (chartInstance) {
        chartInstance.dispose();
      }
    };
    // eslint-disable-next-line
  }, [options]);

  // 监听窗口大小改变
  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
    // eslint-disable-next-line
  }, []);

  return (
    <div
      style={{ height: "100%", width: "100%" }}
      ref={chartRef as Ref<HTMLDivElement>}
    />
  );
}

export default Chart;
