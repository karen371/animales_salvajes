import Animal from './Animal.js';
export default class Oso extends Animal{
    constructor(nombre,edad,img,comentarios,sonido){
        super(nombre,edad,img,comentarios,sonido);
    }
    gruñir(){
        const sonidoGruñir = this.getSonido(); // Obtener el sonido del Oso desde la clase Animal
        const audio = new Audio(sonidoGruñir); // Crear un objeto de Audio
        audio.play(); // Reproducir el sonido
    }
}