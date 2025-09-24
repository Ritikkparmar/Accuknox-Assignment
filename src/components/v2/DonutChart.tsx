import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface DonutSlice {
	name: string;
	value: number;
	color: string;
}

interface Props {
	data: DonutSlice[];
	total: number;
}

export default function DonutChart({ data, total }: Props) {
	const cx = 120;
	const cy = 90;
	const outerRadius = 70;
	const innerRadius = 40;
	return (
		<div className="h-52 w-full">
			<ResponsiveContainer width="100%" height="100%">
				<PieChart>
					<Pie data={data as any} dataKey="value" nameKey="name" cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius}>
						{data.map((entry, idx) => (
							<Cell key={`cell-${idx}`} fill={entry.color} />
						))}
					</Pie>
					<Tooltip />
				</PieChart>
			</ResponsiveContainer>
			<div className="pointer-events-none select-none text-center" style={{ marginTop: -120 }}>
				<div className=" text-xl font-bold text-gray-800">{total}</div>
				<div className="text-xs text-gray-500">Total</div>
			</div>
		</div>
	);
}
