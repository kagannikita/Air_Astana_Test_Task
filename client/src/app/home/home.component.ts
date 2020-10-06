import {Component,  OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FlightSchedule } from '../shared/flight-schedule.model';
import { FlightScheduleService } from '../shared/flight-schedule.service';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../shared/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],

})

export class HomeComponent implements OnInit {
  constructor(public router: Router, public service: FlightScheduleService, public toastr: ToastrService, public role: UserService) {
  }
  userDetails;

  ngOnInit(): void {
    this.role.getUserProfile().subscribe(
      res => {
        this.userDetails = res;
      },
      err => {
        console.log(err);
      },
    );
    this.service.refreshList();
  }

  onLogout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
  populateForm(pd: FlightSchedule): void {
    this.service.formData = Object.assign({}, pd);
  }

  onDelete(FSId): void {
    if (confirm('Вы хотите удалить эту запись?')) {
      this.service.deleteFlightSchedule(FSId)
        .subscribe(res => {
            this.service.refreshList();
            this.toastr.warning('Удаление прошло успешно', 'Air Astana');
          },
          err => {
            console.log(err);
          });
    }
  }

}
