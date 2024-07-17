import { Customer } from './../../interface/customer';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Transaction } from 'src/app/interface/transaction';
import { ApidataService } from 'src/app/service/apidata.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  constructor(private _ApidataService: ApidataService) { }

  transactions: Transaction[] = [];
  customers: Customer[] = [];
  transactionChart: any;
  nameOfCustomer : string = '';

  ngOnInit(): void {
    this._ApidataService.getCustomers().subscribe({
      next: (response) => {
        this.customers = response;
        console.log(response);
        this.updateChart();
      },
      error: (err) => { console.error(err) },
    });
  }

  selectCustomer(customer: Customer): void {
    this._ApidataService.getTransactionsByCustomerId(customer.id).subscribe({
      next: (response) => {
        console.log(response);
        this.transactions = response;
        this.updateChart();
        this.getCustomerName(customer);
      },
      error(err) {
        console.error('Error fetching transactions for customer:', customer.id, err);
      },
    });
  }

  getCustomerName(cust:Customer): void {
    const name = this.customers.map(t => t.name)
    // console.log(name);

    for (let i = 0; i < name.length; i++) {
      if (cust.name == name[i]) {
        console.log(name[i]);
        this.nameOfCustomer = name[i];
      }      
    }
  }



  updateChart(): void {
    const labelData = this.transactions.map(t => t.date);
    console.log(labelData);
    const amountData = this.transactions.map(t => t.amount);
    console.log(amountData);

    if (this.transactionChart) {
      this.transactionChart.destroy();
    }
    this.transactionChart = new Chart('transactionChart', {
      type: 'bar',
      data: {
        labels: labelData,
        datasets: [{
          label: 'Transaction Amount',
          data: amountData,
          backgroundColor: 'rgba(10, 173, 10, 0.3)',
          borderColor: 'rgba(10, 173, 10, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}