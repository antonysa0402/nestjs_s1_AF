export class CreateUserDto {
  email: string;
  name?: string;
  password: string;
  telephone?: string;
  role?: 'USER' | 'ADMIN';
  tenantId: number;
}