import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function DiscoverPage() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/games/top-rated-games/')
      .then(response => {
        setGames(response.data.games); // Assuming the response data has a 'games' array
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []); // Empty dependency array to fetch data only once when the component mounts

  return (
    <div>
      <h1>Discover Page</h1>
      <div>
        {games.map(game => (
          <div key={game.id}>
            <h2>{game.name}</h2>
            <p>{game.summary}</p>
            <p>Genres: {game.genres.map(genre => genre.name).join(', ')}</p>
            <p>Platforms: {game.platforms.map(platform => platform.name).join(', ')}</p>
            <p><a href={game.url}>More Info</a></p>
            {game.cover && <img src={'https:' + game.cover.url} alt={game.name} />}
          </div>
        ))}
      </div>
    </div>
  );
}
