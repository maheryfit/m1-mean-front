import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Article } from '../models/article.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  http=inject(HttpClient)
  getAll(){
    return this.http.get<Article[]>(`${environment.API_URL}/articles`);
  }
}
