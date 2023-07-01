import { Grid, Button, Typography , FormGroup, Input, FormHelperText } from '@mui/material';
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import ReactDOM from 'react-dom';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';



const Search = ({ apiKey }) => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        
        const response = await fetch(
          `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&format=json&nojsoncallback=1&text=${query}`
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

    if (query) {
      fetchImages();
    }
  }, [apiKey,query]);

  const handleSearch = (event) => {
    event.preventDefault();
    setImages([]);
    if (query) {
      setQuery(query.trim());
    }
  };

 
  return (
    <div>
      <Typography variant="h2">Search</Typography>
      <form onSubmit={handleSearch}>
        <TextField
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search for images..."
        />
        <Button type="submit">Search</Button>
      </form>
      <div style={{ padding: '8%' }}>
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
    </div>
  );
};

export default Search;