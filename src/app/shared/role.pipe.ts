import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'role' })
export class RolePipe implements PipeTransform {

    transform(value: string): string {
        switch (value) {
            case '10':
                return 'Consulta';
            case '30':
                return 'Alumno';
            case '50':
                return 'Profesor';
            case '90':
                return 'Administrador';
            default:
                return 'Otro';
        }
    }
}