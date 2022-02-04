const container = document.querySelector('.container') as HTMLDivElement;
const seats = document.querySelectorAll('.row .seat:not(.occupied)') as NodeListOf<HTMLDivElement>;
const count = document.getElementById('count') as HTMLSpanElement;
const total = document.getElementById('total') as HTMLSpanElement;
const movieSelect = document.getElementById('movie') as HTMLSelectElement;

populateUI();

let ticketPrice = +movieSelect.value;

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    // convert NodeList to array
    const seatsIndex = [...selectedSeats].map((seat: any) => {
        return [...seats].indexOf(seat);
    })
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    const selectedSeatsCount = selectedSeats.length;
    count.textContent = selectedSeatsCount.toString();
    total.textContent = (selectedSeatsCount * ticketPrice).toString();

}

function populateUI() {
    if (!localStorage.getItem('selectedSeats')) {
        return;
    }
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')!);
    if (selectedSeats !== null && (selectedSeats as string[]).length) {
        seats.forEach((seat, index) => {
            if ((selectedSeats as number[]).indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex) {
        movieSelect.selectedIndex = +selectedMovieIndex;
    }
}

function setMovieData(movieIndex: number, moviePrice: string) {
    localStorage.setItem('selectedMovieIndex', movieIndex.toString());
    localStorage.setItem('selectedMoviePrice', moviePrice);
}


movieSelect.addEventListener('change', (event) => {
    ticketPrice = +(event.target as HTMLSelectElement).value;
    setMovieData((event.target as HTMLSelectElement).selectedIndex, (event.target as HTMLSelectElement).value)
    updateSelectedCount();
})

container.addEventListener('click', (event) => {
    if ((event.target as HTMLDivElement).classList.contains('seat') &&
        !(event.target as HTMLDivElement).classList.contains('occupied')) {
        (event.target as HTMLDivElement).classList.toggle('selected');
        updateSelectedCount();
    }
})

updateSelectedCount();
