import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Userprofile from './pages/Userprofile.jsx'
import  Homepage from './pages/Homepage.jsx'
import Orgreg from './pages/Orgreg.jsx'
import Orgreg2 from './pages/Orgreg2.jsx'
import Personreg from './pages/Personreg.jsx'
import Personlogin from './pages/Personlogin.jsx'
import Orgview from './pages/Orgview.jsx'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/orgreg" element={<Orgreg />} />
        <Route path="/Personreg" element={<Personreg />} />
        <Route path="/Personlogin" element={<Personlogin />} />
        <Route path="/orgreg2" element={<Orgreg2 />} />
        <Route path="/userprofile" element={<Userprofile />} />
        <Route path="/orgview" element={<Orgview />} />
      </Routes>
    </Router>
  );
}

export default App;
