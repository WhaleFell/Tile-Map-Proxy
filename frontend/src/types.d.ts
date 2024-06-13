interface NotifyParams {
  type: "success" | "error" | "warning" | "info"
  message: string
  duration?: number
}

interface DialogParams {
  title: string
  text: string
  isError?: boolean
}

declare module "leaflet"
