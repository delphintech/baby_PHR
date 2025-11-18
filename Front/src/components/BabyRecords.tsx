import { useEffect, useState } from "react";
import type { Baby } from "../types/Baby";
import type { Record } from "../types/Record";
import NewRecordForm from "./NewRecordForm";

export default function BabyRecords (props: { baby: Baby | null }) {
	const [records, setRecords] = useState<Array<Record>>([])
	const [openForm, setOpenForm] = useState(false)
	const [collapsed, setCollapsed] = useState(false)
	const [reload, setReload] = useState(true)

	useEffect(() => {
		if (!props.baby || !reload) return;
		fetch(`https://localhost:8443/api/babies/${props.baby?.id}/records`)
			.then(res => res.json())
			.then(data => { 
				setRecords(data.data) })
		.catch(err => console.error(err));
		setReload(false)
	}, [props.baby, reload])

	async function handleDelete(id: number) {
		if(window.confirm(`Are you sure you want to delete this records ?`)) {
			const res = await fetch(`https://localhost:8443/api/records/${id}`, {
				method: "DELETE",
			}).then(res => res.json())

			if (res.status != "ok") {
				alert(`Error: ${res.message}`)
			} else {
				setReload(true)
			}
		}
	}

	return (
		<div className="bg-white rounded-2xl shadow p-4 mb-6">
			<div className="flex justify-between items-center mb-3">
				<h2 className="text-lg font-semibold text-blue-700" onClick={() => setCollapsed(c => !c)}>Growth Records {collapsed ? "▼" : "▲"}</h2>
				<button className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-400" onClick={() => setOpenForm(true)}>+ Add Record</button>
				<NewRecordForm baby={props.baby} isOpen={openForm} setOpenForm={setOpenForm} setReload={setReload} />
			</div>
			<div className={`transition-all duration-300 ease-in-out overflow-hidden ${collapsed ? "max-h-0 opacity-0" : "max-h-[1000px] opacity-100"}`} >
				<table data-collapse="collapse" className="w-full text-sm">
					<thead className="text-left text-gray-600">
					<tr>
						<th className="p-2">Date</th>
						<th className="p-2">Weight (kg)</th>
						<th className="p-2">Height (cm)</th>
						<th className="p-2">Notes</th>
						<th className="p-2"></th>
					</tr>
					</thead>
					<tbody>
						{records.map(record => 
							<tr key={record.id} className="border-t text-gray-800">
								<td className="py-2">{new Date(record.date).toLocaleDateString('en-GB')}</td>
								<td>{record.weight}</td>
								<td>{record.height}</td>
								<td>{record.notes}</td>
								<td><button onClick={() => handleDelete(record.id)}>❌</button></td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	)
}