import { useState, useEffect } from 'react';
import type { Baby } from '../types/Baby'
import { useParams } from 'react-router-dom';

function BabyDetails(props: { setBaby: (baby: Baby) => void}) {
	const [baby, setBaby] = useState<Baby | null>(null)

	let params = useParams()
	useEffect(() => {
	  fetch(`https://localhost:8443/api/babies/${params.id}`)
		.then(res => res.json())
		.then(data => {
			setBaby(data.data)
			props.setBaby(data.data)
		})
		.catch(err => console.error(err));
	}, []);

	// const today = new Date();
	// const birthdate = new Date(baby.birthdate);
	// let age = (today.getFullYear() - birthdate.getFullYear()) * 12 + today.getMonth() - birthdate.getMonth();

	return (
		<section className="p-4">
			<div className="bg-white rounded-2xl shadow p-4 mb-6">
			<h2 className="text-lg font-semibold mb-2">Basic Info</h2>
			<p><strong>Birthdate:</strong> 2023-05-10</p>
			<p><strong>Age:</strong> 18 months</p>
			</div>

			<div className="bg-white rounded-2xl shadow p-4 mb-6">
			<div className="flex justify-between items-center mb-3">
				<h2 className="text-lg font-semibold">Growth Records</h2>
				<button className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm">+ Add Record</button>
			</div>
			<table className="w-full text-sm">
				<thead className="text-left text-gray-600">
				<tr>
					<th className="pb-2">Date</th>
					<th>Weight (kg)</th>
					<th>Height (cm)</th>
					<th>Notes</th>
					<th></th>
				</tr>
				</thead>
				<tbody>
				<tr className="border-t">
					<td className="py-2">2025-10-01</td>
					<td>10.5</td>
					<td>78</td>
					<td>Healthy checkup</td>
					<td><button className="text-blue-500">✎</button></td>
				</tr>
				</tbody>
			</table>
			</div>

			<div className="bg-white rounded-2xl shadow p-4">
			<h2 className="text-lg font-semibold mb-2">Growth Summary</h2>
			<p><strong>Avg Weight Gain:</strong> +0.4 kg/month</p>
			<p><strong>Avg Height Growth:</strong> +1.2 cm/month</p>
			<p><strong>BMI Trend:</strong> Normal</p>
			</div>
		</section>
	);
}

export default BabyDetails;
