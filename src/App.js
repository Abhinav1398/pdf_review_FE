import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);  // State to store book data
  const [loading, setLoading] = useState(true);  // State for loading status

  // Fetch data from the Django API when the component loads
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/books/')  // Make sure the URL is correct
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        setBooks(data);  // Store the fetched data in state
        setLoading(false);  // Set loading to false once data is fetched
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Book Review System</h1>
        {loading ? (
          <p>Loading books...</p>  // Show loading message while fetching data
        ) : (
          <ul>
            {books.map((book) => (
              <li key={book.id}>
                <strong>{book.title}</strong> by {book.author} - Rating: {book.rating}
              </li>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
}

export default App;
