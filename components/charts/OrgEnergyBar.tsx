import Chart from "./Chart";

export default function OrgEnergyBar({
  categories,
  data,
  type,
}: {
  categories: Array<string>;
  data: Array<number>;
  type: string;
}) {
  const options = {
    xAxis: {
      type: "category",
      data: categories,
      // boundaryGap: false // 确保柱子居中
    },
    yAxis: {
      type: "value",
    },
    series: [
      // {
      //   data: [200, 200, 200, 200, 200, 200, 200],
      //   type: "bar",
      //   symbol: "rect",
      //   barWidth: "60%", // 设置柱体宽度
      //   itemStyle: {
      //     // borderRadius: [16, 16, 0, 0], // 设置柱体上方为圆角
      //     color: "#000C1B24", // 设置柱体颜色
      //   },
      //   z: -1, // 设置柱体层级，使得背景在柱体下方
      // },

      {
        data: Array(8).fill(Math.max(...data)),
        type: "bar",
        symbol: "rect",
        barWidth: "60%", // 设置柱体宽度
        itemStyle: {
          // borderRadius: [16, 16, 0, 0], // 设置柱体上方为圆角
          color: "#000C1B24", // 设置柱体颜色
        },
        // barGap: "-100%",
        z: -1, // 设置柱体层级，使得背景在柱体下方
      },

      {
        data: data,
        type: "pictorialBar",
        symbol: "rect",
        symbolRepeat: true,
        symbolSize: ["100%", 3],
        symbolMargin: "35%",
        symbolClip: true,
        symbolRepeatDirection: "start",
        barWidth: "20%", // 设置柱体宽度
        itemStyle: {
          // borderRadius: [16, 16, 0, 0], // 设置柱体上方为圆角
          color: "#5676FCAF", // 设置柱体颜色
        },
        z: 10, // 设置柱体层级，使得背景在柱体下方
      },
    ],
  };

  return <Chart options={options} id={type}></Chart>;
}
