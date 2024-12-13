import React from "react";
import $ from 'jquery';
import '../styles/header1.css'
import { menuDiplay } from '../js-functions/header-funct.js'
import { searchForm } from "../js-functions/header-funct.js";

function Header(){
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

 {/* <p>Get information on the world's best movies new releases, Know it all before everyon eles.</p> */}

</div>

 <h1 id="main-title"><u>Get The best movie infor here</u></h1>
</div>
    )
}

export default Header