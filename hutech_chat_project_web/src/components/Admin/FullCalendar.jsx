import React from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "./event-utils";
import "../../styles/Admin/Calendar.css";
import Swal from "sweetalert2";
import { useState } from "react";
import { useEffect } from "react";
import { ADDRESS } from "../../dotenv";
import { Calendar } from "react-big-calendar";

const DemoApp = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  useEffect(() => {
    getListBookAccept();
  }, []);

  const getListBookAccept = async () => {
    const tokenString = localStorage.getItem("token");
    await fetch(ADDRESS + "books/1", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokenString,
      },
    })
      .then((reponse) => reponse.json())
      .then(async (dt) => {
        console.log("<<<<<<<<DATA");
        console.log(dt.data);
        await convertToCalendar(dt.data);
      });
  };

  const convertToCalendar = async (req) => {
    const l = req.length;
    var array = [];
    if (l > 0) {
      for (var i = 0; i < l; i++) {
        const arr = req[i].date.split("/");
        const dateBook = arr[2] + "-" + arr[1] + "-" + arr[0];
        // const dateBook = arr[1] + "/" + arr[0] + "/" + arr[2];
        // let todayStr = new Date(dateBook).toISOString().replace(/T.*$/, "");
        // console.log(todayStr);
        const h = req[i].time.split(":");
        if (Number(h[0]) < 10) {
          const getH = "T0" + req[i].time;

          if (h[1] == "00") {
            const getM = "T0" + h[0] + ":30";
            array.push({
              id: req[i]._id,
              title: req[i].userId,
              start: dateBook + getH,
              end: dateBook + getM,
            });
          } else if (h[0] == "9") {
            const getM = "T10:00";
            array.push({
              id: req[i]._id,
              title: req[i].userId,
              start: dateBook + getH,
              end: dateBook + getM,
            });
          } else {
            const getM = "T0" + (Number(h[0]) + 1) + ":00";
            array.push({
              id: req[i]._id,
              title: req[i].userId,
              start: dateBook + getH,
              end: dateBook + getM,
            });
          }
        } else {
          const getH = "T" + req[i].time;

          if (h[0] == "00") {
            const getM = "T" + h[0] + ":30";
            array.push({
              id: req[i]._id,
              title: req[i].userId,
              start: dateBook + getH,
              end: dateBook + getM,
            });
          } else {
            const getM = "T" + (Number(h[0]) + 1) + ":00";
            array.push({
              id: req[i]._id,
              title: req[i].userId,
              start: dateBook + getH,
              end: dateBook + getM,
            });
          }
        }
      }
      setCurrentEvents(array);
    }
  };

  const handleChange = async (changed) => {
    const time = changed.event.start;
    const idBook = changed.event.id;
    let dayStr = new Date(time).toISOString().replace(/T.*$/, "");
    const splitTime = dayStr.split("-");
    const convertTime = splitTime[2] + "/" + splitTime[1] + "/" + splitTime[0];
    console.log(convertTime);
    const splitH = time.toString().split(" ");
    const H = splitH[4].replace(":00", "");
    const h = Number(H.split(":")[0]);
    if (h < 10) {
      var setH = H.substring(1);
    } else {
      var setH = H;
    }
    const tokenString = localStorage.getItem("token");
    await fetch(ADDRESS + "change/" + idBook, {
      method: "POST",
      body: JSON.stringify({
        date: convertTime,
        time: setH,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokenString,
      },
    })
      .then((reponse) => reponse.json())
      .then(async (dt) => {
        console.log("<<<<<<<<DATA");
        console.log(dt);
        if (dt.code == 200) {
          Swal.fire("Đã chỉnh sửa", "", "success");
        } else {
          Swal.fire("Đã có lỗi", "", "error");
        }
      });
  };

  const handleDateSelect = (selectInfo) => {
    Swal.fire({
      title: "Nhập số điện thoại khách hàng",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      cancelButtonText: "Hủy",
      showCancelButton: true,
      confirmButtonText: "Thêm",
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        let title = "  " + login;
        let calendarApi = selectInfo.view.calendar;

        calendarApi.unselect(); // clear date selection

        if (title) {
          calendarApi.addEvent({
            id: createEventId(),
            title,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: selectInfo.allDay,
          });
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Đã thêm", "", "success");
      }
    });
    // let title = prompt("Please enter a new title for your event");
  };

  const handleEventClick = async (clickInfo) => {
    await fetch(ADDRESS + "user/" + clickInfo.event.title, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((reponse) => reponse.json())
      .then(async (dt) => {
        Swal.fire({
          title: `${
            "Họ và tên: " +
            dt.name +
            "\n \nEmail: " +
            dt.email +
            "\n \nSố điện thoại: " +
            dt.phoneNumber
          }`,
          showConfirmButton: false,
          showDenyButton: true,
          showCancelButton: true,
          denyButtonText: "Hủy lịch",
        }).then(async (result) => {
          if (result.isDenied) {
            const tokenString = localStorage.getItem("token");
            await fetch(ADDRESS + clickInfo.event.id + "/2", {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + tokenString,
              },
            })
              .then((reponse) => reponse.json())
              .then((dt) => {
                clickInfo.event.remove();
              });
            Swal.fire("Đã hủy lịch", "", "success");
          }
        });
      });
  };

  const handleEvents = async (events) => {
    setCurrentEvents(events);
  };

  return (
    <div className="fullCalendar">
      <div className="demo-app-main">
        {currentEvents.length > 0 ? (
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            // weekends={this.state.weekendsVisible}
            initialEvents={currentEvents} // alternatively, use the `events` setting to fetch from a feed
            select={handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
            eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            locale="vi"
            eventChange={handleChange}
            /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
          />
        ) : null}
      </div>
    </div>
  );
};

// export default class DemoApp extends React.Component {
//   state = {
//     weekendsVisible: true,
//     currentEvents: [],
//   };

//   render() {

//   }

// renderSidebar() {
//   return (
//     <div className="demo-app-sidebar">
//       <div className="demo-app-sidebar-section">
//         <h2>Instructions</h2>
//         <ul>
//           <li>Select dates and you will be prompted to create a new event</li>
//           <li>Drag, drop, and resize events</li>
//           <li>Click an event to delete it</li>
//         </ul>
//       </div>
//       <div className="demo-app-sidebar-section">
//         <label>
//           <input
//             type="checkbox"
//             checked={this.state.weekendsVisible}
//             onChange={this.handleWeekendsToggle}
//           ></input>
//           toggle weekends
//         </label>
//       </div>
//       <div className="demo-app-sidebar-section">
//         <h2>All Events ({this.state.currentEvents.length})</h2>
//         <ul>{this.state.currentEvents.map(renderSidebarEvent)}</ul>
//       </div>
//     </div>
//   );
// }

// }

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>&emsp;{eventInfo.event.title}</i>
    </>
  );
}

// function renderSidebarEvent(event) {
//   return (
//     <li key={event.id}>
//       <b>
//         {formatDate(event.start, {
//           year: "numeric",
//           month: "short",
//           day: "numeric",
//         })}
//       </b>
//       <i>{event.title}</i>
//     </li>
//   );
// }

export default DemoApp;
