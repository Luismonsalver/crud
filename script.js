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
                </div>
                <button data-id="${index}" onclick="updatePlayer(event)">Modificar</button>
                <button data-id="${index}" onclick="deletePlayer(event)">Borrar</button>
                <div id="update">
                
                </div>
            `
        });
    }
}

const deletePlayer = (event) => {
    let index = event.target.getAttribute("data-id");
    console.log(index);

    arrayPlayers = JSON.parse(localStorage.getItem("squad")) || [];

    arrayPlayers.splice(index, 1);

    console.log(arrayPlayers);

    playerCreate();
}

const updatePlayer = (event) => {
    const index = event.target.getAttribute("data-id");
    const playerToUpdate = arrayPlayers[index];

    const updateDiv = document.querySelector("#update");

    updateDiv.innerHTML= `
        <input type="text" id="updateName" value = ${playerToUpdate.Name}>
        <input type="text" id="updateLastname" value = ${playerToUpdate.LastName}>
        <input type="number" id="updateNumber" min="1" max="99" pattern="[1-9]{1,2}|99" value = ${playerToUpdate.Number}>
        <button id="confirmButton">Confirmar</button>
    `

    const updateName = document.querySelector("#updateName");
    const updateLastname = document.querySelector("#updateLastname");
    const updateNumber = document.querySelector("#updateNumber");

    const confirmButton = document.querySelector("#confirmButton");
    confirmButton.addEventListener("click", () => {
        // Actualizar los valores del jugador con los nuevos valores ingresados
        playerToUpdate.Name = updateName.value;
        playerToUpdate.LastName = updateLastname.value;
        playerToUpdate.Number = updateNumber.value;

        // Volver a guardar los datos actualizados en LocalStorage
        localStorage.setItem("squad", JSON.stringify(arrayPlayers));

        // Limpiar el div de actualización y volver a mostrar la lista de jugadores
        updateDiv.innerHTML = "";
        playerRead();
    });
}

document.addEventListener("DOMContentLoaded", playerRead)


  