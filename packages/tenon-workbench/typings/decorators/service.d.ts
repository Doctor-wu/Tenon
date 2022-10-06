import { ServiceTag } from '../core';
export declare const ServiceHandler: ({ name, }: {
    name: any;
}) => (target: any) => void;
export interface IServiceParams {
    name: ServiceTag;
}
export declare const ServiceNameKey: unique symbol;
export declare const Service: (params: IServiceParams) => ClassDecorator;
