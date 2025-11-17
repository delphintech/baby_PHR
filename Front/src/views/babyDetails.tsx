import { useState, useEffect } from 'react';
import type { Baby } from '../types/Baby'
import { useParams, useNavigate } from 'react-router-dom';

function BabyDetails(props: { setBaby: (baby: Baby | null) => void}) {
	const [baby, setBaby] = useState<Baby | null>(null)

	const navigate = useNavigate()

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

	// const today = new Date();
	// const birthdate = new Date(baby.birthdate);
	// let age = (today.getFullYear() - birthdate.getFullYear()) * 12 + today.getMonth() - birthdate.getMonth();

	return (
        <section className="p-4">
            <div className="bg-white rounded-2xl shadow p-4 mb-6">
			<h2 className="text-lg font-semibold mb-2 text-blue-700">Basic Info</h2>
			<p className="text-gray-800"><strong>Birthdate:</strong> 2023-05-10</p>
			<p className="text-gray-800"><strong>Age:</strong> 18 months</p>
            </div>

            <div className="bg-white rounded-2xl shadow p-4 mb-6">
            <div className="flex justify-between items-center mb-3">
				<h2 className="text-lg font-semibold text-blue-700">Growth Records</h2>
                <button className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-400">+ Add Record</button>
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
                <tr className="border-t text-gray-800">
                    <td className="py-2">2025-10-01</td>
                    <td>10.5</td>
                    <td>78</td>
                    <td>Healthy checkup</td>
                    <td><button className="text-blue-500">✎</button></td>
                </tr>
                </tbody>
            </table>
            </div>

            <div className="bg-white rounded-2xl shadow p-4 mb-6">
				<h2 className="text-lg font-semibold mb-2 text-blue-700">Growth Summary</h2>
				<p className="text-gray-800"><strong>Avg Weight Gain:</strong> +0.4 kg/month</p>
				<p className="text-gray-800"><strong>Avg Height Growth:</strong> +1.2 cm/month</p>
				<p className="text-gray-800"><strong>BMI Trend:</strong> Normal</p>
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
