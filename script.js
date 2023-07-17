const playerList = document.querySelector("#playerList")
const playerForm = document.querySelector("#playerForm")
const addPlayerList = document.querySelector("#addPlayerList")

let arrayPlayers = [];
let currentUpdateDiv = null;

// VARIABLES PARA MENSAJES DE ERROR
let errorMessage = null;
let errorMessageExist = null;
let updateErrorMessage = null;
let updateErrorMessageExist = null;

// FUNCION DE FORMULARIO QUE SE LLAMA CUANDO SE PRESIONA EL BOTON DE AGREGAR
playerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const playerName = document.querySelector("#playerName").value
    const playerLastname = document.querySelector("#playerLastname").value
    const playerNumber = document.querySelector("#playerNumber").value
    const playerPosition = document.querySelector("#playerPosition").value

    const existPlayerNumber = arrayPlayers.find((player => (player.Number === `${playerNumber}`)))

    if (!playerName || !playerLastname || !playerNumber || !playerPosition) {
        if (!errorMessage) {
            errorMessage = document.createElement("p");
            errorMessage.id = "errorMessage";
            errorMessage.textContent = "Todos los campos deben ser rellenados para agregar un jugador.";
            playerForm.appendChild(errorMessage);
        }
        return;
    } else {
        if (errorMessage) {
            errorMessage.remove();
            errorMessage = null;
        }
    }

    if (existPlayerNumber){
        if (!errorMessageExist) {
            errorMessageExist = document.createElement("p");
            errorMessageExist.id = "errorMessage";
            errorMessageExist.textContent = "Ya existe un jugador con ese número.";
            playerForm.appendChild(errorMessageExist);
        }
        return;
    } else {
        if (errorMessageExist) {
        errorMessageExist.remove();
        errorMessageExist = null;
        }
    }

    const player = {
        Name: playerName,
        LastName: playerLastname,
        Number: playerNumber,
        Position: playerPosition
    }

    if (arrayPlayers.length < 4){

    arrayPlayers.push(player)

    console.log(arrayPlayers)

    playerForm.reset()

    playerCreate()
    } else {
        const playersLimitMessage = document.querySelector("#playersLimitMessage");
        if (!playersLimitMessage) {
            const playersLimit = document.createElement("p");
            playersLimit.id = "errorMessage";
            playersLimit.innerHTML = `Has llegado al límite de jugadores, elimina un jugador si quieres agregar otro.`;
            playerForm.appendChild(playersLimit);
        }
    }   
});

// FUNCION PARA AGREGAR UN JUGADOR
const playerCreate = () => {
    localStorage.setItem('squad', JSON.stringify(arrayPlayers));
    playerRead();
}

// FUNCION PARA MOSTRAR LOS JUGADORES EN PANTALLA
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
                    <div class="playerData">
                        <div class="dataNames">
                            <p class="name">${player.Name}</p>
                            <p class="lastname">${player.LastName}</p>
                        </div>
                        <p class="${player.Position}">${player.Position}</p>
                    </div>
                    <p class="number">${player.Number}</p>
                </div>
                <div class="playerOptions">
                    <button class="updateButton" data-id="${index}" onclick="updatePlayer(event)">Modificar</button>
                    <button class="deleteButton" data-id="${index}" onclick="deletePlayer(event)">Borrar</button>
                </div>
            `;

            playerList.appendChild(playerContainer);
        });
    } 
};

// FUNCION PARA BORRAR UN JUGADOR
const deletePlayer = (event) => {

    const confirmacion = window.confirm("¿Estás seguro de que deseas borrar este jugador?");

    if (confirmacion) {
        let index = event.target.getAttribute("data-id");

        arrayPlayers = JSON.parse(localStorage.getItem("squad")) || [];

        arrayPlayers.splice(index, 1);

        console.log(arrayPlayers);

        playerCreate();
    };
};

// FUNCION PARA ACTUALIZAR UN JUGADOR
const updatePlayer = (event) => {
    const index = event.target.getAttribute("data-id");
    const playerToUpdate = arrayPlayers[index];

    const playerContainer = document.querySelector(`.playerContainer[data-id="${index}"]`);

    if (currentUpdateDiv) {
        return;
    }

    updateDiv = document.createElement("div")
    updateDiv.id="update"
    updateDiv.innerHTML= `
        <p>Nombre</p><input type="text" id="updateName" value = ${playerToUpdate.Name}>
        <p>Apellido</p><input type="text" id="updateLastname" value = ${playerToUpdate.LastName}>
        <p>Dorsal</p><input type="number" id="updateNumber" min="1" max="99" pattern="[1-9]{1,2}|99" value = ${playerToUpdate.Number}>
        <p>Posición</p><select id="updatePosition">
            <option value="${playerToUpdate.Position}">Mantener posición</option>
            <option value="Delantero">Delantero</option>
            <option value="Mediocampo">Mediocampo</option>
            <option value="Defensa">Defensa</option>
            <option value="Portero">Portero</option>
        </select>
        <button id="confirmButton">Confirmar</button>
    `
    playerContainer.appendChild(updateDiv)

    currentUpdateDiv = updateDiv;

    const updateName = document.querySelector("#updateName");
    const updateLastname = document.querySelector("#updateLastname");
    const updateNumber = document.querySelector("#updateNumber");
    const updatePosition = document.querySelector("#updatePosition");

    const confirmButton = document.querySelector("#confirmButton");
    confirmButton.addEventListener("click", () => {
        
        const existPlayerNumberUpdate = arrayPlayers.find((player => (player.Number === `${updateNumber.value}`)))

        if (!updateName.value || !updateLastname.value || !updateNumber.value || !updatePosition.value) {
            if (!updateErrorMessage) {
                updateErrorMessage = document.createElement("p");
                updateErrorMessage.id = "errorMessage";
                updateErrorMessage.textContent = "Todos los campos deben ser rellenados para modificar un jugador.";
                updateDiv.appendChild(updateErrorMessage);
            }
            return;
        } else {
            if (updateErrorMessage) {
                updateErrorMessage.remove();
                updateErrorMessage = null;
            }
        }

        if (arrayPlayers[index].Number !== `${updateNumber.value}`) {
            if (existPlayerNumberUpdate){
                if (!updateErrorMessageExist) {
                    updateErrorMessageExist = document.createElement("p");
                    updateErrorMessageExist.id = "errorMessage";
                    updateErrorMessageExist.textContent = "Ya existe un jugador con ese número.";
                    updateDiv.appendChild(updateErrorMessageExist);
                }
                return;
            } else {
                if (updateErrorMessageExist) {
                updateErrorMessageExist.remove();
                updateErrorMessageExist = null;
                }
            }
        }
        

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

// UNA VEZ QUE EL DOM HAYA CARGADO, MOSTRAR LOS JUGADORES
document.addEventListener("DOMContentLoaded", playerRead); 