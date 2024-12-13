import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { store } from "../store/store";
import '../styles/movie-infor.css'

function MovieInfor(){
const navigate = useNavigate()
let data = JSON.parse(sessionStorage.getItem('myData'))
let current_movie = data.find((item)=> item.id === Number(store.getState().item.itemId))
const itemId = useSelector((state)=> state.itemId)

const [big_pic, setBigPic] = useState(current_movie.picUrl)
const [small_pic, setSmallPic] = useState(current_movie.picUrl)
const [title, setTitle] = useState(current_movie.title)
const [year, setYear] = useState(current_movie.year)
const [description, setDescription] = useState(current_movie.description)
const [genres, setGenre] = useState([...current_movie.genres])
const [age, setAge] = useState(current_movie.age)
const [time, setTime] = useState(current_movie.time)

useEffect(()=>{

    let getMovie = data.find((item => item.id === Number(store.getState().item.itemId)))
    if(getMovie){
        setTitle(getMovie.title)
        setBigPic(getMovie.picUrl)
        setSmallPic(getMovie.picUrl)
        setYear(getMovie.year)
        setDescription(getMovie.description)
        const spacedGenres = getMovie.genres.map((genre) =>{
return getMovie.genres.indexOf(genre) !== getMovie.genres.length - 1 ? `${genre}, ` : `${genre}` 
        });
        
     setGenre(spacedGenres);
     setAge(getMovie.age)
     setTime(getMovie.time)
    }

}, [itemId])
    
    return(
        <div id = 'movie-infor'>

        <div id="image-section" className="infor-main-div"><img src={big_pic} alt="movie-image"></img></div>
       
        <div id="infor-section" className="infor-main-div">

        <div id="small-image-container">
        <img id = "small-image" src={small_pic} alt="mini movie image"></img>
        </div>
        
        <div id="infor-display">
            <h1 id="min-title">{title}</h1>
            <p>{description}</p>

            <ul>
                <li><span>Age Restriction: </span>{age}</li>
                <li><span>Genre: </span>{genres}</li>
                <li><span>Year: </span>{year}</li>
                <li><span>Duration: </span>{time}</li>
            </ul>
        </div>
        
        <button onClick={()=> navigate('/')}>Back</button>
        
        </div>


        </div>
    )
}

export default MovieInfor