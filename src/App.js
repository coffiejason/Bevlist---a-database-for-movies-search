import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";

const API_URL = 'https://www.omdbapi.com/?i=tt3896198&apikey=63874c69';

// const movie1 = {
//     "Title": "Docter Strange",
//     "Year": "2016",
//     "imdbID": "tt2586634",
//     "Type": "movie",
//     "Poster": "N/A"
// }

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')

    const searchMovies = async (title) => {
        setSearchTerm(title);
        if(title !== '' && title !== null && title.length > 2){
            const response = await fetch(`${API_URL}&s=${title}`);
            const data = await response.json();

            
            if (data.Response == 'True'){
                setMovies(data.Search);
            }
        }
    }

    useEffect(() => {
        searchMovies('avengers');
    }, []);

    return (
        <div className="app">

            <h1>BEVLIST.</h1>


            <div className="search">
                <input
                    placeholder="Enter a movie title ... "
                    value={searchTerm}
                    onChange={(e) => { searchMovies(e.target.value)}}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => { searchMovies(searchTerm)}}
                />
            </div>
            <>
            {
                movies.length > 0 ? (
                    //<h3> movies were found</h3>
                    <div className="container">
                        {movies.map((movie)=>(
                            <MovieCard movie={movie} />
                        ))}
                    </div>

                ) : (
                    <h3>No movies were found</h3>
                )
            }
            </>


                



            {


                // <h3>{console.log(movies.length)}</h3>



                // movies.length > 0 ?
                // (
                //     <MovieCard />
                // ):(
                //     <h3>No movies were found</h3>
                // )
            }
        </div>

    )
}

export default App;