let Board = (function(){
    let element = document.querySelector('#board');
    return{element};
})();
let User = (function(){
    let name = '';
    return {};
})();
let Game = (function(){
    return {};
})();

let startForm = document.querySelector('#start-game-form');
let startButton = document.querySelector('#start-game');
let exitButton = document.querySelector('#exit-game');

startButton.addEventListener('click',e=>{
    Board.element.classList.remove('invisible');
    startForm.classList.add('invisible');
});
exitButton.addEventListener('click', e=>{
    Board.element.classList.add('invisible');
    startForm.classList.remove('invisible');
});