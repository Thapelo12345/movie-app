import $ from 'jquery';
import { store } from '../store/store'

function createButton(arr){
    let movieBtn = $('<button></button>')
    movieBtn.addClass('movie-btn')
    movieBtn.attr('value', arr.id)

    let container = $('<div></div>')

    let pic = $('<img>')

    pic.attr('src', arr.picUrl)
    pic.attr('alt', 'movie-image')

    let title = $('<h1></h1>')
    title.addClass('movie-titles')
    title.text(arr.title)

    movieBtn.click(()=>{ 
    store.dispatch({ type: 'UPDATE_INPUT', input: movieBtn.val().toString() })
    window.location.replace(window.location.href + 'movie-infor');
    })//end of btn func

    container.append(pic, title)

    return movieBtn.append(container)
}//creating display btns

export function menuDiplay(){
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
        listBtn.click(()=>{searchByGenre(listBtn.val())})
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

function searchByGenre(genre){

    $('#movie-display').empty()
    $('.movie-btn').prop('disabled', false)
    $('#list').empty().remove()
    $('#miniMenu').empty().remove()

    let data = JSON.parse(sessionStorage.getItem('myData'))
if(data){
    data.forEach((item)=>{

if(item.genres.find((item1 => item1 === genre))){createButton(item).appendTo($('#movie-display'))}//end of inner if
else if(genre === 'All'){createButton(item).appendTo($('#movie-display'))}//end of inner else if
    })
}//end of if
    
}//end of search by genre

export function searchForm(movieTitle){
    if(movieTitle !== ''){
    $('#movie-display').empty()
    
    let data = JSON.parse(sessionStorage.getItem('myData'))
    let lookFor = movieTitle.split(/[\s:]+/)
    let movies = []

    for(let i = 0; i < lookFor.length; i++){
      let movie = data.find((item)=> item.title.split(/[\s:]+/).map(word => word.toLowerCase()).includes(lookFor[i].toLowerCase()))
      if(movie !== undefined && !movies.includes(movie)){movies.push(movie)}
    }//4 loop

    
      if(movies.length !== 0){movies.forEach((movie)=> createButton(movie).appendTo($('#movie-display')))}//end of if
      else{
    
         let movieBtn = $('<button></button>')
         movieBtn.addClass('movie-btn')
         movieBtn.attr('value', 'No movie found..!')
     
         let container = $('<div></div>')
     
         let pic = $('<img>')
     
         pic.attr('src', './default image.jpg')
         pic.attr('alt', 'movie-image')
     
         let title = $('<h1></h1>')
         title.addClass('movie-titles')
         title.text("No movie Found..!")
     
         movieBtn.click(()=>{ alert('This no movie with the name ', movieTitle)})//end of btn func
     
         container.append(pic, title)
         movieBtn.append(container)
         movieBtn.appendTo($('#movie-display'))
      }  //end of else
    
    }//end of outer if
    }//end of search form
    

