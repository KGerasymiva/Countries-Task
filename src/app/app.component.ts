import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HomeComponent} from "./home/home.component";


@Component({
  imports: [RouterOutlet, HomeComponent],
  selector: 'app-root',
  standalone: true,
  styleUrl: './app.component.css',
  templateUrl: './app.component.html'
})
export class AppComponent {
  }
