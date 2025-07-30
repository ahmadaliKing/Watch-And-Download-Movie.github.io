let moviesData = [];

async function fetchMovies() {
    const res = await fetch('movies.json');
    moviesData = await res.json();
    displayMovies(moviesData);
}

function displayMovies(movies) {
    const container = document.getElementById('movies');
    container.innerHTML = '';

    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
  <img src="${movie.poster}" alt="${movie.name}">
  <div class="info">
    <h2>${movie.name}</h2>
    <p><strong>Release:</strong> ${movie.release}</p>
    <input type="text" value="${movie.link}" readonly>
    <button class="copy-btn" onclick="copyLink('${movie.link}')">📋 Copy Link</button>
  </div>
`;
        container.appendChild(card);
    });
}

function copyLink(link) {
    navigator.clipboard.writeText(link);
    alert('Link copied!');
}

document.getElementById('search').addEventListener('input', function () {
    const keyword = this.value.toLowerCase();
    const filtered = moviesData.filter(movie => movie.name.toLowerCase().includes(keyword));
    displayMovies(filtered);
});

fetchMovies();
