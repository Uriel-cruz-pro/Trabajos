
let latitud = 21.06795;
let longitud = -98.47625;

if (L) {

    const ubicacion = [latitud, longitud];

    const map = L.map('map').setView(ubicacion, 19);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 22,
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);


    let marcador = L.marker(ubicacion).addTo(map);
    marcador.bindPopup(
        "<b>Estoy aquí</b><br>" +
        "Latitud: " + latitud +
        "<br>Longitud: " + longitud
    ).openPopup();


    let casa = [
        [latitud + 0.00008, longitud - 0.00008],
        [latitud + 0.00008, longitud + 0.00008],
        [latitud - 0.00008, longitud + 0.00008],
        [latitud - 0.00008, longitud - 0.00008]
    ];

    let poligonoCasa = L.polygon(casa, {
        color: 'green',
        fillColor: '#66cc66',
        fillOpacity: 0.5
    }).addTo(map);

    // Evento clic
    poligonoCasa.on('click', function () {
        poligonoCasa.bindPopup(
            "<b>Mi casa</b><br>Perímetro aproximado de mi casa"
        ).openPopup();
    });

} else {
    alert("Leaflet no se cargó correctamente");
}
