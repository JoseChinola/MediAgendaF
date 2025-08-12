import { Component } from '@angular/core';
import { Sidebar } from "../../components/sidebar/sidebar";
import { Header } from "../../components/header/header";
import { RouterOutlet } from '@angular/router';
import { Footer } from "../../components/footer/footer";


@Component({
  selector: 'app-layout',
  imports: [Sidebar, Header, RouterOutlet, Footer],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {

}
