import { Pipe, PipeTransform } from '@angular/core';
import { Customer } from '../interface/customer';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
//Customers[] this is array of Customer that will search on it
  //filter this is text that user will search about it
  //we will return array of customer and filter it and filter take arrow functioin that take item or product as parameter to loop 
  transform(customers: Customer[], searchTerm: string): Customer[] {
    if (!searchTerm) {
      return customers;
    }
    return customers.filter((nameEmp) => nameEmp.name?.toLowerCase().includes(searchTerm?.toLowerCase())); //? save navigation to save property from error
  }
}
