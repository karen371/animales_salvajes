import Animal from './Animal.js';
export default class Lobo extends Animal{
    constructor(nombre,edad,img,comentarios,sonido){
        super(nombre,edad,img,comentarios,sonido);
    }
    aullar(){
        const sonidoAullar = this.getSonido(); // Obtener el sonido del Lobo desde la clase Animal
        const audio = new Audio(sonidoAullar); // Crear un objeto de Audio
        audio.play(); // Reproducir el sonido
    }
}