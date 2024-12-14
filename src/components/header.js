import React from "react";
import { useEffect } from 'react'
import { useSelector } from "react-redux";
import $ from 'jquery';
import '../styles/header1.css'
import { store } from '../store/store'
import { useNavigate } from "react-router-dom";


function menuDiplay(){
$('.movie-btn').prop('disabled', true)
let genreArr = ["All", "Adventure","Animation","Action","Comedy","Crime","Drama","History","Horror","Romance","Science Fiction","Mystery","Thriller","Fantasy","Family",]

let menu = $('<menu></menu>')
menu.attr('id', 'miniMenu')
let list = $('<ul></ul>')
list.attr('id', 'list')

let title = $('<h1></h1>')
title.text('GET MOVIE BY GENRE')
title.appendTo(menu)

    genreArr.forEach((item)=>{
        let listItem = $('<li></li>')
        let listBtn = $('<button></button>')
        listBtn.attr('value', item)

        listBtn.text(item)
        listBtn.click(()=>{
        store.dispatch({type: 'SEARCH_FOR', input: listBtn.val() })
        $('.movie-btn').prop('disabled', false)
         list.empty().remove()
         menu.empty().remove()
        })
        listItem.append(listBtn)
        listItem.appendTo(list)
    })//end o each loop

    list.appendTo(menu)

let closeBtn = $('<button></button>')
closeBtn.text('Close')
closeBtn.click(()=>{
    $('.movie-btn').prop('disabled', false)
    list.empty().remove()
    menu.empty().remove()
})//end of close btn  func

closeBtn.appendTo(menu)
menu.appendTo($('#App'))

}//end of menu display fun
    

function searchForm(movieTitle){
if(movieTitle !== ''){store.dispatch({type: 'MOVE_TITLE', input: movieTitle})}//end of outer if
}//end of search form

function Header(){


useEffect(()=>{}, [])

    return(
        <div id = 'header'>
<div id = "menu-form-container">
        <button id = 'menu-btn' onClick={menuDiplay}>
            <svg fill="currentColor" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
</svg>
        </button>
        
<form>
    <input id="form-input" type="text" placeholder="search for movie title here...!"></input>
    <button type ="button" onClick={() => {
      searchForm($('#form-input').val())
      $('#form-input').val('')
      }}>
    <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg>
    </button>
</form>

</div>

 <h1 id="main-title"><u>Get The best movie infor here</u></h1>
</div>
    )
}

export default Header