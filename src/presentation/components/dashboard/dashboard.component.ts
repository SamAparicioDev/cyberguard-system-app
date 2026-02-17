import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/infrastructure/services/auth.service';
import { ThreatService } from '../../../core/infrastructure/services/threat.service';
import { ThreatType } from '../../../core/domain/models/threat-type.enum';
import { ThreatSeverity } from '../../../core/domain/models/threat-severity.enum';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private threatService = inject(ThreatService);

  user = this.authService.getCurrentUser();

  threatTypes = Object.values(ThreatType);
  severityLevels = Object.values(ThreatSeverity);

  threatForm = this.fb.group({
    type: [ThreatType.MALWARE, Validators.required],
    severity: [ThreatSeverity.MEDIUM, Validators.required],
    sourceIp: ['', [Validators.required, this.ipValidator]],
    targetIp: ['', [this.ipValidator]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
  });

  loading = false;
  success = '';
  error = '';

  ipValidator(control: any) {
    if (!control.value) return null;
    const ipv4 = /^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/;
    return ipv4.test(control.value) ? null : { ip: true };
  }

  onSubmit(): void {
    if (this.threatForm.invalid) return;

    this.loading = true;
    this.error = '';
    this.success = '';

    const threat = this.threatForm.value as any;

    this.threatService.reportThreat(threat).subscribe({
      next: (response) => {
        this.loading = false;
        this.success = `Amenaza reportada exitosamente. ID: ${response.threatId}`;
        this.threatForm.reset({
          type: ThreatType.MALWARE,
          severity: ThreatSeverity.MEDIUM
        });
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.error || err.error?.message || 'Error al reportar amenaza';
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/autenticacion']);
  }
}
