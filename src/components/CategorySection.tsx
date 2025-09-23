import { Plus } from 'lucide-react';
import type { Category } from '../types/dashboard';
import WidgetCard from './WidgetCard';
import { useDashboardStore, useUIStore } from '../store/dashboardStore';

interface Props {
	category: Category;
}

export default function CategorySection({ category }: Props) {
	const query = useDashboardStore(s => s.searchQuery).toLowerCase();
	const openAddModal = useUIStore(s => s.openAddModal);

	const filtered = category.widgets.filter(w =>
		w.name.toLowerCase().includes(query) || w.text.toLowerCase().includes(query)
	);

	return (
		<section aria-labelledby={`cat-${category.id}`} className="space-y-3">
			<div className="flex items-center justify-between">
				<h2 id={`cat-${category.id}`} className="text-lg font-semibold text-gray-800">{category.name}</h2>
				<button
					onClick={() => openAddModal(category.id)}
					className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
				>
					<Plus className="h-4 w-4" /> Add Widget
				</button>
			</div>
			<div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
				{filtered.length === 0 ? (
					<p className="text-sm text-gray-500">No widgets match the current search.</p>
				) : (
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
						{filtered.map(w => (
							<WidgetCard key={w.id} widget={w} />
						))}
					</div>
				)}
			</div>
		</section>
	);
}
