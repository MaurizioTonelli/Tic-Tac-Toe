let Board = (function(){
    let element = document.querySelector('#board');
    let squares = document.querySelectorAll('.row div');
    let currentTurn = 'x';
    function addSquareListeners(){
        squares.forEach((square)=>{
            square.addEventListener('click', place);
        });
    }
    let place = function(e){
        if(this.textContent != '' || Game.gameOver == true){
            return;
        }
        if(currentTurn == 'x'){
            this.textContent = 'X';
            currentTurn = 'o';
        }else{
            this.textContent = 'O';
            currentTurn = 'x';
        }
        Game.checkForWinner();
    }
    let clear = function(){
        squares.forEach(square=>{
            square.textContent = '';
        });
        Game.gameOver = false;
        Game.end();
        currentTurn = 'x';
    }
    return{element, squares, place, clear, addSquareListeners};
})();

let Game = (function(){
    let player1Name = 'Player 1';
    let player2Name = 'Player 2';
    let winner = '';
    let gameOver = false;
    let run = function(){
        Board.addSquareListeners();
    }
    let start = function(){
        let player1Input =document.querySelector('#player1-name').value;
        let player2Input =document.querySelector('#player2-name').value;
        if(player1Input != ''){
            player1Name = player1Input;
        }
        if(player2Input != ''){
            player2Name = player2Input;
        }
    }
    let end = function(){
        winnerHeader.textContent = '';
    }
    let checkForWinner = function(){
        if(isInLine(0,1,2,'X')|| isInLine(3,4,5,'X')||isInLine(6,7,8,'X')||
        isInLine(0,3,6,'X')||isInLine(1,4,7,'X')||isInLine(2,5,8,'X')||
        isInLine(0,4,8,'X')||isInLine(2,4,6,'X')){
            winner = player1Name;
            winnerHeader.textContent = `${winner} wins!`;
            Game.gameOver = true;
        }
        if(isInLine(0,1,2,'O')|| isInLine(3,4,5,'O')||isInLine(6,7,8,'O')||
        isInLine(0,3,6,'O')||isInLine(1,4,7,'O')||isInLine(2,5,8,'O')||
        isInLine(0,4,8,'O')||isInLine(2,4,6,'O')){
            console.log('o wins');
            winner = player2Name;
            winnerHeader.textContent = `${winner} wins!`;
            Game.gameOver = true;
        }
    }
    let isInLine = function(a,b,c,string){
        return (Board.squares[a].textContent == string && 
                Board.squares[b].textContent == string && 
                Board.squares[c].textContent == string);
    }
    return {run, start, end, checkForWinner, gameOver};
})();

let startForm = document.querySelector('#start-game-form');
let startButton = document.querySelector('#start-game');
let exitButton = document.querySelector('#exit-game');
let newGameButton = document.querySelector('#new-game');
let winnerHeader = document.querySelector('#winner');

startButton.addEventListener('click',e=>{
    Board.element.classList.remove('invisible');
    startForm.classList.add('invisible');
    Game.start();
});
exitButton.addEventListener('click', e=>{
    Board.element.classList.add('invisible');
    startForm.classList.remove('invisible');
    Board.clear();
    Game.end();
});
newGameButton.addEventListener('click',e=>{
    Board.clear();
});
Game.run();