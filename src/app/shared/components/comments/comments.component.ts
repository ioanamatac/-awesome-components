import { Component, EventEmitter,Input, OnInit, Output } from '@angular/core';
import { Comment } from '../../../core/models/comment.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { animate, animateChild, group, query, sequence, stagger, state, style, transition,trigger, useAnimation } from '@angular/animations';
import { flashAnimation } from '../../animations/flash.animation';
import { slideAndFadeAnimation } from '../../animations/slide-and-fade.animation';


//définissez un état avec state : nom de l'etat et style
//definissez les animations dans le decorateur @Component
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  animations:[
    //on met le trigger sur l'element parent
    trigger('list', [
      transition(':enter', [
        //chercher les enfants par leur trigger d'animation
        query('@listItem', [
          //la fonction stagger permet de decaler ds le temps le demarrage de chaque listItem
          stagger(50, [  
            //declancher l'animation des enfants avec animateChild()          
            animateChild()
          ])
        ])
      ])
    ]),
    //à un trigger on associe un nom et un tableau des donnes des animations
    trigger('listItem', [
      state('default', style({
          transform: 'scale(1)',
          'background-color': 'white',
          'z-index': 1
      })),
     //définissez des états avec le nom  'active'  et les styles correspondants
      state('active', style({
            transform: 'scale(1.05)',
            'background-color': 'rgb(201, 157, 242)',
            'z-index': 2
      })),
      state('deleting', style({
            transform: 'scale(1.1)',
            'background-color': 'rgb(255, 77, 77)',       
      })),        
      state('deleting', style({
            transform: 'translateX(100%)',
            opacity: 0       
      })),  
       //configurez les transitions dans les deux sens(d'un state à l'autre)
      transition('default => active', [
        //attribuer un tableau contenant la définition de l'animation avec la fonction animate
            animate('100ms ease-in-out')
      ]),
      transition('active => default', [
             animate('500ms ease-in-out') 
      ]),
      //cibler les animations depuis "le vide" vers un autre état(ciblezl'arivée d'un élément)
      // declancher les anim en meme temps,mais un qui va plus vite que l'autre(donc independement)
      transition(':enter', [
        //le texte est invisible dès le départ, et son fade-in a lieu après l'arrivée du bloc du commentaire
        query('.comment-text, .comment-date', [
            style({
                opacity: 0
            }),
        ]),
        //style de depart remplacé par une animation reutilisable et parametrable
        useAnimation(slideAndFadeAnimation, {
            params: {
                time: '5004ms',
                startColor: 'rgb(201, 157, 242)'
            }
        }),
        //le group est utilisé pour declancher les animations ensemble(en paralléle) 
        //par default les animations Angular sont lues en série(une apres les autres)
        group ([
            useAnimation(flashAnimation, {
              params: {
                  time: '250ms',
                  flashColor: 'rgb(249,179,111)'
              }
            }),
            //query pour cibler les différents enfants de lélément animé
            query('.comment-text', [
              animate('250ms', style({
                  opacity: 1
              }))
            ]),
            query('.comment-date', [
              animate('500ms', style({
                  opacity: 1
              }))
            ]),
        ])     
        
      ])

    ])
   ]
})
export class CommentsComponent implements OnInit {

  @Input() comments!: Comment[];
  //le decorateur @Output permet de lier,une méthode depuis le parent (post-list-item.component)à l'aide de l'event binding
  @Output() newComment = new EventEmitter<string>();

  commentCtrl!: FormControl;
  animationStates:{ [key: number]: 'default' | 'active'} = {}; 
  

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.commentCtrl = this.formBuilder.control('', [Validators.required, Validators.minLength(10)]);
    for(let index in this.comments){
      this.animationStates[index] = 'default';
    }
  }

  onLeaveComment (): void {
    if (this.commentCtrl.invalid) {
      return;
    }
    //La foction Math retourne le nbr le plus élévé d'une liste de nbrs
    //avec la fct map vous tranformez le tableau de Comment en tableau de number
    // Math.max prend les argumens les unes a la suites des autres et non ds un tableau
    //l'operateur spread ... va éclater le tableau d'id pour Math.max
    const maxId = Math.max(...this.comments.map(comment => comment.id));
    //avec maxId vous ajoutez le nouveau commentaire au début du tableau comments en utilisant la fct unshift
    this.comments.unshift({
          //retrouver l'id le plus élévé et rajouter 1 pour parcourir
         id: maxId + 1,
         comment: this.commentCtrl.value,
         createdDate: new Date().toISOString(),
         userId: 1
    });
    //j'appelle la function emit sur le nouveau EventEmitter en lui passant le contenu du champ du texte
    this.newComment.emit(this.commentCtrl.value);
    //vider le champ du texte
    this.commentCtrl.reset();
  }

  onListItemMouseEnter(index: number) {
    this.animationStates[index] = 'active';
  }

  onListItemMouseLeave(index: number) {
    this.animationStates[index] = 'default';
  }

}
