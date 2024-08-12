import { Component } from '@angular/core';

@Component({
  selector: 'app-bookmarks-pane',
  standalone: true,
  imports: [],
  templateUrl: './bookmarks-pane.component.html',
  styleUrl: './bookmarks-pane.component.css'
})
export class BookmarksPaneComponent {

  bookmarks = ["https://youtube.com", "https://portal.ajou.ac.kr"]

}
