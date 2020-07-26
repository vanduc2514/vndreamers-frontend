import {Component, Input, OnInit} from '@angular/core';
import {IPost} from '../../model/Post';
import {PostService} from '../../service/post.service';
import {IUser} from '../../model/User';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  @Input() posts: IPost[];
  @Input() user: IUser;

  constructor(private postService: PostService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(next => {
      this.posts = next;
      this.posts.reverse();
    }, error => {
      console.log(error);
    }, () => {
      console.log('complete');
    });
    this.postService.shouldRefresh.subscribe(result => {
      this.posts.unshift(result);
    });
  }

}
