import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentsComponent } from './components/comments/comments.component'
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShortenPipe } from './pipes/shorten.pipe';
import { UsernamePipe } from './pipes/username.pipe';
import { TimeAgoPipe } from './pipes/timeago.pipe';
import { HighlightDirective } from './directives/highlight.directive';




@NgModule({
  declarations: [
    CommentsComponent,
    ShortenPipe,
    UsernamePipe,
    TimeAgoPipe,
    HighlightDirective
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule ,
    FormsModule   
  ],
  exports: [    
    MaterialModule,
    CommentsComponent,
    ReactiveFormsModule,
    ShortenPipe,
    UsernamePipe,
    TimeAgoPipe,
    HighlightDirective    
  ]
})
export class SharedModule { }
