    // Importar clases
    import Aguila from './Aguila.js';
    import Leon from './Leon.js';
    import Oso from './Oso.js';
    import Serpiente from './Serpiente.js';
    import Lobo from './Lobo.js';
// IIFE para encapsular el código
(async function() {    
    // Elementos traídos del DOM
    const animalSeleccion = document.getElementById('animal');
    const edadSeleccion = document.getElementById('edad');
    const comentario = document.getElementById('comentarios');
    const registrar = document.getElementById('btnRegistrar');
    const contenedorAnimales = document.getElementById('Animales');
    const audioPlayer = document.getElementById('player');
    var imgMuestra = '';
    const arregloAnimales = [];

    // Función para conectar con la API y obtener el archivo JSON
    const obtenerAnimales = async () => {
        try {
            const respuesta = await fetch('../../animales.json'); // Ruta correcta a tu archivo JSON
            if (!respuesta.ok) {
                throw new Error('Error en la respuesta del archivo JSON');
            }
            const datos = await respuesta.json(); // Convierte la respuesta a JSON
            return datos.animales; // Devuelve solo el arreglo de animales
        } catch (error) {
            console.error('Error al obtener los datos:', error);
            alert('Ocurrió un error al obtener los datos.');
        }
    };

    // Función para buscar el animal en el select
    const buscarAnimal = async (datos) => {
        if (Array.isArray(datos)) {
            const resultado = datos.filter(animal => animal.name === animalSeleccion.value);
            return resultado;
        } else {
            console.error('Los datos obtenidos no son un arreglo.');
        }
    };

    // Función para mostrar las imágenes de los animales
    const mostrarImagenes = async () => {
        const contenedor = document.getElementById('preview');
        contenedor.innerHTML = ''; // Limpiar el contenedor
        const datos = await obtenerAnimales(); // Obtener los datos
        const animales = datos; // Asignar directamente los datos de animales
        const animalEncontrado = await buscarAnimal(animales);
        // Verificar si el arreglo contiene al menos un animal
        if (animalEncontrado.length > 0) {
            const animal = animalEncontrado[0]; // Acceder al primer animal encontrado
            // Crear una etiqueta de imagen
            const img = document.createElement('img');
            img.classList.add('img-form');
            img.src = animal.imagen; 
            img.alt = animal.name;
            // Añadir la imagen y el nombre al contenedor
            contenedor.appendChild(img); 
        } else {
            console.error('Animal no encontrado.');
        }
    };

    // Función para limpiar los campos del formulario
    const limpiarCampos = () => {
        animalSeleccion.selectedIndex = 0;
        edadSeleccion.selectedIndex = 0;
        comentario.value = '';
        const img = document.querySelector('.img-form');
        if (img) img.remove();
    };

    // Validar que los campos estén completos
    const validarCampos = () => {
        return animalSeleccion.value && edadSeleccion.value && comentario.value;
    };

    // Función para mostrar el arreglo de animales
    const mostrarArreglo = () => {
        contenedorAnimales.innerHTML = ''; 
        arregloAnimales.forEach(animal => {
            //se crea la card
            const card = document.createElement('div');
            card.classList.add('participante');
            //div contenedor de la imagen 
            const divimg = document.createElement('div');
            divimg.classList.add('card-img');
            //se crea la imagen 
            const img = document.createElement('img');
            img.src = animal.getImg(); // Usar la imagen del animal
            img.alt = animal.getNombre(); // Nombre del animal
            //se carga la imagen en el div 
            divimg.appendChild(img);
            //div contenedot del button del sonido
            const cardContent = document.createElement('div');
            cardContent.classList.add('card-content');
            //boton de sonido con su imagen correspondiente
            const buttonaudio = document.createElement('button');
            buttonaudio.classList.add('button-sonido');
            const img2 = document.createElement('img');
            img2.src = "./assets/imgs/audio.svg"; 
            img2.alt = "Reproducir"; 
            buttonaudio.appendChild(img2);

            // Agregar evento al botón para reproducir el sonido
            buttonaudio.addEventListener('click', () => {
                switch (true) {
                    case animal instanceof Leon:
                        animal.rugir(); // Método específico para leones
                        break;
                    case animal instanceof Lobo:
                        animal.aullar(); // Método específico para lobos
                        break;
                    case animal instanceof Oso:
                        animal.gruñir(); // Método específico para osos
                        break;
                    case animal instanceof Serpiente:
                        animal.sisear(); // Método específico para serpientes
                        break;
                    case animal instanceof Aguila:
                        animal.chillar(); // Método específico para águilas
                        break;
                    default:
                        console.error('Animal no reconocido');
                        break;
                }
            });

            // Agregar evento a la card para que se abra la ventana modal
            divimg.addEventListener('click', () => {
                try {
                    const infoAnimal = document.getElementById('info');
                    infoAnimal.innerHTML = `<img src="${animal.getImg()}" alt="${animal.getNombre()}">
                                            <p>${animal.getEdad()}</p>
                                            <h6>Comentarios</h6>
                                            <hr>
                                            <p>${animal.getComentarios()}</p>`;
                    $('#exampleModal').modal('show');
                } catch (error) {
                    console.error("Error al abrir el modal:", error);
                }
            });

            // Añadir los elementos creados al DOM
            cardContent.appendChild(buttonaudio);
            card.appendChild(divimg);
            card.appendChild(cardContent);
            contenedorAnimales.appendChild(card);
        });
    };
    // Muestra la imagen al seleccionar un animal
    animalSeleccion.addEventListener('change', mostrarImagenes);
    // Evento para registrar un animal
    registrar.addEventListener('click', async function() {
        if (validarCampos()) {
            const datos = await obtenerAnimales();
            const animalEncontrado = await buscarAnimal(datos);
            if (animalEncontrado.length > 0) {
                const animalData = animalEncontrado[0];

                let nuevoAnimal;
                switch (animalSeleccion.value) {
                    case 'Leon':
                        nuevoAnimal = new Leon(animalSeleccion.value, edadSeleccion.value, animalData.imagen, comentario.value, animalData.sonido);
                        break;
                    case 'Lobo':
                        nuevoAnimal = new Lobo(animalSeleccion.value, edadSeleccion.value, animalData.imagen, comentario.value, animalData.sonido);
                        break;
                    case 'Oso':
                        nuevoAnimal = new Oso(animalSeleccion.value, edadSeleccion.value, animalData.imagen, comentario.value, animalData.sonido);
                        break;
                    case 'Serpiente':
                        nuevoAnimal = new Serpiente(animalSeleccion.value, edadSeleccion.value, animalData.imagen, comentario.value, animalData.sonido);
                        break;
                    case 'Aguila':
                        nuevoAnimal = new Aguila(animalSeleccion.value, edadSeleccion.value, animalData.imagen, comentario.value, animalData.sonido);
                        break;
                    default:
                        console.log(`Error: animal no reconocido.`);
                        return;
                }
                arregloAnimales.push(nuevoAnimal); // Agregar el nuevo animal al arreglo
                limpiarCampos();
                mostrarArreglo(); // Mostrar el arreglo actualizado
            } else {
                console.error('Animal no encontrado.');
            }
        } else {
            alert('Por favor, completa todos los campos.');
        }
    });
})();
