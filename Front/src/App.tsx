import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './index.css'
import type { Baby } from './types/Baby.ts'
import Navbar from './components/Utils/Navbar.tsx';
import Home from './views/Home.tsx';
import Vaccination from './views/Vaccination.tsx';
import BabyDetails from './views/BabyDetails.tsx';
import Statistics from './views/Statistics.tsx';

function App() {
	const [baby, setBaby] = useState<Baby | null>(null);

	return (
		<BrowserRouter>
			<Navbar baby={baby} setBaby={setBaby} />

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
