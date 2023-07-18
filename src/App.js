import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [albums, setAlbums] = useState([]);

  // Fetch albums from the API
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/albums')
      .then(response => response.json())
      .then(data => setAlbums(data))
      .catch(error => console.log(error));
  }, []);

  // Function to add an album
  const addAlbum = () => {
    fetch('https://jsonplaceholder.typicode.com/albums', {
      method: 'POST',
      body: JSON.stringify({ title: 'New Album' }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(data => setAlbums([...albums, data]))
      .catch(error => console.log(error));
  };

  // Function to update an album
  const updateAlbum = (albumId) => {
    fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`, {
      method: 'PUT',
      body: JSON.stringify({ title: 'Updated Album' }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(data => {
        const updatedAlbums = albums.map(album => {
          if (album.id === albumId) {
            album.title = data.title;
          }
          return album;
        });
        setAlbums(updatedAlbums);
      })
      .catch(error => console.log(error));
  };

  // Function to delete an album
  const deleteAlbum = (albumId) => {
    fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedAlbums = albums.filter(album => album.id !== albumId);
        setAlbums(updatedAlbums);
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="app">
      <h1>Album Manager</h1>
      <button onClick={addAlbum}>Add Album</button>
      {albums.map(album => (
        <div className="album" key={album.id}>
          <h2>{album.title}</h2>
          <button onClick={() => updateAlbum(album.id)}>Update</button>
          <button onClick={() => deleteAlbum(album.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default App;
