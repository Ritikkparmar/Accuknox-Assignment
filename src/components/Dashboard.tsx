import { useEffect } from 'react';
import SearchBar from './SearchBar';
import CategorySection from './CategorySection';
import AddWidgetModal from './AddWidgetModal';
import CategoryManager from './CategoryManager';
import { useDashboardStore, useUIStore } from '../store/dashboardStore';
import data from '../data/initialData.json';
import { Settings } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

export default function Dashboard() {
	const categories = useDashboardStore(s => s.categories);
	const loadInitial = useDashboardStore(s => s.loadInitial);
	const openManager = useUIStore(s => s.openCategoryManager);

	useEffect(() => {
		if (categories.length === 0) {
			loadInitial(data.categories);
		}
	}, [categories.length, loadInitial]);

	return (
		<div className="min-h-screen bg-gray-100">
			<Toaster position="top-right" />
			<header className="sticky top-0 z-30 border-b border-gray-200 bg-gray-200/80 backdrop-blur">
				<div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
					<h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
					<div className="flex items-center gap-3">
						<SearchBar />
						<button onClick={openManager} className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
							<Settings className="h-4 w-4" /> Manage
						</button>
					</div>
				</div>
			</header>
			<main className="mx-auto max-w-7xl space-y-8 px-6 py-8">
				{categories.map(cat => (
					<CategorySection key={cat.id} category={cat} />
				))}
			</main>
			<AddWidgetModal />
			<CategoryManager />
		</div>
	);
}
