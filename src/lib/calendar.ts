const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});

export const getMonthLabel = (date: Date): string => dateFormatter.format(date);

export const toIsoDate = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export const fromIsoDate = (isoDate: string): Date => {
  const [year, month, day] = isoDate.split("-").map((chunk) => Number(chunk));
  return new Date(year, (month || 1) - 1, day || 1);
};

export const getDaysOfWeek = (): string[] => ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export type CalendarCell = {
  date: Date;
  isoDate: string;
  inCurrentMonth: boolean;
};

export const buildMonthCells = (viewDate: Date): CalendarCell[] => {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const firstWeekday = (firstDay.getDay() + 6) % 7;
  const daysInMonth = lastDay.getDate();

  const cells: CalendarCell[] = [];

  for (let i = firstWeekday; i > 0; i -= 1) {
    const date = new Date(year, month, 1 - i);
    cells.push({ date, isoDate: toIsoDate(date), inCurrentMonth: false });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month, day);
    cells.push({ date, isoDate: toIsoDate(date), inCurrentMonth: true });
  }

  const trailing = (7 - (cells.length % 7)) % 7;
  for (let i = 1; i <= trailing; i += 1) {
    const date = new Date(year, month + 1, i);
    cells.push({ date, isoDate: toIsoDate(date), inCurrentMonth: false });
  }

  return cells;
};

export const isDateInRange = (isoDate: string, startDate: string, endDate: string): boolean =>
  isoDate >= startDate && isoDate <= endDate;

export const isRangeStart = (isoDate: string, startDate: string): boolean => isoDate === startDate;

export const isRangeEnd = (isoDate: string, endDate: string): boolean => isoDate === endDate;
