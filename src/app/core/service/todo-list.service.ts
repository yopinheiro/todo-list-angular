import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { NewTask, TodoList } from '../model/todo-list';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  private apiUrl = 'http://localhost:3000/tarefas'; // URL do seu servidor JSON

  constructor(private http: HttpClient) {}

  /**
   * Retrieves the list of todo items from the server.
   *
   * @return {Observable<TodoList[]>} An observable that emits an array of todo items.
   * If an error occurs, the observable will emit an error.
   */
  getProducts(): Observable<TodoList[]> {
    // Send a GET request to the server API endpoint.
    // The response is expected to be an array of todo items.
    return this.http.get<TodoList[]>(this.apiUrl)
      // If an error occurs during the HTTP request, call the handleError method.
      .pipe(
        catchError(this.handleError)
      );
  }

/**
   * Adds a new task to the list.
   *
   * @param task The task to be added.
   * @return An observable of the added task.
   */
  addTask(task: NewTask): Observable<NewTask> {
    return this.http.post<NewTask>(this.apiUrl, task);
  }

  /**
   * Deletes a task from the list.
   *
   * @param id The ID of the task to be deleted.
   * @return An observable that emits void when the task is deleted.
   * If an error occurs, the observable will emit an error.
   */
  deleteTask(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    // Send a DELETE request to the server API endpoint.
    // The response is expected to be void.
    return this.http.delete<void>(url).pipe(
      // If an error occurs during the HTTP request, call the handleError method.
      catchError(this.handleError)
    );
  }

  /**
   * Updates an existing task.
   *
   * @param {number} todoId - The ID of the task to be updated.
   * @param {any} updatedTodo - The updated task data.
   * @return {Observable<any>} An observable that emits the updated task.
   * If an error occurs, the observable will emit an error.
   */
  updateTodo(todoId: number, updatedTodo: any): Observable<any> {
    // Construct the URL for the patch request.
    const url = `${this.apiUrl}/${todoId}`;
    
    // Send a PATCH request to the server API endpoint.
    // The response is expected to be the updated task.
    return this.http.patch(url, updatedTodo).pipe(
      // If an error occurs during the HTTP request, call the handleError method.
      catchError(this.handleError)
    );
  }

  /**
   * Returns a random integer between min (inclusive) and max (inclusive).
   *
   * @param {number} min - The minimum value of the range.
   * @param {number} max - The maximum value of the range.
   * @return {number} A random integer.
   */
  getRandomInt(min: number, max: number): number {
    // Ensure min is an integer greater than or equal to 0.
    min = Math.ceil(min);
    // Ensure max is an integer greater than or equal to min.
    max = Math.floor(max);
    // Generate a random integer between min and max (inclusive).
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Handles HTTP errors by throwing the error.
   * This method can be overridden to add additional error handling logic.
   *
   * @param {HttpErrorResponse} error - The HTTP error response object.
   * @return {Observable<never>} An observable that emits an error.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    // Add any additional error handling logic here.
    // For example, you can log the error or display an error message to the user.

    // Throw the error to indicate that an error occurred.
    return throwError(error);
  }
}
