import Chart from "./Chart";

export default function RingPieChart() {
  const options = {
    title: {
      text: "xxxx",
      subtext: "xxxxxxxxsub",
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
        name: "Access From",
        type: "pie",
        radius: ["70%", "90%"],
        bottom: "30%",
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
      },
    ],
  };
  return <Chart options={options}></Chart>;
}
