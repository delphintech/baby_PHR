import { useEffect, useState } from "react";
import type { Baby } from "../types/Baby";
import type { Record } from "../types/Record";
import NewRecordForm from "./NewRecordForm";

export default function BabyRecords (props: { baby: Baby | null }) {
	const [records, setRecords] = useState<Array<Record>>([])
	const [openForm, setOpenForm] = useState(false)

	useEffect(() => {
		if (!props.baby) return;
		fetch(`https://localhost:8443/api/babies/${props.baby?.id}/records`)
			.then(res => res.json())
			.then(data => { 
				console.log(data);
				setRecords(data.data) })
		.catch(err => console.error(err));
	}, [props.baby])

	return (
		<div className="bg-white rounded-2xl shadow p-4 mb-6">
			<div className="flex justify-between items-center mb-3">
				<h2 className="text-lg font-semibold text-blue-700">Growth Records</h2>
				<button className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-400" onClick={() => setOpenForm(true)}>+ Add Record</button>
				<NewRecordForm baby={props.baby} isOpen={openForm} setOpenForm={setOpenForm}/>
			</div>
			<table className="w-full text-sm">
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
						<tr className="border-t text-gray-800">
							<td className="py-2">{new Date(record.date).toLocaleDateString('en-GB')}</td>
							<td>{record.weight}</td>
							<td>{record.height}</td>
							<td>{record.notes}</td>
							{/* <td><button>❌</button></td> */}
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}