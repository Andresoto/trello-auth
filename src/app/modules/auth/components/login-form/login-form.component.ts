import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faPen, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent {

  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [ Validators.required, Validators.minLength(6)]],
  });
  faPen = faPen;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  status: string = 'init';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  doLogin() {
    this.authService.login('soto@mail.com','changeme')
    .subscribe({
      next: (data) =>{
        console.log(data);
        this.router.navigate(['/app/boards']);
      },
      error: () => {
        console.log('error');
      }
    })
    // if (this.form.valid) {
    //   this.status = 'loading';
    //   const { email, password } = this.form.getRawValue();
    //   // TODO
    // } else {
    //   this.form.markAllAsTouched();
    // }
  }

}
