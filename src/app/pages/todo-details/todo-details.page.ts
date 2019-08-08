import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from './../../services/todo.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class TodoDetailsPage implements OnInit {

  todo: Todo = {
    nickname: '',
    name: '',
    lastname: '',
    phone: null,
    address: '',
    createdAt: new Date().getTime(),
  };
 
  todoId = null;

  constructor(private route: ActivatedRoute, private nav: NavController, private todoService: TodoService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.todoId = this.route.snapshot.params['id'];
    if (this.todoId)  {
      this.loadTodo();
    }
  }

  async loadTodo() {
    const loading = await this.loadingController.create({
      message: 'Loading Todo..'
    });
    await loading.present();
 
    this.todoService.getTodo(this.todoId).subscribe(res => {
      loading.dismiss();
      this.todo = res;
    });
  }

  async saveTodo() {
 
    const loading = await this.loadingController.create({
      message: 'Saving Todo..'
    });
    await loading.present();
 
    if (this.todoId) {
      this.todoService.updateTodo(this.todo, this.todoId).then(() => {
        loading.dismiss();
        this.nav.navigateBack('home');
      });
    } else {
      this.todoService.addTodo(this.todo).then(() => {
        loading.dismiss();
        this.nav.navigateBack('home');
      });
    }
  }
}
