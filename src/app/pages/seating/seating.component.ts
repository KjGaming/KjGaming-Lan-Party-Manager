import { Component,  } from '@angular/core';


@Component({
    selector: 'seating',
    styles: [require('./seating.scss')],
    template: require('./seating.component.html')

})



export class SeatingComponent{

    changeColor(id){
        console.log(id);
    }

}
