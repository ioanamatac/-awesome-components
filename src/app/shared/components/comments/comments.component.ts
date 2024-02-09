import { Component, EventEmitter,Input, OnInit, Output } from '@angular/core';
import { Comment } from '../../../core/models/comment.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { animate, state, style, transition,trigger } from '@angular/animations';


//définissez un état avec state : nom de l'etat et style
//definissez les animations dans le decorateur @Component
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  animations:[
    //à un trigger on associe un nom et un tableau des donnes des animations
    trigger('listItem', [
      state('default', style({
          transform: 'scale(1)',
          'background-color': 'white',
          'z-index': 1
     })),
     //définissez des états avec le nom  'active'  et les styles correspondants
      state('active', style({
            transform: 'scale(1.09)',
            'background-color': 'rgb(201, 157, 242)',
            'z-index': 2
       })),
       //configurez les transitions dans les deux sens(d'un state à l'autre)
      transition('default => active', [
        //attribuer un tableau contenant la définition de l'animation avec la fonction animate
            animate('100ms ease-in-out')
      ]),
      transition('active => default', [
             animate('500ms ease-in-out') 
      ]),  

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
