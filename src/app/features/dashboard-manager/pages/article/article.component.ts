import {Component, computed, signal, ViewChild} from '@angular/core';
import {PaginationComponent} from '../../../../shared/components/pagination/pagination.component';
import { ArticleService } from '../../../../services/article.service';
import {Article} from '../../../../models/article.model';

@Component({
  selector: 'app-article',
  imports: [
    PaginationComponent
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent {
    constructor(protected articleService: ArticleService) {
    }

    countSignal = signal(0)
    articlesSignal = signal<Article[]>([])

    articles = computed(() => {
        return this.articlesSignal()
    })

    count = computed(() => {
        return this.countSignal()
    })

    @ViewChild(PaginationComponent) pagination: PaginationComponent | undefined;
    async removeArticle(id: string) {
        const resp = confirm("Voulez-vous supprimé cet article ?")
        if(resp) {
            this.articleService.deleteById(id).subscribe({
                next: resp => {
                    this.pagination?.changeEffectCount()
                    this.pagination?.changeEffectList()
                },
                error: err => {
                    alert(err.error.message)
                }
            })
        }
    }
}
