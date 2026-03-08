// Funciones Matemáticas Básicas
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        throw new Error('No se puede dividir entre cero');
    }
    return a / b;
}

// Realizar operaciones
function realizarOperacion(tipo) {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    let resultado;

    if (isNaN(num1) || isNaN(num2)) {
        alert('Por favor ingresa números válidos');
        return;
    }

    switch(tipo) {
        case 'suma':
            resultado = add(num1, num2);
            document.getElementById('resultado-suma').innerText = `${num1} + ${num2} = ${resultado}`;
            break;
        case 'resta':
            resultado = subtract(num1, num2);
            alert(`${num1} - ${num2} = ${resultado}`);
            break;
        case 'multiplicacion':
            resultado = multiply(num1, num2);
            alert(`${num1} × ${num2} = ${resultado}`);
            break;
        case 'division':
            try {
                resultado = divide(num1, num2);
                alert(`${num1} ÷ ${num2} = ${resultado}`);
            } catch (e) {
                alert(e.message);
            }
            break;
    }
}

// Operaciones con Matrices
function determinante2x2(a, b, c, d) {
    return (a * d) - (b * c);
}

function calcularDeterminante() {
    const m11 = parseFloat(document.getElementById('m11').value);
    const m12 = parseFloat(document.getElementById('m12').value);
    const m21 = parseFloat(document.getElementById('m21').value);
    const m22 = parseFloat(document.getElementById('m22').value);

    if (isNaN(m11) || isNaN(m12) || isNaN(m21) || isNaN(m22)) {
        alert('Por favor ingresa números válidos');
        return;
    }

    const det = determinante2x2(m11, m12, m21, m22);
    document.getElementById('resultado-det').innerText = 
        `Determinante de |${m11} ${m12}| = ${det}
                       |${m21} ${m22}|`;
}

// Ejercicios Interactivos
let ejercicioActual = generarEjercicio();

function generarEjercicio() {
    const tipo = Math.floor(Math.random() * 4);
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    let pregunta, respuesta;

    switch(tipo) {
        case 0:
            pregunta = `¿Cuánto es ${num1} + ${num2}?`;
            respuesta = num1 + num2;
            break;
        case 1:
            pregunta = `¿Cuánto es ${num1} - ${num2}?`;
            respuesta = num1 - num2;
            break;
        case 2:
            pregunta = `¿Cuánto es ${num1} × ${num2}?`;
            respuesta = num1 * num2;
            break;
        case 3:
            pregunta = `¿Cuánto es ${Math.max(num1, num2) * num2} ÷ ${num2}?`;
            respuesta = Math.max(num1, num2);
            break;
    }

    return { pregunta, respuesta };
}

function cargarEjercicio() {
    ejercicioActual = generarEjercicio();
    document.getElementById('quiz-pregunta').innerText = ejercicioActual.pregunta;
    document.getElementById('quiz-respuesta').value = '';
    document.getElementById('quiz-resultado').innerText = '';
}

function verificarRespuesta() {
    const respuestaUsuario = parseFloat(document.getElementById('quiz-respuesta').value);

    if (isNaN(respuestaUsuario)) {
        alert('Por favor ingresa una respuesta numérica válida');
        return;
    }

    const elemento = document.getElementById('quiz-resultado');
    if (respuestaUsuario === ejercicioActual.respuesta) {
        elemento.innerText = '✅ ¡Correcto! Excelente trabajo.';
        elemento.style.color = 'green';
        setTimeout(cargarEjercicio, 2000);
    } else {
        elemento.innerText = `❌ Incorrecto. La respuesta correcta era ${ejercicioActual.respuesta}`;
        elemento.style.color = 'red';
        setTimeout(cargarEjercicio, 3000);
    }
}

// Event Listeners para navegación
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover clase active de todas las secciones
            sections.forEach(section => {
                section.classList.remove('active');
            });

            // Agregar clase active a la sección seleccionada
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Cargar ejercicio si se va a esa sección
                if (targetId === 'ejercicios') {
                    cargarEjercicio();
                }
            }
        });
    });

    // Cargar el primer ejercicio
    cargarEjercicio();
} );