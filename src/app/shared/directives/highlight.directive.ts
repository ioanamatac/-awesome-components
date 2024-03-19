import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2 } from "@angular/core";

//Une Directive peut être placée sur différents types d'élément HTML 
//pour leur apporter un comportement supplémentaire.
@Directive({
    selector: '[highlight]'
})
export class HighlightDirective implements AfterViewInit {
    @Input() color = 'yellow';
    //Une Directive peut injecter l'élément HTML sur lequel elle est placée avec  ElementRef  , 
    //et interagir avec cet élément avec  Renderer2  .
    constructor(private el: ElementRef,
                private renderer: Renderer2) {}

    //Renderer2  est un outil qui permet d'interagir avec le DOM (écrire des tests unitaires)
    ngAfterViewInit() {
        this.setBackgroundColor(this.color);
    }            

    setBackgroundColor(color: string) {
        this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
    }

    @HostListener('mouseenter') onMouseEnter(){
        this.setBackgroundColor('lightgreen');
    }
    @HostListener('mouseleave') onMouseLeave(){
        this.setBackgroundColor(this.color);
    }
    //Une Directive peut écouter les événements émanant de son élément grâce au décorateur  @HostListener
    @HostListener('click') onClick(){
        this.color = 'lightgreen';
    }

}