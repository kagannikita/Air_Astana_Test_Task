import { UserService } from '../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.formModel.reset();
  }

  onSubmit(): void {
    this.service.register().subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.service.formModel.reset();
          this.toastr.success('Пользователь создан!', 'Регистрация выполнена успешно.');
        } else {
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('Такой логин уже есть', 'Регистрация выполнена с ошибкой.');
                break;

              default:
                this.toastr.error(element.description, 'Регистрация выполнена с ошибкой.');
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
