import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import updateLocale from "dayjs/plugin/updateLocale";
import "dayjs/locale/pt-br";

import LOCALSTORAGE from "./constants/localStorage";

dayjs.locale("pt-br");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(updateLocale);

dayjs.tz.setDefault("America/Sao_Paulo");

export const formatDate = (
  value: any,
  format: string,
  tz: string = "America/Recife"
) => {
  tz = sessionStorage.getItem(LOCALSTORAGE.timeZone) ?? tz;
  return dayjs(value).locale("pt-br").tz(tz).format(format);
};
