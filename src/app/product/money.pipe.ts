import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'moneypipe'
})

export class MoneyPipe implements PipeTransform{
    transform(value: number){
        if(value > 0 && value <= 9999999){
            return value.toString().substr(0,1) + ',' + value.toString().substr(1,3) + ',' + value.toString().substr(3,3) + 'đ'
        }else if (value > 9999999 && value <= 99999999){
            return value.toString().substr(0,2) + ',' + value.toString().substr(2,3) + ',' + value.toString().substr(5,3) + 'đ'
        }else if (value > 99999999){
            return value.toString().substr(0,3) + ',' + value.toString().substr(3,3) + ',' + value.toString().substr(6,3) + 'đ'
        }else{
            return value.toString() + 'đ'
        }
    }
}
