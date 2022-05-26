import { Component, OnInit } from '@angular/core';
import {WholesalersService} from "../../services/wholesalers/wholesalers.service";
import {ActivatedRoute} from "@angular/router";
import {Wholesaler} from "../../models/wholesaler";
import {MatDialog} from "@angular/material/dialog";
import {
  WholesalerProfileDialogUpdateComponent
} from "./wholesaler-profile-dialog-update/wholesaler-profile-dialog-update.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-wholesaler-profile',
  templateUrl: './wholesaler-profile.component.html',
  styleUrls: ['./wholesaler-profile.component.css']
})
export class WholesalerProfileComponent implements OnInit {
  id:string;
  wholesalerActual: Wholesaler;

  userFormGroup = new FormGroup({
    firstName: new FormControl('',[Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    birthday: new FormControl('',[Validators.required]),
    phone: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    address: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required])
  });

  constructor(private wholesalersService: WholesalersService, private route: ActivatedRoute,
              private dialog: MatDialog, private toastr: ToastrService) {
    this.id=this.route.snapshot.paramMap.get('id')!;
    this.wholesalerActual={} as Wholesaler;
  }

  ngOnInit(): void {
    this.getActualData();
  }

  getActualData():void{
    this.wholesalersService.getById(this.id).subscribe((response:any)=>{
      this.wholesalerActual=response;
      this.userFormGroup.setValue({
        firstName: this.wholesalerActual.firstName ? this.wholesalerActual.firstName : '',
        lastName: this.wholesalerActual.lastName ? this.wholesalerActual.lastName : '',
        birthday: this.wholesalerActual.birthday ? this.wholesalerActual.birthday : '',
        phone: this.wholesalerActual.phone ? this.wholesalerActual.phone : '',
        email: this.wholesalerActual.email ? this.wholesalerActual.email : '',
        address: this.wholesalerActual.address ? this.wholesalerActual.address : '',
        password: this.wholesalerActual.password ? this.wholesalerActual.password : '',
        description: this.wholesalerActual.description ? this.wholesalerActual.description : ''
      });
    })
  }

  openDialog(): void {
    if(this.userFormGroup.valid){
      this.wholesalerActual.firstName = this.userFormGroup.get('firstName')?.value;
      this.wholesalerActual.lastName = this.userFormGroup.get('lastName')?.value;
      this.wholesalerActual.birthday = this.userFormGroup.get('birthday')?.value;
      this.wholesalerActual.phone = this.userFormGroup.get('phone')?.value;
      this.wholesalerActual.email = this.userFormGroup.get('email')?.value;
      this.wholesalerActual.address = this.userFormGroup.get('address')?.value;
      this.wholesalerActual.password = this.userFormGroup.get('password')?.value;
      this.wholesalerActual.description = this.userFormGroup.get('description')?.value;
      const dialogRef=this.dialog.open(WholesalerProfileDialogUpdateComponent,{
        data:{...this.wholesalerActual}
      });

      dialogRef.afterClosed().subscribe(result=>{
        if(result!=undefined){
          this.wholesalersService.update(Number(this.id),this.wholesalerActual).subscribe(response=>{
            this.toastr.success('Information Saved','Success');
            this.getActualData();
          })
        }
      })
    }
    else{
      this.toastr.error('Fix the errors first', 'Error');
    }
  }
}
