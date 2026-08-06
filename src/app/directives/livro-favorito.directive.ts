import { Directive, ElementRef, inject, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLivroFavorito]',
  standalone: true,
})
export class LivroFavoritoDirective {
  @Input()
  public set appLivroFavorito(favorito: boolean) {
    if (favorito) {
      this.renderer.setStyle(this.elemento.nativeElement, 'border', '2px solid #e91e63');
      this.renderer.setStyle(this.elemento.nativeElement, 'background-color', '#fff8fb');
    } else {
      this.renderer.removeStyle(this.elemento.nativeElement, 'border');
      this.renderer.removeStyle(this.elemento.nativeElement, 'background-color');
    }
  }

  private elemento = inject(ElementRef);
  private renderer = inject(Renderer2);
}
