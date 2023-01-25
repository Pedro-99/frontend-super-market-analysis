
import { Routes, Route } from 'react-router-dom';
import './App.css';
import About from './pages/about/about';
import Charts from './pages/charts/charts';
import Upload from './pages/upload/upload';
import Salles from './pages/salles/salles';

function App() {


  return (
    <div className="App">

      <Routes>

        <Route path="*" element={<About />} />
        <Route path="about" element={<About />} />
        <Route path="create" element={<Upload />} />
        {/* <Route path="salles" element={<Salles />} /> */}
        <Route path="charts" element={<Charts />} />


      </Routes>



    </div>
  )
}

export default App
