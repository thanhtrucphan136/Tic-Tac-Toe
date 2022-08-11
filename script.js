//gameboard object
const gameBoard = (() =>{
    let board = [];
    let squares = document.querySelector('.squares');

    //generate gameboard and board array
    for (let i = 0; i < 9; i++){
        board.push('');
        const square = document.createElement('div');
        square.classList = 'square';
        squares.appendChild(square);
    }

    const setSquare = (index, mark) => {
        board[index] = mark;
    }

    const getSquare = (index) => {
        return board[index];
    }

    const reset = () => {
        for (let i = 0; i < board.length; i++){
            board[i] = '';
        }
    }

    return {board ,getSquare, reset, setSquare}
})();

gameBoard.setSquare(2,'X');
console.log(gameBoard.board);