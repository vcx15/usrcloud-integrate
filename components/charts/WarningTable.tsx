import { Table } from "antd";

export default function WarningTable() {
  const columns = [
    {
      title: "时间",
      render: (value: any, index: any) => <span>{value.time}</span>,
    },
    {
      title: "基站名称",
      render: (value: any, index: any) => <span>{value.baseStationName}</span>,
    },
    {
      title: "设备地址",
      render: (value: any, index: any) => <span>{value.deviceAddress}</span>,
    },
    {
      title: "告警原因",
      render: (value: any, index: any) => <span>{value.alarmReason}</span>,
    },
  ];
  const data = [
    {
      key: "1",
      time: "2022-01-01 12:00:00",
      baseStationName: "基站1",
      deviceAddress: "合肥蜀山区",
      alarmReason: "电流超限",
    },
    {
      key: "2",
      time: "2022-01-01 12:00:00",
      baseStationName: "基站1",
      deviceAddress: "合肥蜀山区",
      alarmReason: "电流超限",
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      onRow={(record) => {
        return {
          onClick: () => {
            window.open( "https://mp.usr.cn/#/cloud/data/ViewVariableAlarmHistory");
          },
        };
      }}
    />
  );
}
