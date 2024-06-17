import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // Import Switch from react-router-dom
import './App.css';
import List from './components/List';
import Create from './components/Create';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;