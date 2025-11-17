import { useState } from 'react';
import type { Baby } from '../types/Baby';

export default function NewRecordForm (props: { baby: Baby | null, isOpen: boolean, setOpenForm: (isOpen: boolean) => void }) {
	const [formData, setFormData] = useState({
		weight: 0,
		height: 0,
		notes: "",
		date: new Date()
	})

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = event.target;
		setFormData(prevData => ({
			...prevData,
			[name]:  value,
		}))
	}

	async function handleSubmit(event: React.FormEvent) {
		event.preventDefault();
		// TODO: handle function and API endpoint
		const res = await fetch("https://localhost:8443/api/babies", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData)
		}).then(res => res.json())

		if (res.status == "ok") {
			alert(`${res.data.name} has been created`)
			props.setOpenForm(false)
		} else {
			alert(`Error: ${res.message}`)
		}
	}

	// TODO
	return (
		<>
		{props.isOpen && 
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-900/60">

			<form onSubmit={handleSubmit} className="w-full max-w-lg rounded-2xl bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 shadow-2xl p-8 space-y-6 border-2 border-blue-400">
			<header className="flex items-center justify-between mb-2">
				<div className="flex items-start flex-col">
					<h2 className="text-lg font-semibold text-blue-900">Add a baby</h2>
					<small className="text-sm text-gray-400">Required *</small>
				</div>
				<button type="button" onClick={() => props.setOpenForm(false)} className="rounded-full p-2 text-blue-700 hover:bg-red-500 bg-blue-200" aria-label="Close">
					✕
				</button>
			</header>

			<div>
				<label htmlFor="name" className="block text-sm font-medium text-slate-800">Name *</label>
				<input id="name" name="name" type="text" placeholder='name' required onChange={handleChange}
				className="mt-1 w-full rounded-md border border-blue-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-slate-700"/>
			</div>

			<div>
				<label htmlFor="birthdate" className="block text-sm font-medium text-slate-700">Birthdate *</label>
				<input id="birthdate" name="birthdate" type="date" placeholder='dd/mm/yyyy' required onChange={handleChange}
				className="mt-1 w-full rounded-md border border-blue-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-slate-700" />
			</div>

			<fieldset className="mt-2">
				<legend className="text-sm font-medium text-blue-800">Gender *</legend>
				<div className="mt-2 flex gap-4">
				<label className="inline-flex items-center gap-2 text-sm text-blue-700">
					<input type="radio" name="gender" value="F" required onChange={handleChange} className="h-4 w-4 checked:bg-blue-600 appearance-none rounded-full bg-white" />
					Female
				</label>
				<label className="inline-flex items-center gap-2 text-sm text-blue-700">
					<input type="radio" name="gender" value="M" onChange={handleChange} className="h-4 w-4 checked:bg-blue-600 appearance-none rounded-full bg-white" />
					Male
				</label>
				<label className="inline-flex items-center gap-2 text-sm text-blue-700">
					<input type="radio" name="gender" value="O" onChange={handleChange} className="h-4 w-4 checked:bg-blue-600 appearance-none rounded-full bg-white" />
					Other
				</label>
				</div>
			</fieldset>

			<div className="flex items-center justify-end gap-3 pt-2 border-t border-blue-200">
				<button type="button" onClick={() => props.setOpenForm(!props.isOpen)} className="rounded px-4 py-2 text-sm bg-blue-100 text-blue-700 hover:bg-blue-200">Cancel</button>
				<button type="submit" className="rounded px-4 py-2 text-sm bg-blue-700 text-white hover:bg-blue-800">Save</button>
			</div>
			</form>
		</div>
		}
		</>
	)
}