import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCardComponent } from './todo-card.component';

describe('TodoCardComponent', () => {
  let component: TodoCardComponent;
  let fixture: ComponentFixture<TodoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('allows the checkbox to be clicked', () => {
    component.clicked();
    expect(component).toBeTruthy();
  });

  it('should emit an event on deletion', () => {

    spyOn(component.deleteTodo, 'emit');
    component.delete();
    expect(component.deleteTodo.emit).toHaveBeenCalled();
  });
});
