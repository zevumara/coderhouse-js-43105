class Pokemon{
    constructor(nombre, nivel, energia){
        this.nombre = nombre;
        this.nivel = nivel;
        this.energia = energia;
    }

    // - Que me suba de nivel el pokémon
    // - Que me reste 1 de energía
    // - Que no pueda entrenar si la energía es igual o menor que 1
    entrenar(){
        if (this.energia <= 1){
            console.log("No podés entrenar a " + this.nombre + " porque tiene poca energía.");
        }else{
            // Entrenamos el pokémon
            this.nivel = this.nivel + 1;
            this.energia = this.energia - 1;
            console.log("¡" + this.nombre + " ha subido a nivel " + this.nivel + "!");
            console.log("La energía de " + this.nombre + " es " + this.energia + ".");
        }
    }

    // - Sube la energía en 1
    // - Límite de 10 de energía
    alimentar(){
        if (this.energia < 10){
            this.energia += 1;
            console.log("La energía de " + this.nombre + " es " + this.energia + ".");
        }else{
            console.log("La energía de " + this.nombre + " está al máximo.");
        }
    }

    atacar(objetivo){
        objetivo.restarEnergia(1);
    }

    restarEnergia(cantidad){
        if (this.energia > 1){
            this.energia = this.energia - cantidad;
            console.log("La energía de " + this.nombre + " es " + this.energia + ".");
        }else{
            console.log(this.nombre + " está incapacitado.");
        }
    }
}
 
let charmander = new Pokemon("Charmander", 1, 10);
let bulbasaur = new Pokemon("Bulbasour", 1, 10);