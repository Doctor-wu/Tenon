import { Service } from "../../decorators";
import { Inject } from "../../decorators/inject";
import type ServiceB from "./service-b";

@Service({
  name: 'service-a',
})
class ServiceA {
  
  constructor(
    @Inject('service-b') private serviceB: ServiceB,
  ) {
    console.log('construct A');
  }

  invoke() {
    console.log('invoke a');
    this.serviceB.invoke();
  }
}

export default ServiceA;