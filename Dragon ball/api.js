// Definimos la URL de la API oficial de Dragon Ball
const urlApi = "https://dragonball-api.com/api/characters";

// Función asíncrona para pedir los datos
const cargarPersonajes = () => {
    // Usamos fetch para hacer la petición HTTP
    fetch(urlApi)
        .then(respuesta => respuesta.json()) // Convertimos la respuesta cruda a formato JSON
        .then(data => {
            // La API devuelve un objeto con una propiedad 'items' que contiene el array
            const personajes = data.items;
           
            console.log("Datos recibidos:", personajes); // Debugging en consola
           
            // Llamamos a la función que se encarga de dibujar en pantalla
            mostrarPersonajes(personajes);
        })
        .catch(error => {
            // Buena práctica: Manejar errores por si falla la red o la API
            console.error("Error al cargar los personajes:", error);
            alert("Hubo un error al cargar los datos. Revisa la consola.");
        })
}

// Función encargada de manipular el DOM
const mostrarPersonajes = (personajes) => {
    // 1. Seleccionamos el contenedor del HTML
    const contenedorPersonajes = document.getElementById("contenedor-personajes");
   
    // 2. Limpiamos el contenedor por si ya tenía contenido previo
    contenedorPersonajes.innerHTML = "";

    // 3. Recorremos cada personaje del array
    personajes.forEach(personaje => {
        // Creamos un elemento DIV nuevo en memoria
        const tarjeta = document.createElement("div");
       
        // Le añadimos la clase CSS que definimos en el paso 3
        tarjeta.classList.add("practice-card");
       
        // Usamos Template Strings (``) para inyectar el HTML interno con los datos
        tarjeta.innerHTML = `
            <img src="${personaje.image}" alt="${personaje.name}" width="100%" style="object-fit: contain; height: 300px;">
            <h3 class="practice-title">${personaje.name}</h3>
            <p class="practice-description">${personaje.description}</p>
            <p><strong>Ki:</strong> ${personaje.ki}</p>

            <!-- 🔹 AGREGADO DEL RETO EXTRA -->
            <p><strong>Raza:</strong> ${personaje.race}</p>
            <p><strong>Género:</strong> ${personaje.gender}</p>
        `;
       
        // Finalmente, agregamos la tarjeta completa al contenedor principal
        contenedorPersonajes.appendChild(tarjeta);
    })
}
``