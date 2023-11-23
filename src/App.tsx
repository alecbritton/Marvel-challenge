import axios from "axios";
import React, { useState } from "react";
import "./App.css";
interface MarvelCharacter {
  id: number;
  name: string;
}
interface MarvelResponse {
  data: {
    results: MarvelCharacter[];
  };
}

function App() {
  const [characters, setCharacters] = useState<MarvelCharacter[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const MARVEL_URL = "https://gateway.marvel.com:443/v1/public";
  const MARVEL_API_KEY = "15c480e9c4dbce6a4d5424def1269e05";

  const fetchMarvelData = async (searchQuery: string) => {
    try {
      setIsLoading(true);
      const marvelData = await axios.get<MarvelResponse>(
        `${MARVEL_URL}/characters?nameStartsWith=${searchQuery}&apikey=${MARVEL_API_KEY}`
      );

      return marvelData.data;
    } catch (error) {
      console.error(error);
      return { data: { results: [] } };
    } finally {
      setIsLoading(false);
    }
  };

  const onUserChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    if (value.length > 1) {
      const suggestions = await fetchMarvelData(value);

      const { results } = suggestions && suggestions.data;

      if (results) setCharacters(results);
      else setCharacters([]);
    } else {
      setCharacters([]);
    }
  };

  return (
    <div className="container">
      <h1>Search for a character!</h1>
      <div className="search-container">
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search for a character..."
            value={input}
            onChange={onUserChange}
            className="search-bar"
          />
          {input.length > 1 && !isLoading && (
            <div className="suggestion-list">
              {characters.length > 0
                ? characters.map((character) => (
                    <div
                      className="suggestion-item"
                      key={character.id}
                      onClick={() => {
                        alert(`Selected character: ${character.name}`);
                        setInput("");
                        setCharacters([]);
                      }}
                    >
                      {character.name}
                    </div>
                  ))
                : input.length > 1 && (
                    <div className="suggestion-item">
                      No characters found...
                    </div>
                  )}
            </div>
          )}
        </div>
        <button
          className="search-button"
          onClick={() => {
            if (characters.length > 0) {
              alert(`Selection: ${characters[0].name}`);
              setInput("");
              setCharacters([]);
            }
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default App;
