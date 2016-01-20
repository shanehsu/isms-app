import {Component} from 'angular2/core';
import {Hero} from './hero';

@Component({
    template: `
      <div *ngIf="hero">
        <h2>{{hero.name}} details!</h2>
        <div><label>id: </label>{{hero.id}}</div>
        <div>
        <label>name: </label>
        <input [(ngModel)]="hero.name" placeholder="name"/>
        </div>
      </div>
    `,
    selector: 'my-hero-detail',
    inputs: ['hero']
})

export class HeroDetailComponent {
    public hero: Hero;
}