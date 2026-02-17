import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ThreatRepository } from '../../domain/ports/threat.repository';
import { ThreatRequest } from '../../domain/models/threat-request.model';
import { ThreatResponse } from '../../domain/models/threat-response.model';

@Injectable({ providedIn: 'root' })
export class ReportThreatUseCase {
  private threatRepository = inject(ThreatRepository);

  execute(threat: ThreatRequest): Observable<ThreatResponse> {
    return this.threatRepository.reportThreat(threat);
  }
}
