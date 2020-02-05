import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import{debounceTime,distinctUntilChanged} from'rxjs/operators';

@Component({
  selector: 'hello',
  template: `<h2>Todo</h2>
        <div>
            <input type="text" placeholder="filter tasks" [formControl]="serchControl">
        <br>
    <span>{{remainCount}} remaining </span>
 
    <ul class="unstyled">
    <ng-container *ngFor="let todo of todos" >
      <li *ngIf="isContainsSearchinText(todo.text)" >
        <input   type="checkbox" [checked]="todo.done" (change)="toggleCheckbox(todo.id)" >
        <span [ngClass]="{'done-true': todo.done}">{{todo.text}}</span>
        <button (click)="removeOneElementTodo(todo.id)">remove</button>
      </li>
      </ng-container>
    </ul>
    
    <form>
      <input type="text" [formControl]="todoControl">
      <input class="btn-primary" type="submit" value="add" (click)="addNewTodoItem()">
    </form>
      <a href="" (click)="allClear($event)">clean</a> 
  </div>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent  {
  name:string;
  todos=[];
  todoControl=new FormControl('');
  serchControl=new FormControl('');
  todosStore=[];
  constructor() {
  
  }
    ngOnInit(): void {
      this.todos = [
      {id:0, text:'learn angular', done:true},
      {id:1,text:'build an angular app', done:false},
      {id:2,text:'modify', done:true},
      {id:3,text:'test', done:false},
      {id:4,text:'close', done:false}
      ];
      // this.todoControl.valueChanges.pipe(
             
      // ).subscribe((value)=>console.log(value));
      this.serchControl.valueChanges.pipe(
        debounceTime(50),
        distinctUntilChanged(),
      )
      .subscribe((value)=>(value))
  }
  toggleCheckbox(idd){
let oneElem=this.todos.find(({id})=>id===idd);
oneElem.done=!oneElem.done;
  }
  removeOneElementTodo(idd){
  this.todos=this.todos.filter(elem=>elem.id!==idd);
  }
 get remainCount(){
    return this.todos.filter(elem=>!elem.done).length
  }
  allClear(event){
        this.todos=[];
event.preventDefault();
  }
addNewTodoItem(){
  const newElem={id:Date.now(),text:this.todoControl.value ,done:false}
  this.todos=[...this.todos,newElem]
  this.todoControl.reset('');
}

isContainsSearchinText(text){
  return text.includes(this.serchControl.value)
}


}
