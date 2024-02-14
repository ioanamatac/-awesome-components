import { animate, animation,style } from "@angular/animations";

//passer l'argument startColor à l'animation avec string interpolation
export const slideAndFadeAnimation = animation([
    style({
        transform: 'translateX(-100%)',
        opacity: 0,
        'background-color': '{{ startColor }}',
    }),
    animate('250ms ease-out', style({
        transform: 'translateX(0)',
        opacity: 1,
        'background-color': 'white',
    })),
]);