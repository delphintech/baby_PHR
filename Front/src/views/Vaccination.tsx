import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { Vaccine } from '../types/Vaccine';
import UpdateVaccineForm from '../components/UpdateVaccineForm';

function Vaccination() {
	const [selectedVaccine, setSelectedVaccine] = useState<Vaccine | null>(null);
	const [vaccines, setVaccines] = useState<Array<Vaccine>>([]);
	const [reload, setReload] = useState(true);

	const params = useParams();
	useEffect(() => {
		if (!reload) return;
		fetch(`https://localhost:8443/api/babies/${params.id}/vaccines`)
			.then(res => res.json())
			.then(data => setVaccines(data.data))
			.catch(err => console.error(err));
		setReload(false);
	}, [reload]);

	function completion(completed: boolean, due: string, done: string): React.ReactElement {
		if (completed) {
			const done_date = new Date(done).toLocaleDateString("en-GB");
			return (<span className="bg-green-200 rounded-full px-2 text-green-600 text-sm leading-loose">{done_date}</span>)
		} else if (new Date(due) < new Date()) {
			return (<span className="bg-red-200 rounded-full px-2 text-red-600 text-sm leading-loose">Past due</span>)
		}
			return (<></>);
	}

	return (
		<section className="p-4">	
			<div className="bg-white rounded-2xl shadow p-4 mb-6">
				<div className="flex justify-center items-center mb-3">
					<h2 className="text-lg font-semibold text-center text-blue-700">Vaccines</h2>
					
				</div>
				{selectedVaccine && <UpdateVaccineForm vaccine={selectedVaccine} setSelectedVaccine={setSelectedVaccine} setReload={setReload} />}
				<table data-collapse="collapse" className="w-full text-sm">
					<thead className="text-left text-gray-600">
					<tr>
						<th className="p-2">Due Date</th>
						<th className="p-2">Name</th>
						<th className="p-2">Completion_date</th>
					</tr>
					</thead>
					<tbody>
						{vaccines.map(vaccine => 
							<tr key={vaccine.id} className="border-t text-gray-800">
								<td className="py-2">{new Date(vaccine.due_date).toLocaleDateString('en-GB')}</td>
								<td>{vaccine.name}</td>
								<td>{completion(vaccine.completed, vaccine.due_date, vaccine.completed_at)}</td>
								<td><span onClick={() => setSelectedVaccine(vaccine)} className="bg-blue-200 rounded-full px-2 text-blue-600 text-sm leading-loose cursor-pointer">🖉</span></td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</section>
	);
}

export default Vaccination;