import Chart from "./Chart";

export default function RingPieChart({total, data}: {total: number, data: Array<any>}) {
  const options = {
    title: {
      text: `${total} Kw·h`,
      subtext: "总电能",
      subtextStyle: {
        color: "#333333FF"
      },
      bottom: "10%",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        name: "运营商总电能",
        type: "pie",
        radius: ["70%", "90%"],
        bottom: "30%",
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        // emphasis: {
        //   label: {
        //     show: true,
        //     fontSize: 40,
        //     fontWeight: "bold",
        //   },
        // },
        labelLine: {
          show: false,
        },
        data: data,
      },
    ],
  };
  return <Chart options={options}></Chart>;
}
