import { useState, useEffect } from "react";
import { ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import GirlHeight from "../../assets/girl_height_2years.json"
import BoyHeight from "../../assets/boy_height_2years.json"
import type { Baby } from "../../types/Baby";

export default function HeightChart(props: { baby: Baby}) {
	const [normalData, setNormalData] = useState<any[]>([]);;
	const [babyData, setBabyData] = useState<any[]>([]);;

	useEffect(() => {
		if (!props.baby) return;

		const data = (props.baby.gender == "F" ? GirlHeight : BoyHeight)
		setNormalData(data)

		fetch(`https://localhost:8443/api/babies/${props.baby.id}/heights`)
			.then(res => res.json())
			.then(data => setBabyData(data.data))
			.catch(err => console.error("API error:", err));
	}, [props.baby])

	return (
        <div className="border rounded-xl p-4">
			<h3 className="text-sm font-semibold text-gray-700 mb-2">Height (cm)</h3>
			<ComposedChart style={{ width: '100%', aspectRatio: 1.618 }} data={normalData}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="months" type="number" domain={[0, 24]} label={{ value: 'months', position: "insideBottomRight", offset: -5 }}allowDataOverflow/>
				<YAxis width="auto" />
				<Legend verticalAlign="bottom" iconType="rect" />
				<Tooltip />
				<Line name="Baby height" type="natural" data={babyData} dataKey="height" stroke="#22b60eff" connectNulls />
				<Area name="Reference" type="monotone" dataKey="height" stroke="none" fill="#cccccc" connectNulls dot={false} activeDot={false} />
			</ComposedChart>
		</div>
	)
}