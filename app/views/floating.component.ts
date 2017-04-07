import { Input, Component, HostListener, OnInit, ViewChild, AfterViewInit, ElementRef, HostBinding } from '@angular/core'
import * as _ from "lodash"

@Component({
  selector: 'float',
  styles: [
    `#window { position: fixed; opacity: 0.9; }`,
    `#titleBar { cursor: grab; }`,
    `.corner-resize { position: absolute; width: 10px; height: 10px; }`,
    `#bottom-right-resize { bottom: 0px; right: 0px; cursor: se-resize; }`,
    `#close { top: 10px; right: 10px; position: absolute; }`
  ],
  template: `
    <div id="window" #window style="top: 16px; left: 16px; width: 600px; height: 300px;"
      [style.visibility]="shown ? 'initial' : 'hidden'">
        <div class="ui segments" style="height: 100%;">
          <div id="titleBar" class="ui segment" draggable="true" (dragstart)="windowDragStart($event)">
            <h4 class="ui header" style="margin-bottom: calc(-1em/7);">{{ headerText }}</h4>
            <div id="close"><i class="ui remove icon" (click)="close()"></i></div>
          </div>
          <div class="ui segment" style="height: calc(100% - 2em + 2em/7 - 1.071em - 4px); overflow: scroll; ">
            <ng-content></ng-content>
          </div> 
        </div>
        <div id="bottom-right-resize" class="corner-resize" draggable="true" (dragstart)="resizeDragStart($event)"></div>
    </div> 
  `,
  host: {
    "(document:drag)": "documentDrag($event)",
    // For Firefox
    "(document:dragover)": "documentDrag($event)"
  }
})
export class FloatingComponent {
  @Input('header') headerText: string
  @ViewChild('window') window: ElementRef

  private anchor: { x: number, y: number }
  private origin: { x: number, y: number }

  shown: boolean
  private shouldRedraw: boolean
  private windowX: string
  private windowY: string

  /** 視窗的原始（調整大小前）大小 */
  private windowDimension: { width: number, height: number }
  private windowWidth: string
  private windowHeight: string

  private dragReason: "reposition" | "resize" | null

  constructor() {
    this.anchor = { x: 0, y: 0 }
    this.origin = { x: 0, y: 0 }
    this.windowDimension = { width: 0, height: 0 }
    this.shown = false
    this.shouldRedraw = false
    this.dragReason = null

    requestAnimationFrame(() => { this.redraw(this) })
  }

  // 移動
  private resizeDragStart(event: DragEvent) {
    this.dragReason = "resize"

    // Workaround for Firefox
    event.dataTransfer.setData('text/plain', '')

    // 記錄初始位置
    this.windowDimension.width = Number.parseInt(this.window.nativeElement.style.width)
    this.windowDimension.height = Number.parseInt(this.window.nativeElement.style.height)

    // 紀錄滑鼠點擊位置
    this.anchor.x = event.clientX
    this.anchor.y = event.clientY
  }
  private windowDragStart(event: DragEvent) {
    this.dragReason = "reposition"

    // Workaround for Firefox
    event.dataTransfer.setData('text/plain', '')

    // 記錄初始位置
    this.origin.x = Number.parseInt(this.window.nativeElement.style.left)
    this.origin.y = Number.parseInt(this.window.nativeElement.style.top)

    // 紀錄滑鼠點擊位置
    this.anchor.x = event.clientX
    this.anchor.y = event.clientY
  }

  private documentDrag(event: DragEvent) {
    // Chrome Workaround
    if (event.clientX == 0 && event.clientY == 0) { return; }

    let dx = event.clientX - this.anchor.x
    let dy = event.clientY - this.anchor.y

    if (this.dragReason == "reposition") {
      // 利用差值寫入新位置
      this.windowX = this.origin.x + dx + "px"
      this.windowY = this.origin.y + dy + "px"
    } else if (this.dragReason == "resize") {
      this.windowWidth = this.windowDimension.width + dx + "px"
      this.windowHeight = this.windowDimension.height + dy + "px"
    }
    this.shouldRedraw = true
    event.preventDefault()
  }

  public redraw(context: FloatingComponent) {
    requestAnimationFrame(() => context.redraw(context))

    if (this.shouldRedraw) {
      this.window.nativeElement.style.left = this.windowX
      this.window.nativeElement.style.top = this.windowY
      this.window.nativeElement.style.width = this.windowWidth
      this.window.nativeElement.style.height = this.windowHeight
    }
  }

  close() {
    this.shown = false
  }
  show() {
    this.shown = true
  }
}
