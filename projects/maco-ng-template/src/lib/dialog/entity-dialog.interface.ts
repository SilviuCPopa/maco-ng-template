
export enum EntityDialogOperation {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
    CANCEL = "CANCEL",
    CONFIRM = "CONFIRM"
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

