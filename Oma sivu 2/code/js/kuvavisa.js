const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YmQ3OGQzMmM5NjVkM2U2OWExM2JmZTVjYzA5M2FlMCIsInN1YiI6IjY1Y2Y4YmQzMzVkYjQ1MDE3ZTE4ZTRmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VAPvCkfzEeLzNfwLAlbN4-ACF2OFZyMt70btpWfWBQI'
    }
};
let pisteet = 0;
let name = "player2";
let genreU = '';
let year=0;
console.log(name);
let spokenLanguage = "en";
document.getElementById('language').value = "en";

if (name == "player2") {
    document.querySelector('div#pisteOutput').style.display = "none";
    document.querySelector('div#kuvaInput').style.display = "none";
    document.querySelector('div#vastausInput').style.display = "none";

    document.querySelector('select#language').addEventListener('change', () => {
        const selectedValue = document.querySelector('select#language').value;
        if (selectedValue === "fi") {
            spokenLanguage = document.getElementById('language').value;
            document.querySelector('div#genreInput').style.display = "none";
        } else {
            spokenLanguage = document.getElementById('language').value;
            document.querySelector('div#genreInput').style.display = "block";
        }
    });

    document.querySelector('#lähetäNimi').addEventListener('click', () => {
        name = document.querySelector('#nimi').value
        console.log(name)
        genreU = document.getElementById('genre').value;
        startGame();
    })
}

const startGame = () => {
    //nimi näkymä pois ja muut esille.
    document.querySelector('div#nimiInput').style.display = "none"
    //document.querySelector('div#kieliInput').style.display = "block"
    document.querySelector('div#genreInput').style.display = "block"
    document.querySelector('div#pisteOutput').style.display = "block"
    document.querySelector('div#kuvaInput').style.display = "block"
    document.querySelector('div#vastausInput').style.display = "block"
    document.querySelector('div#aloitusTeksti').innerHTML = "Noniin, " + name + " aloitetaan peli."
    document.querySelector('#pisteet').innerHTML = pisteet

    console.log('kieli: ' + spokenLanguage)
    console.log('genre ennen iffiä: ' + genreU)

    if (spokenLanguage == 'fi') {
        genreU = ''
    }
    console.log('genre iffin jälkeen: ' + genreU)
    haeElokuva()
    document.querySelector('#arvaa').addEventListener('click', () =>{
        const arvattuVuosikymmen=document.querySelector('#vuosikymmen').value
        console.log(arvattuVuosikymmen)
        if ((year>arvattuVuosikymmen)&&(year<arvattuVuosikymmen+10)){
            pisteet++
            startGame()
        }else{
            gameover()
        }
    })
}

const haeElokuva = () => {
    fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fi-FI&vote_average.gte=5&primary_release_date.gte=1960-01-01&with_original_language=' + spokenLanguage + '&page=1&sort_by=popularity.desc&with_genres=' + genreU, options)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            console.log('data.total_results:' + data.total_results)
            const totalResults = data.total_results;
            console.log('totalResults:' + totalResults)
            // Tarkista, että saadut tulokset eivät ole tyhjiä
            if (totalResults > 0) {
                // Arvotaan satunnainen sivu

                const maxPages = 500; // TMDB:n maksimisivujen määrä
                const resultsPerPage = 20; // Tulosten määrä per sivu TMDB:ssä   
                let randomPage = 0
                if (totalResults / resultsPerPage > maxPages) {
                    randomPage = Math.floor(Math.random() * maxPages) + 1;
                } else {
                    randomPage = Math.floor(Math.random() * (Math.ceil(totalResults / resultsPerPage))) + 1;
                }
                console.log('randomPage:' + randomPage)
                // Hae elokuvat valitulta sivulta
                fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fi-FI&vote_average.gte=5&primary_release_date.gte=1960-01-01&with_original_language=' + spokenLanguage + '&page=' + randomPage + '&sort_by=popularity.desc&with_genres=' + genreU, options)

                    .then(response => response.json())
                    .then(data => {
                        console.log('data2:')
                        console.log(data)
                        // Varmista, että saadut tulokset eivät ole tyhjiä
                        if (data.results && data.results.length > 0) {
                            //arvotaan elokuva saadusta max 20 elokuvasta

                            //console.log('data results:'+data.results);                
                            let selectedMovie = arvoElokuva(data);
                            // Arvotaan uusiksi, jos elokuvalla ei ole kuvaa
                            while (selectedMovie.poster_path == null) {
                                selectedMovie = arvoElokuva(data);
                            }
                            // 
                            console.log('selectedMovieTitle: ' + selectedMovie.original_title + ' and release_date: ' + selectedMovie.release_date);
                            console.log('posterin osoite: https://image.tmdb.org/t/p/original' + selectedMovie.poster_path)
                            console.log('Arvosana: ' + selectedMovie.vote_average)
                            console.log('movie ID: '+selectedMovie.id)
                            year = parseInt(selectedMovie.release_date.split('-')[0]);
                            console.log(year);
                            document.querySelector('#kuva').src = `https://image.tmdb.org/t/p/original${selectedMovie.poster_path}`;
                        } else {
                            console.log('Ei tuloksia valituilla suodattimilla.');
                        }
                    })
                    .catch(error => console.error('Virhe:', error));
            } else {
                console.log('Ei tuloksia valituilla suodattimilla.');
            }
        })
        .catch(error => console.error('Virhe:', error));
}

const gameover = () => {
    alert("Väärin meni. Aloitetaan alusta")
    location.reload();
}

const arvoElokuva = (data) => {
    const randomIndex = Math.floor(Math.random() * data.results.length);
    return data.results[randomIndex];
};
