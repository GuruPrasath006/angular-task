import { Component } from '@angular/core';
import { Stock } from '../stock';
import { ApiService } from '../api.service';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.css']
})
export class WatchListComponent {
  stocks: Stock[] = [];
  
  constructor(private apiService: ApiService,
    private socketService: SocketService 
    ) { }

  ngOnInit() {
    this.getWatchList();
    // socket update stock price
		this.socketService.onFetchStock().subscribe((data: any) => {
      //console.log(data);
      this.stocks.forEach(item =>{ if(item.SC_CODE == data.code){ 
        item.CLOSE = data.price;
        item.LAST = data.previous
        var change = Number((data.price - item.LAST).toFixed(2));
        item.TICKER_CHANGE = change;
        var percDiff =  100 * Math.abs( (data.price - item.LAST) / ( (item.LAST+data.price)/2 ) );
        item.TICKER_CHANGE_PERCENT = change > 0 ?  Number((percDiff).toFixed(2)) : - Number((percDiff).toFixed(2)) ;
      } });  
    })

  }

  ngOnDestroy() {
    //this.socketService.unsubscribe();
    // unsubscribe socket
  }
// get watch list stocks
  getWatchList(): void {
    this.apiService.getWatchList()
      .subscribe(stocks => {
        this.stocks = stocks;
      });
  }
}
