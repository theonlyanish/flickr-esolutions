import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import './Search.css';


// function to set query and output using api key
const Search = ({ apiKey }) => {

  //query and results
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);

  // to search using button
  const [searchClicked, setSearchClicked] = useState(false);

  //event to handle search
  const handleSearch = (event) => {
    event.preventDefault();
    setImages([]);
    setSearchClicked(true);
    if (query) {
      setQuery(query.trim());
    }
  };

  //API call to flickr based on click or query updation
  useEffect(() => {
    if (searchClicked) {
      const fetchImages = async () => {
        try {
          const response = await fetch(
            `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&format=json&nojsoncallback=1&text=${query}&safe_search=1&per_page=30`
          );
          const data = await response.json();
          const fetchedImages = data.photos.photo.map((photo) => ({
            id: photo.id,
            title: photo.title,
            url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
          }));
          setImages(fetchedImages);
        } catch (error) {
          console.error('Error fetching images:', error);
        }
      };

      fetchImages();
    }
  }, [apiKey, query, searchClicked]);


  //returning the images in a nice format
  //format style - Masonry style from material UI for react 
  // https://mui.com/material-ui/react-image-list/

  return (
    <div>
      <div class="search" style={{ padding: '5%' }}>
                <form onSubmit={handleSearch}>
                    <input class="search-bar" type='text' value={query} onChange={(event) => setQuery(event.target.value)} placeholder='Search for images'/>        
                    <button class="search-button" type='submit'> Search</button>
                </form>
        </div>
      {searchClicked && (
        <div class="results" style={{ padding: '10%' }}>
          <ImageList variant="masonry" cols={3} gap={8}>
            {images.map((image) => (
              <ImageListItem key={image.id}>
                <img
                  src={`${image.url}?w=248&fit=crop&auto=format`}
                  srcSet={`${image.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={image.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </div>
      )}
    </div>
  );
};

export default Search;