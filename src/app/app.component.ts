import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ImageReddit } from './ImageFeed.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  reddits: Observable<Array<ImageReddit>>;
  _redditDataUrl: string = 'http://www.reddit.com/r/aww.json';
  title = 'infiniteScroll';

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this._initFeed();
    this._logFeed();
  }

  _initFeed() {
    this.reddits = this.http
      .get(this._redditDataUrl)
      .map((response) => response.json())
      .map((json) => <Array<any>>json.data.children)
      .map((children) =>
        children.filter(
          (d) => ['png', 'jpg'].indexOf(d.data.url.split('.').pop()) != -1
        )
      )
      .map((children) =>
        children.map(
          (d) => new ImageReddit(d.data.id, d.data.title, d.data.url)
        )
      );
  }

  _logFeed() {
    this._reddits$.subscribe((data) => console.debug('data', data));
  }
}
