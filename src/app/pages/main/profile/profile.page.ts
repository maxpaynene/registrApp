import { Component, OnInit, inject } from '@angular/core';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';
import { UtilsService } from 'src/app/services/utils.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  
})
export class ProfilePage implements OnInit {


  characters: any[] = [];
  params = {} as any;

  utilsSvc = inject(UtilsService);

  constructor(private rickAndMortySvc: RickAndMortyService) { }

  ngOnInit() {

    this.params.page = 0;
    this.getCharacters()

  }

  getCharacters(event?: any){

    this.params.page += 1;

    this.rickAndMortySvc.getCharacters(this.params).subscribe({

      next: (res: any) => {

        this.characters.push(...res.results)
        console.log(this.characters);


        if(event) event.target.complete();

      },

      error: (error: any) => {
        if(event) event.target.complete();
      }



    })

  }


  searchCharacters(){

    this.params.page = 1;

    this.rickAndMortySvc.getCharacters(this.params).subscribe({

      next: (res: any) => {

        this.characters = res.results


        

      },

      error: (error: any) => {
        
      }



    })

  }

  routerlinkHome (){

    this.utilsSvc.routerLink('/main/home');

  }

}
