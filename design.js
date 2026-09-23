const pullCord = document.getElementById('pullCord');
const body = document.body;
const instruction = document.getElementById('instruction');
const nameInput = document.getElementById('nameInput');
const submitBtn = document.getElementById('submitBtn');
const errorMsg = document.getElementById('errorMsg');

// သွားမည့် Page အမည်
const NEXT_PAGE = 'home.html';

// Web Audio API သုံးပြီး ကြိုးဆွဲသံ (Click sound) ထုတ်ပေးခြင်း
function playClickSound() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(120, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.08);
        
        gain.gain.setValueAtTime(1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start();
        osc.stop(audioCtx.currentTime + 0.08);
    } catch(e) {}
}

// မီးဖွင့်/ပိတ် Toggle ပြုလုပ်ခြင်း
pullCord.addEventListener('click', () => {
    playClickSound();
    body.classList.toggle('lamp-on');

    if (body.classList.contains('lamp-on')) {
        instruction.style.display = 'none';
        nameInput.focus(); // မီးလင်းပါက Input box ထဲ Cursor တန်းရောက်မည်
    } else {
        instruction.style.display = 'block';
    }
});

// Secret Code စစ်ဆေးပြီး home.html သို့ ကူးပေးသည့် Function
function validateAndRedirect() {
    const userInputValue = nameInput.value.trim().toLowerCase();
    
    // Secret code ကို "penny" ဟု ပြောင်းလဲထားပါသည်
    if (userInputValue === "penny") {
        errorMsg.textContent = "";
        window.location.href = NEXT_PAGE;
    } else {
        errorMsg.textContent = "Secret code မှားယွင်းနေပါသည်။";
        nameInput.style.borderColor = "#ff6b6b";
        
        // မှားယွင်းပါက Input Box တုန်သွားမည့် Effect
        nameInput.animate([
            { transform: 'translateX(-5px)' },
            { transform: 'translateX(5px)' },
            { transform: 'translateX(-5px)' },
            { transform: 'translateX(0)' }
        ], { duration: 200 });
    }
}

// Enter Button ကို နှိပ်လျှင် home.html သို့ ကူးမည်
submitBtn.addEventListener('click', validateAndRedirect);

// Keyboard မှ Enter Key ကို နှိပ်လျှင်လည်း home.html သို့ ကူးမည်
nameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        validateAndRedirect();
    }
});