import mitt from "mitt"

export const emitter = mitt()

export enum EventKeys {
  NOTIFY = "notify",
  DIALOG = "dialog"
}
