import { Component, OnInit } from '@angular/core';
import { FlightScheduleService } from '../shared/flight-schedule.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styles: [
  ]
})
export class AdminPanelComponent implements OnInit {

  constructor(public service: FlightScheduleService,
              public toastr: ToastrService,
              public router: Router) { }

  ngOnInit(): void {
    this.resetForm();
  }



  resetForm(form?: NgForm): void {
    if (form != null) {
      form.form.reset();
    }
    this.service.formData = {
      FSId: 0,
      StartCity: '',
      EndCity: '',
      StartDate: '',
      EndDate: '',
     Delay: null,
    };
  }

  onSubmit(form: NgForm): void {
    if (this.service.formData.FSId === 0) {
      this.insertRecord(form);
    }
    else {
      this.updateRecord(form);
    }
  }

  insertRecord(form: NgForm): void {
    this.service.postFlightSchedule().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Добавление прошло успешно', 'Air Astana');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    );
  }
  updateRecord(form: NgForm): void {
    this.service.putFlightSchedule().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Данные изменены', 'Air Astana');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    );
  }

}
