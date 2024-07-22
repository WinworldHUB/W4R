import { DateTime } from "luxon";
import {
  APP_AWS_DATE_FORMAT,
  APP_LONG_DATE_FORMAT,
  APP_RECENT_NUMBER_OF_DAYS,
  APP_SHORT_DATE_FORMAT,
} from "../constants";

export const toAWSDateFormat = (date: DateTime): string =>
  date.toFormat(APP_AWS_DATE_FORMAT, { locale: "en" });

export const toShortDateFormat = (date: DateTime): string =>
  date.toFormat(APP_SHORT_DATE_FORMAT, { locale: "en" });

export const toLongDateFormat = (date: DateTime): string =>
  date.toFormat(APP_LONG_DATE_FORMAT, { locale: "en" });

export const toFormattedDate = (date: DateTime, format: string): string =>
  date.toFormat(format, { locale: "en" });

export const dateFromString = (date: string): string => {
  if (!date) return "";
  const parsedDate = DateTime.fromISO(date);

  if (parsedDate.isValid) {
    return toShortDateFormat(parsedDate);
  }
};

export const isLatest = (date: string) =>
  Math.round(
    Math.abs(
      DateTime.fromFormat(date, APP_AWS_DATE_FORMAT).diffNow("days").days
    )
  ) < APP_RECENT_NUMBER_OF_DAYS;

export const sortByDate = (aDate: string, bDate: string) =>
  DateTime.fromFormat(
    bDate ?? toAWSDateFormat(DateTime.now()),
    APP_AWS_DATE_FORMAT
  ).diff(
    DateTime.fromFormat(
      aDate ?? toAWSDateFormat(DateTime.now()),
      APP_AWS_DATE_FORMAT
    ),
    "milliseconds"
  ).milliseconds;
