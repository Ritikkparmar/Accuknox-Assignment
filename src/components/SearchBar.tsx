import { useEffect, useMemo, useState } from 'react';
import { useDashboardStore } from '../store/dashboardStore';
import { Search, X } from 'lucide-react';

export default function SearchBar() {
	const setSearchQuery = useDashboardStore(s => s.setSearchQuery);
	const globalQuery = useDashboardStore(s => s.searchQuery);
	const [value, setValue] = useState(globalQuery);

	useEffect(() => setValue(globalQuery), [globalQuery]);

	useEffect(() => {
		const id = setTimeout(() => setSearchQuery(value.trim()), 200);
		return () => clearTimeout(id);
	}, [value, setSearchQuery]);

	return (
		<div className="relative w-full max-w-xl">
			<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
			<input
				type="text"
				value={value}
				onChange={e => setValue(e.target.value)}
				placeholder="Search widgets by name or content..."
				aria-label="Search widgets"
				className="w-full pl-10 pr-10 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
			/>
			{value && (
				<button
					aria-label="Clear search"
					onClick={() => setValue('')}
					className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-100"
				>
					<X className="h-4 w-4" />
				</button>
			)}
		</div>
	);
}
