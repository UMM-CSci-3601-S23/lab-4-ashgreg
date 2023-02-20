import { HttpClient } from '@angular/common/http';
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
  static testTodos: Todo[] = [
    {
    _id: '58895985a22c04e761776d54',
    owner: 'Blanche',
    status: false,
    body: 'In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum non labore ex sint esse.',
    category: 'software design'
  },
  {
    _id: '58895985c1849992336c219b',
    owner: 'Fry',
    status: false,
    body: 'Ipsum esse est ullamco magna tempor anim laborum non officia deserunt veniam commodo. Aute minim incididunt ex commodo.',
    category: 'video games'
  },
  {
    _id: '58895985ae3b752b124e7663',
    owner: 'Fry',
    status: true,
    body: 'Ullamco irure laborum magna dolor non. Anim occaecat adipisicing cillum eu magna in.',
    category: 'homework'
  }
  ];

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
  getTodos(): Observable<Todo[]> {
    return of(TodoService.testTodos);
  }
}
