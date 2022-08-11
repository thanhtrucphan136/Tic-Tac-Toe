//gameboard object
const gameBoard = (() =>{
    let board = [];

    for (let i = 0; i < 9; i++){
        board.push('');
    }

    let squares = document.querySelector('.squares');

    //generate gameboard
    for (const element of board){
        const square = document.createElement('div');
        square.classList = 'square';
        squares.appendChild(square);
    }
})();