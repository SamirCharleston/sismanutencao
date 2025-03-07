import { Component, ElementRef, EventEmitter, Input, OnInit, Output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {
  @Input() value: Date = new Date();
  @Output() valueChange = new EventEmitter<Date>();
  @Input() placeholder: string = 'Selecione uma data';

  displayValue: string = '';
  showCalendar: boolean = false;
  currentMonth: Date = new Date();
  weekDays: string[] = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  months: string[] = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  calendarDays: Date[] = [];

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.generateCalendarDays();
    if (this.value) {
      this.displayValue = this.formatDate(this.value);
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showCalendar = false;
    }
  }

  generateCalendarDays() {
    const firstDay = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1);
    const lastDay = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0);
    
    const startPadding = firstDay.getDay();
    const endPadding = 6 - lastDay.getDay();

    this.calendarDays = [];

    // Add previous month days
    for (let i = startPadding - 1; i >= 0; i--) {
      const date = new Date(firstDay);
      date.setDate(date.getDate() - i - 1);
      this.calendarDays.push(date);
    }

    // Add current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), i);
      this.calendarDays.push(date);
    }

    // Add next month days
    for (let i = 1; i <= endPadding; i++) {
      const date = new Date(lastDay);
      date.setDate(date.getDate() + i);
      this.calendarDays.push(date);
    }
  }

  previousMonth() {
    this.currentMonth.setMonth(this.currentMonth.getMonth() - 1);
    this.generateCalendarDays();
  }

  nextMonth() {
    this.currentMonth.setMonth(this.currentMonth.getMonth() + 1);
    this.generateCalendarDays();
  }

  selectDate(date: Date) {
    this.value = date;
    this.displayValue = this.formatDate(date);
    this.valueChange.emit(date);
    this.showCalendar = false;
  }

  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
    if (this.showCalendar) {
      this.currentMonth = this.value || new Date();
      this.generateCalendarDays();
    }
  }

  isCurrentMonth(date: Date): boolean {
    return date.getMonth() === this.currentMonth.getMonth();
  }

  isSelected(date: Date): boolean {
    return this.value && 
           date.getDate() === this.value.getDate() &&
           date.getMonth() === this.value.getMonth() &&
           date.getFullYear() === this.value.getFullYear();
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    
    if (value.length === 10) {
      const [day, month, year] = value.split('/').map(Number);
      const date = new Date(year, month - 1, day);
      
      if (!isNaN(date.getTime())) {
        this.value = date;
        this.valueChange.emit(date);
      }
    }
  }

  onInputKeyPress(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    
    // Allow only numbers and forward slash
    if (!/[\d\/]/.test(event.key) && event.key !== 'Backspace') {
      event.preventDefault();
      return;
    }

    // Add forward slash automatically
    if (event.key !== 'Backspace') {
      if (value.length === 2 || value.length === 5) {
        input.value = value + '/';
      }
    }
  }
}
