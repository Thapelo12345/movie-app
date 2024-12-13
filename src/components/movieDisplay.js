import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../store/store";
import Loader from './loading';
import "../styles/movie-display.css";

function MovieDisplay() {
  const navigate = useNavigate();
  const [data, setData] = useState(null); // State to hold fetched data

  // Fetch data and update state
  useEffect(() => {
    if (sessionStorage.getItem("myData") === null) {
      fetch("https://movie-api-gmds.onrender.com")
        .then((res) => res.json())
        .then((result) => {
          sessionStorage.setItem("myData", JSON.stringify(result.items));
          store.dispatch({ type: "DATA_RECEIVED" });
          setData(result.items); // Save fetched data in state
        })
        .catch((err) => {
          console.error("Cant fetch new data!", err);
          alert('Server Error! Please try again later...')
        });
    } else {
      setData(JSON.parse(sessionStorage.getItem("myData"))); // Load data from sessionStorage
    }
  }, []);

  return (
    <div id="movie-display">
      {!data && <Loader />}
      
      {data && data.map((item) => (
          <button
            key={item.id}
            className="movie-btn"
            value={item.id}
            onClick={() => {
              store.dispatch({
                type: "UPDATE_INPUT",
                input: item.id.toString(),
              });
              navigate("/movie-infor");
            }}
          >
            <div>
              <img src={item.picUrl} alt="movie-image" />
              <h1 className="movie-titles">{item.title}</h1>
            </div>
          </button>
        ))}
    </div>
  );
}

export default MovieDisplay;
