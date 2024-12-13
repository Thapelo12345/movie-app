import React from "react";
import '../styles/loading.css'

function Loader(){

    return(
        <div id="loading-body">

<main>
	<div className="preloader">
		<div className="preloader__square"></div>
		<div className="preloader__square"></div>
		<div className="preloader__square"></div>
		<div className="preloader__square"></div>
	</div>
    
	<div className="status">
    Please wait fetching data
    <span className="status__dot">.</span>
    <span className="status__dot">.</span>
    <span className="status__dot">.</span>
    </div>
</main>

        </div>
    )
}

export default Loader