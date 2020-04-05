// helpers/films-model.js

interface Film {
    id: number,
    budget: number,
    vote_average: number,
    vote_count: number,
    title: string,
    poster_path: string,
    backdrop_path: string,
    original_title: string,
    overview: string,
    release_date: string,
    genres: { id: number, name: string }[]
    production_companies: { id: number, name: string, logo_path: string, original_country: string }[]
}

export default Film;

