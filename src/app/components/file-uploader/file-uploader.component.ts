import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FileUploadService } from '../../services/fileupload.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {

  // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file!: File; // Variable to store file

  // Inject service 
  constructor(private fileUploadService: FileUploadService) { }
  @Output() newFileUploadedEvent = new EventEmitter<string>();
  ngOnInit(): void {
  }

  // On file Select
  onChange(event: any) {
    this.file = event.target.files[0];

    this.upload()
  }

  // OnClick of button Upload
  upload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.fileUploadService.upload(this.file).subscribe(
      (response: any) => {
        console.log(response)
        if (typeof (event) === 'object') {
          this.newFileUploadedEvent.emit(response.uploadedFilePath);

          this.loading = false; // Flag variable 
        }
      }
    );
  }
}
