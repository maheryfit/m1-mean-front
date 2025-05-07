import {Component, Input, signal, WritableSignal} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() menuItems:WritableSignal<{lien:string,icon:string,active:string,label:string}[]>=signal([]);
  activeMenuIndex=signal(0);
  constructor() {
    if(sessionStorage.getItem("menuIndex")===null){
      sessionStorage.setItem("menuIndex","0");
    }
    this.activeMenuIndex.set(Number(sessionStorage.getItem("menuIndex")));
  }
  navigateMenu(index:number){
    this.activeMenuIndex.set(index);
    sessionStorage.setItem("menuIndex",index.toString());
  }
}
