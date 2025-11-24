import { useState, useEffect } from 'react';
import type { Baby } from '../types/Baby'
import { useNavigate } from 'react-router-dom';

function Statistics() {
	// const [baby, setBaby] = useState<Baby | null>(null);

	const navigate = useNavigate();


	// useEffect(() => {
	//   	fetch(`https://localhost:8443/api/babies`)
	// 	.then(res => res.json())
	// 	.then(data => {
	// 		setBaby(data.data)
	// 	})
	// 	.catch(err => console.error(err));
	// }, []);

	// TODO: Statistic page

	return (
        <section className="p-4">
            <div className="bg-white rounded-2xl shadow p-4 mb-6">
				<h2 className="text-lg font-semibold mb-2 text-blue-700">Basic Info</h2>
				<p className="text-gray-800"><strong>Birthdate:</strong> something</p>
				<p className="text-gray-800"><strong>Gender:</strong> something</p>
				<br/>
				<p className="text-gray-800"><strong>Avg Weight Gain:</strong> +0.4 kg/month</p>
				<p className="text-gray-800"><strong>Avg Height Growth:</strong> +1.2 cm/month</p>
				<p className="text-gray-800"><strong>BMI Trend:</strong> Normal</p>
				<div className="flex justify-center mt-4">
					<button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700" onClick={() => navigate(`/`)} >
						Back to babies
					</button>
				</div>
            </div>


            <div className="bg-white rounded-2xl shadow p-4 mb-6">
				<h2 className="text-lg font-semibold mb-2 text-blue-700">Growth Chart</h2>
            </div>
        </section>
	);
}

export default Statistics;
