import { ConfigProvider, Table } from "antd";

export default function WarningTable({
  warningData,
}: {
  warningData: Array<any>
}) {
  const columns = [
    {
      key: "1",
      title: "时间",
      render: (value: any, index: any) => <span>{value.time}</span>,
      className: "thead-change",
    },
    {
      key: "2",
      title: "基站名称",
      render: (value: any, index: any) => <span>{value.baseStationName}</span>,
      className: "thead-change",
    },
    // {
    //   key: "3",
    //   title: "设备地址",
    //   render: (value: any, index: any) => <span>{value.deviceAddress}</span>,
    //   className: "thead-change",
    // },
    {
      key: "3",
      title: "告警原因",
      render: (value: any, index: any) => <span>{value.alarmReason}</span>,
      className: "thead-change",
    },
  ];
  const data = warningData.map((item: any, index: number) => {
    return {
      key: index,
      time: item["alarmTime"],
      baseStationName: item["baseStation"],
      alarmReason: item["reason"],
    }
  });
  return (
    // <ConfigProvider theme={{
    //   components: {
    //     Table: {
    //       headerBg: "transparent",
    //       headerBorderRadius: 0
    //     }
    //   }
    // }}>

    // <Table
    //   columns={columns}
    //   dataSource={data}
    //   pagination={false}
    //   onRow={(record) => {
    //     return {
    //       onClick: () => {
    //         window.open( "https://mp.usr.cn/#/cloud/data/ViewVariableAlarmHistory");
    //       },
    //     };
    //   }}
    //   // rowClassName={(record, index) => {

    //   // }}
    // />
    // </ConfigProvider>
    <table className="ml-9 border-separate border-spacing-x-0 border-spacing-y-1">
      <thead className="text-left">
        <tr>
          {columns.map((item: any) => {
            return <th key={item.key}>{item.title}</th>;
          })}
        </tr>
      </thead>
      <tbody className="text-left">
        {data.map((itemData: any) => {
          return (
            <tr key={itemData.key} className="bg-[linear-gradient(90deg,_#000c1b2b_0%,_#00398107_100%)] h-[36px]">
              {columns.map((item: any) => {
                return <td key={item.key}>{item.render(data[0])}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
