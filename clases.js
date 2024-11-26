
export class Personas{

    id= 0;
    nombre = "";
    apellido = ""
    fechaNacimiento = 0


    constructor(id,nombre,apellido,fechaNacimiento){

        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNacimiento = fechaNacimiento;

    }

    toString(){

        return "id" +this.id.toString()+ "\nnombre: " + this.nombre + "\napellido: " + this.apellido +  "\nfechaNacimiento: " +this.fechaNacimiento.toString();

    }

}

export class Ciudadano extends Personas {

    dni = 0;

    constructor(id,nombre,apellido,fechaNacimiento,dni){

        super(id,nombre,apellido,fechaNacimiento);
        this.dni = dni;

    }

    toString(){

        return "id" +this.id.toString()+ "\nnombre: " + this.nombre + "\napellido: " + this.apellido +  "\nfechaNacimiento: " +this.fechaNacimiento.toString() +  "\ndni: " +this.dni.toString();

    }
}

export class Extranjero extends Personas {

    paisOrigen = "";

    constructor(id,nombre,apellido,fechaNacimiento,paisOrigen){

        super(id,nombre,apellido,fechaNacimiento);
        this.paisOrigen = paisOrigen;

    }

    toString(){

        return "id" +this.id.toString()+ "\nnombre: " + this.nombre + "\napellido: " + this.apellido +  "\nfechaNacimiento: " +this.fechaNacimiento.toString() +  "\npaisOrigen: " +this.paisOrigen;

    }


}