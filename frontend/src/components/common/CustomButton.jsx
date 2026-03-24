import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export default function CustomButton({ 
  children, 
  icon: Icon, 
  variant = "default", 
  isLoading = false, 
  disabled = false,
  className = "",
  ...props 
}) {
  return (
    <Button 
      variant={variant} 
      disabled={isLoading || disabled}
      className={`gap-2 ${className} ${isLoading ? "cursor-wait" : ""}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        Icon && <Icon className="h-4 w-4" />
      )}
      {isLoading ? "Procesando..." : children}
    </Button>
  )
}