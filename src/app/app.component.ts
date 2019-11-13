import { Component } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  private users:User[];
  private userName:String;
  private userAge:Number;

  constructor(private userService:UserService){}
  
  ngOnInit(){
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers()
      .subscribe((data) =>{
        this.users = data;
      }
      );
  }

  addUser(){
    var user = new User();
    user.name = this.userName;
    user.age = this.userAge;

    this.userService.addUser(user)
  .subscribe((data)=>{
    console.log(data);
    this.getUsers()
  });
  }

  deleteUser(id){
	  this.userService.deleteUser(id)
	  .subscribe((data)=>{
		  console.log(data);
		  this.getUsers();
	  });
  }
  
  updateUser(id){
    var user = new User();
    user.name = this.userName;
    user.age = this.userAge;

    this.userService.updateUser(user, id)
  .subscribe((data)=>{
    console.log(data);
    this.getUsers()
  });
  }


}
