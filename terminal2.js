const input = document.getElementById('cli-input');
const body = document.getElementById('terminal-body');

const commands = {
    'help': 'Available commands: <span class="highlight">about, skills, social/socials, clear, exit</span>',
    'about': '🚀 Welcome to Room 2! I am Penny, I am the person who learning web development.',
    'skills': '💻 Frontend: HTML, CSS, JavaScript<br>🛠 Tools: VS Code, Git, Figma',
    'social': '🌐 Facebook: <a href="https://facebook.com/zin.linn.htut.281300" target="_blank" style="color: #ffe066;">/zin.linn.htut.281300</a><br>📱 Telegram: <a href="https://t.me/Penny_quii" target="_blank" style="color: #ffe066;">@Penny_quii</a><br>📞 Viber: 09760444278',
    'socials': '🌐 Facebook: <a href="https://facebook.com/zin.linn.htut.281300" target="_blank" style="color: #ffe066;">/zin.linn.htut.281300</a><br>📱 Telegram: <a href="https://t.me/Penny_quii" target="_blank" style="color: #ffe066;">@Penny_quii</a><br>📞 Viber: 09760444278',
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
            body.innerHTML = `
                <p class="system-msg">[ENTERED ROOM 2 - ACCESS GRANTED]</p>
                <p class="system-msg">Type <span class="highlight">'help'</span> or click the buttons above to interact.</p>
                <br>
            `;
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
if (input) {
    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            executeCommand(input.value);
            input.value = '';
        }
    });
}

// Quick Button Click Event
function runCommand(cmdName) {
    executeCommand(cmdName);
}