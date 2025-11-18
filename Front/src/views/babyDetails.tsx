import { useState, useEffect } from 'react';
import type { Baby } from '../types/Baby'
import { useParams, useNavigate } from 'react-router-dom';
import BabyRecords from '../components/BabyRecords';
import { display_age } from "../utils/dateUtils";

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
	
	const birthdate = (baby ? new Date(baby?.birthdate).toLocaleDateString("en-GB") : "")
	let gender;
	if (baby?.gender == "F") {
		gender = "female ♀️"
	} else if (baby?.gender == "M") {
		gender = "male ♂️"
	} else {
		gender = "other ⚥"
	}

	// TODO: AVG growth records
	// TODO: Growth chart

	return (
        <section className="p-4">
            <div className="bg-white rounded-2xl shadow p-4 mb-6">
				<h2 className="text-lg font-semibold mb-2 text-blue-700">Basic Info</h2>
				<p className="text-gray-800"><strong>Birthdate:</strong> {birthdate} ({display_age(baby?.birthdate)})</p>
				<p className="text-gray-800"><strong>Gender:</strong> {gender}</p>
				<br/>
				<p className="text-gray-800"><strong>Avg Weight Gain:</strong> +0.4 kg/month</p>
				<p className="text-gray-800"><strong>Avg Height Growth:</strong> +1.2 cm/month</p>
				<p className="text-gray-800"><strong>BMI Trend:</strong> Normal</p>
				<div className="flex justify-center mt-4">
					<button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700" onClick={() => navigate(`/baby/${baby?.id}/vaccination`)} disabled={!baby?.id} >
						Go to Vaccines
					</button>
				</div>
            </div>

			<BabyRecords baby={baby}/>

            <div className="bg-white rounded-2xl shadow p-4 mb-6">
				<h2 className="text-lg font-semibold mb-2 text-blue-700">Growth Chart</h2>
            </div>

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
