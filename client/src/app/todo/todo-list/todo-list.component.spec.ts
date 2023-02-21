import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TodoListComponent } from './todo-list.component';
import { TodoCardComponent } from '../todo-card/todo-card.component';
import { TodoService } from '../todo.service';
import { MockTodoService } from 'src/testing/todo.service.mock';

const COMMON_IMPORTS: any[] = [
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatButtonModule,
  MatInputModule,
  MatExpansionModule,
  MatTooltipModule,
  MatListModule,
  MatDividerModule,
  MatRadioModule,
  MatIconModule,
  MatSnackBarModule,
  BrowserAnimationsModule,
  RouterTestingModule,
];


describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [COMMON_IMPORTS],
      declarations: [TodoListComponent, TodoCardComponent],
      // providers:    [ UserService ]  // NO! Don't provide the real service!
      // Provide a test-double instead
      providers: [{ provide: TodoService, useValue: new MockTodoService() }]
    });
  });

  beforeEach(waitForAsync(() => {
    // Compile all the components in the test bed
    // so that everything's ready to go.
      TestBed.compileComponents().then(() => {
        /* Create a fixture of the UserListComponent. That
         * allows us to get an instance of the component
         * (userList, below) that we can control in
         * the tests.
         */
        fixture = TestBed.createComponent(TodoListComponent);
        component = fixture.componentInstance;
        /* Tells Angular to sync the data bindings between
         * the model and the DOM. This ensures, e.g., that the
         * `userList` component actually requests the list
         * of users from the `MockUserService` so that it's
         * up to date before we start running tests on it.
         */
        fixture.detectChanges();
      });
    }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
