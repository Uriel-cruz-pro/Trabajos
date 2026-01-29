const parrafo= document.getElementById("coordenadas")
const enlace=document.getElementById("enlace")

const ubicar=()=>{
    if(navigator.geolocation){
        parrafo.innerText="Localizando coordenadas..."

        //pedimos las coordenadas al navegador(posicion)
        navigator.geolocation.getCurrentPosition(
            (posicion)=>{
                const latitud=posicion.coords.latitude
                const longitud=posicion.coords.longitude

                parrafo.innerText="Latitud : "+latitud+" , Longitud : "+longitud+ "la presicion de esta informacion es :"+posicion.coords.accuracy 
                enlace.href="https://www.google.com/maps?q="+latitud+","+longitud
                enlace.style.display="block"
                //alert("estas en latitud:"+latitud+", longitud:"+longitud)
            },
            (error)=>{
                parrafo.innerText="Imposible obtener las coordenadas por : "+error.message
            })

    }else{
        parrafo.innerText="Tu navegador no pela..."
    }
}