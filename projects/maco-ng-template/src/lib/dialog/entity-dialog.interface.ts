
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

