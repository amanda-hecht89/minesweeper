document.addEventListener('DOMContentLoaded', () => {
    
    const grid = document.querySelector('.grid');
    let width = 15;
    // let height = 20;
    let bombAmount = 25;
    const newGame = document.querySelector('.start');

    let squares = [];

    function createboard() {

        // shuffled game with bombs
        const bombsArray = Array(bombAmount).fill('bomb');
        const emptyArray = Array(width * width - bombAmount).fill('valid');
        const gameArray = emptyArray.concat(bombsArray);
        const shuffleArray = gameArray.sort(() => Math.random() - 0.5);

        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div');
            square.setAttribute('id', i);
            square.classList.add(shuffleArray[i]);
            grid.appendChild(square);
            squares.push(square);
        }
        for (let i = 0; i < squares.length; i++) {
            let total = 0;
            const leftEdge = (i % width === 0);
            const rightEdge = (i % width === width - 1);
            
            if (squares[i].classList.contains('valid')) {
                if (i > 0 && !leftEdge && squares[i - 1].classList.contains('bomb')) total ++;
                if (i > 14 && !rightEdge && squares[i + 1 - width].classList.contains('bomb')) total ++;

                squares[i].setAttribute('data', total);
            }
        }







        newGame.addEventListener('click', () => {
            window.location.reload();
        
        });








    }
    createboard();







});