import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService, CreateRequestSupporMessagesInput, ListRequestSupporMessagesByRequestQuery, OnRequestSupporMessagesChatSubscription, SubscriptionResponse } from 'src/app/API.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat-reports',
  templateUrl: './chat-reports.component.html',
  styleUrls: ['./chat-reports.component.sass']
})
export class ChatReportsComponent implements OnInit, OnDestroy, AfterViewInit {


  ngAfterViewInit(): void {
    this.scrollAutomatic();
  }

  @ViewChild('messagesContainer') messagesContainer: ElementRef | undefined;
  messageForm: FormGroup;
  idReport: any;
  dataUserReport: any = [];
  userAuth: any = [];
  dateCreateReport: string = '';
  requestMessages: any = [];
  resolveMessages: any = [];
  buttonDisabled: boolean = true;
  getRequestMessage: any[] = [];
  userStatusMessage: any = [];
  isOwnerMessage: boolean = true;
  private messagesSubscription: Subscription | undefined;
  userType: any;
  isloading: boolean = true;
  focusOn: boolean = false;
  activeButtonSend: boolean = false;
  scrollBtn: boolean = false;


  constructor(private userService: UserService, public utils: UtilsService, private api: APIService, private route: ActivatedRoute, private router: Router) {
    this.messageForm = new FormGroup({
      message: new FormControl('', Validators.required)
    });

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idReport = params['idReport'];
    });
    this.initializedChatReport();
    this.subscribeToMessages();
    this.scrollAutomatic();
    this.activeScrollBtn();
  }

  ngOnDestroy(): void {
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
  }

  async initializedChatReport() {
    await this.getDataReport();
    this.getUserStatusMessage();
    await this.getMessages();
    this.scrollAutomatic();
    this.handleFormControl();
    this.activeScrollBtn();
  }

  async getUserStatusMessage() {
    try {
      const response = await this.userService.getUser();
      this.userStatusMessage = response["userID"];
      this.userType = response["typeUser"];
    } catch (error) {
      console.error('Error al obtener el estado del usuario', error);
    }
  }

  async getDataReport() {
    const response = await this.api.GetRequestSupport(this.idReport);
    this.dataUserReport = response.user;
    this.dateCreateReport = this.utils.convertToDateCollaborator(response.createdAt);
    this.requestMessages = response.requestMessages;
    this.resolveMessages = this.resolveMessages;
  }

  async getMessages() {
    try {
      const response = await this.api.ListRequestSupporMessagesByRequest(this.idReport);

      if (Array.isArray(response.items))
        this.getRequestMessage = response.items;


      await this.scrollAutomatic();
    } catch (error) {
      console.error('Error al obtener mensajes', error);
    }
  }


  private subscribeToMessages() {
    this.api.OnRequestSupporMessagesChatListener(this.idReport).subscribe({
      next: (response: SubscriptionResponse<{ onRequestSupporMessagesChat: OnRequestSupporMessagesChatSubscription }>) => {
        try {
          const newMessages = response.value.data?.onRequestSupporMessagesChat;

          if (Array.isArray(newMessages)) {
            this.getRequestMessage = [...this.getRequestMessage, ...newMessages];
          } else if (newMessages) {
            this.getRequestMessage = [...this.getRequestMessage, newMessages];
          }

        } catch (error) {
          console.error('Error al procesar mensajes en tiempo real:', error);
        }
        this.scrollAutomatic();
      },
      error: (error) => {
        console.error('Error en la suscripción de mensajes en tiempo real', error);
      },
    });
  }
  async sendMessages() {
    try {
      const message = this.messageForm['value'].message;

      const data: CreateRequestSupporMessagesInput = {
        menssages: message,
        userID: this.userStatusMessage,
        requestSupportRequestSupporMessagesId: this.idReport
      };
      this.messageForm.setValue({ message: '' })

      await this.api.CreateRequestSupporMessages(data);
    } catch (error) {
      console.error('Error al enviar el mensaje', error);
    }
  }
  async scrollAutomatic() {
    const container = document.querySelector('.container-messages');
    if (container) {
      setTimeout(() => {
        container.scrollTop = container.scrollHeight;
      }, 5);
    }
  }

  handleKeyEnter() {
    const message = this.messageForm.value['message'];
    if (message.trim() !== '') {
      this.sendMessages();
    }
  }

  handleButtonClick() {
    this.sendMessages();
  }

  handleFormControl() {
    const message = this.messageForm.value['message'];
    if (message === '') { this.buttonDisabled = true } else {
      this.buttonDisabled = false
    }
  }

  behaviorTextArea(event: KeyboardEvent) {
    if (event.key === 'Enter') event.preventDefault()
  }

  activeScrollBtn() {
    const container = document.querySelector('.container-messages');

    container?.addEventListener('scroll', () => {
      if (container.scrollTop === 0) {
        this.scrollBtn = true;
      } else {
        this.scrollBtn = false;
      }
    });
  }

}
