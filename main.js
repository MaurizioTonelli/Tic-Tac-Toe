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
        currentTurn = 'x';
    }
    return{element, squares, place, clear, addSquareListeners};
})();
let User = (function(){
    let name = '';
    return {};
})();
let Game = (function(){
    let gameOver = false;
    let checkForWinner = function(){
        if(isInLine(0,1,2,'X')|| isInLine(3,4,5,'X')||isInLine(6,7,8,'X')||
        isInLine(0,3,6,'X')||isInLine(1,4,7,'X')||isInLine(2,5,8,'X')||
        isInLine(0,4,8,'X')||isInLine(2,4,6,'X')){
            console.log('x wins');
            Game.gameOver = true;
        }
        if(isInLine(0,1,2,'O')|| isInLine(3,4,5,'O')||isInLine(6,7,8,'O')||
        isInLine(0,3,6,'O')||isInLine(1,4,7,'O')||isInLine(2,5,8,'O')||
        isInLine(0,4,8,'O')||isInLine(2,4,6,'O')){
            console.log('o wins');
            Game.gameOver = true;
        }
    }
    let isInLine = function(a,b,c,string){
        return (Board.squares[a].textContent == string && 
                Board.squares[b].textContent == string && 
                Board.squares[c].textContent == string);
    }
    return {checkForWinner, gameOver};
})();

let startForm = document.querySelector('#start-game-form');
let startButton = document.querySelector('#start-game');
let exitButton = document.querySelector('#exit-game');
let newGameButton = document.querySelector('#new-game');

startButton.addEventListener('click',e=>{
    Board.element.classList.remove('invisible');
    startForm.classList.add('invisible');
});
exitButton.addEventListener('click', e=>{
    Board.element.classList.add('invisible');
    startForm.classList.remove('invisible');
});
newGameButton.addEventListener('click',e=>{
    Board.clear();
});
Board.addSquareListeners();