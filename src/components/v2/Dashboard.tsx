import { Filter, Search, Settings, User2, X, Plus } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import WidgetCard from "./WidgetCard";
import DonutChart from "./DonutChart";
import BarChart from "./BarChart";

interface TemplateDef {
	id: string;
	title: string;
	category: string;
	render: () => ReactNode;
}

interface Instance {
	id: string;
	templateId: string;
}

export default function DashboardV2() {
	const [query, setQuery] = useState("");

	// Base widget templates (static)
	const riskData = [
		{ name: "Failed (1989)", value: 1989, color: "#ef4444" },
		{ name: "Warning (681)", value: 681, color: "#f97316" },
		{ name: "Not available (36)", value: 36, color: "#f59e0b" },
		{ name: "Passed (7253)", value: 7253, color: "#22c55e" },
	];
	const riskTotal = 9659;
	const accountsData = [
		{ name: "Connected (2)", value: 2, color: "#22c55e" },
		{ name: "Not Connected (0)", value: 0, color: "#ef4444" },
	];
	const accountsTotal = 2;
	const imageRisk = [
		{ name: "Critical", value: 63, color: "#ef4444" },
		{ name: "High", value: 56, color: "#f97316" },
		{ name: "Medium", value: 70, color: "#f59e0b" },
		{ name: "Low", value: 1281, color: "#22c55e" },
	];
	const imageIssues = [
		{ name: "Critical", value: 2, color: "#ef4444" },
		{ name: "High", value: 43, color: "#f97316" },
		{ name: "Medium", value: 51, color: "#f59e0b" },
		{ name: "Low", value: 0, color: "#22c55e" },
	];

	const baseTemplates: TemplateDef[] = [
		{
			id: "cloud-accounts",
			title: "Cloud Accounts",
			category: "CSPM Executive Dashboard",
			render: () => (
				<div className="flex items-start gap-6">
					<DonutChart data={accountsData} total={accountsTotal} />
					<ul className="space-y-2 text-sm">
						{accountsData.map((a) => (
							<li
								key={a.name}
								className="flex items-center gap-2 text-gray-700"
							>
								<span
									className="inline-block h-3 w-3 rounded-full"
									style={{ backgroundColor: a.color }}
								/>
								{a.name}
							</li>
						))}
					</ul>
				</div>
			),
		},
		{
			id: "cloud-risk",
			title: "Cloud Account Risk Assessment",
			category: "CSPM Executive Dashboard",
			render: () => (
				<div className="flex items-start gap-6">
					<DonutChart data={riskData} total={riskTotal} />
					<ul className="space-y-2 text-sm">
						{riskData.map((a) => (
							<li
								key={a.name}
								className="flex items-center gap-2 text-gray-700"
							>
								<span
									className="inline-block h-3 w-3 rounded-full"
									style={{ backgroundColor: a.color }}
								/>
								{a.name}
							</li>
						))}
					</ul>
				</div>
			),
		},
		{
			id: "cwpp-empty-1",
			title: "Top 5 Namespace Specific Alerts",
			category: "CWPP Dashboard",
			render: () => (
				<div className="flex h-40 items-center justify-center text-sm text-gray-500">
					No Graph data available!
				</div>
			),
		},
		{
			id: "cwpp-empty-2",
			title: "Workload Alerts",
			category: "CWPP Dashboard",
			render: () => (
				<div className="flex h-40 items-center justify-center text-sm text-gray-500">
					No Graph data available!
				</div>
			),
		},
		{
			id: "img-risk",
			title: "Image Risk Assessment",
			category: "Registry Scan",
			render: () => (
				<div className="space-y-3">
					<span className="inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">Registry Scan</span>
					<BarChart data={imageRisk} />
				</div>
			),
		},
		{
			id: "img-issues",
			title: "Image Security Issues",
			category: "Registry Scan",
			render: () => (
				<div className="space-y-3">
					<span className="inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">Registry Scan</span>
					<BarChart data={imageIssues} />
				</div>
			),
		},
	];

	// Dynamic templates created from the Add Widget form
	const [dynamicTemplates, setDynamicTemplates] = useState<TemplateDef[]>([]);
	const templates = useMemo(
		() => [...baseTemplates, ...dynamicTemplates],
		[baseTemplates, dynamicTemplates]
	);
	const templateById = useMemo(
		() => Object.fromEntries(templates.map((t) => [t.id, t])),
		[templates]
	);

	// Instances represent actual cards on the page
	const [instances, setInstances] = useState<Instance[]>([
		{ id: crypto.randomUUID(), templateId: "cloud-accounts" },
		{ id: crypto.randomUUID(), templateId: "cloud-risk" },
		{ id: crypto.randomUUID(), templateId: "cwpp-empty-1" },
		{ id: crypto.randomUUID(), templateId: "cwpp-empty-2" },
		{ id: crypto.randomUUID(), templateId: "img-risk" },
		{ id: crypto.randomUUID(), templateId: "img-issues" },
	]);

	function addCardLike(instanceId: string) {
		setInstances((prev) => {
			const inst = prev.find((i) => i.id === instanceId);
			if (!inst) return prev;
			return [
				...prev,
				{ id: crypto.randomUUID(), templateId: inst.templateId },
			];
		});
	}
	function removeCard(instanceId: string) {
		setInstances((prev) => prev.filter((i) => i.id !== instanceId));
	}

	// Add Widget form modal
	const [isFormOpen, setFormOpen] = useState(false);
	const [formCategory, setFormCategory] = useState<string>(
		"CSPM Executive Dashboard"
	);
	const [formTitle, setFormTitle] = useState("New Widget");
	const [formText, setFormText] = useState("Example content");

	function openForm(category: string) {
		setFormCategory(category);
		setFormTitle("New Widget");
		setFormText("Example content");
		setFormOpen(true);
	}

	function submitForm(e: React.FormEvent) {
		e.preventDefault();
		const id = `custom-${crypto.randomUUID()}`;
		const category = formCategory;
		const title = formTitle.trim() || "Untitled";
		const text = formText;
		const newTemplate: TemplateDef = {
			id,
			title,
			category,
			render: () => (
				<div className="space-y-3">
					<span className="inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">{category}</span>
					<p className="text-sm text-gray-700">{text}</p>
				</div>
			),
		};
		setDynamicTemplates((prev) => [...prev, newTemplate]);
		setInstances((prev) => [
			...prev,
			{ id: crypto.randomUUID(), templateId: id },
		]);
		setFormOpen(false);
	}

	// Right-side category manager (slide-over)
	const [isPanelOpen, setPanelOpen] = useState(false);
	const [panelCategory, setPanelCategory] = useState<string>("CSPM Executive Dashboard");
	const [panelSearch, setPanelSearch] = useState("");

	function openPanel(category: string) {
		setPanelCategory(category);
		setPanelSearch("");
		setPanelOpen(true);
	}

	function isTemplateEnabled(tid: string) {
		return instances.some(i => i.templateId === tid);
	}
	function toggleTemplate(tid: string) {
		const enabled = isTemplateEnabled(tid);
		if (enabled) {
			// remove all instances of this template
			setInstances(prev => prev.filter(i => i.templateId !== tid));
		} else {
			setInstances(prev => [...prev, { id: crypto.randomUUID(), templateId: tid }]);
		}
	}

	const categories = [
		"CSPM Executive Dashboard",
		"CWPP Dashboard",
		"Registry Scan",
	];

	return (
		<div className="min-h-screen bg-gray-100">
			{/* Top bar */}
			<div className="border-b border-gray-200 bg-gray-200/80">
				<div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-6 py-3">
					<div className="flex items-center gap-2 text-sm text-gray-600">
						<span>Home</span>
						<span>›</span>
						<span className="font-medium text-gray-800">Dashboard V2</span>
					</div>
					<div className="relative w-full max-w-xl">
						<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
						<input
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Search anything..."
							className="w-full rounded-xl border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
						/>
					</div>
					<div className="flex items-center gap-2">
						<button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm hover:bg-gray-50">
							<span>Last 2 days</span>
							<Filter className="h-4 w-4" />
						</button>
						<button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm hover:bg-gray-50">
							<Settings className="h-4 w-4" />
						</button>
						<button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm hover:bg-gray-50">
							<User2 className="h-4 w-4" />
						</button>
					</div>
				</div>
			</div>

			<main className="mx-auto max-w-7xl space-y-8 px-6 py-6">
				{categories.map((cat) => (
					<section key={cat} className="space-y-3">
						<div className="flex items-center justify-between">
							<h2 className="text-base font-semibold text-gray-800">{cat}</h2>
							<div className="flex items-center gap-2">
								<button
									onClick={() => openForm(cat)}
									className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm hover:bg-gray-50"
								>
									<Plus className="h-4 w-4" /> Add Widget
								</button>
								<button
									onClick={() => openPanel(cat)}
									className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm hover:bg-gray-50"
								>
									Manage
								</button>
							</div>
						</div>
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
							{instances
								.filter((i) => templateById[i.templateId].category === cat)
								.map((inst) => {
									const t = templateById[inst.templateId];
									return (
										<WidgetCard
											key={inst.id}
											title={t.title}
											onAdd={() => addCardLike(inst.id)}
											onRemove={() => removeCard(inst.id)}
										>
											{t.render()}
										</WidgetCard>
									);
								})}
							{/* Add Widget placeholder card */}
							<div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gradient-to-br from-white to-gray-50 p-6 text-center shadow-lg transition-transform hover:scale-105 hover:shadow-2xl">
								<p className="text-sm font-medium text-gray-500 mb-4">
									Create your unique widget
								</p>
								<button
									onClick={() => openForm(cat)}
									className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 text-sm font-semibold text-white shadow-md hover:from-purple-500 hover:to-indigo-500 hover:scale-105 transition-transform"
								>
									<Plus className="h-5 w-5" /> Add Widget
								</button>
							</div>
						</div>
					</section>
				))}
			</main>

			{/* Add Widget Modal */}
			{isFormOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fadeIn">
					<div className="w-full max-w-md rounded-2xl border border-indigo-100 bg-white shadow-2xl transform animate-scaleIn">
						{/* Header */}
						<div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
							<h3 className="text-lg font-semibold text-gray-900">
								➕ Add Widget
							</h3>
							<button
								onClick={() => setFormOpen(false)}
								className="rounded-full p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
							>
								<X className="h-5 w-5" />
							</button>
						</div>

						{/* Form */}
						<form onSubmit={submitForm} className="space-y-4 p-5">
							{/* Category */}
							<div>
								<label className="mb-1 block text-sm font-medium text-gray-700">
									Category
								</label>
								<select
									value={formCategory}
									onChange={(e) => setFormCategory(e.target.value)}
									className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition-all"
								>
									{[
										"CSPM Executive Dashboard",
										"CWPP Dashboard",
										"Registry Scan",
									].map((c) => (
										<option key={c} value={c}>
											{c}
										</option>
									))}
								</select>
							</div>

							{/* Title */}
							<div>
								<label className="mb-1 block text-sm font-medium text-gray-700">
									Widget title
								</label>
								<input
									value={formTitle}
									onChange={(e) => setFormTitle(e.target.value)}
									placeholder="Enter widget title"
									className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition-all"
								/>
							</div>

							{/* Text */}
							<div>
								<label className="mb-1 block text-sm font-medium text-gray-700">
									Widget text
								</label>
								<textarea
									value={formText}
									onChange={(e) => setFormText(e.target.value)}
									rows={4}
									placeholder="Write widget details..."
									className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition-all"
								/>
							</div>

							{/* Actions */}
							<div className="flex justify-end gap-3 pt-2">
								<button
									type="button"
									onClick={() => setFormOpen(false)}
									className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
								>
									Cancel
								</button>
								<button
									type="submit"
									className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2 text-sm font-medium text-white shadow hover:from-indigo-700 hover:to-purple-700 transition-all"
								>
									Add Widget
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* Slide-over Category Manager */}
			{isPanelOpen && (
				<div className="fixed inset-0 z-50 flex">
					<div className="flex-1 bg-black/40" onClick={() => setPanelOpen(false)} />
					<aside className="h-full w-full max-w-xl bg-white shadow-xl">
						<div className="flex items-center justify-between border-b px-4 py-3">
							<h3 className="text-sm font-semibold">Manage Widgets</h3>
							<button onClick={() => setPanelOpen(false)} className="rounded p-1 hover:bg-gray-100"><X className="h-5 w-5" /></button>
						</div>
						<div className="flex items-center gap-2 border-b px-4 py-2">
							{categories.map(cat => (
								<button key={cat} onClick={() => setPanelCategory(cat)} className={`rounded-md px-3 py-1 text-xs font-medium ${panelCategory===cat? 'bg-indigo-50 text-indigo-700 border border-indigo-200':'bg-gray-50 text-gray-600 border border-gray-200'}`}>{cat.split(' ')[0]}</button>
							))}
						</div>
						<div className="p-4">
							<div className="relative mb-3">
								<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
								<input value={panelSearch} onChange={e=>setPanelSearch(e.target.value)} placeholder="Search widgets..." className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500" />
							</div>
							<ul className="space-y-2">
								{templates.filter(t => t.category===panelCategory && t.title.toLowerCase().includes(panelSearch.toLowerCase())).map(t => {
									const enabled = isTemplateEnabled(t.id);
									return (
										<li key={t.id} className="flex items-center justify-between rounded-lg border border-gray-200 p-2">
											<div>
												<p className="text-sm font-medium">{t.title}</p>
												<p className="text-xs text-gray-500">{t.category}</p>
											</div>
											<button onClick={()=>toggleTemplate(t.id)} className={`rounded-md px-3 py-1 text-xs font-medium ${enabled? 'border border-red-200 text-red-600 hover:bg-red-50':'border border-indigo-200 text-indigo-700 hover:bg-indigo-50'}`}>{enabled? 'Remove':'Add'}</button>
										</li>
									);
								})}
							</ul>
						</div>
					</aside>
				</div>
			)}
		</div>
	);
}
