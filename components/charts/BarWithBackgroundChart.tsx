import Chart from "./Chart";

export default function BarWithBackgroundChart() {
  const options = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [200, 200, 200, 200, 200, 200, 200],
        type: "pictorialBar",
        symbol: "rect",
        barWidth: "60%", // 设置柱体宽度
        itemStyle: {
          color: "#000C1B24", // 设置柱体颜色
        },
        z: -1, // 设置柱体层级，使得背景在柱体下方
      },
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar",
        barWidth: "20%", // 设置柱体宽度
        itemStyle: {
          borderRadius: [16, 16, 0, 0], // 设置柱体上方为圆角
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0, color: '#36C2FDFF' // 0% 处的颜色
            }, {
                offset: 1, color: '#36C2FD00' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }, // 设置柱体颜色
        },
        barGap: "-100%",
        stack: "total",
      },
    ],
  };

  return <Chart options={options}></Chart>;
}
