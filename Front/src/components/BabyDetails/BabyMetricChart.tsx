import { useState, useEffect } from "react";
import { ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import type { Baby } from "../../types/Baby";
import type { ChartDataPoint } from "../../types/ChartDataPoint";

export default function BabyMetricChart(props: { baby: Baby, metric: string}) {
	const [refData, setRefData] = useState<ChartDataPoint[]>([]);;
	const [babyData, setBabyData] = useState<ChartDataPoint[]>([]);;

	useEffect(() => {
		if (!props.baby) return;

		const gender = (props.baby.gender == "F" ? "girl" : "boy")

		import(`../../assets/${gender}_${props.metric}_2years.json`)
			.then(module => setRefData(module.default))
			.catch(err => console.error("Failed to load reference data:", err));

		fetch(`https://localhost:8443/api/babies/${props.baby.id}/records/${props.metric}`)
		.then(res => res.json())
		.then(data => setBabyData(data.data))
		.catch(err => console.error("API error:", err));
	}, [props.baby, props.metric])

	const color = (props.metric == "height" ? "#22b60eff" : "#823ec2ff" )
	const title = (props.metric == "height" ? "Height (cm)" : "Weight (kg)" )

	return (
        <div className="border rounded-xl p-4">
			<h3 className="text-sm font-semibold text-gray-700 mb-2">{title}</h3>
			<ComposedChart style={{ width: '100%', aspectRatio: 1.618 }} data={refData}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="months" type="number" domain={[0, 24]} label={{ value: 'months', position: "insideBottomRight", offset: -5 }} allowDataOverflow/>
				<YAxis type="number" />
				<Legend verticalAlign="bottom" iconType="rect" />
				<Tooltip />
				<Line name="Baby" type="natural" data={babyData} dataKey={props.metric} stroke={color} connectNulls />
				<Area name="Reference" type="monotone" dataKey={props.metric} stroke="none" fill="#cccccc" connectNulls dot={false} activeDot={false} />
			</ComposedChart>
		</div>
	)
}
