export interface Appointments {
    id?: string;
    doctorId?: string;
    doctor?: string;
    patientId?: string;
    patient?: string;
    appointmentDate?: string;
    status?: string | null;
    notes?: string | null;
}