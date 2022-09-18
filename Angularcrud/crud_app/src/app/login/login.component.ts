import { HttpClient } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup} from "@angular/forms";
import { Router } from "@angular/router";
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public loginForm!: FormGroup
    constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: [''],
            password: ['']
        })
    }
    login() {
        this.http.get<any>("https://localhost:3000/signupUsers/")
            .subscribe({
                next: (res) => {
                    const user = res.find((a: any) => {
                        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
                    })
                    if (user) {
                        alert("Login Sucess!!");
                        this.loginForm.reset();
                        this.router.navigate(['dashboard'])
                    } else {
                        alert("user not found!!");
                    }
                },
                error: (err) => {
                    alert("Something went wrong!!")
                }
            })
    }

}