import {Component, Host, OnDestroy, OnInit} from '@angular/core';
import { UsMapService } from '../us-map.service';
import {geoJSON, Layer, tileLayer} from "leaflet";
import {StateService} from "../state.service";
import {HttpClient} from "@angular/common/http";
import {Location} from "@angular/common";
import {StateIdService} from "../state-id.service";
import {ActivatedRoute, Router} from "@angular/router";
import {State} from "../utilities/auto-complete/auto-complete.component";


@Component({
  selector: 'app-mapd3',
  templateUrl: './mapd3.component.html',
  styleUrls: ['./mapd3.component.css']
})
export class Mapd3Component implements OnInit{

  public stateId;
  public lat;
  public lng;
  allDataFetched = false;
  id: string;


  layers: Layer[];
  layersControl: any;
  center: any;
  fitBounds: any;
  data: any;
  layerData: any;
  coordinates: object;
  states: State[] = [

    {
      name: 'Alaska',
      population: '741K',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Flag_of_Alaska.svg',
      abbrv: 'AK'
    }, {
      name: 'Alabama',
      population: '4.8M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Alabama.svg',
      abbrv: 'AL'
    },{
      name: 'Arkansas',
      population: '2.9M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg',
      abbrv: 'AR'
    }, {
      name: 'Arizona',
      population: '6.9M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arizona.svg',
      abbrv: 'AZ'
    },
    {
      name: 'California',
      population: '39.5M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg',
      abbrv: 'CA'
    },
    {
      name: 'Colorado',
      population: '5.5M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Flag_of_Colorado.svg',
      abbrv: 'CO'
    },
    {
      name: 'Connecticut',
      population: '3.5M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Flag_of_Connecticut.svg',
      abbrv: 'CT'
    },
    {
      name: 'District of Columbia',
      population: '693K',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_the_District_of_Columbia.svg',
      abbrv: 'DC'
    },
    {
      name: 'Delaware',
      population: '952K',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/c/c6/Flag_of_Delaware.svg',
      abbrv: 'DE'
    },
    {
      name: 'Florida',
      population: '20.9M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg',
      abbrv: 'FL'
    },
    {
      name: 'Georgia',
      population: '10.3M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/5/54/Flag_of_Georgia_%28U.S._state%29.svg',
      abbrv: 'GA'
    },
    {
      name: 'Hawaii',
      population: '1.4M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Flag_of_Hawaii.svg',
      abbrv: 'HI'
    },
    {
      name: 'Iowa',
      population: '3.1M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Flag_of_Iowa.svg',
      abbrv: 'IA'
    },
    {
      name: 'Idaho',
      population: '1.7M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_Idaho.svg',
      abbrv: 'ID'
    },
    {
      name: 'Illinois',
      population: '12.8M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_Illinois.svg',
      abbrv: 'IL'
    }, {
      name: 'Indiana',
      population: '6.6M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Flag_of_Indiana.svg',
      abbrv: 'IN'
    },
    {
      name: 'Kansas',
      population: '2.9M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Flag_of_Kansas.svg',
      abbrv: 'KS'
    },
    {
      name: 'Kentucky',
      population: '4.4M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Flag_of_Kentucky.svg',
      abbrv: 'KY'
    },
    {
      name: 'Louisiana',
      population: '4.6M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Flag_of_Louisiana.svg',
      abbrv: 'LA'
    },
    {
      name: 'Massachusetts',
      population: '6.8M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Flag_of_Massachusetts.svg',
      abbrv: 'MA'
    },
    {
      name: 'Maryland',
      population: '6.0M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Flag_of_Maryland.svg',
      abbrv: 'MD'
    },
    {
      name: 'Maine',
      population: '1.3M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Flag_of_Maine.svg',
      abbrv: 'ME'
    },
    {
      name: 'Michigan',
      population: '9.9M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Flag_of_Michigan.svg',
      abbrv: 'MI'
    },
    {
      name: 'Minnesota',
      population: '5.5M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Minnesota.svg',
      abbrv: 'MN'
    },
    {
      name: 'Missouri',
      population: '6.0M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Flag_of_Missouri.svg',
      abbrv: 'MO'
    },{
      name: 'Mississippi',
      population: '2.9M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Flag_of_Mississippi.svg',
      abbrv: 'MS'
    },
    {
      name: 'Montana',
      population: '1.0M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_Montana.svg',
      abbrv: 'MT'
    },
    {
      name: 'North Carolina',
      population: '10.0M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Flag_of_North_Carolina.svg',
      abbrv: 'NC'
    }, {
      name: 'North Dakota',
      population: '755K',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Flag_of_North_Dakota.svg',
      abbrv: 'ND'
    }, {
      name: 'Nebraska',
      population: '1.9M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Flag_of_Nebraska.svg',
      abbrv: 'NE'
    },
    {
      name: 'New Hampshire',
      population: '1.34M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Flag_of_New_Hampshire.svg',
      abbrv: 'NH'
    }, {
      name: 'New Jersey',
      population: '9.0M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Flag_of_New_Jersey.svg',
      abbrv: 'NJ'
    }, {
      name: 'New Mexico',
      population: '2.0M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_New_Mexico.svg',
      abbrv: 'NM'
    },
    {
      name: 'Nevada',
      population: '2.9M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Flag_of_Nevada.svg',
      abbrv: 'NV'
    },
    {
      name: 'New York',
      population: '19.8M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_New_York.svg',
      abbrv: 'NY'
    },
    {
      name: 'Ohio',
      population: '11.6M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Flag_of_Ohio.svg',
      abbrv: 'OH'
    }, {
      name: 'Oklahoma',
      population: '3.9M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Flag_of_Oklahoma.svg',
      abbrv: 'OK'
    },   {
      name: 'Oregon',
      population: '4.0M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Oregon.svg',
      abbrv: 'OR'
    },
    {
      name: 'Pennsylvania',
      population: '12.8M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Pennsylvania.svg',
      abbrv: 'PA'
    }, {
      name: 'Rhode Island',
      population: '1.0M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Rhode_Island.svg',
      abbrv: 'RI'
    },
    {
      name: 'South Carolina',
      population: '5.0M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Flag_of_South_Carolina.svg',
      abbrv: 'SC'
    }, {
      name: 'South Dakota',
      population: '865K',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_South_Dakota.svg',
      abbrv: 'SD'
    },
    {
      name: 'Tennessee',
      population: '6.7M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Tennessee.svg',
      abbrv: 'TN'
    },{
      name: 'Texas',
      population: '28.3M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg',
      abbrv: 'TX'
    },
    {
      name: 'Utah',
      population: '3.1M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Flag_of_Utah.svg',
      abbrv: 'UT'
    },
    {
      name: 'Virginia',
      population: '8.4M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Flag_of_Virginia.svg',
      abbrv: 'VA'
    }, {
      name: 'Vermont',
      population: '624K',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Vermont.svg',
      abbrv: 'VT'
    },
    {
      name: 'Washington',
      population: '7.4M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/5/54/Flag_of_Washington.svg',
      abbrv: 'WA'
    }, {
      name: 'Wisconsin',
      population: '5.7M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Flag_of_Wisconsin.svg',
      abbrv: 'WI'
    }, {
      name: 'West Virginia',
      population: '1.8M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Flag_of_West_Virginia.svg',
      abbrv: 'WV'
    }, {
      name: 'Wyoming',
      population: '585K',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Wyoming.svg',
      abbrv: 'WY'
    }
  ];

  constructor(
              private usMapService: UsMapService,
              private http: HttpClient,
              @Host() public router: Router,
              private location: Location,
              private state_service:StateService,
              private state_id_service:StateIdService) {

}


  ngOnInit() {

        this.lat = 39.76;
        this.lng = -98.5;
        this.center = [this.lat, this.lng];
        this.fitBounds = [[71.6359939575, -66.8463134766],
          [18.9006824493, -179.066162109]];
        this.allDataFetched = true;

    this.displayBoundaries('state');
  }




  displayBoundaries(type): void {

    let url = '/assets/data/USA/USA.geojson';

    let states = this.states;
    let router = this.router;


    function outer_fun(param: any) {
      let state_name =  param.feature.properties.NAME;
      for (let i = 0; i < states.length; i++) {
        if (states[i].name === state_name) {

          router.navigate(['/states/' + states[i].abbrv.toUpperCase()]);
        }
      }

    }


      this.http.get<any>(url)
      .subscribe(geo1 => {
        let defaultBaseLayer = tileLayer.provider('OpenStreetMap.Mapnik');
        let defaultOverlay = geoJSON(geo1, {
          onEachFeature: function (feature, layer) {

            this.layerData = layer
            let color = '';
            let val = Math.floor(Math.random() * 100) + 1;
            //TODO: change random color
            if(val%2==0){
              color = "#FF0000";
            }
            else {
              color = "#0000FF"
            }

            this.layerData.options.color = color;

            //console.log(layer);
            let popupContent = '<h1>name: '+this.layerData.feature.properties.NAME+'</h1>';


            layer.bindPopup(popupContent);

            function helper_fun(param: any) {
              outer_fun(param);
            }

            layer.on('click', function () {
              helper_fun(this);
            });
            layer.on('mouseover', function () {
              this.openPopup();
            });
            layer.on('mouseout', function () {
              this.closePopup();
            });
          }
        });
        this.layers = [
          defaultBaseLayer,
          defaultOverlay
        ];
        this.layersControl = {
          baseLayers: {
            'OpenStreetMap Mapnik': defaultBaseLayer,
            'OpenStreetMap BlackAndWhite': tileLayer.provider('OpenStreetMap.BlackAndWhite')
          },
          overlays: {
            'Overlay One': defaultOverlay
          }
        };

      });
  }




}
