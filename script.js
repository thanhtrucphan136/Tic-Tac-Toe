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

    const setSquare = (index, symbol) => {
        board[index] = symbol;
    };

    const getSquare = (index) => {
        return board[index];
    };

    const reset = () => {
        for (let i = 0; i < board.length; i++){
            board[i] = '';
        }
    };

    return {board ,getSquare, reset, setSquare}
})();

//player object
const Player = (symbol) => {
    this.symbol = symbol;

    const getSymbol = () => {
        return symbol
    };

    return {getSymbol}
}

const gameTracker = (() => {
    const player1 = Player('X');
    const player2 = Player('O');
    let count = 0;

    const getCurrentPlayerSymbol = () => {
        if (count % 2 === 1) return player1.getSymbol()
        else return player2.getSymbol()
    };

    const squares = document.querySelectorAll('.square');
    squares.forEach((square, index) => {
        square.addEventListener('click', () =>{
            count +=1;
            gameBoard.setSquare(index, getCurrentPlayerSymbol());
            square.textContent = getCurrentPlayerSymbol();
            console.log(gameBoard.board);
            console.log(count);
        })
    })
})();
