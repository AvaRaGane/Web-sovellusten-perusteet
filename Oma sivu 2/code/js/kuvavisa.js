const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'TÄHÄN API'
    }
};
document.getElementById('language').value = "en";
const peliAsetukset = {
    pisteet: 0,
    name: "player2",
    genreU: "",
    year: 0,
    spokenLanguage: "en",
    totalResults: 0,
    fetchData: null,
    randomPage: 1,
    arvottuElokuva: null
};

if (peliAsetukset.name == "player2") {
    document.querySelector('div#pisteOutput').style.display = "none";
    document.querySelector('div#kuvaInput').style.display = "none";
    document.querySelector('div#vastausInput').style.display = "none";

    document.querySelector('select#language').addEventListener('change', () => {
        const selectedValue = document.querySelector('select#language').value;
        if (selectedValue === "fi") {
            peliAsetukset.spokenLanguage = document.getElementById('language').value;
            document.querySelector('div#genreInput').style.display = "none";
        } else {
            peliAsetukset.spokenLanguage = document.getElementById('language').value;
            document.querySelector('div#genreInput').style.display = "block";
        }
    });

    document.querySelector('#lähetäNimi').addEventListener('click', () => {
        peliAsetukset.name = document.querySelector('#nimi').value
        console.log(peliAsetukset.name)
        peliAsetukset.genreU = document.getElementById('genre').value;
        startGame();
    })
}

const startGame = () => {
    //aloitus näkymä pois ja muut esille.
    document.querySelector('div#nimiInput').style.display = "none"
    document.querySelector('div#genreInput').style.display = "block"
    document.querySelector('div#pisteOutput').style.display = "block"
    document.querySelector('div#kuvaInput').style.display = "block"
    document.querySelector('div#vastausInput').style.display = "block"
    document.querySelector('div#aloitusTeksti').innerHTML = "Noniin, " + peliAsetukset.name + " aloitetaan peli."
    document.querySelector('#pisteet').innerHTML = peliAsetukset.pisteet

    //console.log('kieli: ' + peliAsetukset.spokenLanguage)
    //console.log('genre ennen iffiä: ' + peliAsetukset.genreU)

    if (peliAsetukset.spokenLanguage == 'fi') {
        peliAsetukset.genreU = ''
    }
    //console.log('genre iffin jälkeen: ' + peliAsetukset.genreU)
    haeData()
    //datasta valittu sivu ja valittu elokuva tulostukseen
    document.querySelector('#arvaa').addEventListener('click', () => {
        const arvattuVuosikymmen = document.querySelector('#vuosikymmen').value
        console.log(arvattuVuosikymmen)
        if ((peliAsetukset.year >= arvattuVuosikymmen) && (peliAsetukset.year < arvattuVuosikymmen + 10)) {
            console.log('Oikein!')
            peliAsetukset.pisteet++
            document.querySelector('div#aloitusTeksti').innerHTML = "Oikein meni, " + peliAsetukset.name + " jatketaan peliä."
            document.querySelector('#pisteet').innerHTML = peliAsetukset.pisteet
            console.log('Pisteitä: '+peliAsetukset.pisteet)
            haeData()
        } else {
            console.log('Väärin. Peli päättyi, pisteitä: '+peliAsetukset.pisteet)
            gameover()
        }
    })
}

const gameover = () => {
    alert("Väärin meni. Sait pisteitä: "+peliAsetukset.pisteet +". Aloitetaan alusta!")
    location.reload();
}

const arvoElokuva = () => {
    let randomIndex = Math.floor(Math.random() * 20);
    while (peliAsetukset.fetchData.results[randomIndex].poster_path == null) {
        randomIndex = Math.floor(Math.random() * 20);
    }
    peliAsetukset.arvottuElokuva=peliAsetukset.fetchData.results[randomIndex]
    //console.log('Arvottu elokuva:'+peliAsetukset.arvottuElokuva)
    //console.log(typeof peliAsetukset.arvottuElokuva)
}

const arvoSivu = () => {
    //console.log('arvotaan sivua')
    const maxPages = 500; // TMDB:n maksimisivujen määrä
    const resultsPerPage = 20; // Tulosten määrä per sivu TMDB:ssä   
    //console.log('arvotaan sivua, totalResults:' +peliAsetukset.totalResults)
    if (peliAsetukset.totalResults / resultsPerPage > maxPages) {
        peliAsetukset.randomPage = Math.floor(Math.random() * maxPages) + 1;
    } else {
        peliAsetukset.randomPage = Math.floor(Math.random() * (Math.ceil(peliAsetukset.totalResults / resultsPerPage))) + 1;
    }
    //console.log('randomPage:' + peliAsetukset.randomPage)
}

//kuvan Tulostus
const näytäKuva = () => {
    let selectedMovie = peliAsetukset.arvottuElokuva;
    //console.log('selectedMovieTitle: ' + selectedMovie.original_title + ' and release_date: ' + selectedMovie.release_date);
    //console.log('posterin osoite: https://image.tmdb.org/t/p/original' + selectedMovie.poster_path);
    //console.log('Arvosana: ' + selectedMovie.vote_average);
    //console.log('movie ID: ' + selectedMovie.id);
    peliAsetukset.year = parseInt(selectedMovie.release_date.split('-')[0]);
    console.log(peliAsetukset.year);
    document.querySelector('#kuva').src = `https://image.tmdb.org/t/p/original${selectedMovie.poster_path}`;
}

const haeData = async () => {
    try {
        const response = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fi-FI&vote_average.gte=5&primary_release_date.gte=1960-01-01&with_original_language=' + peliAsetukset.spokenLanguage + '&page='+peliAsetukset.randomPage+'&sort_by=popularity.desc&with_genres=' + peliAsetukset.genreU, options);
        const data = await response.json();
        peliAsetukset.fetchData = data;
        peliAsetukset.totalResults = data.total_results;
        //console.log('data: ' + data);
        //console.log('data.total_results:' + data.total_results);
        //console.log('type of data:' + typeof data);
        //console.log('fetchData: ' + peliAsetukset.fetchData);
        //console.log('totalResults:' + peliAsetukset.totalResults);
        //console.log('fetchData.totalResults: ' + peliAsetukset.fetchData.total_results);
        //console.log('data haettu');
        arvoSivu()
        //console.log('sivu arvottu');
        arvoElokuva()
        //console.log('elokuva arvottu');
        näytäKuva()
    } catch (error) {
        console.error('Virhe fetch-pyynnössä:', error);
    }
}