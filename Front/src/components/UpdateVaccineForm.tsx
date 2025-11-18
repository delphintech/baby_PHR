import { useEffect, useState } from 'react';
import type { Vaccine } from '../types/Vaccine';
import { display_age } from '../utils/dateUtils';

export default function UpdateVaccineForm (props: { 
	vaccine : Vaccine, 
	setSelectedVaccine: (selectedVaccine: Vaccine | null) => void, 
	setReload: (reload: boolean) => void}) {

	const [formData, setFormData] = useState({
		completed: false,
		completed_at: ""
	})

	useEffect(() => {
		setFormData({
			completed: props.vaccine.completed,
			completed_at: props.vaccine.completed_at
		})
	}, [props.vaccine])

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = event.target;
		setFormData(prevData => ({
			...prevData,
			[name]: value,
		}))
	}

	async function handleSubmit(event: React.FormEvent) {
		event.preventDefault();

		const res = await fetch(`https://localhost:8443/api/vaccines/${props.vaccine?.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...formData, id: props.vaccine.id })
		}).then(res => res.json())

		if (res.status == "ok") {
			props.setSelectedVaccine(null);
			props.setReload(true);
		} else {
			alert(`Error: ${res.message}`);
		}
	}

	let inside_form;
	if (formData.completed) {
		const completion_date = (formData.completed_at ? new Date(formData.completed_at) : new Date());
		inside_form = 
			<div className="flex items-center flex-col justify-between gap-4 pt-2 border-t border-blue-200">
				<button type="button" onClick={() => setFormData(prev => ({ ...prev, completed: !prev.completed }))}
					className="rounded px-4 py-2 text-sm bg-green-100 text-green-700 hover:bg-red-200">
					Completed !
				</button>
				<div>
					<label htmlFor="birthdate" className="block text-sm font-medium text-slate-700">Completed at</label>
					<input id="completed_at" name="completed_at" type="date" value={completion_date.toISOString().slice(0, 10)} required onChange={handleChange}
						className="mt-1 w-full rounded-md border border-blue-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-slate-700" />
				</div>
			</div>
	} else {
		inside_form = 
			<div className="flex items-center justify-between gap-4 pt-2 border-t border-blue-200 flex-col">
				<button type="button" onClick={() => setFormData(prev => ({ ...prev, completed: !prev.completed }))}
					className="rounded px-4 py-2 text-sm bg-red-100 text-red-700 hover:bg-green-200">
					Incomplete
				</button>
			</div>
	}

	let subtitle;
	if (new Date(props.vaccine.due_date) < new Date()) {
		subtitle = <h3 className="text-base font-semibold text-blue-900">Due <strong>{display_age(props.vaccine.due_date)}</strong> ago</h3>
	} else {
		subtitle = <></>
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-900/60">

			<form onSubmit={handleSubmit} className="w-full max-w-lg rounded-2xl bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 shadow-2xl p-8 space-y-6 border-2 border-blue-400">
			<header className="flex items-center justify-between mb-2">
				<div className="flex items-start flex-col">
					<h2 className="text-lg font-semibold text-blue-900">{props.vaccine.name}</h2>
					{subtitle}
				</div>
				<button type="button" onClick={() => props.setSelectedVaccine(null)} className="rounded-full p-2 text-blue-700 hover:bg-red-500 bg-blue-200" aria-label="Close">
					✕
				</button>
			</header>

			{inside_form}

			<div className="flex items-center justify-end gap-3 pt-2 border-t border-blue-200">
				<button type="button" onClick={() => props.setSelectedVaccine(null)} className="rounded px-4 py-2 text-sm bg-blue-100 text-blue-700 hover:bg-blue-200">Cancel</button>
				<button type="submit" className="rounded px-4 py-2 text-sm bg-blue-700 text-white hover:bg-blue-800">Save</button>
			</div>
			</form>
		</div>
	)
}