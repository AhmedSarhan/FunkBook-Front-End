import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import Post from '../profile/Post';
const Search = () => {
  const { toggleSearch } = useContext(AppContext);
  const [searchResults, setSearchResults] = useState([]);
  const serverRequest = axios.CancelToken.source();
  useEffect(() => {
    document.addEventListener('keyup', searchKeyPressHandler);

    return () => document.removeEventListener('keyup', searchKeyPressHandler);
  }, []);
  const searchKeyPressHandler = async (e) => {
    if (e.keyCode == 27) {
      toggleSearch(false);
    } else if (e.target.value) {
      //  create delay
      setTimeout(() => {
        fetchSearchResults(e.target.value);
      }, 1500);
    } else {
      return;
    }
    return () => serverRequest.cancel();
  };
  const fetchSearchResults = async (data) => {
    await axios
      .post(
        `/search`,
        { searchTerm: data },
        { cancelToken: serverRequest.token }
      )
      .then((res) => {
        console.log(res.data);
        setSearchResults([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="search-overlay">
        <div className="search-overlay-top shadow-sm">
          <div className="container container--narrow">
            <label htmlFor="live-search-field" className="search-overlay-icon">
              <i className="fas fa-search"></i>
            </label>
            <input
              autoFocus
              type="text"
              autoComplete="off"
              id="live-search-field"
              className="live-search-field"
              placeholder="What are you interested in?"
            />
            <span
              className="close-live-search"
              style={{ cursor: 'pointer' }}
              onClick={() => toggleSearch(false)}
            >
              <i className="fas fa-times-circle"></i>
            </span>
          </div>
        </div>

        <div className="search-overlay-bottom">
          <div className="container container--narrow py-3">
            <div className="live-search-results live-search-results--visible">
              <div className="list-group shadow-sm">
                <div className="list-group-item active">
                  <strong>Search Results</strong> ({searchResults.length} items
                  found)
                </div>
                {searchResults.map((post) => (
                  <Post post={post} key={post._id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
