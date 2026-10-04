import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected readonly activeSection = signal('Dashboard');
  protected readonly sectionTitle = signal('Section title');
  protected readonly message = signal('');
  protected readonly navigation = [
    'Dashboard',
    'Orders',
    'Products',
    'Customers',
    'Reports',
    'Integrations',
  ];

  protected selectSection(section: string): void {
    this.activeSection.set(section);
    this.sectionTitle.set(section === 'Dashboard' ? 'Section title' : `${section} list`);
    this.message.set('');
  }
}
