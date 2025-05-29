import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

const COMPONENTS = [
  CommonModule,
  ReactiveFormsModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  RouterModule,
];

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [...COMPONENTS],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class Login implements OnInit {
  loginForm: FormGroup;
  loading = false;
  particles: Array<{ style: string }> = [];

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.createParticles();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      const { email, password } = this.loginForm.value;

      signInWithEmailAndPassword(this.auth, email, password)
        .then(() => {
          this.router.navigate(['/dashboard']);
        })
        .catch((error) => {
          console.error('Login error:', error);
          // Aqui você pode adicionar tratamento de erros específicos
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }

  private createParticles(): void {
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        style: `
          top: ${Math.random() * 100}%;
          left: ${Math.random() * 100}%;
          width: ${Math.random() * 10 + 2}px;
          height: ${Math.random() * 10 + 2}px;
          opacity: ${Math.random() * 0.5 + 0.1};
          animation-delay: ${Math.random() * 5}s;
        `,
      });
    }
  }
}
