export type TUser = {
    id: string;
    password: string;
    needsPasswordChange: boolean;
    role: 'admin' | 'student' | 'faculty' | 'cr';
    status: 'active' | 'inactive' | 'banned';
    isDeleted: boolean;
}