// import { useState, useEffect } from 'react';

function Vaccination() {

	// useEffect(() => {
	//   fetch('https://localhost:8443/api/babies')
	// 	.then(res => res.json())
	// 	.then(data => setUsers(data.data)) // adjust if your API shape is different
	// 	.catch(err => console.error(err));
	// }, []);

	return (
		<main className="p-4 space-y-3">
			<div className="bg-white rounded-2xl shadow p-4 flex justify-between items-center">
			<div>
				<p className="font-semibold">Polio Vaccine</p>
				<p className="text-sm text-gray-500">Due: 2025-12-01</p>
			</div>
			<button className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm">Mark Complete</button>
			</div>
		</main>
	);
}

export default Vaccination;