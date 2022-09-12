import { Service } from "../../decorators";

@Service({
  name: 'service-b',
})
class ServiceB {

  constructor(
  ) {
    console.log('construct b');
  }

  invoke() {
    console.log('invoke B');
  }
}

export default ServiceB;