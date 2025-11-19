// import { useState, useEffect } from 'react';

function Settings() {

	// useEffect(() => {
	//   fetch('https://localhost:8443/api/babies')
	// 	.then(res => res.json())
	// 	.then(data => setUsers(data.data)) // adjust if your API shape is different
	// 	.catch(err => console.error(err));
	// }, []);

	return (
		<main className="p-4 space-y-4">
			<div className="bg-white rounded-2xl shadow p-4">
			<h2 className="text-lg font-semibold mb-2">Trends</h2>
			<div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">[Weight Chart]</div>
			<div className="h-40 bg-gray-100 rounded-lg mt-3 flex items-center justify-center text-gray-400">[Height Chart]</div>
			</div>

			<div className="bg-white rounded-2xl shadow p-4">
			<h2 className="text-lg font-semibold mb-2">Statistics</h2>
			<p>Average Weight Gain: <strong>+0.4 kg/mo</strong></p>
			<p>Average Height Growth: <strong>+1.2 cm/mo</strong></p>
			<p>BMI Trend: <strong>Stable</strong></p>
			<p>Status: <span className="text-green-600 font-semibold">Healthy</span></p>
			</div>
		</main>
	);
}

export default Settings;



// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8" />
//   <title>Settings</title>
//   <script src="https://cdn.tailwindcss.com"></script>
// </head>
// <body class="bg-gray-50 min-h-screen">
//   <header class="p-4 bg-white shadow">
//     <h1 class="text-xl font-bold text-gray-700">Profile & Preferences</h1>
//   </header>

//   <main class="p-4 space-y-6">
//     <div class="bg-white rounded-2xl shadow p-4">
//       <h2 class="text-lg font-semibold mb-3">Parent Info</h2>
//       <label class="block mb-2">Name</label>
//       <input type="text" class="w-full border rounded-lg p-2 mb-3" value="Alex Johnson">
//       <label class="block mb-2">Email</label>
//       <input type="email" class="w-full border rounded-lg p-2" value="alex@email.com">
//     </div>

//     <div class="bg-white rounded-2xl shadow p-4">
//       <h2 class="text-lg font-semibold mb-3">Preferences</h2>
//       <div class="flex items-center justify-between mb-2">
//         <label>Dark Mode</label>
//         <input type="checkbox" class="w-5 h-5">
//       </div>
//       <div class="flex items-center justify-between mb-2">
//         <label>Notifications</label>
//         <input type="checkbox" class="w-5 h-5" checked>
//       </div>
//       <button class="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">Save Changes</button>
//     </div>
//   </main>
// </body>
// </html>
