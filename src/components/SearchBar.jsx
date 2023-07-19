function SearchBar({ movies, setSearchResult }) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    if (!e.target.value && movies) return setSearchResult(movies);
    const results = movies.filter((movie) =>
      movie.original_title.includes(e.target.value)
    );
    setSearchResult(results);
  };

  return (
    <div className="d-flex justify-content-center">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Search here" onChange={handleChange} />
        <button>Search</button>
      </form>
    </div>
  );
}

export default SearchBar;
