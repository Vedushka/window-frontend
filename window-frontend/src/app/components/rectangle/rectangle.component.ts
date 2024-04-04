import { Component, OnInit } from '@angular/core';
import { WindowService, Window } from '../../services/window.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rectangle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rectangle.component.html',
  styleUrl: './rectangle.component.scss'
})
export class RectangleComponent implements OnInit {
Math: any;

  constructor(private windowService: WindowService){}
  mousePressed: boolean = false;
  left = 300;
  top = 300;
  width = 0;
  height = 0;
  mouseX = 0;
  mouseY = 0;
  mousePressedLeft = false;
  mousePressedTop = false;
  mouseDown(event : MouseEvent){
    this.mouseX = event.x;
    this.mouseY = event.y;
    if(event.x > this.left + this.width/2) this.mousePressedLeft = true;
    else this.mousePressedLeft = false;
    
    if(event.y > this.top + this.height/2) this.mousePressedTop = true;
    else this.mousePressedTop = false;
    
    this.mousePressed = true;
    console.dir(event);
  }
  mouseUp(event : MouseEvent){
    this.mousePressed = false;
    let window : Window =   { width: Math.ceil(this.width), height: Math.ceil(this.height)}
    this.windowService.updateWindow(window).subscribe({
      next: response =>{},    
      error(err) {
        console.error(err);
      },});
  }
  mouseMove(event : MouseEvent){
    if(this.mousePressed){
      
      if(this.mousePressedLeft){
        this.width =  event.x - this.left;
      }
      else{
        this.left -=  this.mouseX - event.x;
        this.width +=  this.mouseX - event.x;
        this.mouseX = event.x;
      };
      if(this.mousePressedTop){
        this.height =  event.y - this.top;
      }
      else{
        this.top -=  this.mouseY - event.y;
        this.height +=  this.mouseY - event.y;
        this.mouseY = event.y;
      }
    }
  }
ngOnInit(){
  this.windowService.getWindow().subscribe({
    next: response =>{
      this.width = response.width;
      this.height = response.height;
      this.left = window.innerWidth * 0.9 / 2 - this.width / 2; 
      this.top = window.innerHeight * 0.9 / 2 - this.height / 2;
    },
    error(err) {
      console.error(err);
    },
  })
}
}
