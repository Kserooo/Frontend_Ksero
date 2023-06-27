import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTransferService } from 'src/app/utils/data-transfer.service';
import { UserTypes } from 'src/app/utils/user-type';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  // Attributes
  id: string;
  userTypes = UserTypes;
  @Input() userType!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataTransferService: DataTransferService
  ) {
    this.id = JSON.parse(localStorage.getItem('user')!).id;

    console.log('Wholesaler navbar with id', this.id);
  }

  ngOnInit(): void {}
  Logout(): void {
    this.router.navigate(['']);
    localStorage.removeItem('user');
  }
}
