import React from "react";

const Search = () => {
  return (
    <div className="search">
      <div className="searchContainer">
        <input type="text" placeholder="Find a user" />
        <div className="searchResult">
          <img src="https://images.pexels.com/photos/13623557/pexels-photo-13623557.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" />
          <span className="userName">Jad</span>
        </div>
      </div>
    </div>
  );
};

export default Search;
