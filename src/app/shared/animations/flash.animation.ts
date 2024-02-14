import { animate, animation, sequence, style } from "@angular/animations";

//pour creer un paramètre ds une animation, on utilise la string interpolation a l'interior des strings
//flashAnimation accepte deux parametres: time & flashColor
//rendre l'animation reutilisable avec animation
export const flashAnimation = animation([
    sequence([
        animate('{{ time }}', style({
            'background-color': '{{ flashColor }}'
        })),
        animate('{{ time }}', style({
            'background-color': 'white'
        })),
    ]),
])