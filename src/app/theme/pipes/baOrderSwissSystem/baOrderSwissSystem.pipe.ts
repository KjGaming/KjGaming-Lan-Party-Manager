import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: "orderBySwiss"
})
export class BaOrderSwissSystemPipe implements PipeTransform {
    transform(array: any[], args: any[]): any {
        let swapped;
        let swapped2;
        do {
            swapped = false;
            for (let i=0; i < array.length-1; i++) {
                if (array[i]['win'] > array[i+1]['win']) {
                    let temp = array[i];
                    array[i] = array[i+1];
                    array[i+1] = temp;
                    swapped = true;
                }
            }
        } while (swapped);

        do {
            swapped2 = false;
            for (let i=0; i < array.length-1; i++) {
                if (array[i]['lose'] < array[i+1]['lose']) {
                    let temp = array[i];
                    array[i] = array[i+1];
                    array[i+1] = temp;
                    swapped2 = true;
                }
            }
        } while (swapped2);

        array.reverse();
        console.log('Was ist hier los');
        console.log(array);
        return array;
    }
}