// api/tmdb-api.ts

const API_TOKEN = '602e52005a9bf3c10db030d7d916281c';

export const getFilmsFromApiWithSearchedText = (text: string, page: number) => {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + '&page=' + page;
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}

export const getFilmDetailFromApi = (filmId: number) => {
    return fetch('https://api.themoviedb.org/3/movie/' + filmId + '?api_key=' + API_TOKEN + '&language=fr')
        .then((response) => response.json())
        .catch((error) => console.error(error));
}

export function getBestFilmsFromApi (page: number) {
    return fetch('https://api.themoviedb.org/3/discover/movie?api_key=' + API_TOKEN + '&vote_count.gte=1000&sort_by=release_date.desc&language=fr&page=' + page)
        .then((response) => response.json())
        .catch((error) => console.error(error));
}

export const getImageFromApi = (name: string) => {
    return 'https://image.tmdb.org/t/p/w300' + name
}
