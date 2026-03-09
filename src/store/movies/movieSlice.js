import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPopularMovies } from "../../services/api";
import { searchMovies, fetchMoviesByGenre, fetchGenres } from "../../services/api";
import {toast} from "react-toastify";

export const searchMovie = createAsyncThunk(
    "movies/getSearchResults",
    async (query) => {
        const data = await searchMovies(query);
        return data;
    }
);

export const getGenres = createAsyncThunk(
    "movies/getGenres",
    async () => {
        const data = await fetchGenres();
        console.log(data);
        return data;
    }
)

export const getMoviesByGenre = createAsyncThunk(
    "movies/getMoviesByGenre",
    async ({ genreId, page }) => {
        const data = await fetchMoviesByGenre(genreId, page);
        return data;
    }
);

export const getPopularMovies = createAsyncThunk(
    "movies/getPopularMovies",
    async (page) => {
        const data = await fetchPopularMovies(page);
        return data;
    }
);

const movieSlice = createSlice({
    name: "movies",
    initialState: {
        TrendMovie: [],
        movies: [],
        genres: [],
        selectedGenre: Number(localStorage.getItem("genre")) || "",
        totalPages: 1,
        loading: false,
        error: null,
        favorites: JSON.parse(localStorage.getItem("favorites")) || [],
        rating: 0,
    },
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },

        setRating: (state, action) => {
            state.rating = action.payload;
            state.page = 1;
        },

        setGenre: (state, action) => {
            state.selectedGenre = action.payload;
            state.page = 1;
            localStorage.setItem("genre", action.payload);
        },

        addFavorite: (state, action) => {
            const exists = state.favorites.find(
                (movie) => movie.id === action.payload.id
            );

            if (!exists) {
                state.favorites.push(action.payload);
            }

            localStorage.setItem(
                "favorites",
                JSON.stringify(state.favorites)
            );
        },

        removeFavorite: (state, action) => {
            state.favorites = state.favorites.filter(
                (movie) => movie.id !== action.payload
            );

            localStorage.setItem(
                "favorites",
                JSON.stringify(state.favorites)
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPopularMovies.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPopularMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = action.payload.results;
                state.totalPages = action.payload.total_pages;
            })
            .addCase(getPopularMovies.rejected, (state) => {
                state.loading = false;
                state.error = "Failed to fetch movies";
            });

        builder
            .addCase(searchMovie.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchMovie.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = action.payload;
            })
            .addCase(searchMovie.rejected, (state) => {
                state.loading = false;
                state.error = "Failed to fetch movies";
            });

        builder
            .addCase(getGenres.fulfilled, (state, action) => {
                state.genres = [{ id: "", name: "All" }, ...action.payload];
            })

            .addCase(getMoviesByGenre.pending, (state) => {
                state.loading = true;
            })

            .addCase(getMoviesByGenre.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = action.payload.results;
                state.totalPages = action.payload.total_pages;
            })

            .addCase(getMoviesByGenre.rejected, (state) => {
                state.loading = false;
                state.error = "Failed to fetch movies";
            })
    },
});

export const { setPage, setRating, setGenre, addFavorite, removeFavorite } = movieSlice.actions;
export default movieSlice.reducer;