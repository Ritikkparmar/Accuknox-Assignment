import { useEffect, useRef, useState } from 'react';
import { useDashboardStore, useUIStore } from '../store/dashboardStore';
import { X, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AddWidgetModal() {
	const isOpen = useUIStore(s => s.isAddModalOpen);
	const close = useUIStore(s => s.closeAddModal);
	const categoryId = useUIStore(s => s.activeCategoryId);
	const addWidget = useDashboardStore(s => s.addWidget);
	const dialogRef = useRef<HTMLDivElement | null>(null);
	const [name, setName] = useState('');
	const [text, setText] = useState('');

	useEffect(() => {
		if (!isOpen) {
			setName('');
			setText('');
		}
	}, [isOpen]);

	if (!isOpen || !categoryId) return null;

	function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!name.trim()) {
			toast.error('Widget name is required');
			return;
		}
		if (!text.trim()) {
			toast.error('Widget content is required');
			return;
		}
		if (!categoryId) {
			// Should not happen due to outer guard, but keeps TS happy
			return;
		}
		// categoryId is guaranteed by guard above
		addWidget(categoryId, { name: name.trim(), text: text.trim(), categoryId });
		toast.success('Widget added');
		close();
	}

	return (
		<div
			role="dialog"
			aria-modal="true"
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
		>
			<div ref={dialogRef} className="w-full max-w-md rounded-lg bg-white p-4 shadow-lg">
				<div className="mb-3 flex items-center justify-between">
					<h2 className="text-base font-semibold">Add Widget</h2>
					<button aria-label="Close add widget" onClick={close} className="rounded p-1 hover:bg-gray-100">
						<X className="h-5 w-5" />
					</button>
				</div>
				<form onSubmit={onSubmit} className="space-y-3">
					<div>
						<label className="mb-1 block text-sm font-medium" htmlFor="widget-name">Name</label>
						<input id="widget-name" value={name} onChange={e => setName(e.target.value)}
							className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
					</div>
					<div>
						<label className="mb-1 block text-sm font-medium" htmlFor="widget-text">Content</label>
						<textarea id="widget-text" value={text} onChange={e => setText(e.target.value)} rows={4}
							className="w-full resize-y rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
					</div>
					<div className="flex justify-end gap-2">
						<button type="button" onClick={close} className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">Cancel</button>
						<button type="submit" className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
							<Plus className="h-4 w-4" /> Add
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
