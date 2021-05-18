/*
List of movies

Your task is to create a list of movies that includes information about the actors and the 
genre of the movie. You will be provided with a series of functions containing the movies, the actors and
the genres separately. Think of these functions as imaginary APIs that are separate and
independent from each other and from your app.

You cannot modify these functions, as in this context you are not the owner of
said APIs, but you have your own function to combine and massage the data for
your front-end app. Think of this function (getCombinedData()) as your own API. 

What you'll need to do:
- Implement the function getCombinedData() (this is your "imaginary" backend):
--- Combine the results of getMovies() (your list of movies), getActors() and
    getGenres() to create an appropiate response for the front end.
- Use getCombinedData() to create a table containing the following columns
--- Column 1: The title of the movie (For example: Star Wars: The Last Jedi)
--- Column 2: The actors names (For example: Mark Hamill, Carrie Fisher, Adam Driver)
--- Column 3: The year of the movie (For example: 2017)
--- Column 4: The genre (For example: Action)

Imagine that each time you call a function (getActors, getMovies, getGenres or your own 
getCombinedData) you are doing a GET request. 
*/

import React, { useState, useEffect } from 'react';
import './MoviesPage.css';

/* ------- Imaginary backend services ------- */
function getActors() {
  const actors =  [
    {
      id: 100,
      name: "Mark Hamill"
    }, {
      id: 101,
      name: "Carrie Fisher"
    }, {
      id: 102,
      name: "Frances McDormand"
    }, {
      id: 103,
      name: "Christian Bale"
    }, {
      id: 104,
      name: "Anne Hathaway"
    }
  ];
  return new Promise(resolve => resolve(actors));
}


function getGenres() {
  const genres = [
    {
      id: 1,
      name: "Action"
    }, {
      id: 2,
      name: "Adventure"
    }, {
      id: 3,
      name: "Comedy"
    }, {
      id: 4,
      name: "Drama"
    }
  ];
  return new Promise(resolve => resolve(genres));
}

function getMovies() {
  const events = [
    {
      id: 300,
      title: "Star Wars: The Last Jedi",
      actor_ids: [100, 101],
      genre_id: 1,
      year: "2017",
      rating: "PG-13"
    }, {
      id: 301,
      title: "Nomadland",
      actor_ids: [102],
      genre_id: 4,
      year: "2020",
      rating: "Rated R"
    }, {
      id: 302,
      title: "The Dark Knight Rises",
      actor_ids: [103, 104],
      genre_id: 2,
      year: "2012",
      rating: "PG-13"
    }, {
      id: 303,
      title: "Star Wars: The Force Awakens",
      actor_ids: [100, 101],
      genre_id: 1,
      year: "2015",
      rating: "PG-13"
    }, {
      id: 304,
      title: "The Devil Wears Prada",
      actor_ids: [104],
      genre_id: 1,
      year: "2006",
      rating: "PG-13"
    }
  ];
  return new Promise(resolve => resolve(events));
}

/* ------- (Imaginary) intermediate backend --------- */
function getCombinedData() {
    return Promise.all([getMovies(), getGenres(), getActors()]).then(resp => {
      let movies = resp[0];
      let genres = resp[1];
      let actors = resp[2];
      
      let combinedData = movies.reduce((acc, movie) => {
        let actorsArr = actors.filter(x => movie.actor_ids.includes(x.id));
        let genre = genres.filter(x => x.id === movie.genre_id)[0];
        
        acc.push({
          title: movie.title, year: movie.year, genre: genre, actors: actorsArr
        });
        
        return acc;
      }, []);
      
      return combinedData;
    });

}

/* ------- Your React Components (add as many as you need) ------- */
const MoviesPage = () => {
    const [movies, setMovies] = useState(null);
    
    useEffect(() => {
      getCombinedData().then(data => {
        setMovies(data);
        console.log(data)
      });
    }, []);
      
        
    return (
      <div id="movies-page">
        <table>
          <thead>
            <tr>
              <th>Movie Title</th>
              <th>Actors</th>
              <th>Year</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            {movies && movies.length && movies.map((movie, index) => (
              <tr key={index}>
                <td>{movie.title}</td>
                <td>
                  {movie.actors.length && movie.actors.map(actor => (
                    <span className="actor-name" key={actor.id}>{actor.name}</span>          
                  ))}
                </td>
                <td>{movie.year}</td>
                <td>{movie.genre.name}</td>
              </tr>
            ))}
          </tbody>    
        </table>
      </div>
    );
}

export default MoviesPage;