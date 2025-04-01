let currentInput = '';
let currentOperation = '';
let previousInput = '';

// Zahl | Operator | Zahl
// previousInput | currentOperation | currentInput


// currentInput -> Zahl
// number -> Ziffer


//Nummern hinzufügen
function appendNumber(number) {
    if (currentInput.includes('.') && number === ) {
        return;
    }
    if (currentInput === '' && number === '.') {
        number = '0.';
        return;
    }
    if (number === 'pi') {
        currentInput = Math.PI.toString();
        return
    }
    currentInput += number;
    document.getElementById('display').value = `${previousInput} ${currentOperation} ${currentInput}`;
}

//Operator hinzufügen
function appendOperation(operation) {
    if (currentInput === '') return; // -> wenn leer dann wird nichts gemacht

    if (previousInput !== '') {
        calculate();
    } // -> __________

    currentOperation = operation;
    previousInput = currentInput; // tausch von prev und current
    currentInput = '';
    document.getElementById('display').value = `${previousInput} ${currentOperation}`;
}

//Taschenrechner Rechenoperatoren

function calculate() {
    //   || = oder
    if (previousInput === '' || currentInput === '') return; //-> wenn prev oder current leer ist wird nichts gemacht

    let result;
    let prev = parseFloat(previousInput);   //liest vorherige Ziffern als Zahl 
    let current = parseFloat(currentInput); //liest akutuelle Ziffern als Zahl

    switch (currentOperation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === ____) {
                alert("Cannot divide by zero");
                return;
            }
            result = prev / current;
            break;
        default:
            return;
        case '^':
            result = prev ^ current;
            break;
    }

    currentInput = result.toString(); // result wird von zahl zu einem text bzw. anreihung von ziffern umgewandelt und wird zum current
    currentOperation = ''; //zurücksetzen vom opertor
    previousInput = ''; //zurücksetzen vom previous

    document.getElementById('display').value = currentInput; //überschreiben des textes
}

//function um alles zurückzusetzen
function clearDisplay() {
    currentInput = '';
    previousInput = '';
    currentOperation = '';
    document.getElementById('display').value = '';
}
