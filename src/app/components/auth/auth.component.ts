import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  public loginForm: FormGroup;
  public registerForm: FormGroup;
  public selected: string = 'Login';

  @Output() setUser: EventEmitter<firebase.User> = new EventEmitter();

  constructor(
    private _firebase: AngularFireAuth
  ) {
    this.loginForm = this._createFormGroup();
    this.registerForm = this._createFormGroup();
  }

  public login(): void {
    const formValues = this.loginForm.getRawValue();

    this._firebase.auth
      .signInWithEmailAndPassword(
        formValues.email,
        formValues.password
      )
      .then((response) => {

        this.setUser.emit(
          this._firebase.auth.currentUser
        );
      }, (error) => {
        console.error(error);
        if (error.message) {
          alert( error.message );
        }
      });
  }

  public register(): void {
    const formValues = this.registerForm.getRawValue();

    this._firebase.auth
      .createUserWithEmailAndPassword(
        formValues.email,
        formValues.password
      )
      .then((res) => {
        const user = Object.assign({}, res.user);
        user.displayName = formValues.name;
        this._firebase.auth
          .currentUser.updateProfile(user)
          .then((resp2) => {

            this.setUser.emit(
              this._firebase.auth.currentUser
            );
          }, (error) => {
            console.error(error);
            if (error.message) {
              alert( error.message );
            }
          });

      }, (error) => {
        console.error(error);
        if (error.message) {
          alert( error.message );
        }
      });
  }

  private _createFormGroup(): FormGroup {
    return new FormGroup({
      'name': new FormControl('', []),
      'email': new FormControl('', [ Validators.required ]),
      'password': new FormControl('', [ Validators.required ])
    });
  }

}
