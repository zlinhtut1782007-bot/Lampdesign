const input = document.getElementById('cli-input');
const body = document.getElementById('terminal-body');

const commands = {
    'help': 'Available commands: <span class="highlight">about, skills, social, clear, exit</span>',
    'about': '🚀 Welcome to Room 2! I am Penny, I am the person who learning web development.',
    'skills': '💻 Frontend: HTML, CSS, JavaScript<br>🛠 Tools: VS Code, Git, Figma',
    'social': '🌐 Facebook: /zin.linn.htut.281300<br>📱 Telegram: @Penny_quii<br>📞 Viber: 099760444278',
    'clear': 'CLEAR',
    'exit': 'EXIT'
};

function executeCommand(cmd) {
    const command = cmd.trim().toLowerCase();
    
    // Display typed text
    const pInput = document.createElement('p');
    pInput.innerHTML = `<span class="prompt">penny@room2:~$</span> ${cmd}`;
    body.appendChild(pInput);

    // Process output
    if (command in commands) {
        if (command === 'clear') {
            body.innerHTML = '';
        } else if (command === 'exit') {
            window.location.href = 'home.html'; // ရှေ့ဆုံး Page ကို ပြန်သွားမည်
        } else {
            const pOutput = document.createElement('p');
            pOutput.innerHTML = commands[command];
            body.appendChild(pOutput);
        }
    } else if (command !== '') {
        const pError = document.createElement('p');
        pError.style.color = '#ff6b6b';
        pError.innerHTML = `Command not found: '${command}'. Type <span class="highlight">'help'</span>.`;
        body.appendChild(pError);
    }

    body.scrollTop = body.scrollHeight; // Auto Scroll down
}

// Keyboard Enter Key Event
input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        executeCommand(input.value);
        input.value = '';
    }
});

// Quick Button Click Event
function runCommand(cmdName) {
    executeCommand(cmdName);
}