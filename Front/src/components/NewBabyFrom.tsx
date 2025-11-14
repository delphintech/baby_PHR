import { useState } from 'react';

export default function NewBabyForm (props: {isOpen: boolean, setOpenForm: (isOpen: boolean) => void}) {
	const [formData, setFormData] = useState({
		name: "",
		gender: "",
		birthdate: ""
	})

	
	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		const {name, value} = event.target;

		setFormData(prevData => ({
			...prevData,
			[name]: value
		}))
	}

	function handleSubmit(event: React.FormEvent) {
		 event.preventDefault();
		 //TODO
	}

	return (
		<>
		{props.isOpen && 
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-900/60">

			<form onSubmit={handleSubmit} className="w-full max-w-lg rounded-2xl bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 shadow-2xl p-8 space-y-6 border-2 border-blue-400">
			<header className="flex items-center justify-between mb-2">
				<h2 className="text-lg font-semibold text-blue-900">Add a baby</h2>
				<small className="text-sm text-gray-400">Required *</small>
				<button type="button" onClick={() => props.setOpenForm(false)} className="rounded-full p-2 text-blue-700 hover:bg-red-500 bg-blue-200" aria-label="Close">
					✕
				</button>
			</header>

			<div>
				<label htmlFor="name" className="block text-sm font-medium text-slate-800">Name *</label>
				<input id="name" name="name" type="text" required onChange={handleChange}
				className="mt-1 w-full rounded-md border border-blue-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"/>
			</div>

			<div>
				<label htmlFor="birthdate" className="block text-sm font-medium text-slate-700">Birthdate *</label>
				<input id="birthdate" name="birthdate" type="date" required onChange={handleChange}
				className="mt-1 w-full rounded-md border border-blue-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" />
			</div>

			<fieldset className="mt-2">
				<legend className="text-sm font-medium text-blue-800">Gender *</legend>
				<div className="mt-2 flex gap-4">
				<label className="inline-flex items-center gap-2 text-sm text-blue-700">
					<input type="radio" name="gender" value="F" required className="h-4 w-4 accent-blue-600" />
					Female
				</label>
				<label className="inline-flex items-center gap-2 text-sm text-blue-700">
					<input type="radio" name="gender" value="M" className="h-4 w-4 accent-blue-600" />
					Male
				</label>
				<label className="inline-flex items-center gap-2 text-sm text-blue-700">
					<input type="radio" name="gender" value="O" className="h-4 w-4 accent-blue-600" />
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