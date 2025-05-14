import {Component, computed, effect, Input, signal, WritableSignal} from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
    @Input() count: WritableSignal<number>=signal(0);
    previousIndex=computed(()=>this.currentIndex()-1);
    currentIndex=signal(1);
    nextIndex=computed(()=>this.currentIndex()+1);
    pageLimit=5;
    @Input() getAllPaginate: any
    @Input() getCount: any
    @Input() list: WritableSignal<any[]>=signal<any[]>([]);

    changeEffectList() {
        this.getAllPaginate(this.currentIndex(), this.pageLimit).subscribe({
            next: (data: any)=>{
                this.list.set(data)
            },
            error: (error: any)=>{
                alert(error.error.message)
            }
        })
    }

    changeEffectCount() {
        this.getCount().subscribe({
            next: (data: any)=>{
                this.count.set(data)
            },
            error: (error: any)=>{
                alert(error)
            }
        })
    }

    constructor(){
        effect(() => {
            this.changeEffectList();
            this.changeEffectCount();
        });
    }
    changePage(index:number){
        if(index<=0){
            return;
        }
        if(this.count()-((index-1)*this.pageLimit)<=0){
            return;
        }
        this.currentIndex.set(index);
    }
}
