# SlimPOPUP - Category Popup for Big Data

![NG-SlimPOP](slimpop-logo.png)

### ng-SlimPOPUP is built in Angular 5+, The Module is a Category Popup with a configuration with option to add API Endpoint. SlimPOPUP comes with a built-in Magic Scroller, which allows you to dynamically create listed-items per category and its responding level, It's magic, We will be able to read Big Size Data at fast-speed manners. 

### V1.0.0 Includes the option to "Save" the selection to the local storage, In the case of clicking the cancel button, the local storage data gets deleted within the same ID.

## Installation:

* Please Download the package from here, and place it inside your project, In the case you don't have a project yet, Please go ahead and create a new one `ng new myApp`. ([Angular CLI Documentation](https://angular.io/cli))
* Import the Module inside your app.module.ts `import { SlimPopupModule } from './ng-slimPOP';`
* Add it to your Import Brackets `SlimPopupModule.forRoot()` on app.module.ts

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HomePageComponent } from './home-page/home-page.component';

import { AppComponent } from './app.component';
// Import SlimPopup Module
import { SlimPopupModule } from './ng-slimPOP';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    // Import into the APP
    SlimPopupModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Modal Schema:

```
theme: {
    header_container: {
        title: 'SELECT CATEGORIES TO BROWSE',
        left_image: './assets/images/category.png',
        left_width: '24px',
        right_image: './assets/images/right-icon.png',
        right_width: '24px',
        background: '#fffcc'
    },
    body_container: {
        title: '',
        background: 'white'
    },
    footer_container: {
        title: '',
        background: '#c0c0c0'
    }
},
db: {
    url: 'http://localhost:8080/api/v1/'
    },
    buttons: {
        left: {
            label: 'DONE',
            color: 'btn-primary',
            class: 'custom-1',
        },
        right: {
            label: 'CANCEL',
            color: 'btn-flat',
            class: 'custom-2',
        }
    },
    selector: {
        id: 'modal-1'
    },
    debug: {
        enabled: false
    },
    init_button: {
        selector: 'modal-1',
        label: 'OPEN MODAL',
        color: 'btn-primary',
        class: 'custom-button',
    }

```

## Get Started:

1) Create a new component within your application, Let's start by openning the terminal on location of our project, Create a new component using angular-cli `ng g c homePage` this is the short-hand g = generate, c = component. Read more at the [Angular CLI Documentation](https://angular.io/cli).

2) Open the newly created component `.ts` file by angular-cli, `app/home-page/home-page.component.ts` and import the necessary Service, and Configuration from the package. `import { SlimPopSelectionService } from '../ng-slimPOP/services';`

3) Create a property, for this example, We will be using `modalData` go ahead and create it before the `constructor(){}` - `private modalData: any = {};`

4) Fire it, depending on your needs, on the `constructor(){}` or `ngOnInit(){}`

```
    ngOnInit(): void {
        this.modalData = {
            // Copy Above Modal Schema Data 
        }
    }
```

5) Include the Wrapper and Button Selector on the HTML file created by the angular-cli `app/home-page/home-page.component.html`.

```
<!-- Place Button to Trigger -->
<slim-pop 
    [config]="modalData.init_button">
</slim-pop>

<!-- Wrapper Container -->
<slim-pop-wrapper 
    [config]="modalData" 
    (saved)="savedModal($event)" 
    (closed)="closeModal($event)">
</slim-pop-wrapper>
```
#### Selectors Breakdown

*  `slim-pop`: This selector contains the button selector and the option for the popup to be trigger, it could be placed anywhere in the page, it must contain a configuration that comes from the `modalData` started before on the `ngOnInit(){}`.

* `slim-pop-wrapper`: This selector contains the main body of the popup category, In order to open the correct modal, please make sure to have a similar id has the `slim-pop`. It also has to be on the same page of the `slim-pop`, it could be place anywhere it just has to be on the same html file. This wrapper also contain two output events in order to communicate back and forth with the inner components.

6) Save our HTML File, and Let's go back to our `.TS` file, `app/home-page/home-page.component.ts` 
If you realized in the HTML Markup, there is two functions that get trigger whenever save or close button gets click Let's go ahead and create them to pass the `$event` of the click.

```
savedModal(e){
    console.log(e)
}

closeModal(e){
    console.log(e)
}
```


## API

The basic Schema for the return json goes as follow : 

```

[
  {
  "Level": 1,
  "SlimPOPDetails": [
    {
        "BrowsingCategoryId": 1,
        "ID": "01",
        "Name": "ALL CATEGORIES",
        "Level": 1,
        "ParentID": "00",
        "ChildCount": 5,
        "Index": 0,
        "ItemList": [{
            "PasName": "ALL CATEGORIES",
            "Level": 0,
            "ChildCount": 0
        }]
    }]
    },

    {
    "Level": 2,
    "SlimPOPDetails": [
    {
        "BrowsingCategoryId": 2,
        "ID": "02",
        "Name": "Computers",
        "Level": 2,
        "ParentID": "01",
        "ChildCount": 2,
        "Index": 1,
        "ItemList": [{
            "PasName": "Computers",
            "Level": 0,
            "ChildCount": 0
        }]
    }, 
  
    {
        "BrowsingCategoryId": 3,
        "ID": "03",
        "Name": "Music",
        "Level": 2,
        "ParentID": "01",
        "ChildCount": 2,
        "Index": 2,
        "ItemList": [{
            "PasName": "Music",
            "Level": 0,
            "ChildCount": 0
        }]
    }, 
    {
        "BrowsingCategoryId": 4,
        "ID": "04",
        "Name": "Sports",
        "Level": 2,
        "ParentID": "01",
        "ChildCount": 2,
        "Index": 3,
        "ItemList": [{
            "PasName": "Sports",
            "ChildCount": 0
        }]
    }, 
    {
        "BrowsingCategoryId": 5,
        "ID": "05",
        "Name": "Cars",
        "Level": 2,
        "ParentID": "01",
        "ChildCount": 2,
        "Index": 4,
        "ItemList": [{
            "PasName": "Cars",
            "Level": 0,
            "ChildCount": 0
        }]
    }, 
    {
        "BrowsingCategoryId": 6,
        "ID": "06",
        "Name": "TV",
        "Level": 2,
        "ParentID": "01",
        "ChildCount": 2,
        "Index": 5,
            "ItemList": [{
            "PasName": "TV",
            "Level": 0,
            "ChildCount": 0
        }]
    }]
},

{
  "Level": 3,
  "SlimPOPDetails": [
{
    "BrowsingCategoryId": 7,
    "ID": "07",
    "Name": "Video Cards",
    "Level": 3,
    "ParentID": "02",
    "ChildCount": 1,
    "Index": 33,
    "ItemList": [{
        "PasName": "Video Cards",
        "Level": 0,
        "ChildCount": 0
    }]
  }, 
  {
    "BrowsingCategoryId": 8,
    "ID": "08",
    "Name": "Monitors",
    "Level": 3,
    "ParentID": "02",
    "ChildCount": 1,
    "Index": 34,
    "ItemList": [{
      "PasName": "Monitors",
      "Level": 0,
      "ChildCount": 0
    }]
  },
  {
    "BrowsingCategoryId": 9,
    "ID": "08",
    "Name": "House Music",
    "Level": 3,
    "ParentID": "03",
    "ChildCount": 1,
    "Index": 33,
    "ItemList": [{
        "PasName": "House Music",
        "Level": 0,
        "ChildCount": 0
    }]
  }, 
  {
    "BrowsingCategoryId": 10,
    "ID": "09",
    "Name": "Techno Music",
    "Level": 3,
    "ParentID": "03",
    "ChildCount": 1,
    "Index": 34,
    "ItemList": [{
      "PasName": "Techno Music",
      "Level": 0,
      "ChildCount": 0
    }]
  },
  {
    "BrowsingCategoryId": 11,
    "ID": "10",
    "Name": "Boxing",
    "Level": 3,
    "ParentID": "04",
    "ChildCount": 1,
    "Index": 35,
    "ItemList": [{
        "PasName": "Boxing",
        "Level": 0,
        "ChildCount": 0
    }]
  }, 
  {
    "BrowsingCategoryId": 12,
    "ID": "11",
    "Name": "Football",
    "Level": 3,
    "ParentID": "04",
    "ChildCount": 1,
    "Index": 36,
    "ItemList": [{
      "PasName": "Football",
      "Level": 0,
      "ChildCount": 0
    }]
  },
  {
    "BrowsingCategoryId": 13,
    "ID": "12",
    "Name": "New",
    "Level": 3,
    "ParentID": "05",
    "ChildCount": 1,
    "Index": 37,
    "ItemList": [{
        "PasName": "New",
        "Level": 0,
        "ChildCount": 0
    }]
  }, 
  {
    "BrowsingCategoryId": 14,
    "ID": "13",
    "Name": "Used",
    "Level": 3,
    "ParentID": "05",
    "ChildCount": 1,
    "Index": 38,
    "ItemList": [{
      "PasName": "Used",
      "Level": 0,
      "ChildCount": 0
    }]
  },
  {
    "BrowsingCategoryId": 15,
    "ID": "14",
    "Name": "HDTV",
    "Level": 3,
    "ParentID": "06",
    "ChildCount": 1,
    "Index": 39,
    "ItemList": [{
        "PasName": "HDTV",
        "Level": 0,
        "ChildCount": 0
    }]
  }, 
  {
    "BrowsingCategoryId": 16,
    "ID": "15",
    "Name": "FLAT TV",
    "Level": 3,
    "ParentID": "06",
    "ChildCount": 1,
    "Index": 40,
    "ItemList": [{
      "PasName": "FLAT TV",
      "Level": 0,
      "ChildCount": 0
    }]
  }
  
  
  ]
},

{
  "Level": 4,
  "SlimPOPDetails": [
    {
        "BrowsingCategoryId": 17,
        "ID": "16",
        "Name": "New",
        "Level": 4,
        "ParentID": "07",
        "ChildCount": 1,
        "Index": 41,
        "ItemList": [{
        "PasName": "New",
        "Level": 0,
        "ChildCount": 0
        }]
    },
    {
        "BrowsingCategoryId": 18,
        "ID": "17",
        "Name": "New",
        "Level": 4,
        "ParentID": "08",
        "ChildCount": 1,
        "Index": 42,
        "ItemList": [{
        "PasName": "New",
        "Level": 0,
        "ChildCount": 0
        }]
    },
    {
        "BrowsingCategoryId": 19,
        "ID": "18",
        "Name": "Upcoming",
        "Level": 4,
        "ParentID": "09",
        "ChildCount": 1,
        "Index": 42,
        "ItemList": [{
        "PasName": "Upcoming",
        "Level": 0,
        "ChildCount": 0
        }]
    },
    {
        "BrowsingCategoryId": 20,
        "ID": "19",
        "Name": "Pay-Per-View",
        "Level": 4,
        "ParentID": "10",
        "ChildCount": 1,
        "Index": 42,
        "ItemList": [{
        "PasName": "Pay-Per-View",
        "Level": 0,
        "ChildCount": 0
        }]
    },
    {
        "BrowsingCategoryId": 21,
        "ID": "20",
        "Name": "World-Cup",
        "Level": 4,
        "ParentID": "11",
        "ChildCount": 1,
        "Index": 42,
        "ItemList": [{
        "PasName": "World-Cup",
        "Level": 0,
        "ChildCount": 0
        }]
    },
    {
        "BrowsingCategoryId": 22,
        "ID": "21",
        "Name": "Audi",
        "Level": 4,
        "ParentID": "12",
        "ChildCount": 1,
        "Index": 43,
        "ItemList": [{
        "PasName": "Audi",
        "Level": 0,
        "ChildCount": 0
        }]
    },
    {
        "BrowsingCategoryId": 23,
        "ID": "22",
        "Name": "Honda",
        "Level": 4,
        "ParentID": "13",
        "ChildCount": 1,
        "Index": 44,
        "ItemList": [{
        "PasName": "Honda",
        "Level": 0,
        "ChildCount": 0
        }]
    },
    {
        "BrowsingCategoryId": 24,
        "ID": "23",
        "Name": "Plasma LED",
        "Level": 4,
        "ParentID": "14",
        "ChildCount": 1,
        "Index": 45,
        "ItemList": [{
        "PasName": "Plasma LED",
        "Level": 0,
        "ChildCount": 0
        }]
    },
    {
        "BrowsingCategoryId": 25,
        "ID": "24",
        "Name": "Regular TV",
        "Level": 4,
        "ParentID": "15",
        "ChildCount": 1,
        "Index": 46,
        "ItemList": [{
        "PasName": "Regular TV",
        "Level": 0,
        "ChildCount": 0
        }]
    }
    ]
},

{
  "Level": 4,
  "SlimPOPDetails": [
    {
        "BrowsingCategoryId": 26,
        "ID": "25",
        "Name": "Less than a month",
        "Level": 5,
        "ParentID": "16",
        "ChildCount": 0,
        "Index": 47,
        "ItemList": [{
        "PasName": "Less than a month",
        "Level": 0,
        "ChildCount": 0
        }]
    },
    {
        "BrowsingCategoryId": 27,
        "ID": "26",
        "Name": "Less than a month",
        "Level": 5,
        "ParentID": "17",
        "ChildCount": 0,
        "Index": 48,
        "ItemList": [{
        "PasName": "Less than a month",
        "Level": 0,
        "ChildCount": 0
        }]
    },
    {
        "BrowsingCategoryId": 28,
        "ID": "29",
        "Name": "In a month",
        "Level": 5,
        "ParentID": "18",
        "ChildCount": 0,
        "Index": 49,
        "ItemList": [{
        "PasName": "In a month",
        "Level": 0,
        "ChildCount": 0
        }]
    },
    {
        "BrowsingCategoryId": 29,
        "ID": "30",
        "Name": " Golden Boy Presents",
        "Level": 5,
        "ParentID": "19",
        "ChildCount": 0,
        "Index": 50,
        "ItemList": [{
        "PasName": "Golden Boy Presents",
        "Level": 0,
        "ChildCount": 0
        }]
    },
    {
        "BrowsingCategoryId": 30,
        "ID": "31",
        "Name": "Brazils VS Spain",
        "Level": 5,
        "ParentID": "20",
        "ChildCount": 0,
        "Index": 51,
        "ItemList": [{
        "PasName": "Brazils VS Spain",
        "Level": 0,
        "ChildCount": 0
        }]
    },
    {
        "BrowsingCategoryId": 31,
        "ID": "32",
        "Name": "Automatic",
        "Level": 5,
        "ParentID": "21",
        "ChildCount": 0,
        "Index": 52,
        "ItemList": [{
        "PasName": "Automatic",
        "Level": 0,
        "ChildCount": 0
        }]
    },
    {
        "BrowsingCategoryId": 32,
        "ID": "33",
        "Name": "Automatic",
        "Level": 5,
        "ParentID": "22",
        "ChildCount": 0,
        "Index": 53,
        "ItemList": [{
        "PasName": "Automatic",
        "Level": 0,
        "ChildCount": 0
        }]
    },
    {
        "BrowsingCategoryId": 33,
        "ID": "34",
        "Name": "New",
        "Level": 5,
        "ParentID": "23",
        "ChildCount": 0,
        "Index": 54,
        "ItemList": [{
        "PasName": "New",
        "Level": 0,
        "ChildCount": 0
        }]
    },
    {
        "BrowsingCategoryId": 34,
        "ID": "35",
        "Name": "New",
        "Level": 5,
        "ParentID": "24",
        "ChildCount": 0,
        "Index": 55,
        "ItemList": [{
        "PasName": "New",
        "Level": 0,
        "ChildCount": 0
        }]
    }
  ]
}
]

```

### Story behind the development

I created ng-SlimPopup to served the need's for an efficient popup category modal, especially keeping in mind the usage of the virtual dom, as well as the usage of dynamic injectors to allow the leverage of the angular lifecycle hooks which resulted in a better performance lifecycle.

Back in the corp world, the biggest challenge was to be able to load a BIG Chunks of Data that was spit-out on JSON Format, But hey it's JSON, how bad can I be? It was pretty bad, The first file that i was allowed to open on my maxed out computer contain over 1,200,000 lines, Now imagine merging 10 different files like that and at the same time allow the modal to load on time.... madness right! but hey I already took care of that, feel free to use the module, extend, expand, share (before this module took 35 seconds, after migration of this module response time is 9 seconds)<3