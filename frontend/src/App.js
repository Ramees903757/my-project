import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("long_url", longUrl);

    try {
      const res = await axios.post("http://127.0.0.1:8000/shorten", formData);
      setShortUrl(res.data.short_url);
    } catch (err) {
      console.error(err);
      alert("Error shortening URL");
    }
  };

  return (
    <div className="container">
      <h2>URL Shortener</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your long URL here"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          required
        />
        <button type="submit">Shorten URL</button>
      </form>

      {shortUrl && (
        <div className="short-url">
          <p>Shortened URL:</p>
          <a href={shortUrl} target="_blank" rel="noreferrer">{shortUrl}</a>
        </div>
      )}
    </div>
  );
}

export default App;
