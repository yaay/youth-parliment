import { EventEmitter, Injectable, Output, signal, Signal, WritableSignal } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class RequestService {
requestId : WritableSignal<number> = signal(0);

}
