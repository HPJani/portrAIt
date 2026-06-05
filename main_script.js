const theme = document.getElementById('theme-toggle');
const about = document.getElementById('about-toggle');
const body = document.body;

const responseButton= document.getElementById('response-button');
const chatArea= document.getElementById('chatResponses');
const drawer = document.getElementById('about-drawer');
const overlay = document.getElementById('about-overlay');

document.getElementById('prompt').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendQuery();
    }
});

document.getElementById('delete-button').addEventListener('click', () => {
    document.getElementById('prompt').value = '';
});

// for element removals
function popupRemove(e) {
    const popup = document.querySelector('.theme-popup');
    if (popup && !popup.contains(e.target)) {
        popup.remove();
    }

    if (drawer.classList.contains('active') && !drawer.contains(e.target) && e.target !== about) {
        drawer.classList.remove('active');
        overlay.classList.remove('active');
    }
}

function toggleAboutDrawer(e) {
    e.preventDefault();
    e.stopPropagation();

    drawer.classList.toggle('active');
    overlay.classList.toggle('active');
}

function themePopup(e) {
    e.preventDefault();
    e.stopPropagation(); 

    // Auto close about drawer before drawing out themes to avoid overlapping ui elements
    drawer.classList.remove('active');
    overlay.classList.remove('active');

    const existingPopup = document.querySelector('.theme-popup');
    if (existingPopup) {
        existingPopup.remove();
        return; 
    }

    const popup = document.createElement('div');
    popup.classList.add('theme-popup');
    popup.innerHTML = `
        <button id="light-theme">Light</button>
        <button id="dark-theme">Dark</button>
        <button id="narc-theme">Narc</button>
    `;

    popup.addEventListener('click', (event) => {
        event.stopPropagation();

        body.classList.remove('dark-theme', 'narc-theme');
        const narcBg= document.getElementById('narc-bg');
        narcBg.style.display= 'none';
        document.querySelector('.header-graphic').style.display = 'block';

        if (event.target.id === 'dark-theme') {
            body.classList.add('dark-theme');
            const graphicImage = document.querySelector('.header-graphic');
            graphicImage.src = 'graphic_dark.png';
        } else if (event.target.id === 'narc-theme') {
            body.classList.add('narc-theme');
            narcBg.style.display= 'block';
            body.backgroundColor= 'transparent';
            narcBg.innerHTML = '';
            document.querySelector('.header-graphic').style.display = 'none';
            for(let i=1; i<=600; i++){
                const top= Math.random() * 100;
                const left= Math.random() * 100;
                const rotation= Math.random() * 90;
                const r = Math.floor(Math.random() * 256);
                const g = Math.floor(Math.random() * 256);
                const b = Math.floor(Math.random() * 256);

                narcBg.innerHTML+= `<span style="position: absolute; top: ${top}%; left: ${left}%; transform: rotate(${rotation}deg); font-size: 24px; color: rgb(${r}, ${g}, ${b}); opacity: 0.2; font-weight: bold;">Himanshu</span>`;
            }
        }
        else if(event.target.id === 'light-theme'){
            const graphicImage = document.querySelector('.header-graphic');
            graphicImage.src = 'graphic.jpg';
        }

        popup.remove();
    });
    document.body.appendChild(popup);
}

async function sendQuery() {

    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'aiResponse';
    loadingDiv.id = 'loading-message';
    loadingDiv.textContent = 'Thinking...';

chatArea.appendChild(loadingDiv);
    
    const prompt= document.getElementById('prompt').value;
    document.getElementById('prompt').value= ''; //clears the chat area
    chatArea.innerHTML+= `<div class="userQuestion"> ${prompt}</div>`;
    const response= await fetch('https://portrait-10i8.onrender.com/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: prompt })
    });
    const data = await response.json();
    document.getElementById('loading-message')?.remove();
    chatArea.innerHTML+= `<div class="aiResponse"> ${data.answer}</div>`;
    chatArea.scrollTop = chatArea.scrollHeight;

}

body.addEventListener('click', popupRemove);
theme.addEventListener('click', themePopup);
about.addEventListener('click', toggleAboutDrawer);
responseButton.addEventListener('click', sendQuery);
