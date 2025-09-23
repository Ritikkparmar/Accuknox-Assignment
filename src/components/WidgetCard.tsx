import { X } from 'lucide-react';
import type { Widget } from '../types/dashboard';
import { useDashboardStore } from '../store/dashboardStore';

interface Props {
	widget: Widget;
}

export default function WidgetCard({ widget }: Props) {
	const removeWidget = useDashboardStore(s => s.removeWidget);

	return (
		<div className="group relative rounded-lg border border-gray-200 bg-white p-4 shadow hover:shadow-md transition">
			<button
				aria-label={`Remove widget ${widget.name}`}
				onClick={() => removeWidget(widget.id)}
				className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-700"
			>
				<X className="h-4 w-4" />
			</button>
			<h3 className="mb-1.5 text-sm font-semibold text-gray-900">{widget.name}</h3>
			<p className="text-sm text-gray-600">{widget.text}</p>
		</div>
	);
}
