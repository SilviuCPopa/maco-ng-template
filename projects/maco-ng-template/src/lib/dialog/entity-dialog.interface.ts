
export enum EntityDialogOperation {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
}

export interface EntityData {
    uuid?: string;
    name?: string;
    description?: string;
}

export interface EntityDialogResult {
    action: EntityDialogOperation;
    title?: string;
    data: EntityData;
}

export enum DefaultFormAction {
    cancel = 'cancel',
    save = 'save',
    confirm = 'confirm',
    create = 'create'
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
