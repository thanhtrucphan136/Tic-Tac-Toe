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

const displayerController = (() => {
    const player1 = Player('X');
    const player2 = Player('O');
    let count = 0;
    let winnerFound = false;

    const getCurrentPlayerSymbol = () => {
        if (count % 2 === 1) return player1.getSymbol()
        else return player2.getSymbol()
    };
    
    const resetGameboard = () => {
        gameBoard.reset();
        squares.forEach((square) => {
            square.textContent = '';
        });
        count = 0;
        winnerFound = false;
    };

    const checkWinner = () =>{
        const winningCase =[
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ];
        winningCase.forEach((eachCase) => {
            if (gameBoard.board[eachCase[0]] == getCurrentPlayerSymbol() 
            && gameBoard.board[eachCase[1]] == getCurrentPlayerSymbol()
            && gameBoard.board[eachCase[2]] == getCurrentPlayerSymbol()){
                winnerFound = true;
                console.log(`Player ${getCurrentPlayerSymbol()} is the winner`);
            }
        })
    }

    const squares = document.querySelectorAll('.square');
    squares.forEach((square, index) => {
        square.addEventListener('click', () =>{
            count +=1;
            gameBoard.setSquare(index, getCurrentPlayerSymbol());
            square.textContent = getCurrentPlayerSymbol();
            console.log(gameBoard.board);
            console.log(count);
            checkWinner();
            if (winnerFound === true){
                setTimeout(() => resetGameboard(), 1000);
            } else if (count == 9){
                //resetGameboard();
                setTimeout(() => resetGameboard(), 1000);
                console.log('draw');
            }
        })
    });

})();
