import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Baby } from "../../types/Baby";
import { display_age } from "../../utils/dateUtils";

export default function GeneralInfoCard(props: {baby: Baby}) {
	const [avgs, setAvgs] = useState<any>(null)

	const navigate = useNavigate();

	useEffect(() => {
		if (!props.baby) return;

		fetch(`https://localhost:8443/api/babies/${props.baby.id}/avgs`)
			.then(res => res.json())
			.then(data => {
				setAvgs(data.data)
			})
			.catch(err => console.error(err));
	}, [props.baby]);

	const birthdate = (props.baby ? new Date(props.baby.birthdate).toLocaleDateString("en-GB") : "")
	let gender;
	if (props.baby.gender == "F") {
		gender = "female ♀️"
	} else if (props.baby.gender == "M") {
		gender = "male ♂️"
	} else {
		gender = "other ⚥"
	}

	return (
		<div className="bg-white rounded-2xl shadow p-6 mb-6 space-y-5">
			<h2 className="text-xl font-semibold text-blue-700">General Info</h2>

			{/* Birthdate & Gender */}
			<div className="grid sm:grid-cols-2 gap-4">
				<div>
					<p className="text-sm text-gray-500 uppercase tracking-wide">Birthdate</p>
					<p className="text-gray-800 font-medium">
						{birthdate} <span className="text-gray-600">({display_age(props.baby.birthdate)})</span>
					</p>
				</div>
				<div>
					<p className="text-sm text-gray-500 uppercase tracking-wide">Gender</p>
					<p className="text-gray-800 font-medium">{gender}</p>
				</div>
			</div>

			{/* Last Record */}
			<div className="border-t pt-4">
				<p className="text-sm text-gray-500 uppercase tracking-wide mb-1">Last Record</p>
				{avgs?.lastRecord ? (
					<div className="space-y-1">
						<p className="text-gray-800">
							<strong>Height:</strong> {avgs.lastRecord.height} cm &nbsp;|&nbsp; <strong>Weight:</strong> {avgs.lastRecord.weight} kg
							&nbsp;(<span className="text-gray-600">{new Date(avgs.lastRecord.date).toLocaleDateString("en-GB")}</span>)
						</p>
						{avgs.lastRecord.notes && (
							<p className="text-gray-600 italic">
								“{avgs.lastRecord.notes.length > 160 ? avgs.lastRecord.notes.slice(0,157) + '…' : avgs.lastRecord.notes}”
							</p>
						)}
					</div>
				) : (
					<p className="text-gray-500 italic">No records yet.</p>
				)}
			</div>

			{/* Average Gains */}
			<div className="border-t pt-4 grid sm:grid-cols-2 gap-4">
				{avgs?.lastRecord ? (
					<>
						<div>
							<p className="text-sm text-gray-500 uppercase tracking-wide mb-1">Avg Weight Gain</p>
							<p className="text-gray-800 font-medium">
								+{avgs.avgWeightGain} kg / month
							</p>
						</div>
						<div>
							<p className="text-sm text-gray-500 uppercase tracking-wide mb-1">Avg Height Growth</p>
							<p className="text-gray-800 font-medium">
								+{avgs.avgHeightGain} cm / month
							</p>
						</div>
					</>
				) : (
					<p className="text-gray-500 italic">No records yet.</p>
				)}
			</div>

			<div className="pt-2 flex justify-center">
				<button
					className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
					onClick={() => navigate(`/baby/${props.baby.id}/vaccination`)}
				>
					Go to Vaccines
				</button>
			</div>
		</div>
	)
}