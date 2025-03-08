const CORRECT_PASSWORD = 'ILU2025';
const poems = [
    {
        id: 3,
        title: "Día de la Mujer",
        content: `Hoy celebro tu luz, tu fuerza, tu ser,
el mundo es más bello porque estás de pie.

Tus sueños son faros, tu voz es canción,
en ti veo el futuro, la mejor dirección.
Eres valiente, eres libre, eres puro amor,
mi vida contigo es mi mayor tesor.

En este día, y en todos los demás,
te celebro a ti, mujer, por lo que eres y darás.`,
        date: "March 8, 2025."
    },
    {
        id: 2,
        title: "Bajo el Mismo Cielo",
        content: `En este día de amor, bajo el mismo cielo,
mi corazón late solo por ti, mi anhelo.
Las estrellas brillan con luz tenue y clara,
pero ninguna brilla como tu mirada rara.

El tiempo se detiene cuando estás cerca,
y en tu sonrisa, mi mundo se reverdece.
Eres mi noche, mi día, mi eterno refugio,
el amor que ilumina mi más oscuro prodigio.

Y en cada noche, bajo el mismo cielo,
prometo amarte con todo mi anhelo.
Aunque la distancia nos separe hoy,
mi corazón siempre estará donde estés tú, 

mi amor`,
        date: "February 14, 2025"
    },
    {
        id: 1,
        title: "Mi Noche",
        content: `Tus ojos, como el azul de un horizonte lejano,
guardan secretos que anhelo entender, de mano en mano.
Las olas rompen, susurran, y me consuelan,
como tu voz, que en mi alma siempre serena.

En cada ola, siento el calor de tu mirar,
y el eco de tus pasos al caminar.
El mar y la noche se funden en ti,
en tu belleza, en la calma que sentí.

Eres el reflejo de todo lo que quiero descubrir,
una vida contigo, donde mi alma quiere existir.
Contigo, el futuro se pinta con nuevos colores,
pues en ti he encontrado la mejor de las flores.`,
        date: "October 15, 2024"
    }
];

document.addEventListener('keydown', function(e) {
    // Check for Ctrl+Shift+A
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        const visits = parseInt(localStorage.getItem('visitCount') || '0');
        const lastVisit = localStorage.getItem('lastVisit');
        alert(`💕 Visit Statistics 💕\n\nTotal Visits: ${visits}\nLast Visit: ${lastVisit || 'First time!'}`);
    }
});

function checkIfLoggedIn() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('main-content').classList.remove('hidden');
        loadPoems();
        createFloatingHearts();
        document.addEventListener('click', createHeartExplosion);
        
        const visits = parseInt(localStorage.getItem('visitCount') || '0');
        console.log(`She has visited ${visits} times 💕`);
    }
}

function incrementVisitCount() {
    const visits = parseInt(localStorage.getItem('visitCount') || '0');
    const now = new Date().toLocaleString();
    
    localStorage.setItem('visitCount', visits + 1);
    localStorage.setItem('lastVisit', now);
    
    console.log(`She has visited ${visits + 1} times 💕`);
    console.log(`Last visit was at: ${now}`);
}

function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    const heartSymbols = ['❤', '♥'];
    const numberOfHearts = 30;

    for (let i = 0; i < numberOfHearts; i++) {
        const heart = document.createElement('span');
        heart.className = 'heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.top = `${Math.random() * 100}vh`;
        heart.style.fontSize = `${Math.random() * (40 - 10) + 10}px`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(heart);
    }
}

function createHeartExplosion(event) {
    const explosion = document.createElement('div');
    explosion.className = 'heart-explosion';
    explosion.style.left = `${event.clientX}px`;
    explosion.style.top = `${event.clientY}px`;
    
    // Increased number of hearts and varied the pattern
    for (let i = 0; i < 12; i++) {
        const heart = document.createElement('div');
        heart.className = 'explosion-heart';
        heart.innerHTML = '❤';
        
        // Create a more natural explosion pattern
        const angle = (i / 12) * 360 + (Math.random() * 30 - 15);
        const distance = 30 + Math.random() * 30;
        heart.style.transform = `rotate(${angle}deg) translate(${distance}px, 0)`;
        
        // Randomize the size slightly
        heart.style.fontSize = `${16 + Math.random() * 8}px`;
        explosion.appendChild(heart);
    }
    
    document.body.appendChild(explosion);
    
    // Remove the explosion div after animation
    setTimeout(() => {
        document.body.removeChild(explosion);
    }, 1000);
}

function checkPassword() {
    const passwordInput = document.getElementById('password-input').value;
    if (passwordInput === CORRECT_PASSWORD) {
        localStorage.setItem('isLoggedIn', 'true');
        incrementVisitCount();
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('main-content').classList.remove('hidden');
        loadPoems();
        createFloatingHearts();
        document.addEventListener('click', createHeartExplosion);
    } else {
        alert('Incorrect password. Try again!');
    }
}

function loadPoems(view = 'all') {
    const container = document.getElementById('poems-container');
    const bookmarkedPoems = JSON.parse(localStorage.getItem('bookmarkedPoems') || '[]');
    
    // Clear the container first
    container.innerHTML = '';
    
    // Filter poems based on view
    let poemsToShow = view === 'all' ? 
        poems : 
        poems.filter(poem => bookmarkedPoems.includes(poem.id));
    
    if (view === 'bookmarked' && poemsToShow.length === 0) {
        container.innerHTML = `
            <div class="no-bookmarks">
                <p>No bookmarked poems yet! 💝</p>
                <p>Click the ☆ on any poem to add it to your favorites.</p>
            </div>
        `;
        return;
    }
    
    poemsToShow.forEach(poem => {
        const isBookmarked = bookmarkedPoems.includes(poem.id);
        const poemElement = `
            <div class="poem-card">
                <span class="bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" 
                      onclick="toggleBookmark(${poem.id})">
                    ${isBookmarked ? '★' : '☆'}
                </span>
                <h2>${poem.title}</h2>
                <p>${poem.content}</p>
                <small>${poem.date}</small>
            </div>
        `;
        container.innerHTML += poemElement;
    });
}

function toggleBookmark(poemId) {
    let bookmarkedPoems = JSON.parse(localStorage.getItem('bookmarkedPoems') || '[]');
    
    if (bookmarkedPoems.includes(poemId)) {
        bookmarkedPoems = bookmarkedPoems.filter(id => id !== poemId);
    } else {
        bookmarkedPoems.push(poemId);
    }
    
    localStorage.setItem('bookmarkedPoems', JSON.stringify(bookmarkedPoems));
    
    // Refresh the poems display
    document.getElementById('poems-container').innerHTML = '';
    loadPoems();
}

function toggleView(view) {
    const allBtn = document.getElementById('all-btn');
    const bookmarkedBtn = document.getElementById('bookmarked-btn');
    
    if (view === 'all') {
        allBtn.classList.add('active');
        bookmarkedBtn.classList.remove('active');
        loadPoems('all');
    } else {
        bookmarkedBtn.classList.add('active');
        allBtn.classList.remove('active');
        loadPoems('bookmarked');
    }
}

document.addEventListener('DOMContentLoaded', checkIfLoggedIn); 