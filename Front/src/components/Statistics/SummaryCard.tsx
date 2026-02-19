import { useState, useEffect } from "react";
import { API_URL } from "../../config/api";

interface Average {
	// avg_age: number;
    avgWeightGain: number;
    avgHeightGain: number;
}

export default function SummaryCard(props: {gender: string}) {
	const [avgs, setAvgs] = useState<Average | null>(null)

	useEffect(() => {
		if (!props.gender) return;

		fetch(`${API_URL}/api/records/${props.gender}/avgs`)
			.then(res => res.json())
			.then(data => {
				setAvgs(data.data)
			})
			.catch(err => console.error(err));
	}, [props.gender]);

	const genderLabel = props.gender === "M" ? "👦 Boys" : props.gender === "F" ? "👧 Girls" : "⚥ Other";
    const bgColor = props.gender === "M" ? "bg-blue-50 border-blue-500" : "bg-pink-50 border-pink-500";
    const textColor = props.gender === "M" ? "text-blue-700" : "text-pink-700";

	return (
		<div className={`rounded-2xl shadow p-6 border-l-4 ${bgColor}`}>
            <h3 className={`text-lg font-semibold ${textColor} mb-2`}>{genderLabel}</h3>
            <p className="text-gray-600 text-sm mb-4">Average growth metrics compared to reference data</p>

            {/* Average Stats */}
            {avgs ? (
                <div className="space-y-4">
                    {/* <div className="border-t pt-4">
                        <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">Average Age</p>
                        <p className="text-gray-800 font-medium">{avgs.avg_age?.toFixed(1)} months</p>
                    </div> */}

                    <div className="border-t pt-4 grid sm:grid-cols-2 gap-4">
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
                    </div>
                </div>
            ) : (
                <p className="text-gray-500 italic">No data available.</p>
            )}
        </div>
	)
}
