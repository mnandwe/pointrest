import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private accountService: AccountService,
  ) { }

  ngOnInit(): void {
      this.form = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

  }

  // convenience getter for easy access to form fields
  get f(): any { return this.form.controls; }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    this.accountService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
                // console.log('success');
                this.error = 'Success';
                this.router.navigate([''], { relativeTo: this.route });
            },
            error => {
                this.loading = false;
                // TODO: make the errors better
                this.error = JSON.stringify(error);
            });
  }
}

