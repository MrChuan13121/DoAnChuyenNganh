import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ADDRESS } from "../../dotenv";

const RechartsExample = () => {
  const [data, setData] = useState({ name: "", books: 0 });
  const [listBook, setBooks] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getDayLast = async (time) => {
    const timeLast = new Date(parseInt(time) - 86400000).getTime();
    return timeLast;
  };

  const getData = async () => {
    try {
      var getCurren = new Date().getTime();
      const listSevenDay = [];
      listSevenDay.push(getCurren);
      console.log(listSevenDay);
      for (var i = 0; i < 6; i++) {
        const timeL = await getDayLast(getCurren);
        listSevenDay.push(timeL);
        console.log(listSevenDay);
        getCurren = parseInt(timeL);
      }
      // listSevenDay.forEach((element) => {
      //   const day = new Date(element);
      //   day.getDate();
      // });
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
        .then((dt) => {
          // setBooks(dt.data);
          const list = dt.data;
          const dataTemp = [];
          listSevenDay.forEach((k) => {
            const day = new Date(k).getDate();
            const month = new Date(k).getMonth() + 1;
            const year = new Date(k).getFullYear();
            const timeString = day + "/" + month + "/" + year;
            const timeDM = day + "/" + month;
            let dem = 0;
            list.forEach((j) => {
              let jd = j.date;
              if (j.date.indexOf(0) == "0") {
                console.log(true);
                jd = j.date.substring(1);
              }
              console.log(jd);
              console.log(timeString);
              if (jd == timeString) {
                dem++;
              }
            });
            dataTemp.push({ name: timeDM, books: dem });
          });
          console.log(dataTemp);
          const newArray = dataTemp.reverse();
          setData(newArray);
        });
      if (listBook.length != 0) {
        console.log(">>>>> Nó sẽ vào đây");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LineChart width={900} height={450} data={data}>
      <Line type="monotone" dataKey="books" stroke="#2196F3" strokeWidth={3} />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};

export default RechartsExample;
