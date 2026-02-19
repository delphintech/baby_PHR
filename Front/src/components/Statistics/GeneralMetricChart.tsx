import { useState, useEffect } from "react";
import { ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import type { ChartDataPoint } from "../../types/ChartDataPoint";
import { API_URL } from "../../config/api";

export default function GeneralMetricChart(props: { metric: string }) {
	const [refBoyData, setRefBoyData] = useState<ChartDataPoint[]>([]);;
	const [boyData, setBoyData] = useState<ChartDataPoint[]>([]);;
	const [refGirlData, setRefGirlData] = useState<ChartDataPoint[]>([]);;
	const [girlData, setGirlData] = useState<ChartDataPoint[]>([]);;

	const [showBoys, setShowBoys] = useState(true);
    const [showGirls, setShowGirls] = useState(true);

	useEffect(() => {
		if (!props.metric) return;

		const genders = {
            boy: { param: "M", setRef: setRefBoyData, setData: setBoyData },
            girl: { param: "F", setRef: setRefGirlData, setData: setGirlData }
        };

		Object.entries(genders).forEach(([gender, setters]) => {
			// Load Reference Data
			import(`../../assets/${gender}_${props.metric}_2years.json`)
				.then(module => setters.setRef(module.default))
				.catch(err => console.error("Failed to load reference data:", err));

			// Load gender data
			fetch(`${API_URL}/api/records/${setters.param}/${props.metric}`)
				.then(res => res.json())
				.then(data => setters.setData(data.data))
				.catch(err => console.error("API error:", err));
		})
	}, [props.metric])

	const title = (props.metric == "height" ? "Height (cm)" : "Weight (kg)" )

	return (
        <div className="border rounded-xl p-4">
			<div className="flex items-center justify-between">
				<h3 className="text-sm font-semibold text-gray-700 mb-4">{title}</h3>

				<div className="flex gap-4 mb-4">
					<label className="flex items-center gap-2 cursor-pointer">
						<input
							type="checkbox"
							checked={showBoys}
							onChange={(e) => setShowBoys(e.target.checked)}
							className="w-4 h-4"
						/>
						<span className="text-sm text-gray-700">👦 Boys</span>
					</label>
					<label className="flex items-center gap-2 cursor-pointer">
						<input
							type="checkbox"
							checked={showGirls}
							onChange={(e) => setShowGirls(e.target.checked)}
							className="w-4 h-4"
						/>
						<span className="text-sm text-gray-700">👧 Girls</span>
					</label>
				</div>
			</div>

			<ComposedChart style={{ width: '100%', aspectRatio: 1.618 }} >
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="months" type="number" domain={[0, 24]} label={{ value: 'months', position: "insideBottomRight", offset: -5 }} allowDataOverflow/>
				<YAxis type="number" />
				<Legend verticalAlign="bottom" iconType="rect" />
				<Tooltip />
				{showGirls && 
					<>
						<Line name="Girl" type="natural" data={girlData} dataKey={props.metric} stroke="#d11616ff" connectNulls />
						<Area name="Girl reference" type="monotone" data={refBoyData} dataKey={props.metric} stroke="none" fill="#dda2a2ff" connectNulls dot={false} activeDot={false} />
					</>
				}
				{showBoys && 
					<>
						<Line name="Boy" type="natural" data={boyData} dataKey={props.metric} stroke="#0e8ed3ff" connectNulls />
						<Area name="Boy reference" type="monotone" data={refGirlData} dataKey={props.metric} stroke="none" fill="#8fc3e0ff" connectNulls dot={false} activeDot={false} />
					</>
				}
			</ComposedChart>
		</div>
	)
}
