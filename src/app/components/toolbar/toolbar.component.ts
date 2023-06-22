import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTransferService } from 'src/app/utils/data-transfer.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  // Attributes
  id:string;

  constructor(
    private route:ActivatedRoute,
    private router: Router,
    private dataTransferService: DataTransferService
    ) {
    this.id=this.dataTransferService.userId;
    console.log("Wholesaler navbar with id", this.id);
  }

  ngOnInit(): void {
  }
  Logout(): void{
    this.router.navigate(['']);
    localStorage.setItem('token','');
  }

}
