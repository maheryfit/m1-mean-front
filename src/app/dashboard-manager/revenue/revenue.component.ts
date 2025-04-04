import {Component, OnInit} from '@angular/core';
import {RevenuService} from '../../services/revenu.service';
import { Chart } from 'chart.js';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
@Component({
  selector: 'app-revenue',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './revenue.component.html',
  styleUrl: './revenue.component.css'
})
export class RevenueComponent implements OnInit {

    chartRevenue: any = []
    chartBenefice: any = []
    yearFormRevenue = new FormGroup({
        year: new FormControl(new Date().getFullYear(), Validators.required)
    })

    yearFormBenefice = new FormGroup({
        year: new FormControl(new Date().getFullYear(), Validators.required)
    })
    years : Array<Number> = []

    constructor(private revenueService: RevenuService) {
    }
    async ngOnInit(): Promise<void> {
        for(let i = 2010; i <= new Date().getFullYear(); i++) {
            this.years.push(i)
        }
        await this.integrateGraphRevenueAnnuel()
        await this.integrateGraphBeneficeAnnuel()
    }

    reloadCanvasRevenue() {
        this.chartRevenue.destroy()
    }

    reloadCanvasBenefice() {
        this.chartBenefice.destroy()
    }

    async getRevenueFromYearForm() {
        this.reloadCanvasRevenue()
        await this.integrateGraphRevenueAnnuel(this.yearFormRevenue.value.year ? this.yearFormRevenue.value.year : new Date().getFullYear())
    }

    async getBeneficeFromYearForm() {
        this.reloadCanvasBenefice()
        await this.integrateGraphBeneficeAnnuel(this.yearFormBenefice.value.year ? this.yearFormBenefice.value.year : new Date().getFullYear())
    }

    async integrateGraphRevenueAnnuel(year: Number = new Date().getFullYear()) {
        const revenueAnnuel = await this.revenueService.getRevenueAnnuel(year)
        this.chartRevenue = this.createGraph("canvasRevenue",revenueAnnuel, `Total chiffre d'affaires de l'année ${year}`)
    }

    async integrateGraphBeneficeAnnuel(year: Number = new Date().getFullYear()) {
        const beneficeAnnuel = await this.revenueService.getBeneficeAnnuel(year)
        this.chartBenefice = this.createGraph("canvasBenefice", beneficeAnnuel, `Total bénéfice de l'année ${year}`)
    }

    createGraph(chartId: string, data: any, label: string) {
        const colors = this._generateRandomlyColors(Object.keys(data).length)
        return new Chart(chartId, {
            type: "line",
            data: {
                labels: Object.keys(data),
                datasets: [{
                        label: label,
                        data: Object.values(data),
                        borderWidth: 1,
                        backgroundColor: colors[1],
                        borderColor: colors[0],
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    }
                }
            }
        })
    }

    _generateRandomlyColors(number: number) {
        const borderColors = []
        const backgroundColors = []
        for (let i = 0; i < number; i++) {
            const r = this._getRandomIntInclusive(0, 255)
            const g = this._getRandomIntInclusive(0, 255)
            const b = this._getRandomIntInclusive(0, 255)
            borderColors.push(`rgba(${r}, ${g}, ${b}, 1)`)
            backgroundColors.push(`rgba(${r}, ${g}, ${b}, 0.2)`)
        }
        return [borderColors, backgroundColors]
    }

    _getRandomIntInclusive(min:number, max: number) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
    }

}
