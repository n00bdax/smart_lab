// Einfaches Pong-Spiel in JavaScript

// Spielfeld erstellen
const canvas = document.createElement('canvas'); // Erstellt eine Zeichenfläche
const ctx = canvas.getContext('2d'); // 2D-Zeichenkontext erhalten
canvas.width = 800;
canvas.height = 400;
document.body.appendChild(canvas); // Leinwand zur Webseite hinzufügen

// Hintergrundfarbe ändern
ctx.fillStyle = 'white'; // Hintergrundfarbe auf weiß setzen
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Spielobjekte definieren
const ball = {
    x: canvas.width / 2, // Startposition des Balls (Mitte)
    y: canvas.height / 2,
    dx: 4, // Geschwindigkeit in x-Richtung
    dy: 4, // Geschwindigkeit in y-Richtung
    radius: 10 // Radius des Balls
};

// Schläger definieren
const leftPaddle = { x: 10, y: canvas.height / 2 - 40, width: 10, height: 80, dy: 0 };
const rightPaddle = { x: canvas.width - 20, y: canvas.height / 2 - 40, width: 10, height: 80, dy: 0 };

// Score variablen
let leftScore = 0;
let rightScore = 0;

// Funktion zum Zeichnen des Spielfelds
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Löscht das Spielfeld

    // Hintergrund neu zeichnen (weiß)
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Ball zeichnen (schwarz)
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'black'; // Ballfarbe auf schwarz setzen
    ctx.fill();
    ctx.closePath();

    // Schläger zeichnen (schwarz)
    ctx.fillStyle = 'black'; // Schlägerfarbe auf schwarz setzen
    ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
    ctx.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);

    // Punktestand anzeigen (schwarz)
    ctx.font = '30px Arial';
    ctx.fillStyle = 'black'; // Textfarbe auf schwarz setzen
    ctx.fillText(leftScore, 50, 30); // Zeigt den Punktestand des linken Spielers
    ctx.fillText(rightScore, canvas.width - 50, 30); // Zeigt den Punktestand des rechten Spielers
}

// Spiel-Update-Funktion
function update() {
    // Ballbewegung
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Kollision mit der oberen und unteren Wand
    if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= canvas.height) {
        ball.dy *= -1; // Richtungswechsel
    }

    // Ball-Kollision mit den Schlägern
    if (
        (ball.x - ball.radius <= leftPaddle.x + leftPaddle.width && ball.y >= leftPaddle.y && ball.y <= leftPaddle.y + leftPaddle.height) ||
        (ball.x + ball.radius >= rightPaddle.x && ball.y >= rightPaddle.y && ball.y <= rightPaddle.y + rightPaddle.height)
    ) {
        ball.dx *= -1; // Ball ändert Richtung
    }

    // Ball trifft die linke Seite (Spieler 2 bekommt Punkt)
    if (ball.x - ball.radius <= 0) {
        rightScore++; // Spieler 2 bekommt einen Punkt
        resetBall(); // Ball zurücksetzen
    }

    // Ball trifft die rechte Seite (Spieler 1 bekommt Punkt)
    if (ball.x + ball.radius >= canvas.width) {
        leftScore++; // Spieler 1 bekommt einen Punkt
        resetBall(); // Ball zurücksetzen
    }

    // Bewegung der Schläger
    leftPaddle.y += leftPaddle.dy;
    rightPaddle.y += rightPaddle.dy;
}

// Ball zurücksetzen
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = -ball.dx; // Richtungsumkehr
    ball.dy = 4 * (Math.random() > 0.5 ? 1 : -1); // Zufällige Richtung für den Ball
}

// Tastensteuerung hinzufügen
document.addEventListener('keydown', (e) => {
    if (e.key === 'w') leftPaddle.dy = -5; // Linker Schläger nach oben
    if (e.key === 's') leftPaddle.dy = 5;  // Linker Schläger nach unten
    if (e.key === 'ArrowUp') rightPaddle.dy = -5; // Rechter Schläger nach oben
    if (e.key === 'ArrowDown') rightPaddle.dy = 5; // Rechter Schläger nach unten
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'w' || e.key === 's') leftPaddle.dy = 0; // Stoppt Bewegung des linken Schlägers
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') rightPaddle.dy = 0; // Stoppt Bewegung des rechten Schlägers
});

// Hauptspiel-Schleife
function gameLoop() {
    update(); // Aktualisiert den Spielzustand
    draw();   // Zeichnet das Spielfeld neu
    requestAnimationFrame(gameLoop); // Wiederholt die Schleife
}

gameLoop(); // Startet das Spiel
