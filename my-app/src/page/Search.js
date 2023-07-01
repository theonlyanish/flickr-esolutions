import { Grid, Button, Typography , FormGroup, Input, FormHelperText } from '@mui/material';
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';

const Search = ({ apiKey }) => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        
        const response = await fetch(
          `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=74b7b5c466ae19657e02c498831ee397&format=json&nojsoncallback=1&text=${query}`
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
  }, [query]);

  const handleSearch = (event) => {
    event.preventDefault();
    setImages([]); // Clear previous search results
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
      <Grid container spacing={2}>
        {images.map((image) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={image.id}>
            <div>
              <img src={image.url} alt={image.title} />
              <Typography variant="subtitle1">{image.title}</Typography>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Search;