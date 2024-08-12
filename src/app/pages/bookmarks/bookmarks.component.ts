import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-bookmarks',
  standalone: true,
  imports: [],
  templateUrl: './bookmarks.component.html',
  styleUrl: './bookmarks.component.css'
})
export class BookmarksComponent {

  bookmarks = ["https://youtube.com", "https://portal.ajou.ac.kr"]

}
