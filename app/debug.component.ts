import { Component, HostListener, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core'
import * as _ from "lodash"

@Component({
  selector: 'debug',
  styles: [
    `#window { position: fixed; opacity: 0.9; cursor: grab; }`,
    `.corner-resize { position: absolute; width: 10px; height: 10px; }`,
    `#bottom-right-resize { bottom: 0px; right: 0px; cursor: se-resize; }`,
    `#close { top: 10px; right: 10px; position: absolute; }`
  ],
  template: `
    <div id="window" *ngIf="shown" draggable="true"
      [style.top.px]="window.y" [style.left.px]="window.x"
      [style.width.px]="width" [style.height.px]="height"
      (dragstart)="windowDragStart($event)">
        <div class="ui segment" style="height: 100%;">
          <div id="close"><i class="ui remove icon" (click)="close()"></i></div>
          <ng-content></ng-content>
        </div> 
        <div id="bottom-right-resize" class="corner-resize"></div>
    </div> 
  `
})
export class DebugComponent {
  width: number
  height: number

  private window: { x: number, y: number }
  private anchor: { x: number, y: number }
  private origin: { x: number, y: number }

  shown: boolean
  private rate: number

  constructor() {
    this.width = 600
    this.height = 300

    this.window = { x: 20, y: 20 }
    this.anchor = { x: 0, y: 0 }
    this.origin = { x: 0, y: 0 }

    this.shown = false
  }

  // 移動
  private windowDragStart(event: MouseEvent) {
    // 記錄初始位置
    this.origin.x = this.window.x
    this.origin.y = this.window.y

    // 紀錄滑鼠點擊位置
    this.anchor.x = event.x
    this.anchor.y = event.y

    let src: HTMLDivElement = <any>event.srcElement
    src.ondrag = _.throttle((event: MouseEvent) => {
      let dx = event.x - this.anchor.x
      let dy = event.y - this.anchor.y

      // 利用差值寫入新位置
      this.window.x = this.origin.x + dx
      this.window.y = this.origin.y + dy
    }, 100)
  }

  close() {
    this.shown = false
  }

  show() {
    this.shown = true
  }
}
