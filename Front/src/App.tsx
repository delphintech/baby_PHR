import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import type { Baby } from './types/Baby.ts'
import Home from './views/Home.tsx';
import Vaccination from './views/Vaccination.tsx';
import BabyDetails from './views/BabyDetails.tsx';
import Statistics from './views/Statistics.tsx';
import './index.css'

function App() {
  const [baby, setBaby] = useState<Baby | null>(null);

  let navName = (baby ? baby.name : "Baby Health");

  return (
    <BrowserRouter>
      {/* <!-- 🌟 NAVBAR --> */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <nav className="flex justify-between items-center px-4 py-3">
          <h1 className="text-2xl font-bold text-blue-700">👶 {navName}</h1>
          <ul className="flex space-x-4 text-gray-600 ml-6">
            {baby && (
              <>
                <li><Link to={`/baby/${baby.id}`} className="hover:text-blue-600">Growth</Link></li>
                <li><Link to={`/baby/${baby.id}/vaccination`} className="hover:text-blue-600">Vaccines</Link></li>
              </>
            )}
            <li><Link to="/" className="hover:text-blue-600 ml-4" onClick={() => setBaby(null)} >🏠</Link></li>
          </ul>
        </nav>
      </header>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/baby/:id" element={<BabyDetails setBaby={setBaby} />} />
          <Route path="/baby/:id/vaccination" element={<Vaccination />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App
