import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewTask } from 'src/app/core/model/todo-list';
import { TodoListService } from 'src/app/core/service/todo-list.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  public formAddNewTask: string | any;
  public taskList: any[] = [];

  constructor(private todoService: TodoListService) {}

  ngOnInit(): void {
    this.formAddNewTask = new FormGroup({
      newtask: new FormControl('', Validators.required),
    });
  }

   /**
   * Submit the form with a new task and add it to the task list.
   */
   onSubmitForm(): void {
    let descricao = this.formAddNewTask.get('newtask')?.value;
    const cadastrarNovaTarefa: NewTask = {
      id: this.todoService.getRandomInt(1, 1000),
      descricao: descricao,
      concluida: false,
    };

    this.todoService.addTask(cadastrarNovaTarefa).subscribe({
      next: (task) => {
        this.taskList.push(task);
      },
      complete: () => {
        this.formAddNewTask.reset();
        window.location.reload();
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }
}
