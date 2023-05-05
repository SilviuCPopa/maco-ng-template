export enum SnackbarTypeEnum {
    success = 'success',
    warning = 'warning',
    error = 'error'
}

export interface SnackbarData {
    message: string;
    type: SnackbarTypeEnum;
    action?: string;
    translate?: boolean;
}