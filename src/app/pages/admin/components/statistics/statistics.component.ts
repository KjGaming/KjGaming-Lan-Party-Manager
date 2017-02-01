import {Component, OnInit} from '@angular/core';
import {BaUserService} from "../../../../theme/services/baUser/baUser.service";

@Component({
    selector: 'admin-statistics',
    styles: [require('./statistics.scss')],
    template: require('./statistics.component.html'),
})
export class AdminStatisticsComponent implements OnInit {
    // User registration
    public userRegLabels: string[] = ['Anmeldungen', 'Noch frei'];
    public userRegData: number[] = [1, 1];

    // User registration
    public packetLabels: string[] = ['Sparpaket', 'Komplettpaket', 'Individuelles Paket'];
    public packetData: number[] = [1, 1, 1];

    public vegiLabels: string[] = ['Ja', 'Nein'];
    public vegiData: number[] = [1, 1];

    public barChartOptions: any = {
        scaleShowVerticalLines: true,
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    public barChartLabels: string[] = ['Do Abendessen', 'Fr Frühstück', 'Fr Mittagessen',
        'Fr Abendessen',
        'Sa Frühstück',
        'Sa Mittagessen',
        'Sa Abendessen',
        'So Frühstück'];

    public barChartType: string = 'bar';
    public barChartLegend: boolean = false;

    public barChartData:any[] = [{data: [65, 59, 80, 81, 56, 55, 50, 80], label: 'User'}];


    public doughnutChartType: string = 'doughnut';
    public doughnutChartOptions: any = {
        responsive: true,
        legend: {
            display: false
        }
    };

    constructor(private _userService: BaUserService) {

    }

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    ngOnInit() {
        this.getAllUsers();

    }

    getAllUsers() {
        this._userService.getUserMemberlist().subscribe(
            // the first argument is a function which runs on success
            data => {
                let registerCap = 50;
                let registerUser: number = 0;

                let vegi = {
                    "yes": 0,
                    "no": 0
                };

                let lanPacket = {
                    "null": 0,
                    "eins": 0,
                    "zwei": 0,
                };
                for (let user of data.obj) {
                    //How many user ar register
                    if (user.role < 1) {
                        registerUser++;
                    }

                    //Which LAN Packet
                    if (user.lan.packet.id == 0) {
                        lanPacket['null']++
                    } else if (user.lan.packet.id == 1) {
                        lanPacket['eins']++
                    } else if (user.lan.packet.id == 2) {
                        lanPacket['zwei']++
                    }

                    //Vegitable yes or not
                    if (user.lan.vegi == true) {
                        vegi["yes"]++
                    } else {
                        vegi["no"]++
                    }

                }
                this.userRegData = [registerUser, registerCap];
                this.packetData = [lanPacket['null'], lanPacket['eins'], lanPacket['zwei']];
                this.vegiData = [vegi['yes'], vegi['no']];

            },
            // the second argument is a function which runs on error
            err => console.error(err),
            // the third argument is a function which runs on completion
            () => console.log('done loading users')
        );
    }

}
