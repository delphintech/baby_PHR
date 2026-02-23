import { useEffect, useState } from "react";
import type { Baby } from "../../types/Baby";
import type { Record } from "../../types/Record";
import NewRecordForm from "./NewRecordForm";
import { API_URL } from "../../config/api";

export default function BabyRecords (props: { baby: Baby | null, setReload: (reload: boolean) => void }) {
	const [records, setRecords] = useState<Array<Record>>([])
	const [openForm, setOpenForm] = useState(false)
	const [collapsed, setCollapsed] = useState(true)
	// const [reload, setReload] = useState(true)

	useEffect(() => {
		if (!props.baby) return;
		fetch(`${API_URL}/babies/${props.baby?.id}/records`)
			.then(res => res.json())
			.then(data => { 
				setRecords(data.data) })
		.catch(err => console.error(err));
	}, [props.baby])

	async function handleDelete(id: number) {
		// DEV
		alert("Creation and deletion have been deactivated for deployment purposes.");
		// if(window.confirm(`Are you sure you want to delete this records ?`)) {
		// 	const res = await fetch(`${API_URL}/records/${id}`, {
		// 		method: "DELETE",
		// 	}).then(res => res.json())

		// 	if (res.status != "ok") {
		// 		alert(`Error: ${res.message}`)
		// 	} else {
		// 		props.setReload(true)
		// 	}
		// }
	}

	return (
		<div className="bg-white rounded-2xl shadow p-4 mb-6">
			<div className="flex justify-between items-center mb-3">
				<h2 className="text-lg font-semibold text-blue-700" onClick={() => setCollapsed(c => !c)}>Growth Records {collapsed ? "▼" : "▲"}</h2>
				<button className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700" onClick={() => setOpenForm(true)}>+ Add Record</button>
				{props.baby && <NewRecordForm baby={props.baby} isOpen={openForm} setOpenForm={setOpenForm} setReload={props.setReload} />}
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