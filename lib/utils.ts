export default function getAdcodeByProjectId(projectId: string) {
  switch (projectId) {
    case "323324":
      return "100000"; // 中国
    case "366973":
      return "430000"; // 湖南
    case "365786":
      return "350000"; // 福建
    case "364002":
      return "420000"; // 湖北
    case "366974":
      return "430700"; // 常德
    case "365789":
      return "350700"; // 南平
    case "365788":
      return "350100"; // 福州
    case "366093":
      return "420100"; // 武汉
    case "364010":
      return "420800"; // 荆门
    case "364004":
      return "421100"; // 黄冈
    case "364003":
      return "421000"; // 荆州
    default:
      return "100000"; // 中国
  }
}

// export default async function mapProvinceName()
