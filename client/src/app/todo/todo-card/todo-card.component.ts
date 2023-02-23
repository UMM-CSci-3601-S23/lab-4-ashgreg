import { Component, Input } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent {
  @Input() todo: Todo;

  constructor(private todoService: TodoService) {
  }

  clicked(): void {

  }

  delete(): void {
    this.todoService.deleteTodo(this.todo);
  }
}
