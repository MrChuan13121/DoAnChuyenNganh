let eventGuid = 0;
let todayStr = new Date("12/12/2022").toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: "All-day event",
    start: todayStr,
  },
  {
    id: "abc",
    title: "0987654321",
    start: todayStr + "T13:30",
  },
  {
    id: "abcd",
    title: "0867465251",
    start: todayStr + "T14:00",
  },
  {
    id: "abce",
    title: "0866262662",
    start: todayStr + "T15:30",
  },
  {
    id: "abcf",
    title: "Timed event",
    start: "11:30 AM, 12/16/2022",
    end: "11:00 AM, 12/16/2022",
  },
  {
    id: "abcg",
    title: "0865362625",
    start: "7:30 AM, 12/15/2022",
    end: "8:00 AM, 12/15/2022",
  },
  {
    id: "abch",
    title: "0876543225",
    start: "13:30 AM, 12/17/2022",
    end: "14:00 AM, 12/17/2022",
  },
  {
    id: "abck",
    title: "0987654321",
    start: "14:00 AM, 12/16/2022",
    end: "14:30 AM, 12/16/2022",
  },
];

export function createEventId() {
  return String(eventGuid++);
}
