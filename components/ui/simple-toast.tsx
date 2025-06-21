"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "./button"

interface Toast {
  id: string
  title: string
  description?: string
  type: "success" | "error" | "info"
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, "id">) => void
}

const toasts: Toast[] = []
const listeners: ((toasts: Toast[]) => void)[] = []

export const showToast = (toast: Omit<Toast, "id">) => {
  const newToast: Toast = {
    ...toast,
    id: Date.now().toString(),
  }

  toasts.push(newToast)
  listeners.forEach((listener) => listener([...toasts]))

  // Auto remove after 5 seconds
  setTimeout(() => {
    const index = toasts.findIndex((t) => t.id === newToast.id)
    if (index > -1) {
      toasts.splice(index, 1)
      listeners.forEach((listener) => listener([...toasts]))
    }
  }, 5000)
}

export function SimpleToaster() {
  const [currentToasts, setCurrentToasts] = useState<Toast[]>([])

  useEffect(() => {
    const listener = (newToasts: Toast[]) => {
      setCurrentToasts(newToasts)
    }

    listeners.push(listener)

    return () => {
      const index = listeners.indexOf(listener)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [])

  const removeToast = (id: string) => {
    const index = toasts.findIndex((t) => t.id === id)
    if (index > -1) {
      toasts.splice(index, 1)
      listeners.forEach((listener) => listener([...toasts]))
    }
  }

  if (currentToasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {currentToasts.map((toast) => (
        <div
          key={toast.id}
          className={`max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 ${
            toast.type === "error"
              ? "border-l-4 border-red-500"
              : toast.type === "success"
                ? "border-l-4 border-green-500"
                : "border-l-4 border-blue-500"
          }`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{toast.title}</p>
                {toast.description && <p className="mt-1 text-sm text-gray-500">{toast.description}</p>}
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <Button onClick={() => removeToast(toast.id)} variant="ghost" size="sm" className="h-full">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
