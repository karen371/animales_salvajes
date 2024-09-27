import Animal from './Animal.js';
export default class Leon extends Animal{
    constructor(nombre,edad,img,comentarios,sonido){
        super(nombre,edad,img,comentarios,sonido);
    }
    rugir(){
        const sonidoLeon = this.getSonido(); // Obtener el sonido del leon desde la clase Animal
        const audio = new Audio(sonidoLeon); // Crear un objeto de Audio
        audio.play(); // Reproducir el sonido
    }
}