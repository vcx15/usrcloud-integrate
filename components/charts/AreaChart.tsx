import Chart from "./Chart";

export default function AreaChart() {
  const options = {
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [2.75, 2.39, 4.71, 5.67, 5.35, 5.79, 5.05, 4.87],
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
                color: "#2E8BFFFF", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#2E8BFF00", // 100% 处的颜色
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
