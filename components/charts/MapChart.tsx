import { registerMap } from "echarts";
import { useEffect, useState } from "react";
// import geoJson from "@/public/map/cn.json"
import { GeoJSONSourceInput } from "echarts/types/src/coord/geo/geoTypes.js";
import Chart from "./Chart";

export default function MapChart({ adcode, projectId }: { adcode: string; projectId?: string }) {
  const [geoJson, setGeoJson] = useState<any>();
  const [options, setOptions] = useState<any>({});

  const mapName = adcode === "100000" ? "china" : "map" + adcode;

  useEffect(() => {
    fetch(`/api/map/${adcode}`, {
      method: "GET",
    })
      .then(async (res) => {
        const jsonResult = await res.json();
        registerMap(mapName, jsonResult as GeoJSONSourceInput);
        // setGeoJson(jsonResult)
      })
      .finally(() => {
        setOptions({
          // title: {
          //   text: "Population Density of Hong Kong （2011）",
          //   subtext: "Data from Wikipedia",
          //   sublink:
          //     "http://zh.wikipedia.org/wiki/%E9%A6%99%E6%B8%AF%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83#cite_note-12",
          // },
          tooltip: {
            trigger: "item",
            formatter: "{b}<br/>设备数量：{c}",
          },
          geo: {
            map: mapName,
            itemStyle: {
              normal: {
                shadowColor: "rgba(0, 0, 0, 0.5)", // 阴影颜色
                // shadowBlur: 10, // 阴影模糊度
                shadowOffsetY: 10,
              },
            },
          },
          series: [
            {
              name: "香港18区人口密度",
              type: "map",
              map: mapName,
              label: {
                show: true,
              },

              // data: (geoJson["features"] as Array<any>).filter(() => {

              // })

              data: [
                {
                  name: "湖北省", value: 20057.34,
                  itemStyle: {
                    areaColor: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                        offset: 0, color: '#73B1FFFF' // 0% 处的颜色
                      }, {
                        offset: 1, color: '#2E8BFFFF' // 100% 处的颜色
                      }],
                      global: false // 缺省为 false
                    },
                  },
                },
                {
                  name: "湖南省", value: 15477.48, itemStyle: {
                    areaColor: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                        offset: 0, color: '#73B1FFFF' // 0% 处的颜色
                      }, {
                        offset: 1, color: '#2E8BFFFF' // 100% 处的颜色
                      }],
                      global: false // 缺省为 false
                    },
                  },
                },
                {
                  name: "福建省", value: 31686.1, itemStyle: {
                    areaColor: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                        offset: 0, color: '#73B1FFFF' // 0% 处的颜色
                      }, {
                        offset: 1, color: '#2E8BFFFF' // 100% 处的颜色
                      }],
                      global: false // 缺省为 false
                    },
                  },
                },
              ],
              // 自定义名称映射
              // nameMap: {
              //   "Central and Western": "中西区",
              //   Eastern: "东区",
              //   Islands: "离岛",
              //   "Kowloon City": "九龙城",
              //   "Kwai Tsing": "葵青",
              //   "Kwun Tong": "观塘",
              //   North: "北区",
              //   "Sai Kung": "西贡",
              //   "Sha Tin": "沙田",
              //   "Sham Shui Po": "深水埗",
              //   Southern: "南区",
              //   "Tai Po": "大埔",
              //   "Tsuen Wan": "荃湾",
              //   "Tuen Mun": "屯门",
              //   "Wan Chai": "湾仔",
              //   "Wong Tai Sin": "黄大仙",
              //   "Yau Tsim Mong": "油尖旺",
              //   "Yuen Long": "元朗",
              // },
            },
          ],
        });
      });
  }, [adcode]);

  return <Chart options={options} id={adcode}></Chart>;
}
