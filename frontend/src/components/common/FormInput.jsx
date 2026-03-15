import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function FormInput({ 
  label, 
  error, 
  name, 
  type = "text",
  options = [],
  placeholder,
  ...props 
}) {
  const errorClass = error ? "border-red-500 focus-visible:ring-red-500" : "border-slate-200";

  // Renderizar según el tipo
  const renderInput = () => {
    switch (type) {
      case "select":
        return (
          <Select name={name} defaultValue={props.defaultValue} onValueChange={props.onChange}>
            <SelectTrigger className={errorClass}>
              <SelectValue placeholder={placeholder || "Selecciona una opción"} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem 
                  key={option.value} 
                  value={option.value?.toString()}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "textarea":
        return (
          <Textarea
            id={name}
            name={name}
            placeholder={placeholder}
            {...props}
            className={errorClass}
          />
        );

      case "number":
        return (
          <Input
            id={name}
            name={name}
            type="number"
            placeholder={placeholder}
            {...props}
            className={errorClass}
          />
        );

      default:
        return (
          <Input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            {...props}
            className={errorClass}
          />
        );
    }
  };

  return (
    <div className="grid w-full items-center gap-1.5 mb-4 text-left">
      {label && (
        <Label htmlFor={name} className="text-slate-700 font-semibold">
          {label}
        </Label>
      )}
      {renderInput()}
      {error && <p className="text-xs font-medium text-red-500 mt-1">{error}</p>}
    </div>
  );
}