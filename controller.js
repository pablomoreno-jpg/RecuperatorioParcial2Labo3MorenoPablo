
import * as clase from './clases.js'


var lista;
var spiner = $("spinner");
var api = 'https://examenesutn.vercel.app/api/PersonaCiudadanoExtranjero';

function $(ID){return document.getElementById(ID)}

function filtrar(arg){
    
    if(typeof(arg) == "string"){

        lista = JSON.parse(arg);

    }
    else{

        lista = lista.map( obj => {

            if(obj.dni != undefined){

                return new clase.Ciudadano(obj.id,obj.nombre,obj.apellido,obj.fechaNacimiento,obj.dni);
            }
            else if(obj.paisOrigen != undefined){

                return new clase.Extranjero(obj.id,obj.nombre,obj.apellido,obj.fechaNacimiento,obj.paisOrigen);
            }

        });

    }
}

function generarTabla(lista){

    let claves = [];
    let tabla = document.createElement("table");
    let cabezera = document.createElement("tr");
    let eliminar = document.createElement("td");
    let modificar = document.createElement("td");

    eliminar.innerText = "Eliminar";
    modificar.innerText = "Modificar";


    lista.forEach(obj  => {
        
        Object.keys(obj).forEach(clave => {


            if(!claves.includes(clave)){
                claves.push(clave);
                let titulo = document.createElement("td");
                titulo.appendChild(document.createTextNode(clave))
                cabezera.appendChild(titulo);
            }
        
        }); 
        
    })

    cabezera.appendChild(modificar);
    cabezera.appendChild(eliminar);

    tabla.appendChild(cabezera);

    // index para modificar o eliminar 
    lista.forEach((obj, index)=> {

        let contenido = document.createElement("tr");
        let eliminar = document.createElement("td");
        let modificar = document.createElement("td");
        
        let btE = document.createElement("button");
        let btM = document.createElement("button");

        btE.innerText = "Eliminar";
        btM.innerText = "Modificar";

        btE.setAttribute("id","eliminar");
        btM.setAttribute("id","modificar");
        
        modificar.appendChild(btM);
        eliminar.appendChild(btE);


        modificar.addEventListener("click",() =>{ 
            let div =$("tabla");
            
            spiner.style.display = 'block';
            div.style.display = 'none';
            modificarPersona(contenido,index);
        
        })

        eliminar.addEventListener("click",()=>{

            spiner.style.display = 'block';
            eliminarPersona(contenido.children[0].innerText);
            //eliminarAuto(contenido.children[0].innerText);
        })

        for(let [i,clave] of claves.entries()){

            let caja = document.createElement("td");

            if(Object.keys(obj).includes(clave)){

                let valor = obj[clave];
                
                if(typeof(valor) != String){

                    caja.appendChild(document.createTextNode(valor.toString()));
                    caja.setAttribute(clave,valor.toString());

                }   
                else{

                    caja.appendChild(document.createTextNode(valor));
                    caja.setAttribute(clave,valor.toString());

                }

                

                if(clave == "dni"){    

                    contenido.setAttribute("clase","Ciudadano");
                }
                else if(clave == 'paisOrigen'){

                    contenido.setAttribute("clase","Extranjero");
                }



            }
            else{

                caja.appendChild(document.createTextNode("N/A"));
            }


            
            contenido.appendChild(caja);

            if(i == claves.length -1){

                contenido.appendChild(modificar);
                contenido.appendChild(eliminar);

            }

        }

        tabla.appendChild(contenido);
    })

    return tabla;

}

function cargarTabla(){

    let tabla = generarTabla(lista);
    let boton = document.createElement("button");

    boton.setAttribute("id","agregar");

    boton.innerText = "Agregar";

    tabla.appendChild(boton);

    boton.addEventListener("click", ()=> {
        let div = $("tabla");

        div.style.display = "none";
        agregarPersona();

    });

    return tabla;

}

export function solitudGet(){

    spiner.style.display = 'block';
    let https = new XMLHttpRequest();
    let div = $("tabla");
    let listado;


    try{

        https.onreadystatechange = function(){


            if(https.status == 200 ){

                spiner.style.display = 'none';
                listado = filtrar(https.response);

                div.appendChild(cargarTabla());
                div.style.display = 'block'
                

            }

        }

        https.open("GET",api,false);
        https.send();

    }
    catch(Error){

        alert("Error, no se pudo acceder al servidor");
        spiner.style.display = 'none';

    }

}

function generarAbm(){

    let abm = $("abm");
    let persona = ['nombre','apellido','fechaNacimiento'];

    if(abm.childNodes.length > 0){

        abm.replaceChildren();
    }


    persona.forEach(clave =>{

        let cartel = document.createElement("label");
        let caja = document.createElement("input");
        let salto = document.createElement("br");

        caja.setAttribute("type","text");
        caja.setAttribute("id",clave);

        cartel.innerText = clave;
        abm.appendChild(cartel);
        abm.appendChild(caja);
        abm.appendChild(salto);

    });

    return abm;

}

function agregarPersona(){

    let salto = document.createElement("br");
    let amb = generarAbm();
    let barra = document.createElement("select");
    let opciones = ['--','Ciudadano','Extranjero'];
    let cancelar = document.createElement("button");
    let aceptar = document.createElement("button");

    cancelar.innerText = "cancelar";
    aceptar.innerText = "Aceptar";

    for(let i = 0; i < 3; i++){
        
        let valor = document.createElement("option");
        valor.setAttribute("value",(i+1).toString());
        valor.innerText = opciones[i];

        barra.appendChild(valor);
    }

    amb.appendChild(barra);
    amb.appendChild(salto);
    amb.appendChild(aceptar);
    amb.appendChild(cancelar);    


    let tipos = function(){
    
        let cartel1 = document.createElement("label");

        let caja1 = document.createElement("input");
    
        caja1.setAttribute("type","text");


        caja1.setAttribute("id","caja1");

        if(amb.children.length > 11){

            console.log(amb.childNodes[10]);

            amb.removeChild(amb.childNodes[11]);
            amb.removeChild(amb.childNodes[10]);
        }


        switch(barra.value){

            case '2':
                cartel1.innerText = "Dni";
                amb.appendChild(cartel1);
                amb.appendChild(caja1);

                amb.appendChild(salto);

                amb.appendChild(aceptar);
                amb.appendChild(cancelar);
                break;
            case '3':
                cartel1.innerText = "Pais Origen";

                amb.appendChild(cartel1);
                amb.appendChild(caja1);

                amb.appendChild(salto);

                amb.appendChild(aceptar);
                amb.appendChild(cancelar);

                break;

        }

    }

    amb.style.display= 'block';
    spiner.style.display = 'none';


    barra.addEventListener("change", tipos);

    cancelar.addEventListener("click",()=>{
        let div = $("tabla");

        spiner.style.display = 'block';
        amb.style.display = 'none';
        div.style.display = 'block';
        spiner.style.display = 'none';


    });

    aceptar.addEventListener('click',()=> {

        spiner.style.display = 'block';
    
        let exito = false;
        let nombre = $('nombre');
        let apellido = $('apellido');
        let fechaNacimiento = $('fechaNacimiento');
        let persona;
        let error;

        if(nombre.value != "" && apellido.value != ""  && fechaNacimiento.value != ""){
            
            let año = parseInt(fechaNacimiento.value.substring(0,4),10);
            let mes = parseInt(fechaNacimiento.value.substring(4,6),10);
            let dia = parseInt(fechaNacimiento.value.substring(6,8),10);
            
            console.log(año,mes,dia);
            let id;

            if(año > 1970 && año < 2007 && dia > 0 && dia < 32 && mes > 0 && mes <13){



                switch(barra.value){
                    case '2':
                        if(caja1.value != "" && !isNaN(caja1.value)){
                            if(parseInt(caja1.value) > 0){
    
                                persona = new clase.Ciudadano(id,nombre.value,apellido.value,parseInt(fechaNacimiento.value),parseInt(caja1.value));
                                exito = true;
                            }
                        }
                        else{

                            error = "el dni del ciudadano no es valido";

                        }
                        break;
                    case '3':
                        if(caja1.value != "" && isNaN(caja1.value)){
                            
                            persona = new clase.Extranjero(id,nombre.value,apellido.value,parseInt(fechaNacimiento.value),caja1.value);
                            exito = true;
                        }
                        else{

                            error = "cargue un pais de origen valido";

                        }
                        break;
                    default:
                        error = "elija si la persona es ciudadana o extranjera";

                        break;
                }
                
            }
            else{
                error = "fecha invalida, verifique que el formato sea AAAAMMDD"
            }

        }
        else{

            error = "datos vacios"
        }

        if(exito){

            solitudPost(persona)
        }
        else{

            alert(error);
            spiner.style.display = 'none';
        }

    });

}

function modificarPersona(persona, index){


    console.log(persona);

    let amb = generarAbm();
    let salto = document.createElement("br");
    let barra = document.createElement("select");
    let idsAmb = ['nombre','apellido','fechaNacimiento'];
    let opciones = ['--','Ciudadano','Extranjero'];
    let cancelar = document.createElement("button");
    let aceptar = document.createElement("button");
    let cartel1 = document.createElement("label");
    let caja1 = document.createElement("input");

    let id = persona.children[0].innerText;

    amb.style.display = 'block';

    idsAmb.forEach((nombre,i) => {
        
        let text = $(nombre);

        text.value = persona.children[i+1].innerText;

    });

    for(let i = 0; i < 3; i++){

        
        let valor = document.createElement("option");
        valor.setAttribute("value",(i+1).toString());
        valor.innerText = opciones[i];

        barra.appendChild(valor);
    }

    
    caja1.setAttribute("type","text");

    caja1.setAttribute("id","caja1");


    switch(persona.getAttribute("clase")){
        case'Ciudadano':
        barra.value = "2";

            amb.appendChild(barra);

            cartel1.innerText = "Dni";

            if(caja1.value = persona.children[4].innerText != 'N/A'){

                caja1.value = persona.children[4].innerText;
            }
            else{

                caja1.value = persona.children[5].innerText;
            }

            amb.appendChild(cartel1);
            amb.appendChild(caja1);
            amb.appendChild(salto);

            amb.appendChild(aceptar);
            amb.appendChild(cancelar);


            break;

        default :
            barra.value = "3";

            amb.appendChild(barra);

            cartel1.innerText = "Pais Origen";

            if(caja1.value = persona.children[4].innerText != 'N/A'){

                caja1.value = persona.children[4].innerText;
            }
            else{

                caja1.value = persona.children[5].innerText;
            }

            amb.appendChild(cartel1);
            amb.appendChild(caja1);
            amb.appendChild(salto);

            amb.appendChild(aceptar);
            amb.appendChild(cancelar);

            break;

    }


    let tipos = function(){
    
        cartel1.innerText = "";
        caja1.value = "";

        switch(barra.value){
            case '1':

                amb.removeChild(cartel1);
                amb.removeChild(caja1);
                amb.removeChild(aceptar);
                amb.removeChild(cancelar);

        
                amb.appendChild(barra);
                amb.appendChild(salto);

                amb.appendChild(aceptar);
                amb.appendChild(cancelar);
                break;
            case '2': 
                cartel1.innerText = "Dni";

                amb.appendChild(salto);
                amb.appendChild(cartel1);
                amb.appendChild(caja1);
                amb.appendChild(salto);

                amb.appendChild(aceptar);
                amb.appendChild(cancelar);
                break;
            case '3':

                cartel1.innerText = "Pais origen";

                amb.appendChild(salto);
                amb.appendChild(cartel1);
                amb.appendChild(caja1);
                amb.appendChild(salto);

                amb.appendChild(aceptar);
                amb.appendChild(cancelar);

                break;

        }

    }

    barra.addEventListener("change",tipos);

    cancelar.innerText = "cancelar";
    aceptar.innerText = "Aceptar";

    spiner.style.display = "none";


    cancelar.addEventListener("click",()=>{

        let div= $("tabla");

        amb.style.display = 'none';
        div.style.display = 'block';

    });


    aceptar.addEventListener("click",()=> {
        spiner.style.display = 'block';
    
        let exito = false;
        let nombre = $('nombre');
        let apellido = $('apellido');
        let fechaNacimiento = $('fechaNacimiento');
        let persona;
        let error;

        console.log(fechaNacimiento);

        if(nombre.value != "" && apellido.value != ""  && fechaNacimiento.value != ""){
            
            let año = parseInt(fechaNacimiento.value.substring(0,4),10);
            let mes = parseInt(fechaNacimiento.value.substring(4,6),10);
            let dia = parseInt(fechaNacimiento.value.substring(6,8),10);
            
            console.log(año,mes,dia);

            if(año > 1950 && año < 2010 && dia > 0 && dia < 32 && mes > 0 && mes < 13){

                switch(barra.value){
                    case '2':
                        if(caja1.value != "" && !isNaN(caja1.value)){
                            if(parseInt(caja1.value) > 0){
    
                                persona = new clase.Ciudadano(id,nombre.value,apellido.value,parseInt(fechaNacimiento.value),parseInt(caja1.value));
                                exito = true;
                            }
                        }
                        else{

                            error = "el dni del ciudadano no es valido";

                        }
                        break;
                    case '3':
                        if(caja1.value != "" && isNaN(caja1.value)){
                            
                            persona = new clase.Extranjero(id,nombre.value,apellido.value,parseInt(fechaNacimiento.value),caja1.value);
                            exito = true;
                        }
                        else{

                            error = "cargue un pais de origen valido";

                        }
                        break;
                    default:
                        error = "elija si la persona es ciudadana o extranjera";

                        break;
                }
                
            }
            else{
                error = "fecha invalida, verifique que el formato sea AAAAMMDD"
            }

        }
        else{

            error = "datos vacios"
        }

        if(exito){

            solicitudPut(persona)
            .then(data => {

                alert(data);
                spiner.style.display = 'none';
                lista[index] = persona;
                tabla.replaceChildren(cargarTabla());
                amb.style.display = 'none';
                tabla.style.display = 'block';
            })
            .catch(error => {

                spiner.style.display = 'none';
                alert(error)
                amb.style.display = 'none';
                tabla.style.display = 'block';
            })

        }
        else{

            alert(error);
            spiner.style.display = 'none';
        }

    });

}


async function solitudPost(persona){

    let tabla = $('tabla');
    let amb = $('abm');

    console.log(JSON.stringify(persona));

    try{

        let respuesta = await fetch(api,{

            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers:{
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(persona),

        })


        if(!respuesta.ok){

            throw new Error(`Error en la solicitud: ${respuesta.status} - ${respuesta.statusText}`);

        }

        let salida = await respuesta.json();

        console.log(salida);

        persona.id = salida.id;
        lista.push(persona);
        tabla.replaceChildren(cargarTabla());
        tabla.style.display = 'block';
        spiner.style.display = 'none';
        amb.style.display = 'none';

    }
    catch(Error){

        alert(Error)
    }


}

function solicitudPut(persona){

    console.log(JSON.stringify(persona));

    return new Promise((resolve,reject)=> {

        fetch(api,{

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(persona)
            
        })
        
        .catch(error => {

            throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        })

        .then(response => {

            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
            }
            return response.text();
        })

        .then(data => resolve(data))
        .catch(error=>reject(error))

    })

}

async function eliminarPersona(id){ 

    let tabla = $('tabla');

    let eliminar = {'id':id};

    console.log(JSON.stringify(eliminar));

    try{

        let solicitud = await fetch(api,{

            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eliminar)
        })

        if(!solicitud.ok){

            throw new Error(`Error, no se pudo realizar la solitud ${solicitud.status} - ${solicitud.statusText}`);

        }  


        lista = lista.filter(obj => obj.id != id);
        tabla.replaceChildren(cargarTabla());
        alert(`el di ${id} se elimino exitosamente`);

    }  
    catch(Error){

        console.error(Error);
    }

    spiner.style.display = 'none';


}



/*
estrucutra para put post delet

Post:
'{"modelo":"Ford Mustang","anoFabricacion":1960,"velMax":100,"cantidadPuertas":2,"asientos":2}'

Put:
'{"id":122, "modelo":"Fiat 100","anoFabricacion":1987,"velMax":60,"cantidadPuertas":4,"asientos":4}'

Delete:
'{"id":1}'
*/