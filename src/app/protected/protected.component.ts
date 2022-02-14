import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css']
})

export class ProtectedComponent implements OnInit {
  message!: string;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(environment.url_protected).subscribe(
      (response: any) => {
        console.log(response)
        this.message = response.message
      }, 
      (error: any) => {
        console.log(error)
        error.status === 401 ? this.message = error.statusText: this.message = error.message
      },
      () => {
        console.log('done')
      }
    )


  }
}
