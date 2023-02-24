import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { Todo } from './todo';

import { TodoService } from './todo.service';

describe('TodoService', () => {
  const testTodos: Todo[] = [
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

  let todoService: TodoService;

  // These are used to mock the HTTP requests so that we (a) don't have to
  // have the server running and (b) we can check exactly which HTTP
  // requests were made to ensure that we're making the correct requests.
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    todoService = new TodoService(httpClient);
  });

  it('should be created', () => {
    expect(todoService).toBeTruthy();
  });

  describe('When getTodos() is called with no parameters', () => {
    it('calls `api/users`', waitForAsync(() => {
      // Mock the `httpClient.get()` method, so that instead of making an HTTP request,
      // it just returns our test data.
      const mockedMethod = spyOn(httpClient, 'get').and.returnValue(of(testTodos));

      // Call `userService.getUsers()` and confirm that the correct call has
      // been made with the correct arguments.
      //
      // We have to `subscribe()` to the `Observable` returned by `getUsers()`.
      // The `users` argument in the function is the array of Users returned by
      // the call to `getUsers()`.
      todoService.getTodos().subscribe((todos: Todo[]) => {
        // The array of `User`s returned by `getUsers()` should be
        // the array `testUsers`.
        expect(todos)
          .withContext('expected todos')
          .toEqual(testTodos);
        // The mocked method (`httpClient.get()`) should have been called
        // exactly one time.
        expect(mockedMethod)
          .withContext('one call')
          .toHaveBeenCalledTimes(1);
        // The mocked method should have been called with two arguments:
        //   * the appropriate URL ('/api/users' defined in the `UserService`)
        //   * An options object containing an empty `HttpParams`
        expect(mockedMethod)
          .withContext('talks to the correct endpoint')
          .toHaveBeenCalledWith(todoService.todoUrl, { params: new HttpParams() });
      });
    }));
  });

  describe('When getTodos() is called with parameters, it correctly forms the HTTP request (Javalin/Server filtering)', () => {
    /*
    * We really don't care what `getUsers()` returns in the cases
    * where the filtering is happening on the server. Since all the
    * filtering is happening on the server, `getUsers()` is really
    * just a "pass through" that returns whatever it receives, without
    * any "post processing" or manipulation. So the tests in this
    * `describe` block all confirm that the HTTP request is properly formed
    * and sent out in the world, but don't _really_ care about
    * what `getUsers()` returns as long as it's what the HTTP
    * request returns.
    *
    * So in each of these tests, we'll keep it simple and have
    * the (mocked) HTTP request return the entire list `testUsers`
    * even though in "real life" we would expect the server to
    * return return a filtered subset of the users.
    */

    it('correctly calls api/todos with filter parameter \'owner\'', () => {
        const mockedMethod = spyOn(httpClient, 'get').and.returnValue(of(testTodos));

        todoService.getTodos({ name: 'Fry' }).subscribe((users: Todo[]) => {
          // The array of `User`s returned by `getUsers()` should be
          // the array `testUsers`. This is "weird" because we'd truly be expecting
          // the server to return just `admin` users, but as mentioned above, we're
          // not trying to get the server here.
          expect(users)
            .withContext('expected todos')
            .toEqual(testTodos);
          expect(mockedMethod)
            .withContext('one call')
            .toHaveBeenCalledTimes(1);
          // The mocked method should have been called with two arguments:
          //   * the appropriate URL ('/api/users' defined in the `UserService`)
          //   * An options object containing an `HttpParams` with the `role`:`admin`
          //     key-value pair.
          expect(mockedMethod)
            .withContext('talks to the correct endpoint')
            .toHaveBeenCalledWith(todoService.todoUrl, { params: new HttpParams().set('owner', 'Fry') });
        });
    });
  });

  describe('Filtering on the client using `filterTodos()` (Angular/Client filtering)', () => {
    it('restricts output count', () => {
      const filteredUsers = todoService.filterTodos(testTodos, { limit: 1 });
      // There should be only one todos returned
      expect(filteredUsers.length).toBe(1);
    });

    it('restricts output count', () => {
      const filteredUsers = todoService.filterTodos(testTodos, { limit: 2 });
      // There should be only two todos returned
      expect(filteredUsers.length).toBe(2);
    });

    it('filters by body contents', () => {
      const contentString = 'laborum';
      const filteredTodos = todoService.filterTodos(testTodos, { body: contentString });
      // There should be just one user that has UMM as their company.
      expect(filteredTodos.length).toBe(2);
      // Every returned user's company should contain 'UMM'.
      filteredTodos.forEach(todo => {
        expect(todo.body.indexOf(contentString)).toBeGreaterThanOrEqual(0);
      });
    });

    it('filters by complete', () => {
      const filteredTodos = todoService.filterTodos(testTodos, { status: 'complete' });
      // There should be just one user that has UMM as their company.
      expect(filteredTodos.length).toBe(1);
      // Every returned user's company should contain 'UMM'.
      filteredTodos.forEach(todo => {
        expect(todo.status).toBeTrue();
      });
    });

    it('filters by incomplete', () => {
      const filteredTodos = todoService.filterTodos(testTodos, { status: 'todo' });
      // There should be just one user that has UMM as their company.
      expect(filteredTodos.length).toBe(2);
      // Every returned user's company should contain 'UMM'.
      filteredTodos.forEach(todo => {
        expect(todo.status).toBeFalse();
      });
    });
  });

  describe('When addTodo() is called it correctly forms the HTTP request', () => {
    it('correctly calls api/todos with the todo data as parameters', () => {
        const mockedMethod = spyOn(httpClient, 'post').and.returnValue(of(testTodos));

        todoService.addTodo(testTodos[0]).subscribe((_) => {

          expect(mockedMethod)
            .withContext('one call')
            .toHaveBeenCalledTimes(1);

          expect(mockedMethod)
            .withContext('talks to the correct endpoint')
            .toHaveBeenCalledWith(todoService.todoUrl, testTodos[0]);
        });
    });
  });

  describe('When deleteTodo() is called it correctly forms the HTTP request', () => {
    it('correctly calls api/todos with the todo data as parameters', () => {
        const mockedMethod = spyOn(httpClient, 'delete').and.returnValue(of(testTodos));

        todoService.deleteTodo(testTodos[0]).subscribe((_) => {

          expect(mockedMethod)
            .withContext('one call')
            .toHaveBeenCalledTimes(1);

          expect(mockedMethod)
            .withContext('talks to the correct endpoint')
            .toHaveBeenCalledWith(todoService.todoUrl + '/' + testTodos[0]._id);
        });
    });
  });
});
