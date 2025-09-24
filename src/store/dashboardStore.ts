import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Category, Widget } from '../types/dashboard';

interface DashboardStoreState {
	categories: Category[];
	searchQuery: string;
	addWidget: (categoryId: string, widget: Omit<Widget, 'id'>) => void;
	removeWidget: (widgetId: string) => void;
	setSearchQuery: (query: string) => void;
	loadInitial: (data: Category[]) => void;
}

export const useDashboardStore = create<DashboardStoreState>()(
	persist(
		(set) => ({
			categories: [],
			searchQuery: '',
			addWidget: (categoryId, widget) => {
				set(state => {
					const newWidget: Widget = {
						id: `widget-${crypto.randomUUID()}`,
						...widget,
						categoryId,
					};
					return {
						categories: state.categories.map(cat =>
							cat.id === categoryId
								? { ...cat, widgets: [newWidget, ...cat.widgets] }
								: cat
						),
					};
				});
			},
			removeWidget: widgetId => {
				set(state => ({
					categories: state.categories.map(cat => ({
						...cat,
						widgets: cat.widgets.filter(w => w.id !== widgetId),
					})),
				}));
			},
			setSearchQuery: query => set({ searchQuery: query }),
			loadInitial: data => set({ categories: data }),
		}),
		{
			name: 'dashboard-store',
			partialize: state => ({ categories: state.categories }),
		}
	)
);

interface UIStoreState {
	isAddModalOpen: boolean;
	activeCategoryId: string | null;
	isCategoryManagerOpen: boolean;
	openAddModal: (categoryId: string) => void;
	closeAddModal: () => void;
	openCategoryManager: () => void;
	closeCategoryManager: () => void;
}

export const useUIStore = create<UIStoreState>()(set => ({
	isAddModalOpen: false,
	activeCategoryId: null,
	isCategoryManagerOpen: false,
	openAddModal: categoryId => set({ isAddModalOpen: true, activeCategoryId: categoryId }),
	closeAddModal: () => set({ isAddModalOpen: false, activeCategoryId: null }),
	openCategoryManager: () => set({ isCategoryManagerOpen: true }),
	closeCategoryManager: () => set({ isCategoryManagerOpen: false }),
}));
