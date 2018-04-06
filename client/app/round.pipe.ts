import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'round'
})
export class RoundPipe implements PipeTransform {
	transform(value: any, args?: any) {
		console.log(value)
		console.log(args)
		return value.filter( x => { x.round == args });
	}
}