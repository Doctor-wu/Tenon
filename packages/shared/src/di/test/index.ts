import { DIState } from "../core";
import ServiceA from "./services/service-a";
import ServiceB from "./services/service-b";
console.log(ServiceA, ServiceB);
DIState.mount('service-a');
const a = DIState.getServiceInstance<ServiceA>('service-a')!;
a.invoke();
