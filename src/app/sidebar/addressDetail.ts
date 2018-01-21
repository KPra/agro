import {Address} from './address';

export class AddressDetail {
  constructor(public address_components: Address[], public formatted_address : string,
              public geometry: any, public place_id: string, public types: string[]) {}
}
