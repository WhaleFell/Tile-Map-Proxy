import { emitter, EventKeys } from "@/plugins/eventBus"

export const notify = (params: NotifyParams) => {
  emitter.emit(EventKeys.NOTIFY, { ...params })
}

export const dialog = (params: DialogParams) => {
  emitter.emit(EventKeys.DIALOG, { ...params })
}
