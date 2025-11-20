import { useState, useEffect } from 'react';
import type { Baby } from '../types/Baby'
import { useParams, useNavigate } from 'react-router-dom';
import BabyRecords from '../components/BabyDetails/BabyRecords';
import GeneralInfoCard from '../components/BabyDetails/GeneralInfoCard';
import WeightChart from '../components/BabyDetails/WeightChart';
import HeightChart from '../components/BabyDetails/HeightChart';

function BabyDetails(props: { setBaby: (baby: Baby | null) => void}) {
	const [baby, setBaby] = useState<Baby | null>(null);

	const navigate = useNavigate();
	let params = useParams();

	useEffect(() => {
		fetch(`https://localhost:8443/api/babies/${params.id}`)
			.then(res => res.json())
			.then(data => {
				setBaby(data.data)
				props.setBaby(data.data)
			})
			.catch(err => console.error(err));
	}, []);

	async function handleDelete() {
		if(window.confirm(`Are you sure you want to delete all ${baby?.name}'s records ?`)) {
			const res = await fetch(`https://localhost:8443/api/babies/${params.id}`, {
				method: "DELETE",
			}).then(res => res.json())
			if (res.status = "ok") {
				alert(`${baby?.name} and all the records have been deleted`);
				props.setBaby(null);
				navigate('/');
			} else {
				alert(`Error: ${res.message}`)
			}
		}
	}

	return (
        <section className="p-4">

			{baby && <GeneralInfoCard baby={baby} />}

			<section className="bg-white rounded-2xl shadow p-6 mb-6">
				<h2 className="text-xl font-semibold text-blue-700 mb-4">Growth Chart (0–24 months)</h2>
				
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{baby && <WeightChart baby={baby} />}
				{baby && <HeightChart baby={baby} />}
				</div>
			</section>
			
			<BabyRecords baby={baby}/>

			<div className="bg-white rounded-2xl shadow p-4 mb-6 flex justify-between items-center">
				<p className="text-red-500 text-start">Delete all <strong>{baby?.name}</strong> records</p>
				<button className="hover:bg-red-300 bg-red-500 text-white px-3 py-1 rounded-lg text-sm" onClick={handleDelete} >
					Delete
				</button>
			</div>
        </section>
	);
}

export default BabyDetails;
