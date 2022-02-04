"use strict";
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
populateUI();
let ticketPrice = +movieSelect.value;
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    // convert NodeList to array
    const seatsIndex = [...selectedSeats].map((seat) => {
        return [...seats].indexOf(seat);
    });
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    const selectedSeatsCount = selectedSeats.length;
    count.textContent = selectedSeatsCount.toString();
    total.textContent = (selectedSeatsCount * ticketPrice).toString();
}
function populateUI() {
    if (!localStorage.getItem('selectedSeats')) {
        return;
    }
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex) {
        movieSelect.selectedIndex = +selectedMovieIndex;
    }
}
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex.toString());
    localStorage.setItem('selectedMoviePrice', moviePrice);
}
movieSelect.addEventListener('change', (event) => {
    ticketPrice = +event.target.value;
    setMovieData(event.target.selectedIndex, event.target.value);
    updateSelectedCount();
});
container.addEventListener('click', (event) => {
    if (event.target.classList.contains('seat') &&
        !event.target.classList.contains('occupied')) {
        event.target.classList.toggle('selected');
        updateSelectedCount();
    }
});
updateSelectedCount();
