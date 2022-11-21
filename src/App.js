import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useCallback } from "react";
import movieData from "./assets/movie-data.json";
import MovieItem from "./components/MovieItem.js";
import FilterOption from "./components/FilterOption.js";

movieData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});

function App() {
  const [state, setState] = useState({
    movies: movieData,
    genreFilters: {
      "Action": false,
      "Coming of Age": false,
      "Drama" : false,
      "Mystery" : false,
      "Romance": false,
      "Horror/Thriller": false,
      "Comedy": false,
      "Watchlist": false,
    },
    selectedOption: 'none',
    sortOption: 'default'
  })

  const [list, setList] = useState(
    {
      watchList : [],
      time : 0,
    });

  const handleClick = el => {
    const removeFromList = list.watchList.filter((item) => item !== el);
    const decreasedTime = list.time - el.runtime;
    const addToList = [...list.watchList, el];
    const increasedTime = list.time + el.runtime;
    list.watchList.includes(el) ? setList(_ => {
      return {
        watchList : removeFromList,
        time : decreasedTime,
      }
    }) : setList(_ => {
      return {
        watchList : addToList,
        time : increasedTime,
      }
    });
    
  };

    const resetState = _ => {
      setState(_ => {
        return {
          movies: movieData,
          genreFilters: {
                "Action": false,
                "Coming of Age": false,
                "Drama" : false,
                "Mystery" : false,
                "Romance": false,
                "Horror/Thriller": false,
                "Watchlist": false,
              },
              selectedOption: 'none',
              sortOption: 'default'
        }
      });
    };

  const handleCheckboxChange = e => {
    const { name } = e.target;

    setState(prevState => {
      return {
        genreFilters: {
          ...prevState.genreFilters,
          [name]: !prevState.genreFilters[name]
        },
        selectedOption: prevState.selectedOption,
        sortOption: prevState.sortOption,
      };
    });

  };

  const handleRadioChange = e => {
    const { name } = e.target;
    setState(prevState => {
      return {
        genreFilters: prevState.genreFilters,
        selectedOption: name,
        sortOption: prevState.sortOption,
      };
    });
  };

  const handleSort = e => {
    const { name } = e.target.value;
    setState(prevState => {
      return {
        genreFilters: prevState.genreFilters,
        selectedOption: prevState.selectedOption,
        sortOption: name,
      };
    });
  };


  const checkedGenres = Object.entries(state.genreFilters)
      .filter(filter => filter[1])
      .map(filter => filter[0]);

  const filteredByGenre = movieData.filter(( movie ) =>
       movie.genre.some(item => checkedGenres.includes(item))
    ).length === 0 ? movieData : movieData.filter(( movie ) =>
       movie.genre.some(item => checkedGenres.includes(item))
    );

  const filteredByRating = filteredByGenre.filter((movie) => 
  state.selectedOption === 'none' ? true : 
    movie.rating >= parseInt(state.selectedOption));

  const filteredMovies = (filteredByRating.length === 0 && state.selectedOption === 'none') ? movieData : filteredByRating;

  const sortedMovies = state.sortOption === 'default' ? filteredMovies : [...filteredMovies].sort((a,b) => {
      return a.year < b.year ? 1 : -1;
  });

  const renderMovies = (state.genreFilters['Watchlist'] === true) ? list.watchList.filter(item => sortedMovies.includes(item)) : sortedMovies;

  return (
    <div className="App">
      <div className="Films">
      <h1>Films</h1>
        <p> Filter by: </p>
        <div className="Filters">
            <div className="GenreFilters">
              <p> Genre </p>
              <FilterOption
              id="1"
              type="checkbox"
              name="Action"
              checked={state.genreFilters['Action']}
              onChange={handleCheckboxChange}  
            />
            <FilterOption
              id="2"
              type="checkbox"
              name="Coming of Age"  
              checked={state.genreFilters['Coming of Age']}
              onChange={handleCheckboxChange} 
            />
            <FilterOption
              id="3"
              type="checkbox"
              name="Drama"
              checked={state.genreFilters['Drama']}
              onChange={handleCheckboxChange}  
            />
            <FilterOption
              id="4"
              type="checkbox"
              name="Mystery"
              checked={state.genreFilters['Mystery']}
              onChange={handleCheckboxChange}  
            />
            
            <FilterOption
              id="5"
              type="checkbox"
              name="Romance"
              checked={state.genreFilters['Romance']}
              onChange={handleCheckboxChange}  
            />
            <FilterOption
              id="6"
              type="checkbox"
              name="Horror/Thriller"
              checked={state.genreFilters['Horror/Thriller']}
              onChange={handleCheckboxChange}  
            />
            <FilterOption
              id="7"
              type="checkbox"
              name="Comedy"
              checked={state.genreFilters['Comedy']}
              onChange={handleCheckboxChange}  
            />
            
          </div>

          <div className="RatingFilters">
              <p> Rating </p>
            <FilterOption
              id="8"
              type="radio"
              name="5"
              checked={state.selectedOption === '5'}
              onChange={handleRadioChange}  
            />
            <FilterOption
              id="9"
              type="radio"
              name="4"
              checked={state.selectedOption === '4'}
              onChange={handleRadioChange}  
            />
            <FilterOption
              id="10"
              type="radio"
              name="3"
              checked={state.selectedOption === '3'}
              onChange={handleRadioChange}  
            />
            <FilterOption
              id="11"
              type="radio"
              name="2"
              checked={state.selectedOption === '2'}
              onChange={handleRadioChange}  
            />
            <FilterOption
              id="12"
              type="radio"
              name="1"
              checked={state.selectedOption === '1'}
              onChange={handleRadioChange}  
            />
          </div>

          <div className="Watchlist">
               <p> Other </p>
                <FilterOption
                  id="13"
                  type="checkbox"
                  name="Watchlist"
                  checked={state.genreFilters['Watchlist']}
                  onChange={handleCheckboxChange}  
                />
              <p> Total Time: {list.time} mins </p>
          </div>    

          <div className="SortDropdown">
            <select value={state.sortOption} onChange={handleSort}>
              <option value="default">Sort By</option>
              <option    value="year">Year</option>
            </select>
          </div>

          <button onClick={resetState}>Reset Filters</button>
          </div>
        
      

      <div className="Gallery">

      {renderMovies.map((item, _) => ( 
      <div className="Container">
        <MovieItem item={item} onClick={handleClick} watchList={list.watchList}></MovieItem>
        </div>
      ))}
      </div>
      </div>
    </div>

      
  );
}

export default App;
