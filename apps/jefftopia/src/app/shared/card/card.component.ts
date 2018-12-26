import { Component, Input, OnInit , Optional} from '@angular/core';

@Component({
  selector: 'js-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class JSCard implements OnInit {

  @Optional() @Input() size: string;
  @Optional() @Input() style: string;

  ngOnInit() {

  }
}
