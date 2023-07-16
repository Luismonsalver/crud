const playerList = document.querySelector("#playerList")
const playerForm = document.querySelector("#playerForm")

const arrayPlayers = []

playerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const playerName = document.querySelector("#playerName").value
    const playerLastname = document.querySelector("#playerLastname").value
    const playerNumber = document.querySelector("#playerNumber").value
    const playerPosition = document.querySelector("#playerPosition").value

    const player = {
        Name: playerName,
        LastName: playerLastname,
        Number: playerNumber,
        Position: playerPosition
    }

    arrayPlayers.push(player)

    console.log(arrayPlayers)

    playerForm.reset()

    playerPost()
})

const playerPost = () => {
    localStorage.setItem('squad', JSON.stringify(arrayPlayers))
}





