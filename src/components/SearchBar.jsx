function SearchBar({ keyword, onChange }) {
  return (
    <div className="d-flex justify-content-center">
      <input
        style={{
          width: "70%",
          padding: "12px 20px",
          margin: "20px 0",
          boxSizing: "border-box",
        }}
        type="text"
        placeholder="Search here"
        value={keyword}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
