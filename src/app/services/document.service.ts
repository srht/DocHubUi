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

    let newPath = environment.apiEndpoint + "documents/list";
    return this.httpClient.get<Document[]>(newPath);
  }

  Search(keyword: string): Observable<Document[]> {

    let newPath = environment.apiEndpoint + "documents/list?q=" + keyword;
    return this.httpClient.get<Document[]>(newPath);
  }

  GetDocumentById(id: string): Observable<Document> {
    let newPath = environment.apiEndpoint + "documents/" + id
    return this.httpClient.get<Document>(newPath);
  }

  DeleteDocumentById(id: string) {
    let newPath = environment.apiEndpoint + "documents/" + id
    this.httpClient.delete<Document>(newPath).subscribe(res => console.log(res));
  }

  CreateDocument(document: Document) {
    let newPath = environment.apiEndpoint + "documents/"
    this.httpClient.post(newPath, document).subscribe(res => console.log(res))
  }

  UpdateDocument(document: Document) {
    let newPath = environment.apiEndpoint + `documents/${document.id}`
    this.httpClient.put(newPath, document).subscribe(res => console.log(res))
  }
}
