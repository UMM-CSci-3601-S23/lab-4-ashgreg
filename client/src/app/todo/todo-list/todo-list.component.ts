import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { max, Subject, takeUntil } from 'rxjs';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {
  public serverFilteredTodos: Todo[] = [];
  public filteredTodos: Todo[] = [];

  // Filters:
  public todoOwner = '';
  public todoCategory: string;
  public maxResponseLimit: number;
  public todoBody: string;
  public statusFilter = 'all';
  public sortBy: string;
  public reverseSort = false;


  private ngUnsubscribe = new Subject<void>();

  constructor(private todoService: TodoService, private snackBar: MatSnackBar) {
    // Nothing here – everything is in the injection parameters.
  }

  getTodosFromServer(): void {
    this.todoService.getTodos( { name: this.todoOwner }, this.sortBy ).pipe(takeUntil(this.ngUnsubscribe)).subscribe({
      next: (returnedTodos) => {
        this.serverFilteredTodos = returnedTodos;

        if (this.reverseSort) {
          this.serverFilteredTodos = this.serverFilteredTodos.reverse();
        }

        this.updateFilter();
      }
    });
  }

  public updateFilter(): void {
    this.filteredTodos = this.todoService.filterTodos(
      this.serverFilteredTodos, { limit: this.maxResponseLimit, body: this.todoBody, status: this.statusFilter,
       category: this.todoCategory });
  }

  /**
   * Starts an asynchronous operation to update the users list
   *
   */
  ngOnInit(): void {
    this.getTodosFromServer();
  }

  /**
   * When this component is destroyed, we should unsubscribe to any
   * outstanding requests.
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
