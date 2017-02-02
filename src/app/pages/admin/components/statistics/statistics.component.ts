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

    public barChartLabels: string[] = [
        'Do Abendessen',
        'Fr Frühstück',
        'Fr Mittagessen',
        'Fr Abendessen',
        'Sa Frühstück',
        'Sa Mittagessen',
        'Sa Abendessen',
        'So Frühstück'];

    public barChartType: string = 'bar';
    public barChartLegend: boolean = false;

    public barChartData: any[] = [{data: [1,1,1], label: 'User'}];


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

                let foodArray:any[] = [0,0,0,0,0,0,0,0] ;
                let clone = JSON.parse(JSON.stringify(this.barChartData));

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

                    //LAN Food
                    let food = user.lan.food;
                    console.log(food.length);

                    for (let i = 0; i < food.length; i++) {
                        switch(i){
                            case 0:
                                if(food[i] == 1){foodArray[0] += 1}
                                break;
                            case 1:
                                if(food[i] == 1){foodArray[1] += 1}
                                break;
                            case 2:
                                if(food[i] == 1){foodArray[2] += 1}
                                break;
                            case 3:
                                if(food[i] == 1){foodArray[3] += 1}
                                break;
                            case 4:
                                if(food[i] == 1){foodArray[4] += 1}
                                break;
                            case 5:
                                if(food[i] == 1){foodArray[5] += 1}
                                break;
                            case 6:
                                if(food[i] == 1){foodArray[6] += 1}
                                break;
                            case 7:
                                if(food[i] == 1){foodArray[7] += 1}
                                break;
                        }
                    }
                }
                clone[0].data = foodArray;
                console.log(this.barChartData);
                this.barChartData = clone;
                console.log(this.barChartData);
                this.userRegData = [registerUser, (registerCap - registerUser)];
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
