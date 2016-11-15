import { Component } from '@angular/core';
import { Seating } from "../../theme/model";


@Component({
    selector: 'seating',
    styles: [require('./seating.scss')],
    template: require('./seating.component.html')

})


export class SeatingComponent {
    public seats = [
        new Seating(640.5, 561.5, 'seating_1'),
        new Seating(715.5, 561.5, 'seating_2'),
        new Seating(790.5, 561.5, 'seating_3'),
        new Seating(865.5, 561.5, 'seating_4'),
        new Seating(940.5, 561.5, 'seating_5'),
        new Seating(1015.5, 561.5, 'seating_6'),
        new Seating(1090.5, 561.5, 'seating_7'),
        new Seating(1165.5, 561.5, 'seating_8'),
        new Seating(1240.5, 561.5, 'seating_9'),
        new Seating(1315.5, 561.5, 'seating_10'),
        new Seating(1390.5, 561.5, 'seating_11'),
        new Seating(1465.5, 561.5, 'seating_12'),

        new Seating(640.5, 410.5, 'seating_13'),
        new Seating(715.5, 410.5, 'seating_14'),
        new Seating(790.5, 410.5, 'seating_15'),
        new Seating(865.5, 410.5, 'seating_16'),
        new Seating(940.5, 410.5, 'seating_17'),
        new Seating(1015.5, 410.5, 'seating_18'),
        new Seating(1165.5, 410.5, 'seating_19'),
        new Seating(1240.5, 410.5, 'seating_20'),
        new Seating(1315.5, 410.5, 'seating_21'),
        new Seating(1390.5, 410.5, 'seating_22'),
        new Seating(1465.5, 410.5, 'seating_23'),
        new Seating(1540.5, 410.5, 'seating_24'),

        new Seating(640.5, 323.5, 'seating_25'),
        new Seating(715.5, 323.5, 'seating_26'),
        new Seating(790.5, 323.5, 'seating_27'),
        new Seating(865.5, 323.5, 'seating_28'),
        new Seating(940.5, 323.5, 'seating_29'),
        new Seating(1015.5, 323.5, 'seating_30'),
        new Seating(1165.5, 323.5, 'seating_31'),
        new Seating(1240.5, 323.5, 'seating_32'),
        new Seating(1315.5, 323.5, 'seating_33'),
        new Seating(1390.5, 323.5, 'seating_34'),
        new Seating(1465.5, 323.5, 'seating_35'),
        new Seating(1540.5, 323.5, 'seating_36'),

        new Seating(640.5, 173.5, 'seating_37'),
        new Seating(715.5, 173.5, 'seating_38'),
        new Seating(790.5, 173.5, 'seating_39'),
        new Seating(865.5, 173.5, 'seating_40'),
        new Seating(940.5, 173.5, 'seating_41'),
        new Seating(1015.5, 173.5, 'seating_42'),
        new Seating(1165.5, 173.5, 'seating_43'),
        new Seating(1240.5, 173.5, 'seating_44'),
        new Seating(1315.5, 173.5, 'seating_45'),
        new Seating(1390.5, 173.5, 'seating_46'),
        new Seating(1465.5, 173.5, 'seating_47'),
        new Seating(1540.5, 173.5, 'seating_48'),

        new Seating(790.5, 87.5, 'seating_49'),
        new Seating(865.5, 87.5, 'seating_50'),
        new Seating(1165.5, 87.5, 'seating_51'),
        new Seating(1240.5, 87.5, 'seating_52'),
        new Seating(1390.5, 87.5, 'seating_53'),
        new Seating(1465.5, 87.5, 'seating_54')
    ];
    seatUsed: boolean;
    seatOwn: boolean;


    public seatArray = [{'nickname': 'genin', 'seat': 7}, {'nickname': 'SciTe', 'seat': 24}];
    seatTitle: string;
    seatContent: string;
    seatId: string;

    showClass(id) {

        const seat = this.seatShow(id);
        this.seatUsed = seat.seatUsed;
        this.seatOwn = seat.seatOwn;

        if (this.seatUsed) {
            return {seatHover: true, seatUsed: true, seatOwn: false};
        } else if (this.seatOwn) {
            return {seatHover: true, seatUsed: false, seatOwn: true};
        } else {
            return {seatHover: true, seatUsed: false, seatOwn: false};
        }

    }

    clickIt(id) {
        const seat = this.seatShow(id);
        this.seatUsed = seat.seatUsed;
        this.seatId = id.split("_")[1];

        if (seat.seatUsed) {
            this.seatTitle = "Hier sitzt '" + seat.seatName + "'";
            this.seatContent = 'belegt';
        } else {
            this.seatTitle = 'Platz ' + id.split("_")[1] + ' ist frei';
            this.seatContent = 'frei';
        }
        console.log('clicked: ' + id);
    }

    seatShow(id: string) {
        for (var i = 0; this.seatArray.length > i; i++) {
            if ('seating_' + this.seatArray[i].seat == id) {
                return {seatUsed: true, seatPlace: 'belegt', seatName: this.seatArray[i].nickname, seatOwn:false};
            }
        }
        return {seatUsed: false, seatPlace: 'frei', seatName: '', seatOwn:false};
    }


    reserve(id){
        alert("Wollen sie Platz "+ id +" reservieren?")
    }


}
