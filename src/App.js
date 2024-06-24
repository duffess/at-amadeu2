// src/App.js
import './App.css';
import Header from './components/header';
import Main from './components/main';
import Footer from './components/footer';
import BookDetail from './components/bookDetail';
import Review from './components/review';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/books/:title" element={<BookDetail />} />
          <Route path="review" element={<Review />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
