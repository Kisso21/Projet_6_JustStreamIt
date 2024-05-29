// Fonction pour afficher les détails des films dans un modal
function displayModal(film) {
    // Vérifier si la modal existe déjà
    const existingModal = document.querySelector('.modal');
    if (existingModal) {
        return; // Sortir de la fonction si la modal existe déjà
    }

    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <p>Titre du film : ${film.title}</p>
            <img src="${film.image_url}" alt="${film.title}">
            <p>Année: ${film.year} - ${film.genres.join(', ')}</p>
            <p>Réalisateur: ${film.directors.join(', ')}</p>
            <p>IMDB score: ${film.imdb_score} /10</p>
            <p>Avec: ${film.actors.join(', ')}</p>
            <p>Durée: N/A</p>
            <p>Pays d'origine: N/A</p>
            <p>Recette au box-office: N/A</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris ultrices eros in cursus turpis massa tincidunt dui. Urna duis convallis convallis tellus id. In metus vulputate eu scelerisque felis imperdiet proin fermentum. Odio eu feugiat pretium nibh ipsum consequat nisl.</p>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = "block";

    // Fermer la modal
    modal.querySelector('.close').onclick = function() {
        modal.style.display = "none";
        document.body.removeChild(modal);
    };
}

        // Fonction pour charger les films
        function loadMovies(url, containerId) {
            fetch(url)
            .then(response => response.json())
            .then(data => {
                const movieGrid = document.getElementById(containerId);
                movieGrid.innerHTML = ''; // Clear existing movies
                data.results.forEach(film => {
                    const filmDiv = document.createElement('div');
                    filmDiv.classList.add('movie-item');
                    filmDiv.innerHTML = `
                        <img src="${film.image_url}" alt="${film.title}">
                        <div class="overlay">
                            <span>${film.title}</span>
                            <button class="details-button" data-film='${JSON.stringify(film)}'>Détails</button>
                        </div>
                    `;
                    movieGrid.appendChild(filmDiv);
                });

                // Ajouter les événements de clic aux boutons de détails
                document.querySelectorAll('.details-button').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const film = JSON.parse(e.target.getAttribute('data-film'));
                        displayModal(film);
                    });
                });
            })
            .catch(error => {
                console.error('Une erreur s\'est produite lors de la récupération des données :', error);
            });
        }

        // Charger le meilleur film
        fetch('http://localhost:8000/api/v1/titles/?year=&min_year=&page_size=1&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=')
        .then(response => response.json())
        .then(data => {
            const bestMovie = data.results[0];
            const bestMovieSection = document.getElementById('best-movie');
            const bestMovieInfo = document.getElementById('best-movie-info');

            bestMovieSection.querySelector('img').src = bestMovie.image_url;
            bestMovieSection.querySelector('img').alt = bestMovie.title;
            bestMovieInfo.querySelector('h1').innerText = bestMovie.title;
            bestMovieInfo.querySelector('button').addEventListener('click', () => displayModal(bestMovie));
        })
        .catch(error => {
            console.error('Une erreur s\'est produite lors de la récupération des données :', error);
        });

        // Charger les meilleurs films
        loadMovies('http://localhost:8000/api/v1/titles/?year=&min_year=&page_size=6&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=', 'movie-grid');

        // Charger les comédies
        loadMovies('http://localhost:8000/api/v1/titles/?year=&min_year=&page_size=6&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=comedy&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=', 'comedy-grid');

        // Charger les films de science-fiction
        loadMovies('http://localhost:8000/api/v1/titles/?year=&min_year=&page_size=6&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=Sci-Fi&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=', 'sci-fi-grid');

        // Récupération des genres
        fetch('http://localhost:8000/api/v1/genres/?page_size=30')
            .then(response => response.json())
            .then(data => {
                const genreSelect = document.getElementById('genre');
                data.results.forEach(genre => {
                    const option = document.createElement('option');
                    option.value = genre.id; // Valeur de l'option est l'ID du genre
                    option.textContent = genre.name; // Texte de l'option est le nom du genre
                    genreSelect.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des genres :', error);
            });

        // Gérer la sélection du genre
        const selectElement = document.getElementById('genre');

        selectElement.addEventListener('change', function() {
            const selectedGenreId = selectElement.options[selectElement.selectedIndex].textContent;
            console.log("Selected Genre ID:", selectedGenreId); // Affiche la valeur dans la console

            const url = `http://localhost:8000/api/v1/titles/?genre=${selectedGenreId}&sort_by=-imdb_score&page_size=6`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const otherGrid = document.getElementById('other-grid');
                    otherGrid.innerHTML = ''; // Clear existing movies
                    data.results.forEach(film => {
                        const filmDiv = document.createElement('div');
                        filmDiv.classList.add('movie-item');
                        filmDiv.innerHTML = `
                            <img src="${film.image_url}" alt="${film.title}">
                            <div class="overlay">
                                <span>${film.title}</span>
                                <button class="details-button" data-film='${JSON.stringify(film)}'>Détails</button>
                            </div>
                        `;
                        otherGrid.appendChild(filmDiv);
                    });

                    // Ajouter les événements de clic aux boutons de détails
                    document.querySelectorAll('.details-button').forEach(button => {
                        button.addEventListener('click', (e) => {
                            const film = JSON.parse(e.target.getAttribute('data-film'));
                            displayModal(film);
                        });
                    });
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des données :', error);
                });
        });