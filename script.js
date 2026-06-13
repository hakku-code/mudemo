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
    "2026-06-16": {
        title: "6 Game-Changing AI Tools in 60 Minutes",
        date: "16 June 2026"
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

/* =========================================
   GALLERY MODAL
========================================= */

const galleryModal = document.getElementById("galleryModal");
const openGalleryBtn = document.getElementById("openGalleryBtn");
const closeGalleryBtn = document.getElementById("closeGalleryBtn");

if(openGalleryBtn){

    openGalleryBtn.addEventListener("click", () => {

        galleryModal.classList.add("active");

        document.body.classList.add("modal-open");

    });

}

if(closeGalleryBtn){

    closeGalleryBtn.addEventListener("click", () => {

        galleryModal.classList.remove("active");

        document.body.classList.remove("modal-open");

    });

}

galleryModal?.addEventListener("click", (e) => {

    if(e.target === galleryModal){

        galleryModal.classList.remove("active");

        document.body.classList.remove("modal-open");

    }

});

document.addEventListener("keydown", (e) => {

    if(e.key === "Escape"){

        galleryModal.classList.remove("active");

        document.body.classList.remove("modal-open");

    }

});

/* =========================================
   ABOUT US
========================================= */
const aboutText = document.getElementById("aboutText");
const readMoreBtn = document.getElementById("readMoreBtn");

readMoreBtn.addEventListener("click", () => {
    aboutText.classList.toggle("expanded");

    if (aboutText.classList.contains("expanded")) {
        readMoreBtn.textContent = "Read Less";
    } else {
        readMoreBtn.textContent = "Read More";
    }
});


/* =========================================
   UNDERLINE ACTIVE NAV LINK ON SCROLL
========================================= */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

/* =========================================
   OUR STATISTICS
========================================= */

const WORKER_URL =
"https://flat-cherry-7f84.cherrylily91.workers.dev/";

async function loadStats(){

    try{

        const res = await fetch(WORKER_URL);
        const json = await res.json();

        const data = json.response || json;

        document.getElementById("studentsCount").textContent =
            data.campus_details?.total_members || 0;

        document.getElementById("igCount").textContent =
            data.ig_details?.length || 0;

        document.getElementById("activeCount").textContent =
            data.campus_details?.active_members || 0;

        document.getElementById("karmaCount").textContent =
            data.campus_details?.total_karma || 0;

        document.getElementById("rankText").textContent =
            "Rank: " + (data.campus_details?.rank || "—");

    }catch(err){

        console.error("Stats loading failed", err);

    }

}

loadStats();
