import { Component, OnInit } from '@angular/core';
import { Nav } from '../nav/nav';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  constructor(private formBuilder: FormBuilder) {}
  form!: FormGroup;
  ngOnInit() {
    this.form = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  protected onSubmit() {
    console.log('submitted', this.form.value);
  }
}
