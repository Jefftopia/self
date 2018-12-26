import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'js-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class JSIcon implements OnInit {
  @Input() name: string;
  private class: string;
  private href: string;

  ngOnInit() {
    this.class = `icon icon-${this.name}`;
    this.href = `#icon-${this.name}`;
  }
}
