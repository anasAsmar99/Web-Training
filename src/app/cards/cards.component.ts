import {Component, Input, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { SurveyService } from '../survey.service';
import { Survey } from './data';

/**
 * @title Basic cards
 */
@Component({
  selector: 'app-cards',
  templateUrl: 'cards.component.html',
})
export class CardsComponent implements OnInit {

  @Input('data')data!: Survey;
  @Input() isSelected:number=-1;
  cardStyle = 'btn-default';

  constructor(private rs: SurveyService) { }

  ngOnInit(){

  }

  onSelect()
  {
    return {'selected_id':this.isSelected == this.data.TEMPLATE_ID};
  }

  selectedCard()
  {
    this.rs.selectedItem.emit(this.data);
    console.log(this.data);
  }

  onChange() {
    if(this.cardStyle == 'btn-change') {
      this.cardStyle = 'btn-default';
    } else {
      this.cardStyle = 'btn-change';
    }
  }

}
