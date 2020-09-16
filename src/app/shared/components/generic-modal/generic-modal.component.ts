import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.scss']
})
export class GenericModalComponent implements OnInit {
  @Input() public isOpen: boolean = false;

  constructor() { }

  ngOnInit(): void { }
}
