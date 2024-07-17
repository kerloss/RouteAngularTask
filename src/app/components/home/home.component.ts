import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/interface/customer';
import { Transaction } from 'src/app/interface/transaction';
import { ApidataService } from 'src/app/service/apidata.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private _ApidataService: ApidataService) { };

  customers: Customer[] = [];
  transactions: Transaction[] = [];
  searchTerm: string = '';

  // Fetch the customers and transactions data on initialization
  ngOnInit(): void {
    // Subscribe to the API data service to fetch the customers data
    this._ApidataService.getCustomers().subscribe({
      next: (response) => {
        console.log(response);
        this.customers = response;
      },
      error: (err) => { console.log(err) },
    })

    // Fetch the transactions data when the component is initialized
    this._ApidataService.getTransaction().subscribe({
      next: (response) => {
        console.log(response);
        this.transactions = response;
      },
      error: (err) => { console.log(err) },
    })
  }
}
