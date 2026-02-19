import { useState, useEffect } from 'react';
import type { Baby } from '../types/Baby'
import { useParams, useNavigate } from 'react-router-dom';
import BabyRecords from '../components/BabyDetails/BabyRecords';
import GeneralInfoCard from '../components/BabyDetails/GeneralInfoCard';
import BabyMetricChart from '../components/BabyDetails/BabyMetricChart';
import { API_URL } from '../config/api';

function BabyDetails(props: { setBaby: (baby: Baby | null) => void}) {
	const [baby, setBaby] = useState<Baby | null>(null);
	const [reload, setReload] = useState(true);

	const navigate = useNavigate();
	const params = useParams();

	useEffect(() => {
		if (!reload) return;

		fetch(`${API_URL}/api/babies/${params.id}`)
			.then(res => res.json())
			.then(data => {
				setBaby(data.data)
				props.setBaby(data.data)
			})
			.catch(err => console.error(err));
		setReload(false)
	}, [reload]);

	async function handleDelete() {
		if(window.confirm(`Are you sure you want to delete all ${baby?.name}'s records ?`)) {
			const res = await fetch(`${API_URL}/api/babies/${params.id}`, {
				method: "DELETE",
			}).then(res => res.json())
			if (res.status == "ok") {
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

				<div className="grid grid-cols-1 gap-6">
				{baby && <BabyMetricChart baby={baby} metric="weight" />}
				{baby && <BabyMetricChart baby={baby} metric="height" />}
				</div>
			</section>

			<BabyRecords baby={baby} setReload={setReload}/>

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
