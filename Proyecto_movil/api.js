document.addEventListener("DOMContentLoaded", () => {

    const API_URL = "https://equipo5uthh.grupoahost.com/api/get_pacientes.php";
    const contenedor = document.getElementById("contenedor-pacientes");

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            console.log(data); // para comprobar en consola
            mostrarPacientes(data.pacientes);
        })
        .catch(error => {
            console.error("Error al consumir la API:", error);
            contenedor.innerHTML = "<p class='vacio'>Error al cargar los datos</p>";
        });

    function mostrarPacientes(pacientes) {

        if (!pacientes || pacientes.length === 0) {
            contenedor.innerHTML = "<p class='vacio'>No hay pacientes registrados</p>";
            return;
        }

        contenedor.innerHTML = "";

        pacientes.forEach(p => {
            contenedor.innerHTML += `
                <div class="card">
                    <h2>${p.nombre} ${p.apellido_paterno} ${p.apellido_materno}</h2>
                    <p><strong>Matrícula:</strong> ${p.matricula_o_numero_trabajador}</p>
                    <p><strong>Carrera:</strong> ${p.Carrera}</p>
                    <p><strong>Grupo:</strong> ${p.Grupo}</p>
                </div>
            `;
        });
    }

});

