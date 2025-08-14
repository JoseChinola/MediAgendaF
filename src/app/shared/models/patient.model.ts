import { Appointments } from "./appointment.model";
import { User } from "./user.model";


export interface Patient {
    userId: string;
    birthDate: string;
    fullName: string;
    address: string;
    user: User;
}