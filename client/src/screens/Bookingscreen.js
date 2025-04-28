import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init({
  duration: 1000,
});

function BookingScreen() {
  const [loading, setloading] = useState(true);

  const [room, setroom] = useState();
  const { roomid, fromdate, todate } = useParams();

  useEffect(() => {
    async function fetch() {
      try {
        setloading(true);
        const response = await axios.post("/api/get/room/getroombyid", {
          roomid: roomid,
        });
        setroom(response.data);
        setloading(false);
      } catch (err) {
        setloading(false);
      }
    }

    fetch(); // call it here
  }, [roomid]);

  return (
    <div className="m-5" data-aos="flip-left">
      {loading ? (
        <Loader />
      ) : room ? (
        <div>
          <div className="row justify-content-center mt-5 ">
            <div className="col-md-5">
              <h1> {room.name}</h1>
              <img src={room.imageurls[0]} className="bigimg" alt={room.name} />
            </div>

            <div className="col-md-5">
              <div>
                <h1> Booking Detail</h1>
                <hr />
                <b>
                  <p> Name:</p>
                  <p> From Date {fromdate} </p>
                  <p> To Date: {todate}</p>
                  <p> Max count :{room.maxcount}</p>
                </b>
              </div>
              <div>
                <b>
                  <h1> Amount</h1>
                  <hr />
                  <p> Total days: </p>
                  <p> Rent perday {room.rentperday}</p>
                  <p> Total Amount</p>
                </b>
              </div>
            </div>
            <div className="text-end mt-3 mr-3">
              <button className="btn btn-primary ">Pay Now</button>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default BookingScreen;
