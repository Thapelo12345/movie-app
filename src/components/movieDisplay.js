import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { store } from "../store/store";
import Loader from './loading';
import "../styles/movie-display.css";

function MovieDisplay() {
  const search = useSelector((state)=> state.search.searchFor)
  const title = useSelector((state)=> state.title.movieTitle)

  const navigate = useNavigate();
  const [data, setData] = useState(null); 
  const [dataDownloded, setdownloaded] = useState(false)

  // Fetch data and update state
  useEffect(() => {
    if (sessionStorage.getItem("myData") === null) {
      fetch("https://movie-api-gmds.onrender.com")
        .then((res) => res.json())
        .then((result) => {
          sessionStorage.setItem("myData", JSON.stringify(result.items));
          setdownloaded(true)
          // store.dispatch({ type: "DATA_RECEIVED" });
          
        })
        .catch((err) => {
          console.error("Cant fetch new data!", err);
          alert('Server Error! Please try again later...')
        });
    } else {
      setData(JSON.parse(sessionStorage.getItem("myData"))); // Load data from sessionStorage
    }
  }, []);

  useEffect(()=>{
    if(sessionStorage.getItem('myData') !== null){
      if(store.getState().search.searchFor !== 'All'){
      // $('#movie-display').empty()
      let itemsToFind = store.getState().search.searchFor
      let arr = JSON.parse(sessionStorage.getItem('myData')).filter((item)=> item.genres.includes(itemsToFind))
      setData(arr)
      }//end of inner if

      else{
      // $('#movie-display').empty()
      setData(JSON.parse(sessionStorage.getItem('myData'))); 
      }//end of inner else

    }//end of if statement
  }, [search, dataDownloded])

  useEffect(()=>{
if(sessionStorage.getItem('myData') !== null && title !== ''){
  let data = JSON.parse(sessionStorage.getItem('myData'))
    let lookFor = title.split(/[\s:]+/)
    let movies = []

    for(let i = 0; i < lookFor.length; i++){
      let movie = data.find((item)=> item.title.split(/[\s:]+/).map(word => word.toLowerCase()).includes(lookFor[i].toLowerCase()))
      if(movie !== undefined && !movies.includes(movie)){movies.push(movie)}
    }//4 loop
    if(movies.length !== 0){setData(movies)}
    else{alert(`No move with title : ${title}`)}
    store.dispatch({type: 'MOVE_TITLE', input: ''})
}//end of if

  }, [title])//end of movie title

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
