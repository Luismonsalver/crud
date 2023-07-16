const playerList = document.querySelector("#playerList")
const playerForm = document.querySelector("#playerForm")
const addPlayerList = document.querySelector("#addPlayerList")

let arrayPlayers = [];
let currentUpdateDiv = null;

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

    if (arrayPlayers.length < 23){

    arrayPlayers.push(player)

    console.log(arrayPlayers)

    playerForm.reset()

    playerCreate()
    } else {
        const playersLimitMessage = document.querySelector("#playersLimitMessage");
        if (!playersLimitMessage) {
            const playersLimit = document.createElement("p");
            playersLimit.id = "playersLimitMessage";
            playersLimit.innerHTML = `Has llegado al límite de jugadores, elimina un jugador si quieres agregar otro`;
            addPlayerList.appendChild(playersLimit);
        }
    }   
});

const playerCreate = () => {
    localStorage.setItem('squad', JSON.stringify(arrayPlayers));
    playerRead();
}

const playerRead = () => {
    playerList.innerHTML = "";

    arrayPlayers = JSON.parse(localStorage.getItem("squad"));

    if (arrayPlayers === null) {
        arrayPlayers = [];
    } else {
        arrayPlayers.forEach((player, index) => {
            const playerContainer = document.createElement("div");
            playerContainer.classList.add("playerContainer");
            playerContainer.setAttribute("data-id", index)

            playerContainer.innerHTML = `
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
            `;

            playerList.appendChild(playerContainer);
        });
    } 
};


const deletePlayer = (event) => {
    let index = event.target.getAttribute("data-id");
    console.log(index);

    arrayPlayers = JSON.parse(localStorage.getItem("squad")) || [];

    arrayPlayers.splice(index, 1);

    console.log(arrayPlayers);

    playerCreate();
};

const updatePlayer = (event) => {
    const index = event.target.getAttribute("data-id");
    const playerToUpdate = arrayPlayers[index];

    const playerContainer = document.querySelector(`.playerContainer[data-id="${index}"]`);
    const updateDiv = playerContainer.querySelector("#update");

    if (currentUpdateDiv) {
        currentUpdateDiv.innerHTML = "";
    }

    updateDiv.innerHTML= `
        <input type="text" id="updateName" value = ${playerToUpdate.Name}>
        <input type="text" id="updateLastname" value = ${playerToUpdate.LastName}>
        <input type="number" id="updateNumber" min="1" max="99" pattern="[1-9]{1,2}|99" value = ${playerToUpdate.Number}>
        <select id="updatePosition">
            <option value="${playerToUpdate.Position}">Mantener posición</option>
            <option value="Delantero">Delantero</option>
            <option value="Mediocampo">Mediocampo</option>
            <option value="Defensa">Defensa</option>
            <option value="Portero">Portero</option>
        </select>
        <button id="confirmButton">Confirmar</button>
    `

    currentUpdateDiv = updateDiv;

    const updateName = document.querySelector("#updateName");
    const updateLastname = document.querySelector("#updateLastname");
    const updateNumber = document.querySelector("#updateNumber");
    const updatePosition = document.querySelector("#updatePosition");

    const confirmButton = document.querySelector("#confirmButton");
    confirmButton.addEventListener("click", () => {
        
        playerToUpdate.Name = updateName.value;
        playerToUpdate.LastName = updateLastname.value;
        playerToUpdate.Number = updateNumber.value;
        playerToUpdate.Position = updatePosition.value;

        localStorage.setItem("squad", JSON.stringify(arrayPlayers));

        updateDiv.innerHTML = "";
        playerRead();

        currentUpdateDiv = null;
    });
};

document.addEventListener("DOMContentLoaded", playerRead); 