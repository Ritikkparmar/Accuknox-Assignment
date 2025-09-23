import { useDashboardStore, useUIStore } from '../store/dashboardStore';
import { Trash2, X } from 'lucide-react';

export default function CategoryManager() {
	const isOpen = useUIStore(s => s.isCategoryManagerOpen);
	const close = useUIStore(s => s.closeCategoryManager);
	const categories = useDashboardStore(s => s.categories);
	const removeWidget = useDashboardStore(s => s.removeWidget);

	if (!isOpen) return null;

	return (
		<div role="dialog" aria-modal="true" className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
			<div className="w-full max-w-2xl rounded-lg bg-white p-4 shadow-lg">
				<div className="mb-3 flex items-center justify-between">
					<h2 className="text-base font-semibold">Category Manager</h2>
					<button aria-label="Close manager" onClick={close} className="rounded p-1 hover:bg-gray-100">
						<X className="h-5 w-5" />
					</button>
				</div>
				<div className="max-h-[60vh] space-y-4 overflow-y-auto pr-2">
					{categories.map(cat => (
						<div key={cat.id} className="space-y-2">
							<h3 className="text-sm font-semibold text-gray-900">{cat.name}</h3>
							{cat.widgets.length === 0 ? (
								<p className="text-sm text-gray-500">No widgets.</p>
							) : (
								<ul className="divide-y divide-gray-200 rounded-md border border-gray-200">
									{cat.widgets.map(w => (
										<li key={w.id} className="flex items-center justify-between p-2 text-sm">
											<div>
												<p className="font-medium">{w.name}</p>
												<p className="text-gray-500">{w.text}</p>
											</div>
											<button onClick={() => removeWidget(w.id)} className="inline-flex items-center gap-1 rounded border border-red-200 px-2 py-1 text-red-600 hover:bg-red-50">
												<Trash2 className="h-4 w-4" /> Remove
											</button>
										</li>
									))}
								</ul>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
