import { Component, EventEmitter, Input, Output,OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { Observable, Subscribable } from 'rxjs';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {

  @Input() post!: Post;
  //le Output va emmetre un objet contenant le commentaire et l'id du post commenté
  @Output() postCommented = new EventEmitter<{ comment: string, postId: number}>();
   
  tempUser = {firstName: 'Ioana', lastName: 'Matac'};

  constructor() { }

  ngOnInit(): void {
  }
  // quel Post a été commenté(id)
  onNewComment(comment: string): void {   
   this.postCommented.emit({ 
    comment, 
    postId: this.post.id 
    });
  }

}
