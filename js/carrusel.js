const wrapper = document.querySelector(".wrapper");
const carrusel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstCardWidth = carrusel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carrusel.children];

let isDragging = false, startX, startScrollLeft,timeoutId;

let cardPerView = Math.round(carrusel.offsetWidth / firstCardWidth);

carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carrusel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

carouselChildrens.slice(0,cardPerView).forEach(card => {
    carrusel.insertAdjacentHTML("beforeend", card.outerHTML);
});

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carrusel.scrollLeft += btn.id ==="left" ? -firstCardWidth : firstCardWidth;
    })
});

const dragStart = (e) => {
    isDragging = true;
    carrusel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carrusel.scrollLeft;
}
const dragging = (e) =>  {
    //console.log(e.PageX);
    if(!isDragging) return;
    carrusel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carrusel.classList.remove("dragging");
}

const autoplay = () => {
    if(window.innerWidth < 800) return;
    timeoutId = setTimeout(()=>carrusel.scrollLeft += firstCardWidth, 2500);
}

autoplay();

const infinteScroll = () => {
    if(carrusel.scrollLeft === 0) {
        carrusel.classList.add("no-transition");
        carrusel.scrollLeft = carrusel.scrollWidth - (2 * carrusel.offsetWidth);
        carrusel.classList.remove("no-transition");
    }
    else if(Math.ceil(carrusel.scrollLeft) === carrusel.scrollWidth - carrusel.offsetWidth){
        carrusel.classList.add("no-transition");
        carrusel.scrollLeft = carrusel.offsetWidth;
        carrusel.classList.remove("no-transition");
    }
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoplay();
};

carrusel.addEventListener("mousedown", dragStart);
carrusel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carrusel.addEventListener("scroll", infinteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoplay);