import React, { useState, useEffect } from 'react';
import './App.css'; // Import the main CSS file for styling

const App = () => {
  // State to hold posts data
  const [posts, setPosts] = useState([]);
  
  // State to hold error message
  const [error, setError] = useState(null);
  
  // State to manage theme, loaded from localStorage initially
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // useEffect hook to fetch posts data when the component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to fetch posts data from the API
  const fetchPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok'); // Throw error if response is not ok
        }
        return response.json();
      })
      .then(data => setPosts(data)) // Set posts data if fetch is successful
      .catch(error => setError(error.message)); // Set error message if fetch fails
  };

  // Function to toggle the theme between light and dark
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Save the new theme to localStorage
  };

  return (
    <div className={`app ${theme}`}> {/* Apply theme class to the main div */}
      {!error && ( /* Conditionally render header if there's no error */
        <div className="header">
          <button onClick={toggleTheme}>
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme {/* Button to toggle theme */}
          </button>
          <div className="post-title">
           <h1>Posts</h1>  {/* Title of the posts section */}
          </div>
        </div>
      )}
      <div className="content">
        {error ? ( /* Conditionally render error message if there's an error */
          <div className="error">
            <h2>DATA FETCHING FAILED</h2> {/* Error title */}
            <p>{error}</p> {/* Error message */}
          </div>
        ) : ( /* Otherwise, render the posts */
          <div className="posts">
            {posts.map(post => ( /* Map over the posts array to display each post */
              <div key={post.id} className="post">
                <h2>{post.title}</h2> {/* Post title */}
                <p>{post.body}</p> {/* Post body */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App; // Export the App component as the default export
