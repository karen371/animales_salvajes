import Animal from './Animal.js';
export default class Aguila extends Animal{
    constructor(nombre,edad,img,comentarios,sonido){
        super(nombre,edad,img,comentarios,sonido);
    }
    chillar(){
        const sonidoAguila = this.getSonido(); // Obtener el sonido del águila desde la clase Animal
        const audio = new Audio(sonidoAguila); // Crear un objeto de Audio
        audio.play(); // Reproducir el sonido
    }
}