import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import {
  NgbAlertConfig, NgbModal, ModalDismissReasons, NgbModalRef, NgbActiveModal
} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  providers: [NgbAlertConfig]
  //  styles: [`   
  // .red-modal .modal-content {
  //      background-color: red;
  //      color: white;
  //    }
  //    .red-modal .close {
  //      color: white;   
  //    }
  //  `]
})
export class AlertComponent implements OnInit, OnChanges {
    //    alertConfig.dismissible = false;  

  @Input() titel: string;
  @Input() alertBoodschap: string;
  @Input() welBoodschap: string;
  @Input() nietBoodschap: string;
  @Input() isOpen: boolean;
  @ViewChild('content') private _content;
  private _titel: string;
  private _alertBoodschap: string;
  private _welBoodschap: string;
  private _nietBoodschap: string;
  private _isOpen: boolean;

  changeLog:string[] = [];

  @Output() actie = new EventEmitter<boolean>();
  //TODO in de toekomst eventueel 1 object met de bovenstaande attributen.
  constructor(private _modalService: NgbModal) {
    //    alertConfig.type = 'danger';
    //    alertConfig.dismissible = false;
  }

  ngOnInit() {
    this.open(this._content);
    this._titel = this.titel;
    this._alertBoodschap = this.alertBoodschap;
    this._nietBoodschap = this.nietBoodschap;
    this._isOpen = this.isOpen;
    this._welBoodschap = this.welBoodschap
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      this.changeLog.push(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
      console.log(this.changeLog);
    }
    const titel: SimpleChange = changes["titel"];
    if(titel.isFirstChange()){
      this._titel = this.titel;
    }
    const alertBoodschap: SimpleChange = changes["alertBoodschap"];
    if(titel.isFirstChange()){
      this._alertBoodschap = this.alertBoodschap;
    }
    const nietBoodschap: SimpleChange = changes["nietBoodschap"];
    if(titel.isFirstChange()){
      this._nietBoodschap = this.nietBoodschap;
    }
    const isOpen: SimpleChange = changes["isOpen"];
    if(titel.isFirstChange()){
      this._isOpen = this.isOpen;
    }
    const welBoodschap: SimpleChange = changes["welBoodschap"];
    if(titel.isFirstChange()){
      this._welBoodschap = this.welBoodschap;
    }

  }

  get titel2() {
    return this._titel
  }

  get welBoodschap2() {
    return this._welBoodschap;
  }
  get nietBoodschap2() {
    return this._nietBoodschap;
  }
  get isOpen2() {
    return this._isOpen;
  }
  get alertBoodschap2() {
    return this._alertBoodschap;
  }

  get modalService() {
    return this._modalService;
  }

  get content() {
    return this._content;
  }

  //annuleer() {
  //  this.actie.emit(false);
  //}

  open(content) {
    this.modalService.open(content/*, { windowClass: 'red-modal' }*/);
  }

  uitvoeren(accepteren: boolean) {
    this.actie.emit(accepteren);
  };
}
