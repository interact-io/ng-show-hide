import { Directive, TemplateRef, Renderer2, EmbeddedViewRef, Input, OnInit, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[showIf]'
})
export class NgShowHideDirective implements OnInit{
  showing: boolean;
  view: EmbeddedViewRef<any>;
  el;
  currentDisVal: string = "";
  constructor(private templateRef: TemplateRef<void>,
    private renderer: Renderer2,
    private vcr: ViewContainerRef){
      this.view = this.vcr.createEmbeddedView(this.templateRef);
      this.el = this.view.rootNodes[0];
  };
  ngOnInit(): void {
  }
  // get the current display value of style
  private getCurrDisp(style: any): string{
    if(!style){
      return ""
    }else{
      let content: string = style.textContent;
      let startIndex : number = content.indexOf("display");
      let endIndex: number = content.indexOf(";", startIndex);
      if(startIndex == -1){
        // no display in style
        return ""
      }else{
        // strip the none value and return others
        let content_cleaned: string = content.substring(startIndex +"display:".length, endIndex);
        let none_removed: string = content_cleaned.split("none").join("")
        return none_removed
      }

    }
  }
  private hideDom(): void{
    this.renderer.setStyle(this.el, "display", "none");
    this.showing = false;
  }

  private showDom(): void{
    this.renderer.setStyle(this.el, "display", this.currentDisVal);
    this.showing = true;
  }

  private showOrHide(predicate: any){
    //store the latest display value (except none) inorder to re-show
    let currDispRemoNone: string = this.getCurrDisp(this.el.attributes.style);
    if(currDispRemoNone.trim()){
      this.currentDisVal = currDispRemoNone;
    }
    if(predicate){
      this.showDom();
    }else{
      this.hideDom();
    }
  }
  @Input() set showIf(predicate: any){
    this.showOrHide(predicate);
  }
}
