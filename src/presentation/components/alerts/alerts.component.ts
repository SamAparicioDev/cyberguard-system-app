import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { WebSocketService } from '../../../core/infrastructure/services/websocket.service';
import { AlertMessage } from '../../../core/domain/models/alert-message.model';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.css'
})
export class AlertsComponent implements OnInit, OnDestroy {
  private wsService = inject(WebSocketService);
  private subscription?: Subscription;

  alerts: AlertMessage[] = [];
  connected = false;

  ngOnInit(): void {
    this.subscription = this.wsService.getMessages$().subscribe(messages => {
      this.alerts = messages;
    });
    this.connected = this.wsService.isConnected();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  deleteAlert(eventId: string): void {
    this.wsService.deleteMessage(eventId);
  }

  clearAll(): void {
    if (confirm('¿Eliminar todas las alertas?')) {
      this.wsService.clearAll();
    }
  }

  getSeverityClass(severity: string): string {
    const map: any = {
      'low': 'severity-low',
      'medium': 'severity-medium',
      'high': 'severity-high',
      'critical': 'severity-critical'
    };
    return map[severity] || 'severity-low';
  }

  formatDate(timestamp?: number): string {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleString();
  }
}
