class DateUtil {
  static formatDateInput(date) {
    if (!date) return "";
    if (typeof date === "string") return date.slice(0, 10);
    return date.toISOString().slice(0, 10);
  }

}

export default DateUtil;