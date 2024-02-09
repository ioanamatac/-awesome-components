import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "../models/post.model";
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment';


@Injectable()
export class PostsService {
    constructor(private http: HttpClient) {}

    getPosts(): Observable<Post[]> {
        return  this.http.get<Post[]>('http://localhost:3000/posts'); 
        
    }

    addNewComment(postCommented: { comment: string, postId: number}){
        console.log(postCommented);
    }
    
}