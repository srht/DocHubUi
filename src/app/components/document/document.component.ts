import { Component } from '@angular/core';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-document',
  standalone: true,
  imports: [],
  templateUrl: './document.component.html',
  styleUrl: './document.component.css'
})
export class DocumentComponent  {
constructor(private documentService:DocumentService){
  this.getDocuments()
}


getDocuments(){
  this.documentService.GetDocuments().subscribe(res=>console.log(res))
}
}
