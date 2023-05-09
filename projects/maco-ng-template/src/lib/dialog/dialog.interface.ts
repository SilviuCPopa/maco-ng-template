
export interface ConfirmDialogPayload {
    title: string;
}

export interface DialogAction {
    label: string;
    key: string;
    matColor?: string;
    color?: string;
    disabled?: boolean;
    primary?: boolean;
    data?: any;
}
