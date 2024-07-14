import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoList } from 'src/app/core/model/todo-list';
import { TodoListService } from 'src/app/core/service/todo-list.service';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit{
  public tasksAFazer: TodoList[] = []; // Lista completa de tarefas
  public tasksAExecutar: TodoList[] = []; // Lista de tarefas a serem executadas (não concluídas)
  public tasksConcluidas: TodoList[] = []; // Lista de tarefas concluidas.
  public formEditTask: string | any;
  public taskList: any;
  public idTarefaa: any;
  faPencil = faPencil;
  faTrash = faTrash;
  finalizadas: boolean | undefined;

  constructor(private todoService: TodoListService) {}

  ngOnInit(): void {
    this.formEditTask = new FormGroup({
      editDescriptionTask: new FormControl('', Validators.required),
    });

    this.loadTasks();
  }

  /**
   * Loads the tasks from the TodoListService and updates the tasksAFazer array.
   * Also calls the updateTasksAExecutar function to update the tasksAExecutar and tasksConcluidas arrays.
   */
  loadTasks(): void {
    // Call the getProducts function from the TodoListService to get the tasks
    this.todoService.getProducts().subscribe({
      // If the call is successful, update the tasksAFazer array with the returned data
      next: (data: TodoList[]) => this.tasksAFazer = data,
      // After the call is complete, call the updateTasksAExecutar function to update the
      // tasksAExecutar and tasksConcluidas arrays
      complete: () => this.updateTasksAExecutar(),
      // If there is an error, log the error message to the console
      error: (error) => console.error('There was an error!', error)
    });
  }

  /**
   * Updates the tasksAExecutar and tasksConcluidas arrays.
   *
   * tasksAExecutar will contain all the tasks that are not concluded (concluida = false)
   * tasksConcluidas will contain all the tasks that are concluded (concluida = true)
   */
  updateTasksAExecutar(): void {
    // Filter the tasks that are not concluded
    this.tasksAExecutar = this.tasksAFazer.filter((task) => !task.concluida);

    // Filter the tasks that are concluded
    this.tasksConcluidas = this.tasksAFazer.filter((task) => task.concluida);
  }

  openModalDelete(id: number): void {
    this.idTarefaa = id;
  }

  /**
   * Deletes a task from the tasksAFazer array and updates the tasksAExecutar and tasksConcluidas arrays.
   *
   * The task is identified by its id. The task is removed from the tasksAFazer array using the filter method.
   * After the task is removed, the updateTasksAExecutar method is called to update the tasksAExecutar and tasksConcluidas arrays.
   * Finally, the page is reloaded to reflect the changes in the UI.
   */
  deleteTask(): void {
    this.todoService.deleteTask(this.idTarefaa).subscribe({
      // If the call is successful, update the tasksAFazer array with the returned data
      next: () => {},
      // After the call is complete, call the updateTasksAExecutar function to update the
      // tasksAExecutar and tasksConcluidas arrays
      complete: () => {
        this.tasksAFazer = this.tasksAFazer.filter((task) => task.id !== this.idTarefaa);
        this.updateTasksAExecutar();
        window.location.reload();
      },
      // If there is an error, log the error message to the console
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }

  /**
   * Marks a task as completed or incomplete.
   *
   * @param {TodoList} todo - The task to be marked as completed or incomplete.
   * @return {void} This function does not return anything.
   */
  markCompleted(todo: TodoList): void {
    // Toggle the completed status of the task
    todo.concluida = !todo.concluida;
  
    // Update the task in the backend
    this.todoService.updateTodo(todo.id, todo).subscribe({
      // If the call is successful, update the tasksAExecutar and tasksConcluidas arrays
      next: () => {},
      // After the call is complete, call the updateTasksAExecutar function to update the
      // tasksAExecutar and tasksConcluidas arrays
      complete: () => {
        this.updateTasksAExecutar();
        window.location.reload();
      },
      // If there is an error, log the error message to the console
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }

  editTask(todo?: TodoList): void {
    this.taskList = todo;
  }

  /**
   * Submits the form for editing a task and updates the task in the backend.
   *
   * @return {void} This function does not return anything.
   */
  onSubmitForm(): void {
    // Get the new description of the task from the form
    let novaDescricao = this.formEditTask.get('editDescriptionTask')?.value;

    // Check if the new description is not empty and is different from the current description
    if (
      novaDescricao &&
      novaDescricao.length > 0 &&
      (novaDescricao !== this.taskList.descricao || novaDescricao !== '')
    ) {
      // Create a new task object with the updated description
      const cadastrarNovaTarefa: TodoList = {
        id: this.taskList.id,
        descricao: novaDescricao,
        concluida: false,
      };

      // Update the task in the backend
      this.todoService.updateTodo(this.taskList.id, cadastrarNovaTarefa).subscribe({
        // If the call is successful, update the tasksAExecutar array and reload the page
        next: () => {},
        complete: () => {
          this.updateTasksAExecutar();
          window.location.reload();
        },
        // If there is an error, log the error message to the console
        error: (error) => {
          console.error('There was an error!', error);
        }
      });
    }
  }
}
