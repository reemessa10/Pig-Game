'use strict'; 

const btnNew = document.querySelector(".btn-new");
const btnRoll = document.querySelector(".btn-roll");
const btnHold = document.querySelector(".btn-hold"); 
const diceEl = document.querySelector(".dice"); 

const player0 = document.querySelector(".player-0");
const player1 = document.querySelector(".player-1");
const score0 = document.querySelector("#score-0"); 
const score1 = document.querySelector("#score-1"); 
const current0 = document.querySelector("#current-0"); 
const current1 = document.querySelector("#current-1"); 

//Starting condition
diceEl.classList.add('hidden'); 

//declaring varibles 
let playing , currentScore , activePlayer , totalScore; 

// initialization Function 
const init = function(){
    //1. reset total scores 
    totalScore = [0, 0];
    score0.textContent = 0;
    score1.textContent = 0;

    //2. reset current scores 
    currentScore = 0;
    current0.textContent = 0;
    current1.textContent = 0;

    //3. reset playing state
    playing = true;

    //4.reset active player 
    activePlayer = 0;
    document.querySelector(`.player-${activePlayer}`).classList.remove('player-winner');
    document.querySelector(`.player-${activePlayer}`).classList.add('player-active'); 
}
init();

//switch Player Function
const switchPlayer = function(){ 
    document.querySelector(`#current-${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle("player-active");
    player1.classList.toggle("player-active");
}


btnRoll.addEventListener('click' , function(){
    if(playing) { 

    // 1.Generating random dice 
    let dice = Math.trunc(Math.random() * 6) + 1;
    
    // 2.Display to the DiceEl 
    diceEl.classList.remove('hidden'); 
    diceEl.src = `imgs/dice-${dice}.png`;

    // 3. Add dice to currentEl 
    if(dice !== 1){ 
        currentScore += dice; 
        document.querySelector(`#current-${activePlayer}`).textContent = currentScore; 
    }else{ 
        // Switch to other Player
       switchPlayer();
    }

  }
})

btnHold.addEventListener('click', function(){ 
    if (playing){ 

    // 1.Add current score to Total score 
    totalScore[activePlayer] += currentScore; 
    document.querySelector(`#score-${activePlayer}`).textContent = totalScore[activePlayer]; 

    // 2. Check if Total score is at least 100 
    if (totalScore[activePlayer] >= 100){ 
        // Finish the game
        playing = false; 

        diceEl.classList.add('hidden'); 
        document.querySelector(`.player-${activePlayer}`).classList.add('player-winner'); 
        document.querySelector(`.player-${activePlayer}`).classList.remove('player-active'); 
    }else{ 
        //Switch to other Player
        switchPlayer();
    }

  }
})

btnNew.addEventListener('click', init); 