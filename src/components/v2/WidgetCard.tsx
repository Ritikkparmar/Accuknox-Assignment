import { Plus, X } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  title: string;
  children?: ReactNode;
  empty?: boolean;
  onAdd?: () => void;
  onRemove?: () => void;
}

export default function WidgetCard({
  title,
  children,
  empty,
  onAdd,
  onRemove,
}: Props) {
  return (
    <div className="relative flex flex-col min-w-[340px] rounded-2xl border border-gray-200/50 bg-white/80 backdrop-blur-md p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Decorative top bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        <div className="flex items-center gap-2">
          {onAdd && (
            <button
              aria-label="Add widget"
              onClick={onAdd}
              className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50 px-2.5 py-1.5 text-xs font-medium text-indigo-600 hover:from-indigo-100 hover:to-purple-100 transition-all"
            >
              <Plus className="h-3.5 w-3.5" /> Add
            </button>
          )}
          {onRemove && (
            <button
              aria-label="Remove widget"
              onClick={onRemove}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      {empty ? (
        <div className="flex flex-1 items-center justify-center">
          <button
            onClick={onAdd}
            className="group flex flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50/40 px-6 py-6 text-sm font-medium text-gray-600 hover:border-indigo-400 hover:bg-indigo-50/40 hover:text-indigo-600 transition-colors"
          >
            <Plus className="h-6 w-6 text-gray-400 group-hover:text-indigo-500 transition-colors" />
            Add Widget
          </button>
        </div>
      ) : (
        <div className="flex-1">{children}</div>
      )}
    </div>
  );
}
