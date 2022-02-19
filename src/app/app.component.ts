import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my angular-d3-chart';

  examples = [

    { title: 'home',
      route: ''
    },
    { title: 'line-chart',
      route: '/static/my-chart'
    },
    { title: 'multiline-chart',
      route: '/static/my-multiline-chart'
    },
    { title: 'changed-chart',
      route: '/dynamic/my-changed-chart'
    },
    { title: 'arc-chart',
      route: '/dynamic/my-arc-chart'
    },
    { title: 'form-chart',
      route: '/dynamic/form-chart'
    },
  ]
}
