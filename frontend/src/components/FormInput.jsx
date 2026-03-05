import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function FormInput({ label, error, name, ...props }) {
  return (
    <div className="grid w-full items-center gap-1.5 mb-4 text-left">
      {label && <Label htmlFor={name} className="text-slate-700 font-semibold">{label}</Label>}
      <Input 
        id={name}
        name={name}
        {...props} 
        className={`${error ? "border-rose-500 focus-visible:ring-rose-500" : "border-slate-200"}`}
      />
      {error && <p className="text-xs font-medium text-rose-500 mt-1">{error}</p>}
    </div>
  )
}