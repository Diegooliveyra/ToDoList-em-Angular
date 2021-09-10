import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Todo } from 'src/models/todo.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public todos: Todo[] = [];
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: [
        '',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(60),
          Validators.required,
        ]),
      ],
    });
    this.load();
  }

  add() {
    const title = this.form.controls['title'].value;
    const id = new Date().getTime();

    this.todos.push(new Todo(id, title, false));
    this.clear();
    this.save();
  }

  clear() {
    this.form.reset();
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
    this.save();
  }

  markAsDone(todo: Todo) {
    todo.done = true;
    this.save();
  }

  markAsUndone(todo: Todo) {
    todo.done = false;
    this.save();
  }

  save() {
    localStorage.setItem('todo', JSON.stringify(this.todos));
  }

  load() {
    const data = localStorage.getItem('todo') || '';
    if (data.length != 0) {
      this.todos = JSON.parse(data);
    }
  }
}
