import { Component, computed, signal } from '@angular/core';
import { Nav } from '../nav/nav';

@Component({
  selector: 'app-secure',
  imports: [Nav],
  templateUrl: './secure.html',
  styleUrl: './secure.css',
})
export class Secure {
  protected readonly message = signal('');
  protected readonly period = signal('This week');
  protected readonly sectionTitle = signal('Section title');
  protected readonly activeSection = signal('Dashboard');
  private readonly rows = [
    ['Lorem', 'ipsum', 'dolor', 'sit'],
    ['amet', 'consectetur', 'adipiscing', 'elit'],
    ['Integer', 'nec', 'odio', 'Praesent'],
    ['libero', 'Sed', 'cursus', 'ante'],
    ['dapibus', 'diam', 'Sed', 'nisi'],
    ['Nulla', 'quis', 'sem', 'at'],
    ['nibh', 'elementum', 'imperdiet', 'Duis'],
    ['sagittis', 'ipsum', 'Praesent', 'mauris'],
    ['Fusce', 'nec', 'tellus', 'sed'],
    ['augue', 'semper', 'porta', 'Mauris'],
    ['massa', 'Vestibulum', 'lacinia', 'arcu'],
    ['eget', 'nulla', 'Class', 'aptent'],
    ['taciti', 'sociosqu', 'ad', 'litora'],
    ['torquent', 'per', 'conubia', 'nostra'],
    ['per', 'inceptos', 'himenaeos', 'Curabitur'],
    ['sodales', 'ligula', 'in', 'libero'],
  ].map((cells, index) => ({
    id: (1001 + index).toLocaleString('en-US'),
    cells,
    month: index < 12 ? 10 : 9,
    week: index < 8 ? 1 : 2,
  }));
  protected readonly visibleRows = computed(() =>
    this.rows.filter(
      (row) =>
        this.period() === 'All time' ||
        (this.period() === 'This month' ? row.month === 10 : row.month === 10 && row.week === 1),
    ),
  );

  protected changePeriod(event: Event): void {
    this.period.set((event.target as HTMLSelectElement).value);
    this.message.set('');
  }

  protected exportCsv(): void {
    const csv = [
      'ID,Header,Header,Header,Header',
      ...this.visibleRows().map((row) =>
        [row.id, ...row.cells].map((cell) => `"${cell.replaceAll('"', '""')}"`).join(','),
      ),
    ].join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'dashboard.csv';
    link.click();
    URL.revokeObjectURL(url);
    this.message.set('CSV exported.');
  }

  protected async share(): Promise<void> {
    try {
      await navigator.clipboard.writeText(window.location.href);
      this.message.set('Dashboard link copied to clipboard.');
    } catch {
      this.message.set('Unable to copy the link. Copy the URL from your browser to share.');
    }
  }
}
