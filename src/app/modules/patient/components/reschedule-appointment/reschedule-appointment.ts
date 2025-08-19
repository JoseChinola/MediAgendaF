import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Appointments } from '../../../../shared/models/appointment.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-reschedule-appointment',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './reschedule-appointment.html'
})
export class RescheduleAppointment {
  @Input() appointment!: Appointments;
  @Output() save = new EventEmitter<{ appointmentId: string; newDate: string }>();
  @Output() close = new EventEmitter<void>();

  rescheduleForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.rescheduleForm = this.fb.group({
      id: ['', Validators.required],
      newAppointmentDate: ['', Validators.required],
      appointmentTime: ['', Validators.required]
    });
  }

  ngOnChanges() {
    if (this.appointment) {
      this.rescheduleForm.patchValue({
        id: this.appointment.id,
        newAppointmentDate: this.appointment.appointmentDate ? this.appointment.appointmentDate.split('T')[0] : '',
        appointmentTime: this.appointment.appointmentDate ? this.appointment.appointmentDate.split('T')[1].substring(0, 5) : ''
      });
    }
  }

  onSubmit() {
    if (this.rescheduleForm.invalid) {
      console.log("Formulario no válido");
      return;
    }

    const { newAppointmentDate, appointmentTime } = this.rescheduleForm.value;

    const [hours, minutes] = appointmentTime.split(':').map(Number);
    const dateObj = new Date(newAppointmentDate);
    dateObj.setHours(hours, minutes);
    this.save.emit({
      appointmentId: this.appointment.id!,
      newDate: dateObj.toISOString()
    });
  }
}
