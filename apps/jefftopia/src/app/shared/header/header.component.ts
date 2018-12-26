import { Component, Input, OnInit , Optional} from '@angular/core';

@Component({
  selector: 'js-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class JSHeader implements OnInit {

  @Optional() @Input() size: string;
  @Optional() @Input() style: string;

  ngOnInit() {

  }
}
