import { User } from 'src/users/entities/user.entity';

export class CreateProfessionalDto {
  id: number;
  profession: string;
  RegistrationNumber: string;
  specialties: string;
  location: string;
  maximumDisplacement: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}
