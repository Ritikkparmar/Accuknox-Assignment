export interface Widget {
	id: string;
	name: string;
	text: string;
	categoryId: string;
}

export interface Category {
	id: string;
	name: string;
	widgets: Widget[];
}

export interface DashboardData {
	categories: Category[];
}
