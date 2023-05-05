export interface AppRoles {
    name: string;
}

export interface AuthResponse {
    success: boolean;
    responseObject: {
        access_token: string;
        refresh_token: string;
        expires_in: number;
        userEmail?: string;
        userRoles?: AppRoles;
    }
}
