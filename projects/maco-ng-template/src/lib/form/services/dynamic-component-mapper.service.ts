import { Type } from '@angular/core';

export type DynamicComponentResolveFunction = (model: any) => Type<{}>;
export class DynamicComponentResolver {
    static fromType(type: Type<{}>): DynamicComponentResolveFunction {
        const typeFct = () => type;
        return typeFct;
    }
}
