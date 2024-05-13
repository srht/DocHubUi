import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Document } from '../models/document';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private httpClient: HttpClient) { }

  GetDocuments(): Observable<Document[]> {

    let newPath = environment.apiEndpoint + "documents";
    return this.httpClient.get<Document[]>(newPath);
  }

  GetDocumentById(id: string): Observable<Document> {
    let newPath = environment.apiEndpoint + "documents/" + id
    return this.httpClient.get<Document>(newPath);
  }
}
