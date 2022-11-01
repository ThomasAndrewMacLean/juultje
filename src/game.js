const state = {}


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
    state.players = Array.from(document.querySelector(".addPlayersList").children).map(c => c.querySelector("input").value)

    document.getElementById("setup").classList.add("hide");
    document.getElementById("game").classList.remove("hide")
})