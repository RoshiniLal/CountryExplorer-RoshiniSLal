/* Initialisation of the variables required for checking state of the system */

var userdata = "";
var result = "";
var found = false;

/* Prepares DOM with the search field on page load */

window.onload = function(){
    userdata = "";
    searchBox();
    process();
};

/* Function that throttles per 400 milliseconds to show suggestions if there is no user activity */

function process(){
    window.setInterval(function(){
        var typing = document.getElementById('search_field').value;
        if (typing.length == 0) {
            userdata = typing;
            clearCardList();
        }
        if (typing != userdata) {
            if (typing.length >= 3) 
            {
              userdata = typing;
              callRest(typing);
            }
            else {
                userdata = typing;
                if (found == true) {
                clearCardList();
                }
            }
        }
    }, 400);
}

/* function that performs the actual API Call to get countries data */

function callRest(typing) {
    console.log("Called")
    let url = 'https://restcountries.eu/rest/v2/name/' + typing
    fetch(url)
    .then(function(response){
        if (response.status == 404) {
            showNone();
        }
        else {
            return response.json();
        }
    })
    .then(function(myJSON){
        result = myJSON;
        CreateCardList(myJSON);
    })
    .catch(function(){
        showFailure();
    });
    
}

/* Creates the DOM element for the search field */

function searchBox() {
    let searchWindow = document.querySelector(".search-body");
    var search = document.createElement("input");
    search.className = "search_field";
    search.id = "search_field";
    search.placeholder = "Enter country name here...."
    searchWindow.appendChild(search);
}

/* Creates the list of suggestions based on the userdata text */

function CreateCardList(result) {
    console.log("reached");
    if (found == true) {
        clearCardList();
    }
    found = true;
    let main = document.querySelector(".search-body");
    let holder = document.createElement("div");
    holder.className = "card_holder";
    main.appendChild(holder);
    for (var i = 0; i < result.length ; i++) {
        let card = document.createElement("div");
        card.className = "card";
        card.id = i;
        card.setAttribute("onclick","details(id)");
        let name = document.createElement("p");
        name.className = "country"
        name.textContent = result[i].name;
        let flag = document.createElement("img");
        flag.src = result[i].flag;
    
        card.appendChild(flag);
        card.appendChild(name);
 
        holder.appendChild(card);
    }
}

/* Function called to clear the list before new suggestions are populated */

function clearCardList(){
    var items = document.querySelectorAll(".card");
    items.forEach(function(item){
        item.parentNode.removeChild(item);
    })
    var holder = document.querySelector(".card_holder");
    holder.parentNode.removeChild(holder);
    found = false;
}

/* details DOM STARTS HERE */

/* Function that declares DOM elements for details Page */

function details(i) {
    var searchBox = document.querySelector(".search-body");
    searchBox.style.display = "none";
    var resultDOM = document.querySelector(".result-body");
    resultDOM.style.display = "block";

    let info = document.createElement("div");
    info.className = "details";

    let name = document.createElement("p");
    name.textContent = "Name: " + result[i].name;

    let flag = document.createElement("img");
    flag.src = result[i].flag;
    
    let capital = document.createElement("p");
    capital.textContent = "Capital: " +result[i].capital;
    capital.className = "textwonder";

    let currency = document.createElement("p");
    currency.textContent = result[i].currencies[0].name + " (" + result[i].currencies[0].symbol + ")";
    currency.className = "currency";

    let language = document.createElement("p");
    language.textContent = result[i].languages[0].name;
    language.className = "language";

    let region = document.createElement("p");
    region.textContent = "Region: " + result[i].region;

    let subregion = document.createElement("p");
    subregion.textContent = "Subregion: " + result[i].subregion;
    subregion.className = "textwonder";

    let population = document.createElement("p");
    population.textContent = result[i].population;

    let timezones = document.createElement("p");
    timezones.textContent = result[i].timezones[0];

    let area = document.createElement("p");
    if (result[i].area != "") 
    {
        area.textContent = result[i].area;
    }
    else 
    {
        area.textContent = "Not available"
    }

    var back = document.createElement("img");
    back.src = "https://img.icons8.com/ios-filled/50/000000/back.png";
    back.alt = "Click to go back"
    back.className = "back"
    back.setAttribute("onclick","revert()");
    info.appendChild(back);
    
    let basics = document.createElement("div");
    basics.className = "basics";
    
    resultDOM.appendChild(info);
    info.appendChild(basics);
    
    let titles = document.createElement("div");
    titles.className = "titles";
    
    titles.appendChild(flag);
    
    let showstop = document.createElement("div");
    showstop.className = "titles";

    
    
    let showstop1 = document.createElement("div");
    
    let verti = document.createElement("div");    
    verti.appendChild(showstop);
    verti.appendChild(showstop1);
    verti.className = "showstop";
    showstop1.className = "titles";
    showstop.appendChild(name);     
    showstop.appendChild(capital);
    showstop1.appendChild(region);
    showstop1.appendChild(subregion);
    basics.appendChild(titles);
    titles.appendChild(verti);
    
    let others = document.createElement("div");
    others.className = "others";
    let linfo = document.createElement("p");
    linfo.className = "linfo"
    linfo.textContent = "Spoken Language: ";
    
    let cinfo = document.createElement("p")
    cinfo.className = "cinfo";
    cinfo.textContent = "Currency: ";
    
    others.appendChild(linfo);
    others.appendChild(language);
    
    let money = document.createElement("div");
    
    money.className = "money";
    money.appendChild(cinfo);
    money.appendChild(currency);
    
    let more = document.createElement("div");
    more.className = "more";
    more.appendChild(others);
    more.appendChild(money);
    
    //let more = document.createElement("div");
    //more.className = "more";
    let popul = document.createElement("div");
    popul.className = "money";
    let ptext = document.createElement("p");
    ptext.textContent = "Population: ";
    popul.appendChild(ptext);
    popul.appendChild(population);
    basics.appendChild(popul);
    let areas = document.createElement("div");
    let ams = document.createElement("p");
    ams.textContent = "Area: ";
    ams.className = "ams";
    areas.className = "money";
    areas.appendChild(ams);
    areas.appendChild(area);
    let oreas = document.createElement("div");
    let oms = document.createElement("p");
    oms.textContent = "Timezone: ";
    oms.className = "ams";
    oreas.className = "money";
    oreas.appendChild(oms);
    oreas.appendChild(timezones);
    info.appendChild(basics);
    basics.appendChild(areas);
    basics.appendChild(oreas);
}

/* Function triggered when the back button is pressed --- switches to the original DOM */

function revert() {
    var resultbody = document.querySelector(".details");
    resultbody.parentNode.removeChild(resultbody);
    var searchBox = document.querySelector(".search-body");
    searchBox.style.display = "block";
}

/* A function used to show failed status when the list does not return any results */

function showFailure() {
    if(found == true) {
        clearCardList();
    }
    let main = document.querySelector(".search-body");
    let holder = document.createElement("div");
    holder.className = "card_holder";
    main.appendChild(holder);
    let p = document.createElement("p");
    p.textContent = "No results found!";
    p.className = "default"
    holder.appendChild(p);
    found = true;
}

/* A function used to show failed status in the case of error code 404 */

function showNone(){
    if(found == true) {
        clearCardList();
    }
    let main = document.querySelector(".search-body");
    let holder = document.createElement("div");
    holder.className = "card_holder";
    main.appendChild(holder);
    let p = document.createElement("p");
    p.textContent = "No results found!";
    p.className = "default"
    holder.appendChild(p);
    found = true;
}