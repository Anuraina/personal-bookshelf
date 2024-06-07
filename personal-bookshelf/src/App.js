import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Bookshelf from './Components/Bookshelf';
import SearchBooks from './Components/SearchBooks';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SearchBooks/>} />
        <Route path="/bookshelf" element={<Bookshelf/>} />
      </Routes>
    </Router>
  );
}

export default App;
