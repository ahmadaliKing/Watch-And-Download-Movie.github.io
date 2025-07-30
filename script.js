// Declare only once, at top
let moviesData = [];

async function fetchMovies() {
  const container = document.getElementById('movies');

  // Show loading message
  container.innerHTML = `<p class="loading">Loading movies...</p>`;

  try {
    const res = await fetch('movies.json');
    moviesData = await res.json();

    displayMovies(moviesData);
  } catch (error) {
    container.innerHTML = `<p class="error">❌ Failed to load movie data.</p>`;
    console.error("Error fetching JSON:", error);
  }
}

function displayMovies(movies) {
  const container = document.getElementById('movies');
  container.innerHTML = ''; // Clear previous content

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
  navigator.clipboard.writeText(link).then(() => {
    alert('Link copied!');
  });
}

// Search movie by name
document.getElementById('search').addEventListener('input', function () {
  const keyword = this.value.toLowerCase();
  const filtered = moviesData.filter(movie =>
    movie.name.toLowerCase().includes(keyword)
  );
  displayMovies(filtered);
});

// Start fetching on load
fetchMovies();
