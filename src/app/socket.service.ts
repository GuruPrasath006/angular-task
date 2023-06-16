import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';  

@Injectable({
	providedIn: 'root'
})
export class SocketService {
	constructor(private socket: Socket) { }

	// emit event
	fetchMovies() {
		this.socket.emit('fetchMovies');
	} 

	// listen event
	onFetchStock() {
		return this.socket.fromEvent('stock_update');
	}
}