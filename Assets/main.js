
const notes_page = document.getElementById("notes");
const note_page = document.querySelector(".note-page");
const note_container = document.querySelector(".note-container")
const note_pageContent = document.querySelector(".note-page_content");
const note_List = document.querySelector(".note-page_list-content");
const darkMode = document.getElementById("darkMode");
const searchContainer = document.getElementById("notesSearch");
const searchInput = document.getElementById("notes_search-input")
const moreBtn = document.querySelector(".moreBtn");
const saveBtn = document.getElementById("save-note");
const backBtn = document.getElementById("back-note");
const addBtn = document.getElementById("addNew");

const colorsList = document.getElementById("colors");
const color = document.querySelectorAll(".color");
const textarea = note_pageContent.querySelector("textarea");
const titleInput = document.getElementById("note-title_input");


const copyBtn = document.getElementById("copyNote");
const deleteBtn = document.getElementById("deleteNote");





let data;

if(localStorage.note != null){
   data = JSON.parse(localStorage.note)
}else{
   data = []
}




darkMode.addEventListener("click",() => {
   notes_page.classList.toggle("light");
   searchContainer.classList.toggle("light");
   searchInput.classList.toggle("light");
   note_page.classList.toggle("light");
   textarea.classList.toggle("light");
   titleInput.classList.toggle("light");
   
   if(note_List.classList.contains("down")){
      if(notes_page.classList.contains("light")){
         console.log("work")
         moreBtn.style.color = "#000";
      }else{
         moreBtn.style.color = "#fff";
      }
   }else {
      if(notes_page.classList.contains("light")){
         moreBtn.style.color = "#fff";
      }else{
         moreBtn.style.color = "#000";
      }
   }
})



moreBtn.onclick = () => {
   note_List.classList.toggle("down");
   if(note_List.classList.contains("down")){
      if(notes_page.classList.contains("light")){
         moreBtn.style.color = "#000";
      }else{
         moreBtn.style.color = "#fff";
      }
   }else {
      if(notes_page.classList.contains("light")){
         moreBtn.style.color = "#fff";
      }else{
         moreBtn.style.color = "#000";
      }
   }
}



backBtn.addEventListener("click", () =>{
   notes_page.style.left = "0";
   setNotes()
})

addBtn.addEventListener("click", () =>{
   const note_page_title = document.querySelector(".note-page_title");
   const timeVal = note_page_title.querySelector("h4");
   textarea.value = ``
   titleInput.value = ``
   timeVal.innerHTML = `- -:-`
   notes_page.style.left = "-500px";
   saveBtn.addEventListener("click", () =>{
      let textValue = textarea.value;
      let title;
      if(titleInput.value === ""){
         let lines = textValue.split(" ");
         title = lines[0]
         if(title.length > 7){
            title = title.slice(0, 7)
         }
      }else {
         title = titleInput.value
      }
      let x; 
      const colorV = getColor();
      const time = GetTime();
      let dataI = (data.length)-1;
      console.log(dataI.toString())
      let note = {
         title: title,
         text: textValue,
         color: colorV,
         time: time,
         id: data.length
      }
      data.push(note)
      localS(title, textValue, colorV, time)
      notes_page.style.left = "0";
      setNotes()
   })
   
})



function getDayName(dateStr, locale)
{
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });        
}

function GetTime(){
   var today = new Date();
   var fulldate =  (today.getMonth()+1) +'/'+today.getDate()+'/'+today.getFullYear()
   var fullDay= getDayName(fulldate , "en");
   var day = fullDay.slice(0, 3);
   var hour = TimeFix(today.getHours());
   var minutes = TimeFix(today.getMinutes());
   var time = `${day}, ${hour}:${minutes}`;
   return time

}


function TimeFix(time){
   if(time < 10){
      time = `0${time}`
   }
   return time
}


function removeActive(){
   color.forEach(el => {
      if(el.classList.contains("color-active")){
         el.classList.remove("color-active")
      }
   })
}

color.forEach(el => {
   el.onclick = () => {
      if(el.classList.contains("color-active")){
         el.classList.remove("color-active")
      }else {
         removeActive()
         el.classList.add("color-active")
         
      }
      
   }
})


function getColor(){
   var colorV;
   color.forEach(el => {
      if(el.classList.contains("color-active")){
         colorV= el.classList[0]
      }
   })
   return colorV
   
}



function setNotes(){
   note_container.innerHTML = '';
   for(let i =0; i< data.length;i++){
      note_container.innerHTML += `
      <div class="note-content ${data[i].color}" num="${i}" id="note-content">
         <h4 class="note-title">${data[i].title}</h4>
         <p>${data[i].text}</p>
         <h5 class="note-date">${data[i].time}</h5>
      </div>
      `
   }
}

setNotes()





function localS(title, textValue, colorV, time){
   
   localStorage.setItem('note', JSON.stringify(data))
}

function updateNote(id){
   let textValue = textarea.value;
   let title;
   if(titleInput.value === ""){
      let lines = textValue.split(" ");
      title = lines[0]
      if(title.length > 7){
         title = title.slice(0, 7)
      }
   }else {
      title = titleInput.value
   }
   const colorV = getColor();
   const time = GetTime()
   console.log(data[id])
   console.log(title)
   data[id].time = time
   data[id].title = title
   data[id].text = textValue
   data[id].color = colorV
   localStorage.setItem('note', JSON.stringify(data))

}



function fillData(id){
   const note_page_title = document.querySelector(".note-page_title");
   const timeVal = note_page_title.querySelector("h4");
   textarea.value = data[id].text
   titleInput.value = data[id].title
   timeVal.innerHTML = data[id].time
   removeActive()
   color.forEach(el => {
      if(el.classList.contains(`${data[id].color}`)){
         el.classList.add("color-active")
      }
   })
}

var num

const note_content = document.querySelectorAll(".note-content");



note_content.forEach(el => {
   el.addEventListener("click",() =>{
      console.log("click")
      notes_page.style.left = "-500px";
      saveBtn.addEventListener("click", () =>{
         let textValue = textarea.value;
         let title;
         if(titleInput.value === ""){
            let lines = textValue.split(" ");
            title = lines[0]
            if(title.length > 7){
               title = title.slice(0, 7)
            }
         }else {
            title = titleInput.value
         }
         let x; 
         const colorV = getColor();
         const time = GetTime();
         setNotes()
         num = el.getAttribute("num")
         updateNote(data[num].id)
         notes_page.style.left = "0";
      })
   
      deleteBtn.onclick = ()=>{
         deleteNote(el.getAttribute("num"))
      }

      fillData(el.getAttribute("num"));
      return num
   }
   )
})

copyBtn.addEventListener("click",() => {
   console.log("saved");
   textarea.select();
   textarea.setSelectionRange(0, 999999);
   document.execCommand("copy");
})

function searchNote(){
   let searchVal = searchInput.value
   note_container.innerHTML = '';
   for(let i = 0 ; i< data.length;i++){
      let title = data[i].title;
      if(title.includes(searchVal)){
         note_container.innerHTML += `
         <div class="note-content ${data[i].color}" num="${i}" id="note-content">
            <h4 class="note-title">${data[i].title}</h4>
            <p>${data[i].text}</p>
            <h5 class="note-date">${data[i].time}</h5>
         </div>
      `
      }
   }
}

function deleteNote(i){
   notes_page.style.left = "0";
   data.splice(i,1)
   localStorage.note = JSON.stringify(data)
   setNotes()
}