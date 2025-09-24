import { Plus, X } from "lucide-react";
import type { ReactNode } from "react";

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
    <div className="relative min-w-[320px] rounded-2xl border border-gray-100 bg-white p-4 shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
        <div className="flex items-center gap-2">
          {onAdd && (
            <button
              aria-label="Add widget"
              onClick={onAdd}
              className="inline-flex items-center gap-1 rounded-md border border-dashed border-gray-300 px-2 py-1 text-xs text-gray-600 hover:bg-gray-50"
            >
              <Plus className="h-3 w-3" /> Add
            </button>
          )}
          {onRemove && (
            <button aria-label="Remove widget" onClick={onRemove} className="inline-flex h-7 w-7 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-700">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
      {empty ? (
        <button
          onClick={onAdd}
          className="mt-4 inline-flex items-center gap-2 rounded-xl border border-dashed border-gray-300 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
        >
          <Plus className="h-4 w-4" /> Add Widget
        </button>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
}
