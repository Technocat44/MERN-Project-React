import { Home, Login, Register } from './pages';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Header } from './components';

function App() {
  return (
    <>
    <Router>
      <div className='container'>
       <Header></Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
