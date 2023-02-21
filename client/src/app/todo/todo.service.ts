import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Todo } from './todo';

/**
 * Service that provides the interface for getting information
 * about `Todo`s from the server.
 */
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // The URL for the todos part of the server API.
  readonly todoUrl: string = environment.apiUrl + 'todos';

  // The private `HttpClient` is *injected* into the service
  // by the Angular framework. This allows the system to create
  // only one `HttpClient` and share that across all services
  // that need it, and it allows us to inject a mock version
  // of `HttpClient` in the unit tests so they don't have to
  // make "real" HTTP calls to a server that might not exist or
  // might not be currently running.
  constructor(private httpClient: HttpClient) { }

  /**
   * Get a dummy list of todos from the server to test the front-end
   */
  getTodos(filters?: { name?: string }): Observable<Todo[]> {
    let httpParams: HttpParams = new HttpParams();

    if (filters) {
      if(filters.hasOwnProperty('name')) {
        httpParams = httpParams.set('owner', filters.name);
      }
    }


    return this.httpClient.get<Todo[]>(this.todoUrl, { params: httpParams });
  }
}
