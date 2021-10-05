import { Component, OnInit } from '@angular/core';
import { Survey } from '../cards/data';
import { SurveyService } from '../survey.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  name:string = "anas mahmoud"
  initials:string = ''
  dataList!: any;
  matTabLabels = ['Published', 'Expired', 'Closed'];
  selectedCards: any;
  result: string[] = [];

  constructor(private rs : SurveyService) { }

  ngOnInit(): void {
    this.getAllSurveys();

    this.name.split(" ").forEach((i:string)=>{
      this.initials += i.split('')[0].toUpperCase()
    })
  }

  public getAllSurveys()
  {
    let resp = this.rs.getSurveys();
    resp.subscribe((report: any) =>
      {
        this.dataList = report
      })
  }


  tabChanged(event: any) {
    console.log(event);
    if (event.index != 0) {
      const filterText = event.tab.textLabel;
      this.selectedCards = this.dataList.filter((card: any) => {
        return card.SURVEY_STATUS_EN === filterText;
      });
      console.log(this.selectedCards);
    } else {
      this.selectedCards = this.dataList;
    }
  }

}
