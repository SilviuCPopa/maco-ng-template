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

export interface RefreshTokenConfig {
  REFRESH_TOKEN_HOST: string;
  CLIENT_ID: string;
  CLIENT_SECRET: string;
}
