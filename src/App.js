import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/header';
import MovieDisplay from './components/movieDisplay';
import MovieInfor from './components/movie-information';
import Loader from './components/loading';

function App() {
  return (
    <div id="App">
      <Router>
      {/* <Loader /> */}
        <Header />
        <Routes>
          <Route path="/" element={<MovieDisplay />} />
          <Route path="/movie-infor" element={<MovieInfor />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
