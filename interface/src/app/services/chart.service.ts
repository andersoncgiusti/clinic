import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Chart } from '../models/chart.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private prontuarios: Chart[] = [];
  private prontuariosUpdated = new Subject<Chart[]>();

  constructor(private http: HttpClient) { }

  getCharts() {
    this.http.get<{ message: string, prontuario: Chart[]}>(environment.apiUrl + '/api/prontuario')
    .subscribe((prontuarioData) => {
      this.prontuarios = prontuarioData.prontuario;
      this.prontuariosUpdated.next([...this.prontuarios]);
    });
  }

  getChartUpdated() {
    return this.prontuariosUpdated.asObservable();
  }

  addChart(
    // id: String,
    chartDescription: String
  ) {

    const prontuario: Chart = {
      id: null,
      chartDescription: chartDescription
    };

    this.http.post<{ message: string }>(environment.apiUrl + '/api/prontuario', prontuario)
    .subscribe((prontuarioData) => {
      // console.log(prontuarioData);
      // console.log(prontuarioData.message);
      this.prontuarios.push(prontuario);
      this.prontuariosUpdated.next([...this.prontuarios]);
    });
  }

  deleteChart(chartId: String) {
    this.http.delete(environment.apiUrl + '/api/prontuario/' + chartId)
    .subscribe(() => {
      const updatedChart = this.prontuarios.filter(p => p.id !== chartId);
      this.prontuarios = updatedChart;
      this.prontuariosUpdated.next([...this.prontuarios]);
    });
  }

}
