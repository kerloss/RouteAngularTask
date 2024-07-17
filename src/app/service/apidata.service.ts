import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../interface/customer';
import { Observable } from 'rxjs';
import { Transaction } from '../interface/transaction';

@Injectable({
  providedIn: 'root'
})
export class ApidataService {
  private baseurl = 'http://localhost:5000';

  constructor(private _HttpClient: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this._HttpClient.get<Customer[]>(`http://localhost:5000/customers`)
  };

  getTransaction(): Observable<Transaction[]> {
    return this._HttpClient.get<Transaction[]>(`http://localhost:5000/transactions`)
  };

  getTransactionsByCustomerId(customerId: number): Observable<Transaction[]> {
    return this._HttpClient.get<Transaction[]>(`${this.baseurl}/transactions?customer_id=${customerId}`);
  };
}
