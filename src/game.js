const state = {
    players: ['a', "b"],
    scores: [],

    currentDice: [0, 0, 0, 0, 0],
    activeDie: [true, true, true, true, true],
    currentScore: 0,
    currentPlayer: 0,
    roll: 0
}


// Screen1 Player selection
document.getElementById("addPlayer").addEventListener("click", () => {
    const addPlayersList = document.querySelector(".addPlayersList");

    // number of current players
    const newNumber = addPlayersList.children.length + 1;
    const newPlayerHTML = `
   <label for="player${newNumber}">Player ${newNumber}</label>
   <input type="text" name="player${newNumber}" id="player${newNumber}">
`
    const newPlayer = document.createElement("li")
    newPlayer.innerHTML = newPlayerHTML;
    addPlayersList.appendChild(newPlayer)

})

// Start game 
document.getElementById("startGame").addEventListener("click", () => {
    //TODO: turn back on
    // state.players = Array.from(document.querySelector(".addPlayersList").children).map(c => c.querySelector("input").value).filter(x => x)
    setupPlayers()
    state.scores = new Array(state.players.length).fill(0);
    document.getElementById("setup").classList.add("hide");
    document.getElementById("game").classList.remove("hide")
})

// setup players
const setupPlayers = () => {
    const players = document.createElement("ul");
    players.innerHTML = state.players.map((player, index) => `<li class="${index === 0 ? 'activePlayer player' : 'player'}">${player} : <span>0</span></li>`).join("")
    document.querySelector("footer").appendChild(players)
    document.querySelector("footer").classList.remove("hide")
}

// next player
const goToNextPlayer = () => {
    // add score
    state.scores[state.currentPlayer] += state.currentScore;
    state.currentScore = 0;
    document.querySelector(".activePlayer").querySelector("span").innerHTML = state.scores[state.currentPlayer]
    state.currentPlayer = (state.currentPlayer + 1) % state.players.length;
    document.querySelector(".activePlayer").classList.remove("activePlayer")
    Array.from(document.querySelectorAll("footer li"))[state.currentPlayer].classList.add("activePlayer")
}
document.getElementById("nextPlayer").addEventListener("click",
    goToNextPlayer)

// Roll dice
const rollDice = (e) => {
    if(e) e.target.disabled = true
    const dieToThrow = 5 //state.activeDie.filter(d => d).length

    for (let index = 0; index < dieToThrow; index++) {
        const die = Math.ceil(Math.random() * 6)

        state.currentDice[index] = die;
        document.getElementById("die" + index).previousElementSibling.innerHTML = die

    }
}

document.getElementById("roll").addEventListener("click", rollDice)
const disableDie = () => {
    Array.from(document.querySelectorAll("#dice input")).forEach(i => { if (i.checked) i.disabled = true })
}
const setCurrentScore = () => {
    document.getElementById("score").innerHTML = state.currentScore;
}
const savePoints = (points) => {
    state.roll += 1;
    state.currentScore += points;
    disableDie()
    setCurrentScore()
    //TODO check if roll is 3 if we have enough points
    rollDice()

}
const getPoints = (e) => {
    // check if value is valid
    const selected = Array.from(document.querySelectorAll("#dice input")).map(x => x.checked && !x.disabled)
    const selectedDie = state.currentDice.map((c, i) => selected[i] ? c : 0).filter(x => x);
    console.log(selectedDie)


    // if all 3 are same
    if (selectedDie.length === 3 && selectedDie.every( (val, i, arr) => val === arr[0] )) {
        if(selectedDie[0] === 1){
           savePoints(1000)
        }
        savePoints(selectedDie[0] * 100)
    }

    if (selectedDie.length === 4 && selectedDie.every( (val, i, arr) => val === arr[0] )) {
        savePoints(1500)
    }

    if (selectedDie.length === 5 && selectedDie.every( (val, i, arr) => val === arr[0] )) {
        savePoints(2000)
    }

    if(selectedDie.every( (val, i, arr) => val === 1 || val === 5 )){
        savePoints(selectedDie.reduce((a,b) =>{return b === 1 ? a + 100 : a + 50},0))
    }
        // length = 1
        // if (selectedDie.length === 1) {
        //     if (selectedDie[0] === 1) {
        //         savePoints(100)
        //     }
        //     if (selectedDie[0] === 5) {
        //        savePoints(50)
        //     }
        // }
}

document.getElementById("getPoints").addEventListener("click", getPoints)
