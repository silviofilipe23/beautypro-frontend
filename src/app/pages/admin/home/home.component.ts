import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexNonAxisChartSeries,
  ApexChart,
  ApexResponsive,
  ApexTitleSubtitle,
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexPlotOptions,
  ApexXAxis,
  ApexGrid,
  ApexStroke,
} from 'ng-apexcharts';
import { ServiceService } from 'src/app/services/service/service.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  title: ApexTitleSubtitle;
};

export type ChartOptionsBar = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

export type ChartOptionsPrice = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  responsive: ApexResponsive[];
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

export type ChartOptionsDaily = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  @ViewChild('chart1') chart1: ChartComponent;
  @ViewChild('chart2') chart2: ChartComponent;
  @ViewChild('chart3') chart3: ChartComponent;

  public chartOptions: Partial<ChartOptions>;
  public chartOptions2: Partial<ChartOptionsBar>;
  public chartOptionsPrice: Partial<ChartOptionsPrice>;
  public chartOptionsDaily: Partial<ChartOptionsDaily>;

  constructor(private service: ServiceService) {
    this.chartOptions = {
      series: [1, 1, 1],
      chart: {
        type: 'donut',
      },
      title: {
        text: 'Agendamentos no mês atual',
      },
      labels: ['ABERTO', 'CANCELADO', 'FINALIZADO'],
      responsive: [
        {
          breakpoint: 769,
          options: {
            chart: {
              width: 380,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };

    this.chartOptions2 = {
      series: [
        {
          name: 'quantidade',
          data: [],
        },
      ],
      chart: {
        type: 'bar',
        zoom: {
          enabled: false,
        },
      },
      title: {
        text: 'Procedimentos realizados no mês atual',
      },
      xaxis: {
        categories: [],
      },
      responsive: [
        {
          breakpoint: 769,
          options: {
            chart: {
              width: 380,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };

    this.chartOptionsPrice = {
      series: [
        {
          name: 'Valor R$',
          data: [],
        },
      ],
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: 'Faturamento mensal',
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [],
      },
      responsive: [
        {
          breakpoint: 769,
          options: {
            chart: {
              width: 380,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };

    this.chartOptionsDaily = {
      series: [
        {
          name: 'quantidade',
          data: [1, 2, 3, 1, 2, 3],
        },
      ],
      chart: {
        type: 'bar',
      },
      title: {
        text: 'Atendimentos diários realizados no mês atual',
      },
      xaxis: {
        categories: [1, 2, 3, 4, 5, 6],
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 150,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }

  ngOnInit(): void {
    this.getPriceChart();
    this.getServiceChart();
    this.getServicingChart();
    this.getDailyChart();
  }

  getServiceChart() {
    this.service.chartServices().subscribe({
      next: (response) => {
        this.createObjectDonutChart(response.body);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  createObjectDonutChart(response: any[]) {
    let series = [];
    let labels = [];

    response.forEach((element) => {
      series.push(element.count);
      labels.push(element.status);
    });

    this.chartOptions.labels = labels;
    this.chartOptions.series = series;

    this.chart.updateOptions(this.chartOptions);
  }

  getServicingChart() {
    this.service.chartServicings().subscribe({
      next: (response) => {
        this.createObjectServicingChart(response.body);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  createObjectServicingChart(response: any[]) {
    let series = [];
    let categories = [];

    response.forEach((element) => {
      series.push(element.count);
      categories.push(element.description);
    });

    this.chartOptions2.series[0].data = series;
    this.chartOptions2.xaxis.categories = categories;

    this.chart1.updateOptions(this.chartOptions2);
  }

  getPriceChart() {
    this.service.chartPrice().subscribe({
      next: (response) => {
        this.createObjectPriceChart(response.body);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  createObjectPriceChart(response: any[]) {
    let series = [];
    let categories = [];

    response.forEach((element) => {
      series.push(element.totalSum);
      categories.push(this.getLabelMonth(element.month));
    });

    this.chartOptionsPrice.series[0].data = series;
    this.chartOptionsPrice.xaxis.categories = categories;

    this.chart2.updateOptions(this.chartOptionsPrice);
  }

  getLabelMonth(element) {
    console.log(element);

    let retVal = '';

    switch (element) {
      case 1:
        retVal = 'Jan';
        break;
      case 2:
        retVal = 'Fev';
        break;
      case 3:
        retVal = 'Mar';
        break;
      case 4:
        retVal = 'Abr';
        break;
      case 5:
        retVal = 'Mai';
        break;
      case 6:
        retVal = 'Jun';
        break;
      case 7:
        retVal = 'Jul';
        break;
      case 8:
        retVal = 'Ago';
        break;
      case 9:
        retVal = 'Set';
        break;
      case 10:
        retVal = 'Out';
        break;
      case 11:
        retVal = 'Nov';
        break;
      case 12:
        retVal = 'Dec';
        break;
    }

    return retVal;
  }

  getDailyChart() {
    this.service.chartDaily().subscribe({
      next: (response) => {
        this.createObjectDailyChart(response.body);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  createObjectDailyChart(response: any[]) {
    let series = [];
    let categories = [];

    response.forEach((element) => {
      series.push(element.count);
      categories.push(element.day);
    });

    this.chartOptionsDaily.series[0].data = series;
    this.chartOptionsDaily.xaxis.categories = categories;

    this.chart3.updateOptions(this.chartOptionsDaily);
  }
}
