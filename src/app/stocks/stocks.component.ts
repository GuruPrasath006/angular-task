import { Component, OnInit } from '@angular/core';
import { Stock } from '../stock';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit{
  stocks: Stock[] = [];
  //constructor(public messageService: MessageService) {}
  constructor(private apiService: ApiService) { }
  ngOnInit() {
    this.getStocks();
  }
  getStocks(): void {
    this.apiService.getStocks()
      .subscribe(stocks => {
        this.stocks = stocks;
      });
  }
}
