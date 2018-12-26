import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JSHeader } from './header/header.component';
import { JSIcon } from './icon/icon.component';
import { JSFlowButton } from './flow-button/flow-button.component';
import { JSFlowHeader } from './flow-header/flow-header.component';
import { SafeHtmlPipe } from './dom-sanitizer'

@NgModule({
  declarations: [
    JSHeader,
    JSIcon,
    JSFlowButton,
    JSFlowHeader,
    SafeHtmlPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    JSHeader,
    JSIcon,
    JSFlowButton,
    JSFlowHeader,
    SafeHtmlPipe
  ]
})
export class SharedModule { }
