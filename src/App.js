import React , {useState, useEffect} from 'react';
import './App.css';


function App() {
  const [games, setGames] = useState([]);
  useEffect(() => {
    fetch('https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json')
    .then(res => res.json())
    .then(data => setGames(data.slice(1).sort((a, b) => b.score - a.score)))
    .catch(err => console.log(err));
  }, []);
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    if(search.length > 0) {
      const Suggestions = games.filter(game => game.title.toLowerCase().includes(search.toLowerCase()));
      setSuggestions(Suggestions);
    }
    else {
      setSuggestions([]);
    }
  }, [search, games]);
  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  return (
    <div className="App">
      <nav className="navbar navbar-light bg-light">
        <h1 className="navbar-brand" onClick={() => window.location.reload()}>Games-Search</h1>
        <div className="form-inline">
          <div className="suggestions">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" onChange={handleChange} value={search} />
            <ul className="suggestions-list">
            {suggestions.map(game => (
              <li key={game.id}>
                <h6>{game.title}</h6>
                <hr/>
              </li>
            ))}
            </ul>
          </div>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit"
          onClick={() => {
            const filteredGames = games.filter(game => game.title.toLowerCase().includes(search.toLowerCase()));
            setGames(filteredGames);
            setSearch('');
          }
          }>Search</button>
        </div> 
      </nav>
      <div className="container mt-4">
        <h1>Games 🎮</h1>
        <div className="row mt-4">
          {games.map(game => (
            <div className="col-md-4 mt-1" key={game.id}>
              <div className="card mb-4 shadow-sm mt-1">
                <div className="card-body cd">
                  <h4 className="card-title">{game.title}</h4>
                  <h6 className="card-subtitle mb-2 text-muted">score : {game.score}</h6>
                  <p className="card-text">platform : {game.platform}</p>
                  <p className="card-text">genre : {game.genre}</p>
                  <p className="card-text">editors_choice : {game.editors_choice}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
