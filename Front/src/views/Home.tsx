import { useState, useEffect } from 'react';
import type { Baby } from '../types/Baby';
import { useNavigate } from 'react-router-dom';
import BabyCard from '../components/Home/BabyCard';
import NewBabyForm from '../components/Home/NewBabyFrom';

function Home() {
	const [babies, setBabies] = useState<Baby[] | null>(null)
	const [openForm, setOpenForm] = useState(false);
	const [reload, setReload] = useState(true)

	const navigate = useNavigate();

	useEffect(() => {
		if (!reload) return;

		fetch('https://localhost:8443/api/babies')
			.then(res => res.json())
			.then(data => setBabies(data.data))
			.catch(err => console.error(err));
		setReload(false);
	}, [reload]);

	return (
		<main className="flex-1 container mx-auto px-4 py-6">
			<section className="bg-white rounded-2xl shadow p-6">
				<h2 className="text-xl font-semibold mb-4 text-blue-700 text-center">Welcome, Doctor!</h2>
				<p className="text-gray-600 text-center">
					Track babies growth, vaccinations, and health milestones here.
				</p>
				<button className="mt-4 bg-blue-600 hover:bg-blue-400 text-white px-4 py-2 rounded-lg block mx-auto" onClick={() => navigate('/statistics')}>Global statistics</button>
			</section>
			<section className="p-4 bg-white shadow flex justify-between items-center rounded-2xl p-6 mt-4">
				<h1 className="text-2xl font-bold text-blue-700">My Babies</h1>
				<button className="bg-blue-600 hover:bg-blue-400 text-white px-4 py-2 rounded-lg" onClick={() => setOpenForm(!openForm)}>+ Add Baby</button>
			</section>
			< NewBabyForm isOpen={openForm} setOpenForm={setOpenForm} setReload={setReload} />
			{babies && 
			<section className="p-4 mt-4">
				<ul>
					{babies.map((baby) =>
						<li key={baby.id}>
							<BabyCard baby={baby}></BabyCard>
						</li>
					)}
				</ul>
			</section>
			}
		</main>
	);
}

export default Home;