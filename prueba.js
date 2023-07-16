const updatePlayer = (event) => {
    const index = event.target.getAttribute("data-id");
    const playerToUpdate = arrayPlayers[index];

    const updateDiv = document.getElementById("update");
    updateDiv.innerHTML = ""; // Limpiar el contenido del div de actualización

    // Crear entradas de texto para cada propiedad del jugador
    const nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("value", playerToUpdate.Name);

    const lastnameInput = document.createElement("input");
    lastnameInput.setAttribute("type", "text");
    lastnameInput.setAttribute("value", playerToUpdate.LastName);

    const numberInput = document.createElement("input");
    numberInput.setAttribute("type", "text");
    numberInput.setAttribute("value", playerToUpdate.Number);

    const positionInput = document.createElement("input");
    positionInput.setAttribute("type", "text");
    positionInput.setAttribute("value", playerToUpdate.Position);

    // Crear botón de confirmación para actualizar
    const confirmButton = document.createElement("button");
    confirmButton.textContent = "Confirmar";
    confirmButton.addEventListener("click", () => {
        // Actualizar los valores del jugador con los nuevos valores ingresados
        playerToUpdate.Name = nameInput.value;
        playerToUpdate.LastName = lastnameInput.value;
        playerToUpdate.Number = numberInput.value;
        playerToUpdate.Position = positionInput.value;

        // Volver a guardar los datos actualizados en LocalStorage
        localStorage.setItem("squad", JSON.stringify(arrayPlayers));

        // Limpiar el div de actualización y volver a mostrar la lista de jugadores
        updateDiv.innerHTML = "";
        playerRead();
    });

    // Agregar las entradas de texto y el botón de confirmación al div de actualización
    updateDiv.appendChild(nameInput);
    updateDiv.appendChild(lastnameInput);
    updateDiv.appendChild(numberInput);
    updateDiv.appendChild(positionInput);
    updateDiv.appendChild(confirmButton);
}

const updatePlayer = (event) => {
    const index = event.target.getAttribute("data-id");
    const playerToUpdate = arrayPlayers[index];

    const updateDiv = document.querySelector("#update");
    updateDiv.innerHTML = "";

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