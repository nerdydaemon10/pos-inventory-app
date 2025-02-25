import { inject } from "@angular/core";
import { signalStore, withMethods } from "@ngrx/signals";
import { MessageService } from "primeng/api";

export const ToasterStore = signalStore(
  { providedIn: 'root' },
  withMethods((
    store, 
    service: MessageService = inject(MessageService)
  ) => ({
    success(detail: string): void {
      service.add({
        severity: 'success',
        summary: 'System Notification',
        detail: detail,
        life: 3000
      })
    },
    error(detail: string): void {
      service.add({
        severity: 'error',
        summary: 'System Notification',
        detail: detail,
        life: 3000
      })
    }
  }))
)