import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../utils/api.js";
import Room from "../components/Room.js";
import Loader from "../components/Loader.js";
import Error from "../components/Error.js";
import moment from "moment";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

function HomeScreen() {
  const [rooms, setrooms] = useState([]);
  const [loading, setLoading] = useState();
  const [fromdate, setfromdate] = useState(null); // Store moment object
  const [todate, settodate] = useState(null); // Store moment object

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_BASE_URL}/api/get/room/getrooms`
        );
        console.log(response.data);
        setrooms(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  function filterByDate(dates) {
    if (dates && dates.length === 2) {
      // Ensure that time is set to the start of the day to avoid time zone shifts
      const formattedFromDate = dates[0].startOf("day"); // Set to midnight (start of day)
      const formattedToDate = dates[1].startOf("day"); // Set to midnight (start of day)

      setfromdate(formattedFromDate);
      settodate(formattedToDate);
    }
  }

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-3">
          <RangePicker
            format="DD-MM-YYYY" // Display format
            value={
              fromdate && todate
                ? [fromdate, todate] // Pass moment objects
                : null
            }
            onChange={filterByDate}
          />
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        {loading ? (
          <h1>
            <Loader />
          </h1>
        ) : rooms.length > 1 ? (
          rooms.map((room) => {
            return (
              <div className="col-md-9 mt-3" key={room._id}>
                <Room room={room} fromdate={fromdate} todate={todate} />
              </div>
            );
          })
        ) : (
          <Error />
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
