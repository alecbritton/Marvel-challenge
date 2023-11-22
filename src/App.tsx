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

  const MARVEL_URL = "https://gateway.marvel.com:443/v1/public";
  const MARVEL_API_KEY = "15c480e9c4dbce6a4d5424def1269e05";

  const fetchMarvelData = async (searchQuery: string) => {
    try {
      const marvelData = await axios.get<MarvelResponse>(
        `${MARVEL_URL}/characters?nameStartsWith=${searchQuery}&apikey=${MARVEL_API_KEY}`
      );

      return marvelData.data;
    } catch (error) {
      console.error(error);
      return { data: { results: [] } };
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
    <div className="App">
      <div>
        <input
          type="text"
          placeholder="Search for a character..."
          value={input}
          onChange={onUserChange}
        />
        {characters.length > 0 && (
          <div>
            {characters.map((character) => {
              return (
                <div
                  className="suggestion-item"
                  key={character.id}
                  onClick={(e) => {
                    setInput("");
                    setCharacters([]);
                    alert(character.name);
                  }}
                >
                  {character.name}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
