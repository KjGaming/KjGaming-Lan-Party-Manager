import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'admin-statistics',
    styles: [require('./statistics.scss')],
    template: require('./statistics.component.html'),
})
export class AdminStatisticsComponent {
    private datasets = [
        {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3]
        }
    ];

    private labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];

    private options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

}
