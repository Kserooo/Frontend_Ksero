import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  // Attributes
  id:string;

  constructor(private route:ActivatedRoute, private router: Router) {
    this.id=this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
  }
  Logout(): void{
    this.router.navigate(['']);
    localStorage.setItem('token','');
  }

}
