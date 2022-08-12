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
    const playerTurn = document.getElementById('turn-message');
    const squares = document.querySelectorAll('.square');
    const popup = document.querySelector('.popup-container');
    const overlay = document.querySelector('.overlay');
    const winnerMessage = document.getElementById('winner-message');
    const restartBtn = document.getElementById('restart-btn');
    let count = 0;
    let winnerFound = false;

    const getCurrentPlayerSymbol = () => {
        if (count % 2 === 1) return player1.getSymbol();
        else return player2.getSymbol()
    };

    const getColor = (symbol, square) => {
        if (symbol === 'X') square.style.color = '#56a7a7';
        else square.style.color = '#d45a5a';
    }
    //disable click on square that is filled
    const disableClick = (square) => {
        square.style.pointerEvents = 'none';
    }
    //enable click on square
    const enableClick = (square) => {
        square.style.pointerEvents = 'auto';
    }
    
    const resetGameboard = () => {
        gameBoard.reset();
        squares.forEach((square) => {
            square.textContent = '';
            enableClick(square);
        });
        count = 0;
        winnerFound = false;
        playerTurn.innerHTML = 'Player X\'s turn';
        playerTurn.style.color = '#217e7e';
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
                winnerMessage.textContent = `Player ${getCurrentPlayerSymbol()} is the winner`;
                if (getCurrentPlayerSymbol() == 'X') winnerMessage.style.color = '#217e7e';
                else winnerMessage.style.color = '#d45a5a';
            }
        })
    }
    
    const openPopup = () => {
        popup.classList.add('popup-container-open');
        overlay.classList.add('overlay-active');
    }
    const closePopup = () => {
        popup.classList.remove('popup-container-open');
        overlay.classList.remove('overlay-active');
        resetGameboard();
    }
    restartBtn.addEventListener('click', closePopup);

    //game play here
    squares.forEach((square, index) => {
        square.addEventListener('click', () =>{
            if (getCurrentPlayerSymbol() == 'X') playerTurn.style.color = '#217e7e';
                else playerTurn.style.color = '#d45a5a';
            playerTurn.innerHTML = `Player ${getCurrentPlayerSymbol()}'s turn`;
            count +=1;
            gameBoard.setSquare(index, getCurrentPlayerSymbol());
            square.textContent = getCurrentPlayerSymbol();
            disableClick(square);
            getColor(square.textContent, square);
            console.log(gameBoard.board);
            console.log(count);
            checkWinner();
            if (winnerFound === true){
                openPopup();
            } else if (count == 9){
                winnerMessage.textContent = 'It is a draw!';
                winnerMessage.style.color = '#ec6a6a';
                openPopup();
                console.log('draw');  
            }
        })
    });

})();
