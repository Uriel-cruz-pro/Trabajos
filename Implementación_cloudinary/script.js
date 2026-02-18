const btn = document.getElementById("subir");
const input = document.getElementById("imagen");
const estado = document.getElementById("estado");
const resultado = document.getElementById("resultado");

btn.addEventListener("click", function () {
    const file = input.files[0];

    if (!file) {
        alert("Selecciona una imagen");
        return;
    }

    if (!file.type.startsWith("image/")) {
        alert("Solo se permiten imágenes");
        return;
    }

    btn.disabled = true;
    estado.textContent = "Subiendo...";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "b5wg8dzq");

    fetch("https://api.cloudinary.com/v1_1/dhnvczjlm/image/upload", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        resultado.src = data.secure_url;
        estado.textContent = "Imagen subida correctamente";
    })
    .catch(error => {
        estado.textContent = "Error al subir la imagen";
        console.error(error);
    })
    .finally(() => {
        btn.disabled = false;
    });
});
