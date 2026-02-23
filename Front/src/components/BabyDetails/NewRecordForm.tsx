import { useState } from 'react';
import type { Baby } from '../../types/Baby';
import { API_URL } from "../../config/api";

export default function NewRecordForm (props: { baby: Baby, isOpen: boolean, setOpenForm: (isOpen: boolean) => void, setReload: (reload: boolean) => void}) {
	const [formData, setFormData] = useState({
		weight: 0,
		height: 0,
		notes: "",
		date: new Date().toISOString().slice(0, 10)
	})

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = event.target;
		setFormData(prevData => ({
			...prevData,
			[name]: value,
		}))
	}

	async function handleSubmit(event: React.FormEvent) {
		event.preventDefault();

		if (new Date(formData.date) < new Date( props.baby.birthdate)) {
			return alert(`Error: The record should not be set before birth.`);
		}
		const res = await fetch(`${API_URL}/records`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...formData, baby_id: props.baby?.id })
		}).then(res => res.json())

		if (res.status == "ok") {
			props.setOpenForm(false);
			props.setReload(true);
		} else {
			alert(`Error: ${res.message}`);
		}
	}

	return (
		<>
		{props.isOpen && 
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-900/60">

			<form onSubmit={handleSubmit} className="w-full max-w-lg rounded-2xl bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 shadow-2xl p-8 space-y-6 border-2 border-blue-400">
			<header className="flex items-center justify-between mb-2">
				<div className="flex items-start flex-col">
					<h2 className="text-lg font-semibold text-blue-900">New Record for {props.baby?.name}</h2>
					<small className="text-sm text-gray-400">Required *</small>
				</div>
				<button type="button" onClick={() => props.setOpenForm(false)} className="rounded-full p-2 text-blue-700 hover:bg-red-500 bg-blue-200" aria-label="Close">
					✕
				</button>
			</header>

			<div className="flex items-center justify-between gap-4 pt-2 border-t border-blue-200">
				<div>
					<label htmlFor="height" className="block text-sm font-medium text-slate-800">Height</label>
					<input id="height" name="height" type="text" placeholder='55 cm' required onChange={handleChange}
					className="mt-1 w-full rounded-md border border-blue-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-slate-700"/>
				</div>
				<div>
					<label htmlFor="weight" className="block text-sm font-medium text-slate-800">Weight</label>
					<input id="weight" name="weight" type="text" placeholder='4.5 kg' required onChange={handleChange}
					className="mt-1 w-full rounded-md border border-blue-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-slate-700"/>
				</div>
			</div>

			<div>
				<label htmlFor="date" className="block text-sm font-medium text-slate-700">Date *</label>
				<input id="date" name="date" type="date" value={formData.date} required onChange={handleChange}
				className="mt-1 w-full rounded-md border border-blue-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-slate-700" />
			</div>
			<div>
				<label htmlFor="notes" className="block text-sm font-medium text-slate-800">Notes</label>
				<input id="notes" name="notes" type="text" placeholder='General observation' required onChange={handleChange}
				className="mt-1 w-full rounded-md border border-blue-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-slate-700"/>
			</div>

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