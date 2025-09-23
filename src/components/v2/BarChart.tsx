import { Bar, BarChart as RBChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts';

interface BarItem {
	name: string;
	value: number;
	color: string;
}

interface Props {
	data: BarItem[];
}

export default function BarChart({ data }: Props) {
	return (
		<div className="h-40 w-full">
			<ResponsiveContainer width="100%" height="100%">
				<RBChart data={data} layout="vertical" margin={{ top: 8, right: 16, bottom: 8, left: 32 }}>
					<XAxis type="number" hide />
					<YAxis type="category" dataKey="name" width={90} tick={{ fontSize: 12 }} />
					<Tooltip />
					<Bar dataKey="value" radius={[6, 6, 6, 6]}>
						{data.map((item, idx) => (
							<Cell key={idx} fill={item.color} />
						))}
					</Bar>
				</RBChart>
			</ResponsiveContainer>
		</div>
	);
}
