import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export default function CustomButton({ 
  children, 
  icon: Icon, 
  variant = "default", 
  isLoading = false, 
  className = "",
  ...props 
}) {
  return (
    <Button 
      variant={variant} 
      disabled={isLoading} 
      className={`gap-2 ${className}`} 
      {...props}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        Icon && <Icon className="h-4 w-4" />
      )}
      {children}
    </Button>
  )
}