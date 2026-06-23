import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { CheckCircle, XCircle, AlertCircle, X } from "lucide-react"

export type ToastType = "success" | "error" | "info"

interface Toast {
  id: string
  message: string
  type: ToastType
}

interface NotificationContextProps {
  showToast: (message: string, type?: ToastType) => void
}

const NotificationContext = React.createContext<NotificationContextProps | undefined>(undefined)

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const showToast = React.useCallback((message: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      removeToast(id)
    }, 3500)
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return (
    <NotificationContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 w-full max-w-sm pointer-events-none px-4 sm:px-0">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
              className="pointer-events-auto flex items-center justify-between w-full p-4 rounded-xl border bg-background shadow-lg overflow-hidden relative"
              style={{
                borderColor:
                  toast.type === "success"
                    ? "rgba(34, 197, 94, 0.4)"
                    : toast.type === "error"
                    ? "rgba(239, 68, 68, 0.4)"
                    : "rgba(59, 130, 246, 0.4)",
              }}
            >
              <div className="flex items-center gap-3">
                {toast.type === "success" && <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />}
                {toast.type === "error" && <XCircle className="h-5 w-5 text-red-500 shrink-0" />}
                {toast.type === "info" && <AlertCircle className="h-5 w-5 text-blue-500 shrink-0" />}
                <span className="text-sm font-semibold text-foreground">{toast.message}</span>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-4 text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = React.useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }
  return context
}
