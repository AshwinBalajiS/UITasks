import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder } from "@angular/forms"

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    
    public signupForm!: FormGroup;
    constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

    ngOnInit(): void {
        this.signupForm = this.formBuilder.group({
            Name: [''],
            MobileNumber: [''],
            Emailddress: [''],
            password: ['']

        })
    }
    signup() {
        this.http.post<any>("https://localhost:3000/signupUsers", this.signupForm.value)
            .subscribe({
                next: () => {
                    alert("Sign Up successful")
                    this.signupForm.reset()
                    this.router.navigate(['login'])
                },
                error: (err) => {
                    alert("Something went wrong")
                }
            })
    }
}