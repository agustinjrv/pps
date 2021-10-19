import { Component,OnInit } from '@angular/core';
import { GoogleMapOptions, GoogleMaps, LocationService, MyLocation } from '@ionic-native/google-maps';
import { IMarker } from 'src/app/interfaces/IMarker/imarker';
import { Geolocation } from '@ionic-native/geolocation/ngx';


declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public map=null;

  constructor(private geolocation: Geolocation) {
    
  }


  ngOnInit(){
    this.loadmap();
    this.loadMap();
  }

  loadMap() {
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    // create LatLng object
    const myLatLng = {lat: 4.658383846282959, lng: -74.09394073486328};
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
  
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      //this.renderMarkers();
      mapEle.classList.add('show-map');
    });
  }

  addMarker(marker: IMarker) {
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title
    });


  }

  public ObtenerUbicacion(){
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
     });
  }

  loadmap() {
    LocationService.hasPermission().then(()=>{
      console.log('A');
    });
    /*LocationService.getMyLocation().then((myLocation: MyLocation) => {
    
      console.log(myLocation);
      let options: GoogleMapOptions = {
        camera: {
          target: myLocation.latLng
        }
      };
      this.map = GoogleMaps.create('map_canvas', options);

    });*/
  }

}
