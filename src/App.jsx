import { useState, useEffect } from "react";

import "./App.css";

function App() {
  let [rickAndMortyData, setRickAndMortyData] = useState({});
  let [searchName, setSearchName] = useState("");
  let [page, setPage] = useState(1);
  const [gender, setGender] = useState('all');
  const [species, setSpecies] = useState('all');
  const [status, setStatus] = useState('all');

  useEffect(() => {
    const getData = async () => {
      let url = "https://rickandmortyapi.com/api/character";
      let query = [];

      if (searchName) {
        query.push(`name=${searchName}`);
      }

      if (page > 1 && page <= 42) {
        query.push(`page=${page}`);
      }

      if (gender !== "all") {
        query.push(`gender=${gender}`);
      }

      if (species !== "all") {
        query.push(`species=${species}`);
      }

      if (status !== "all") {
        query.push(`status=${status}`);
      }

      if (query.length > 0) {
        url += `/?${query.join("&")}`;
      }

      const response = await fetch(url);
      const json = await response.json();
      setRickAndMortyData(json);
    };
    getData();
  }, [page, searchName, gender, species, status]);

  const handleNext = () => {
    if (page < 42) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleSearch = (e) => {
    setSearchName(e.target.value);
    setPage(1);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
    setPage(1);
  };

  const handleSpeciesChange = (e) => {
    setSpecies(e.target.value);
    setPage(1);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setPage(1);
  };

  return (
    <main>
      <header>React workshop: “Rick and Morty Trivia - How many characters?” </header>
      <div className="filterOptions">
        <div className="searchName">
          <label htmlFor="search">Search name</label>
          <input
            type="text"
            id="search"
            value={searchName}
            onChange={handleSearch}
          />
        </div>
        <div className="dropdownGender">
          <label>Filter by gender</label>
          <select name="gender" value={gender} onChange={handleGenderChange}>
            <option value="all">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Genderless">Genderless</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
        <div className="dropdownSpec">
          <label>Filter by species</label>
          <select name="species" value={species} onChange={handleSpeciesChange}>
            <option value="all">All</option>
            <option value="Human">Human</option>
            <option value="Alien">Alien</option>
            <option value="Mythological Creature">Mythological Creature</option>
            <option value="Animal">Animal</option>
            <option value="Robot">Robot</option>
          </select>
        </div>
        <div className="dropdownStatus">
          <label>Filter by status</label>
          <select name="status" value={status} onChange={handleStatusChange}>
            <option value="all">All</option>
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
      </div>
      <div className="charactersList">
        {rickAndMortyData.results &&
          rickAndMortyData.results.map((data) => (
            <div key={data.id}>
              <div className="characterInfo">
                <div>{data.name} - {data.species}</div>
                <div>Origin: {data.origin.name}</div>
                <div>Status: {data.status}</div>
              </div>
              <div>
                <img src={data.image} alt={data.name} />
              </div>
              <br />
            </div>
          ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrev} disabled={page === 1}>
          Prev
        </button>
        <div>Page {page}</div>
        <button onClick={handleNext} disabled={page === 42}>
          Next
        </button>
      </div>
    </main>
  );
}

export default App;
