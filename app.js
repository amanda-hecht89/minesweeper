document.addEventListener('DOMContentLoaded', () => {
    
    const grid = document.querySelector('.grid');
    let width = 15;
    let bombAmount = 25;
    const newGame = document.querySelector('.start');
    let gameOver = false;
    let flags = 0;
    const flagsLeft = document.querySelector('#flagsLeft');
    const result = document.querySelector('#result');



    let squares = [];

    function createboard() {
        flagsLeft.innerHTML = bombAmount;

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

            //click
            square.addEventListener('click', function(e) {
                e.preventDefault();
                click(square);
            });

            //cntrl and left click
            square.oncontextmenu = function(e) {
                e.preventDefault();
                addFlag(square);
            };

        }
        for (let i = 0; i < squares.length; i++) {
            let total = 0;
            const leftEdge = (i % width === 0);
            const rightEdge = (i % width === width - 1);
            
            if (squares[i].classList.contains('valid')) {
                if (i > 0 && !leftEdge && squares[i - 1].classList.contains('bomb')) total++;
                if (i > 14 && !rightEdge && squares[i + 1 - width].classList.contains('bomb')) total++;
                if (i > 15 && squares[i - width].classList.contains('bomb')) total++;
                if (i > 16 && !leftEdge && squares[i - 1 - width].classList.contains('bomb')) total++;
                if (i < 208 && !rightEdge && squares[i + 1 + width].classList.contains('bomb')) total++;
                if (i < 209 && squares[i + width].classList.contains('bomb')) total++;
                if (i < 210 && !leftEdge && squares[i - 1 + width].classList.contains('bomb')) total++;
                if (i < 223 && !rightEdge && squares[i + 1].classList.contains('bomb')) total++;
                squares[i].setAttribute('data', total);
            }
        }
        newGame.addEventListener('click', () => {
            window.location.reload();
        });
    }
    createboard();

    //add flag to right click

    function addFlag(square) {
        if (gameOver) return;
        if (!square.classList.contains('checked') && (flags < bombAmount)) {
            if (!square.classList.contains('flag')) {
                square.classList.add('flag');
                square.innerHTML = '🚩';
                flags ++;
                flagsLeft.innerHTML = bombAmount - flags;
                checkWin();
            } else {
                square.classList.remove('flag');
                square.innerHTML = '';
                flags --;
                flagsLeft.innerHTML = bombAmount - flags;
            }

        } 
    }

    // click on square
    function click(square) {
        let currentId = square.id;
        if (gameOver) return;
        if (square.classList.contains('checked')) return;
        if (square.classList.contains('bomb')) {
            isGameOver(square);
        } 
        else {
            let total = parseInt(square.getAttribute('data'));
            if (total !== 0) {
                square.classList.add('checked');
                square.innerHTML = total;
                return;
            } else {
                square.classList.add('checked');
                checkSquare(square, currentId);
            }
        }
        square.classList.add('checked');
    }
// recursion
    function checkSquare(square, currentId) {
        const leftEdge = (currentId % width === 0);
        const rightEdge = (currentId % width === width - 1);
            
        setTimeout(() => {
            if (currentId > 0 && !leftEdge) {
                const newId = squares[parseInt(currentId) - 1].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId > 14 && !rightEdge) {
                const newId = squares[parseInt(currentId) + 1 - width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId > 15) {
                const newId = squares[parseInt(currentId) - width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId > 16 && !leftEdge) {
                const newId = squares[parseInt(currentId) - 1 - width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId < 223 && !rightEdge) {
                const newId = squares[parseInt(currentId) + 1].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId < 210 && !leftEdge) {
                const newId = squares[parseInt(currentId) - 1 + width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId < 208 && !rightEdge) {
                const newId = squares[parseInt(currentId) + 1 + width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId < 209) {
                const newId = squares[parseInt(currentId) + width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
        }, 10);
    }

    //gameover
    function isGameOver() {
        result.innerHTML = 'BOOM! Game Over!';
        gameOver = true;

        //show all bombs when end of game
        squares.forEach(square => {
            if (square.classList.contains('bomb')) {
                square.innerHTML = '💣';
            }
        });
    }

    //check for a win
    function checkWin() {
        let matches = 0;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')){
                matches ++;
            } if (matches === bombAmount) {
                result.innerHTML = 'YOU WIN!';
                gameOver = true;
            }
        }
    }

    




});