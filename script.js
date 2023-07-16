const playerList = document.querySelector("#playerList")
const playerForm = document.querySelector("#playerForm")

let arrayPlayers = []

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

    playerCreate()
})

const playerCreate = () => {
    localStorage.setItem('squad', JSON.stringify(arrayPlayers));
    playerRead();
}

const playerRead = () => {
    playerList.innerHTML="";

    arrayPlayers = JSON.parse(localStorage.getItem("squad"));

    if (arrayPlayers === null){
        arrayPlayers = [];
    } else {
        arrayPlayers.forEach(player => {
            playerList.innerHTML += `
                <div class="playerCard">
                    <p>Nombre: ${player.Name}</p>
                    <p>Nombre: ${player.LastName}</p>
                    <p>Nombre: ${player.Number}</p>
                    <p>Nombre: ${player.Position}</p>

                    <span class="delete">Borrar</span>
                </div>
            `
        });
    }
}

document.addEventListener("DOMContentLoaded", playerRead())



