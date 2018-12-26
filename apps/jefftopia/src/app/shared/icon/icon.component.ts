import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'js-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class JSIcon implements OnInit {
  @Input() name: string;
  public class: string;
  public href: string;

  ngOnInit() {
    this.class = `icon icon-${this.name}`;
    this.href = `#icon-${this.name}`;
  }
}
