/* =========================================
   MOBILE MENU TOGGLE
========================================= */

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
    });
}


/* =========================================
   EVENT JOURNEY TOGGLE
========================================= */

const toggleBtn = document.getElementById("toggle-events-btn");
const hiddenCards = document.querySelectorAll(".hidden-card");

if (toggleBtn) {

    let expanded = false;

    toggleBtn.addEventListener("click", () => {

        expanded = !expanded;

        hiddenCards.forEach(card => {
            card.classList.toggle("show");
        });

        toggleBtn.textContent = expanded
            ? "Show Less"
            : "View Full Events";
    });

}

const calDays = document.getElementById("calDays");
const monthTitle = document.getElementById("monthTitle");

let current = new Date();
const eventBox = document.getElementById("eventBox");
const eventTitle = document.getElementById("eventTitle");
const eventDateText = document.getElementById("eventDateText");

/* 🔵 ADD ANY EVENT DATES HERE */
const eventDates = {
    "2026-06-09": {
        title: "Build With AI Workshop",
        date: "9 June 2026"
    },

    "2026-06-15": {
        title: "Community Meetup",
        date: "15 June 2026"
    },

    "2026-06-25": {
        title: "IoT Workshop",
        date: "25 June 2026"
    }
};

function renderCalendar(date){

    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    monthTitle.textContent =
        date.toLocaleString("default",{month:"long", year:"numeric"});

    calDays.innerHTML = "";

    // empty slots
    for(let i=0;i<firstDay;i++){
        calDays.innerHTML += `<div></div>`;
    }

    // days
    for(let d=1; d<=totalDays; d++){

        const fullDate =
        `${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;

        let className = "";

        // today
        const today = new Date();
        if(
            d === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ){
            className = "today";
        }

        // 🔵 EVENT CHECK (THIS IS KEY)
        if(eventDates[fullDate]){
    className = "event-day";
}
const day = document.createElement("div");

day.className = className;
day.textContent = d;

day.addEventListener("click", () => {

    if(eventDates[fullDate]){

        eventBox.style.display = "block";

        eventTitle.textContent =
            eventDates[fullDate].title;

        eventDateText.textContent =
            eventDates[fullDate].date;

    } else {

        eventBox.style.display = "none";
    }
});

calDays.appendChild(day);
    }
}

document.getElementById("prev").onclick = ()=>{
    current.setMonth(current.getMonth()-1);
    renderCalendar(current);
};

document.getElementById("next").onclick = ()=>{
    current.setMonth(current.getMonth()+1);
    renderCalendar(current);
};

renderCalendar(current);