import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appFuente]'
})
export class FuenteDirective implements OnInit, OnChanges{
  @Input('appFuente') tamanoFuente!: string;
  
  constructor(
    private elemento: ElementRef
  ) { }

  ngOnInit(): void {
    this.actualizar();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.actualizar();
  }

  actualizar() {
    if (this.tamanoFuente !== null)
      this.elemento.nativeElement.style.fontSize = this.tamanoFuente;
    else
      this.elemento.nativeElement.style.fontSize = '16px'
  }

}
