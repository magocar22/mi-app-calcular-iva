// Espera a que todo el contenido de la página (HTML) se haya cargado
document.addEventListener('DOMContentLoaded', function() {

    // --- CONSTANTES Y VARIABLES ---
    const IVA_RATE = 1.21; // El tipo de IVA (21%) expresado como divisor

    // --- SELECCIÓN DE ELEMENTOS DEL DOM ---
    // Obtenemos referencias a los elementos HTML con los que vamos a interactuar
    const totalAmountInput = document.getElementById('totalAmount');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultArea = document.getElementById('resultArea');

    // --- EVENT LISTENERS ---
    // Añadimos un "escuchador" al botón para que ejecute la función 'handleCalculation' cuando se haga clic
    calculateBtn.addEventListener('click', handleCalculation);
    
    // Opcional: permitir calcular pulsando "Enter" en el campo de texto
    totalAmountInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            handleCalculation();
        }
    });


    // --- FUNCIONES ---

    /**
     * Función principal que se ejecuta al pulsar el botón.
     * Orquesta la validación, el cálculo y la visualización de los resultados.
     */
    function handleCalculation() {
        // 1. Obtener y validar el valor del input
        const totalAmount = parseFloat(totalAmountInput.value);

        if (isNaN(totalAmount) || totalAmount <= 0) {
            // Si el valor no es un número válido o es cero/negativo, muestra un error
            displayResult('Por favor, introduce un número positivo.', 'error');
            return; // Detiene la ejecución de la función aquí
        }

        // 2. Realizar los cálculos
        const baseAmount = totalAmount / IVA_RATE;
        const ivaAmount = totalAmount - baseAmount;

        // 3. Formatear y mostrar el resultado
        const resultHTML = `
            <div>Base Imponible: <span>${baseAmount.toFixed(2)} €</span></div>
            <div>IVA (21%): <span>${ivaAmount.toFixed(2)} €</span></div>
        `;
        displayResult(resultHTML, 'success');
    }

    /**
     * Muestra el resultado (o un mensaje de error) en el área designada.
     * @param {string} message - El mensaje o HTML a mostrar.
     * @param {string} type - El tipo de mensaje ('success' o 'error') para aplicar el estilo CSS correcto.
     */
    function displayResult(message, type) {
        // Limpiamos clases anteriores y añadimos las nuevas
        resultArea.className = 'result'; // Resetea las clases
        resultArea.classList.add(type); // Añade 'success' o 'error'
        
        // Asignamos el contenido HTML
        resultArea.innerHTML = message;

        // Hacemos visible el área de resultados con una animación
        resultArea.style.display = 'flex';
        resultArea.classList.add('fade-in');

        // Eliminamos la clase de animación después de que termine para poder reutilizarla
        setTimeout(() => {
            resultArea.classList.remove('fade-in');
        }, 500); // La duración debe coincidir con la animación en CSS
    }

});