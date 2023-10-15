export interface User {
    id: string;
    name: string;
    email: string;
    password?: string,
    permissionLevel: boolean;
    selectedSupermarkets: string[];
}