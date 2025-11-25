import { useState, useEffect } from "react";
import { ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import type { ChartDataPoint } from "../../types/ChartDataPoint";

export default function BabyMetricChart(props: { metric: string }) {
	const [refBoyData, setRefBoyData] = useState<ChartDataPoint[]>([]);;
	const [boyData, setBoyData] = useState<ChartDataPoint[]>([]);;
	const [refGirlData, setRefGirlData] = useState<ChartDataPoint[]>([]);;
	const [girlData, setGirlData] = useState<ChartDataPoint[]>([]);;

	useEffect(() => {
		if (!props.metric) return;

		const genders = {
            boy: { setRef: setRefBoyData, setData: setBoyData },
            girl: { setRef: setRefGirlData, setData: setGirlData }
        };

		Object.entries(genders).forEach(([gender, setters]) => {
			// Load Reference Data
			import(`../../assets/${gender}_${props.metric}_2years.json`)
				.then(module => setters.setRef(module.default))
				.catch(err => console.error("Failed to load reference data:", err));

			// Load gender data
			fetch(`https://localhost:8443/api/babies/${key}/records/${props.metric}`)
				.then(res => res.json())
				.then(data => setters.setData(data.data))
				.catch(err => console.error("API error:", err));
		})
	}, [props.metric])

	const title = (props.metric == "height" ? "Height (cm)" : "Weight (kg)" )

	return (
        <div className="border rounded-xl p-4">
			<h3 className="text-sm font-semibold text-gray-700 mb-2">{title}</h3>
			<ComposedChart style={{ width: '100%', aspectRatio: 1.618 }} >
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="months" type="number" domain={[0, 24]} label={{ value: 'months', position: "insideBottomRight", offset: -5 }} allowDataOverflow/>
				<YAxis type="number" />
				<Legend verticalAlign="bottom" iconType="rect" />
				<Tooltip />
				<Line name="Baby" type="natural" data={girlData} dataKey={props.metric} stroke="#d11616ff" connectNulls />
				<Line name="Baby" type="natural" data={boyData} dataKey={props.metric} stroke="#0e8ed3ff" connectNulls />
				<Area name="Reference" type="monotone" data={refGirlData} dataKey={props.metric} stroke="none" fill="#8fc3e0ff" connectNulls dot={false} activeDot={false} />
				<Area name="Reference" type="monotone" data={refBoyData} dataKey={props.metric} stroke="none" fill="#dda2a2ff" connectNulls dot={false} activeDot={false} />
			</ComposedChart>
		</div>
	)
}
