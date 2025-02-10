const score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};
// || default operator, if left side is falsy, output right side
updateScoreElement();

// const score = {
//         wins: 0,
//         losses: 0,
//         ties: 0
//     };

// console.log(JSON.parse(localStorage.getItem('score')));
// //retrieves scores from local storage


    //     //console.log(JSON.stringify(score)); //shows results in console
    //     // console.log(JSON.parse(JSON.stringify(score)));
    //     //score is an js object and can be converted to json object using JSON.stringify as strings, function can't be converted to json object
    //     //JSON.parse(JSON.stringify(score)) is used to convert json object to js object

    let isAutoPlaying = false;
    let intervalId; //stores interval id
function autoPlay() {
    if(!isAutoPlaying) { //prevents multiple intervals
        intervalId = setInterval(function() {
             const playerMove = ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];
             playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false; //stops or reset interval
    }
}



//removed onclick attribute from html and added event listener
document.querySelector('.js-rock-button').addEventListener('click', () => playGame('rock'));

document.querySelector('.js-paper-button').addEventListener('click', () => playGame('paper'));

document.querySelector('.js-scissors-button').addEventListener('click', () => playGame('scissors'));



function playGame(playerMove){
    const moves = ['rock', 'paper', 'scissors'];
    const computerMove = moves[Math.floor(Math.random() * 3)];
/*
Math.random() generates a random decimal between 0 and 1.
Multiplying by 3 (Math.random() * 3) gives a range between 0 and 2.999.
Math.floor() rounds down to 0, 1, or 2
*/

    let result = '';
    if(playerMove === computerMove){
        result = 'tie!';
        score.ties++;
    } else if(
        (playerMove === 'rock' && computerMove === 'scissors') ||
        (playerMove === 'paper' && computerMove === 'rock') ||
        (playerMove === 'scissors' && computerMove === 'paper')
    ){
        result = 'You win!';
        score.wins++;
    } else {
        result = 'You lose!';
        score.losses++;
    };

    localStorage.setItem('score', JSON.stringify(score));
//saved scores in local storage

    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result

    document.querySelector('.js-moves').innerHTML = `You 
        <img src="images/${playerMove}-emoji.png" class="move-icon">
        <img src="images/${computerMove}-emoji.png" class="move-icon">
        Computer`;
}

// document.querySelector('.js-moves').innerHTML = `You picked ${playerMove} - Computer picked ${computerMove}`;



//     alert(`You picked ${playerMove}, Computer picked ${computerMove}, ${result}, Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);
// }

function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
};