import { diState } from "./di-state";
import ServiceA from "./services/service-a";
import ServiceB from "./services/service-b";
console.log(ServiceA, ServiceB);
diState.mount('service-a');
const a = diState.getServiceInstance<ServiceA>('service-a')!;
a.invoke();
