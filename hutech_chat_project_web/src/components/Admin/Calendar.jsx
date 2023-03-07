import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/Admin/Calendar.css";

const locales = {
  "en-US": require("date-fns/locale/vi"),
};
const localizer = dateFnsLocalizer({
  format,
  // parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "0987654321",
    // allDay: true,
    start: new Date("11:00 AM,12/12/2022"),
    end: new Date("11:30 AM,12/12/2022"),
  },
  {
    title: "09876876854",
    start: new Date("12/12/2022"),
    end: new Date("12/12/2022"),
  },
  {
    title: "08741423344",
    start: new Date("11/12/2022"),
    end: new Date("13/12/2022"),
  },
];

const Calendara = () => {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  // function handleAddEvent() {
  //   for (let i = 0; i < allEvents.length; i++) {
  //     const d1 = new Date(allEvents[i].start);
  //     const d2 = new Date(newEvent.start);
  //     const d3 = new Date(allEvents[i].end);
  //     const d4 = new Date(newEvent.end);
  //     /*
  //       console.log(d1 <= d2);
  //       console.log(d2 <= d3);
  //       console.log(d1 <= d4);
  //       console.log(d4 <= d3);
  //         */

  //     if ((d1 <= d2 && d2 <= d3) || (d1 <= d4 && d4 <= d3)) {
  //       break;
  //     }
  //   }

  //   setAllEvents([...allEvents, newEvent]);
  // }

  return (
    <div className="Calendar">
      <h1>Calendar</h1>
      <h2>Add New Event</h2>
      <div>
        <input
          type="text"
          placeholder="Add Title"
          style={{ width: "20%", marginRight: "10px" }}
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <DatePicker
          placeholderText="Start Date"
          style={{ marginRight: "10px" }}
          selected={newEvent.start}
          onChange={(start) => setNewEvent({ ...newEvent, start })}
        />
        <DatePicker
          placeholderText="End Date"
          selected={newEvent.end}
          onChange={(end) => setNewEvent({ ...newEvent, end })}
        />
        {/* <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
          Add Event
        </button> */}
      </div>
      <Calendar
        localizer={localizer}
        events={allEvents}
        style={{ height: 500, margin: "50px" }}
      />
    </div>
  );
};

export default Calendara;
