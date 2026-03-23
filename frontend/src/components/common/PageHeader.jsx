import { CardBox } from "./CardBox";

export default function PageHeader({ title, description, actionButton }) {
  return (
    <div className="flex justify-between items-center sm:flex-row flex-col gap-4 mb-6 px-4">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
        <p className="text-slate-500">{description}</p>
      </div>
      <div className="flex items-end gap-2 ">{actionButton}</div>
    </div>
  );
}