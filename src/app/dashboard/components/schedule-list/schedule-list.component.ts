import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { IonicModule, GestureController, Gesture } from '@ionic/angular';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class ScheduleListComponent implements OnInit, AfterViewInit {
  @ViewChildren('slideItem') slideItems!: QueryList<ElementRef>;
  @Output() selectedAppointment = new EventEmitter<any>();
  
  private gestures: Gesture[] = [];
  private currentOpenItem: HTMLElement | null = null;
  
  schedule = [
    {
      id: 1,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5853v0sJzenWuNQcfuLts1rJgrVjstV61vo_FqKk7RG04KJeOykb8dog7bwtvrklVfxfhuZUfVvo_NRFqSUMX3ri6xZWPgfCYVoS-YS6WgmlwKANaAsivdkb2Zxbtn1L0Ki_eCkvernCBCm0Xx3zzHJtS5JsjFTd48zd06-b8roe_xU1cpcR3AwwsbZpDuK4t5UGt-Gsi0lpi4HBQE54kch55FhkUiCs7K6lG29QLwPsxZhNAbhX5EDXiBgPEP8ymUGm2FTUqZJc',
      title: 'Patient Consultation: Chloe',
      time: '10:00 AM - 11:00 AM',
    },
    {
      id: 2,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1gCr1Xj3iMEnZGaGbY-K2mJbNpKJqYz7XuKfnMBgo9ws6IXL3K6JKOB9-lt8M-V4joXaAnCVzrDAY8iYi6WbpNsbNARhR1j2HXOZWb3Ri6qoavJeBTJulGGdUrDBF13xzIYXsioR3iJGYeAIdIOZCoLfCTo4lzTNse8AXQ7GUZ28rSrFnMOJ0o5XQR0HUkEQ1uLsyiScamH4qFqLxEBe4l2IgxnfCRdElNWLMifBir4nUvN457PX6eXA1h0rPucftlkxkju-U2oE',
      title: 'Follow-up Appointment: Noah',
      time: '11:30 AM - 12:30 PM',
    },
    {
      id: 3,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsEg2JEWqzmKhnHCvqoWQA4UBSqhCwwifZl4i8yUmRazt2NSzda3ViL4S1E1x2cnO1jGpu8fXrunmmuCcWdkiAAdMzknUkcecvCR0AAQl0xjEou0O42YQG6IgunQmq9nUwsrCwOJXPfR6IvPkfIEiC6IkJDk3J8-Hql2-tSJAAJp4WAkr0kKmTVS_b9xG0FTSs5zpLXEOSxxRs2UBqooODfxPYR3uOPIHZb8bt3C29rHOIaq0NQWnpDrfAqbK77GiamUWev-XaTOY',
      title: 'New Patient Intake: Sophia',
      time: '02:00 PM - 03:00 PM',
    },
    {
      id: 4,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwloZ4XPpquCIZoxrZwv-pJl8EnJrdT63j_-O5dGWRLt8FvuXiER1mwtD_eP86-2vQHatqBV5kEpwUxwQxfGX7R6TP20_Xmd5xU0DvKUhGr1odkjojhQW0_nYf6pBGDzMwHRsqUAIumLmzWsxERMravuNAZZw-MsKWIjXrN9wNGa9BWldFFUZPFZPrIp9esNXiimUfT5Iyi_xtbMXGK9v9CrfXdvzzjJapIr9f03q34t8szEt41H_INCr6d7HOkqKvQAo_3BQdNdU',
      title: 'Routine Check-up: Ethan',
      time: '03:30 PM - 04:30 PM',
    },
  ];

  constructor(private gestureCtrl: GestureController) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.setupGestures();
    // Listen for document clicks to close open sliders
    document.addEventListener('click', this.handleDocumentClick, true);
  }

  ngOnDestroy() {
    this.gestures.forEach(gesture => gesture.destroy());
    document.removeEventListener('click', this.handleDocumentClick, true);
  }

  private setupGestures() {
    this.slideItems.forEach((itemRef, index) => {
      const item = itemRef.nativeElement;
      const itemContent = item.querySelector('.item-content');
      const itemOptions = item.querySelector('.item-options');
      
      if (!itemContent || !itemOptions) return;

      let startX = 0;
      let currentX = 0;
      let isDragging = false;
      let startTime = 0;
      const maxSlide = 80; // Maximum slide distance

      const gesture = this.gestureCtrl.create({
        el: item,
        threshold: 20, // Increased threshold to avoid interfering with normal clicks
        gestureName: 'slide',
        onStart: (ev) => {
          startX = ev.currentX;
          startTime = Date.now();
          isDragging = true;
          
          // Close other open items
          this.closeAllItems();
          
          // Prevent scrolling during slide
          ev.event.preventDefault();
        },
        onMove: (ev) => {
          if (!isDragging) return;
          
          currentX = ev.currentX;
          const deltaX = startX - currentX;
          
          // Only allow left swipe (deltaX > 0)
          if (deltaX > 0) {
            const slideDistance = Math.min(deltaX, maxSlide);
            this.animateSlide(itemContent, itemOptions, slideDistance);
            
            // Add slide-open class immediately when sliding starts
            if (deltaX > 10) {
              item.classList.add('slide-open');
            }
          }
        },
        onEnd: (ev) => {
          if (!isDragging) return;
          
          isDragging = false;
          const deltaX = startX - currentX;
          const deltaTime = Date.now() - startTime;
          const velocity = Math.abs(deltaX) / deltaTime;
          
          // Determine if we should open or close based on distance and velocity
          const shouldOpen = deltaX > 30 || (deltaX > 15 && velocity > 0.3);
          
          if (shouldOpen) {
            this.openItem(itemContent, itemOptions);
            this.currentOpenItem = item;
            // Class is already added in onMove, no need to add again
          } else {
            this.closeItem(itemContent, itemOptions);
            // Remove class immediately if not opening
            item.classList.remove('slide-open');
          }
        }
      }, true);

      gesture.enable();
      this.gestures.push(gesture);
    });
  }

  private animateSlide(content: HTMLElement, options: HTMLElement, distance: number) {
    const transform = `translateX(-${distance}px)`;
    content.style.transform = transform;
    content.style.transition = 'none';
    
    // Show options as we slide
    options.style.transform = `translateX(${80 - distance}px)`;
    options.style.opacity = (distance / 80).toString();
  }

  private openItem(content: HTMLElement, options: HTMLElement) {
    content.style.transform = 'translateX(-80px)';
    content.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    options.style.transform = 'translateX(0px)';
    options.style.opacity = '1';
    options.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease';
    
    // Class is already added in onMove method
  }

  private closeItem(content: HTMLElement, options: HTMLElement) {
    content.style.transform = 'translateX(0px)';
    content.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    options.style.transform = 'translateX(80px)';
    options.style.opacity = '0';
    options.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease';
    
    // Remove slide-open class from the slide item
    const slideItem = content.closest('.slide-item');
    if (slideItem) {
      slideItem.classList.remove('slide-open');
    }
  }

  private closeAllItems() {
    this.slideItems.forEach(itemRef => {
      const item = itemRef.nativeElement;
      const itemContent = item.querySelector('.item-content');
      const itemOptions = item.querySelector('.item-options');
      
      if (itemContent && itemOptions) {
        this.closeItem(itemContent, itemOptions);
      }
      
      // Remove slide-open class from all items
      item.classList.remove('slide-open');
    });
    this.currentOpenItem = null;
  }

  onItemClick(item: any, event: Event) {
    // Find the clicked slide item element
    const clickedElement = (event.target as HTMLElement).closest('.slide-item');
    
    // If the clicked item is currently open (has slide-open class), close it
    if (clickedElement && clickedElement.classList.contains('slide-open')) {
      event.stopPropagation();
      this.closeAllItems();
      return;
    }
    
    // Otherwise, navigate to the appointment
    console.log('Navigating to appointment:', item.title); // Debug log
    this.selectedAppointment.emit(item);
  }

  onMessageClick(item: any, event: Event) {
    event.stopPropagation();
    this.closeAllItems();
    alert(`Message ${item.title}`);
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  // Handler to close open sliders when clicking outside
  handleDocumentClick = (event: MouseEvent) => {
    // Check if the click is inside any slide-item or item-options
    const target = event.target as HTMLElement;
    if (
      target.closest('.slide-item') ||
      target.closest('.item-options')
    ) {
      // Click is inside a slide item or its options, do nothing
      return;
    }
    // Otherwise, close all open sliders
    this.closeAllItems();
  };
}