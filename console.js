var consoleOutput = document.getElementById('console-output');
var maxLines = 6; // Maximum number of lines to display
window.addToConsole = function(text) { // Expose globally by attaching it to the window object
    let lines = consoleOutput.innerHTML.trim().split('<br>').filter(Boolean); // Remove empty strings
    lines.push(text);

    if (lines.length > maxLines) {
        lines = lines.slice(lines.length - maxLines);
    }

    consoleOutput.innerHTML = lines.join('<br>');
}
function generateRandomMessage(text) {
    const messages = [
        "Hello there!",
        "You should check you're skills sometimes"
    ];
    const randomMessage = "[Stefus's Tip] "+messages[Math.floor(Math.random() * messages.length)];
    addToConsole(randomMessage);
}
setInterval(generateRandomMessage, 1000000);
