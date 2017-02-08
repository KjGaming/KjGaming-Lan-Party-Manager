import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: "orderBySwiss"
})
export class BaOrderSwissSystemPipe implements PipeTransform {
    transform(array: any[], args: any[]): any {
        let swapped;
        do {
            swapped = false;
            for (let i=0; i < array.length-1; i++) {
                if (array[i]['points'] > array[i+1]['points']) {
                    let temp = array[i];
                    array[i] = array[i+1];
                    array[i+1] = temp;
                    swapped = true;
                }
            }
        } while (swapped);

        /*let i, j;
        for (i = array.length - 1; i >= 0; i--) {
            for (j = 0; j <= i; j++) {
                console.log('=> ' + array[j + 1]['win']);
                if (array[j + 1] < array[j]) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }*/
        array.reverse();
        console.log('Was ist hier los');
        console.log(array);
        return array;
    }
}