interface NotifyParams {
  type: "success" | "error" | "warning" | "info"
  message: string
  duration?: number
}

declare module "leaflet"
