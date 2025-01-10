import Chart from "./Chart";

export default function AreaChart() {
  const options = {
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(237,66,100, 0.5)", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(234,174,10, 1)", // 100% 处的颜色
              },
            ],
            global: false,
          },
        },
      },
    ],
  };

  return <Chart options={options}></Chart>;
}
