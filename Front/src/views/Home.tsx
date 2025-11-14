import { useState, useEffect } from 'react';
import type { Baby } from '../types/Baby';
import BabyCard from '../components/BabyCard';
import NewBabyForm from '../components/NewBabyFrom';

function Home() {
	const [babies, setBabies] = useState<Baby[] | null>(null)
	const [openForm, setOpenForm] = useState(false);

	useEffect(() => {

	  fetch('https://localhost:8443/api/babies')
		.then(res => res.json())
		.then(data => setBabies(data.data)) // adjust if your API shape is different
		.catch(err => console.error(err));
	}, []);

	let babyList;
	if (babies) {
		babyList = <section className="p-4 mt-4">
			<ul>
				{babies.map((baby) =>
					<li key={baby.id}>
						<BabyCard baby={baby}></BabyCard>
					</li>
				)}
			</ul>
		</section>
	}

	return (
		<main className="flex-1 container mx-auto px-4 py-6">
	      {/* Example page content below */}
			<section className="bg-white rounded-2xl shadow p-6">
				<h2 className="text-xl font-semibold mb-4 text-blue-700">Welcome, Doctors!</h2>
				<p className="text-gray-600">
				Track babies growth, vaccinations, and health milestones here.
				</p>
			</section>
			<section className="p-4 bg-white shadow flex justify-between items-center rounded-2xl p-6 mt-4">
				<h1 className="text-2xl font-bold text-blue-700">My Babies</h1>
				<button className="bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={() => setOpenForm(!openForm)}>+ Add Baby</button>
			</section>
			< NewBabyForm isOpen={openForm} setOpenForm={setOpenForm} />
			{babyList}
		</main>
	);
}

export default Home;