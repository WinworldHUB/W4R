import { DateTime } from "luxon";
import { APP_LONG_DATE_FORMAT, APP_SHORT_DATE_FORMAT } from "../constants";

export const toShortDateFormat = (date: DateTime) =>
  date.toFormat(APP_SHORT_DATE_FORMAT, { locale: "en" });

export const toLongDateFormat = (date: DateTime) =>
  date.toFormat(APP_LONG_DATE_FORMAT, { locale: "en" });

export const dateFromString = (date: string): string => {
  if (!date) return "";
  const parsedDate = DateTime.fromISO(date);

  if (parsedDate.isValid) {
    return toShortDateFormat(parsedDate);
  }
};
