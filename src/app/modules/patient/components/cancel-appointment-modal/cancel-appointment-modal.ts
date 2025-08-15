import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cancel-appointment-modal',
  imports: [],
  templateUrl: './cancel-appointment-modal.html',
  styleUrl: './cancel-appointment-modal.css'
})
export class CancelAppointmentModal {
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
