import { useState, useEffect } from "react";
import { ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import GirlWeight from "../assets/girl_weight_2years.json"
import BoyWeight from "../assets/boy_weight_2years.json"
import type { Baby } from "../types/Baby";

export default function WeightChart(props: { baby: Baby}) {
	const [normalData, setNormalData] = useState<any[]>([]);;
	const [babyData, setBabyData] = useState<any[]>([]);;

	useEffect(() => {
		if (!props.baby) return;

		const data = (props.baby.gender == "F" ? GirlWeight : BoyWeight)
		setNormalData(data)

		fetch(`https://localhost:8443/api/babies/${props.baby.id}/weights`)
			.then(res => res.json())
			.then(data => setBabyData(data.data))
			.catch(err => console.error("API error:", err));
	}, [props.baby])

	return (
        <div className="border rounded-xl p-4">
			<h3 className="text-sm font-semibold text-gray-700 mb-2">Weight (kg)</h3>
			<ComposedChart style={{ width: '100%', aspectRatio: 1.618 }} data={normalData}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="months" type="number" domain={[0, 24]} label={{ value: 'months', position: "insideBottomRight", offset: -5 }}allowDataOverflow/>
				<YAxis width="auto" />
				<Legend verticalAlign="bottom" iconType="rect" />
				<Tooltip />
				<Line name="Baby weight" type="natural" data={babyData} dataKey="weight" stroke="#22b60eff" connectNulls />
				<Area name="Reference" type="monotone" dataKey="weight" stroke="none" fill="#cccccc" connectNulls dot={false} activeDot={false} />
			</ComposedChart>
		</div>
	)
}