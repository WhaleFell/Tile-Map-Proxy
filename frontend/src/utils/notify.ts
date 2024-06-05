import { emitter, EventKeys } from "@/plugins/eventBus"

export const notify = (params: NotifyParams) => {
  emitter.emit(EventKeys.NOTIFY, { ...params })
}
