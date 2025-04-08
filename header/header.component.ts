import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  dropdownOpen = false;

  toggleDropdown(event: Event) {
    event.preventDefault(); // Prevent page reload
    this.dropdownOpen = !this.dropdownOpen;
  }

}
