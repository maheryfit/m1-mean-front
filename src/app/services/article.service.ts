import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Article } from '../models/article.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
    http=inject(HttpClient)
    API_URL: string = `${environment.API_URL}`

    getAll(){
          return this.http.get<Article[]>(`${environment.API_URL}/articles`);
    }

    deleteById(id: string) {
        return this.http.delete<any>(`${this.API_URL}/articles/${id}`)
    }

    getAllPaginate(index:number, pageLimit: number){
        return this.http.get<Article[]>(`${this.API_URL}/articles/${index}/${pageLimit}`);
    }

    getCount(){
        return this.http.get<number>(`${this.API_URL}/articles/count`);
    }
}
