import Animal from './Animal.js';
export default class Serpiente extends Animal{
    constructor(nombre,edad,img,comentarios,sonido){
        super(nombre,edad,img,comentarios,sonido);
    }
    sisear(){
        const sonidoSerpiente = this.getSonido(); // Obtener el sonido del serpiente desde la clase Animal
        const audio = new Audio(sonidoSerpiente); // Crear un objeto de Audio
        audio.play(); // Reproducir el sonido
    }
}