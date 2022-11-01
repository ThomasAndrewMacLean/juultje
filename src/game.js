const state = {
    players: [],
    currentPlayer: 0
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
    state.players = Array.from(document.querySelector(".addPlayersList").children).map(c => c.querySelector("input").value).filter(x => x)
    setupPlayers()
    document.getElementById("setup").classList.add("hide");
    document.getElementById("game").classList.remove("hide")
})

// setup players
const setupPlayers = () => {
    const players = document.createElement("ul");
    players.innerHTML = state.players.map((player, index) => `<li class="${index === 0 ? 'activePlayer player' : 'player'}">${player}</li>`).join("")
    document.querySelector("footer").appendChild(players)
    document.querySelector("footer").classList.remove("hide")
}

// next player
const goToNextPlayer = () => {
    state.currentPlayer = (state.currentPlayer + 1) % state.players.length;
    document.querySelector(".activePlayer").classList.remove("activePlayer")
    Array.from(document.querySelectorAll("footer li"))[state.currentPlayer].classList.add("activePlayer")
}
document.getElementById("nextPlayer").addEventListener("click",
    goToNextPlayer)

