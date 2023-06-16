import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppComponent } from './app.component';

import { WatchListComponent } from './watch-list/watch-list.component';
import { StocksComponent } from './stocks/stocks.component';


const config: SocketIoConfig = {
	//url: environment.socketUrl, // socket server url;
  url:'http://localhost:3456',
	options: {
		transports: ['websocket']
	}
}

@NgModule({
  declarations: [
    AppComponent,
    WatchListComponent,
    StocksComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SocketIoModule.forRoot(config), 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
