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
        arrayPlayers.forEach((player, index) => {
            playerList.innerHTML += `
                <div class="playerCard">
                    <p>Nombre: ${player.Name}</p>
                    <p>Apellido: ${player.LastName}</p>
                    <p>Dorsal: ${player.Number}</p>
                    <p>Posición: ${player.Position}</p>

                    <button data-id="${index}" onclick="deletePlayer(event)">Borrar</button>
                </div>
            `
        });
    }
}

document.addEventListener("DOMContentLoaded", playerRead)

const deletePlayer = (event) => {
    let index = event.target.getAttribute("data-id");
    console.log(index);

    arrayPlayers = JSON.parse(localStorage.getItem("squad")) || [];

    arrayPlayers.splice(index, 1);

    console.log(arrayPlayers);

    playerCreate();
}
  