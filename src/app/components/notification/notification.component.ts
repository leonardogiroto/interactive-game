import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  template: `
    <p class="notification" >
      {{ text }}
    </p>`,
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {

  @Input() text: string = '';

}
