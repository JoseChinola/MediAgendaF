export interface RescheduleAppointment {
    appointmentId: string;
    newDate: string;
}

export interface CancelAppointment {
    appointmentId: string;
    status: string;
    confirm: boolean;
}