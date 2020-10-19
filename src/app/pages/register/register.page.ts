import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Camera,CameraOptions } from '@ionic-native/camera/ngx';
import { UserServiceService } from '@services/user/user-service.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

declare var faceapi;

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  confPassword = document.getElementById('confPassword');
  image: String;
  loading: any;
  showBar = false;
  isFace = false;
  hide = true;
  step1 = true;
  step2 = false;
  mensajeSelfi ="";
  aceptarTerminos = false;
  form_register1: FormGroup;
  form_register2: FormGroup;
  minConfidence: number = 0.9;
  img = new Image();
  mostrarAlertConfinacion = true;
  showBtnSelfi = 1;
  constructor(
    private form: FormBuilder,
    private camera: Camera,
    private userService: UserServiceService,
    private alertController: AlertController,
    private router: Router,
    private loadingController:LoadingController,
    private translate: TranslateService,
    private storage: Storage
  ) {
    translate.get('SELFIE').subscribe(
      value => {
        this.mensajeSelfi = value;
      }
    )
  }

  ngOnInit() {
    this.formRegister();
    this.loadModels();
  }

  formRegister(){
    this.form_register1 = this.form.group({
      name: ['', [
        Validators.required,
        Validators.pattern("[a-zA-Z ]{2,150}")
      ]],
      apellidoP: ['', [
        Validators.required,
        Validators.pattern("[a-zA-Z ]{2,150}")
      ]],
      apellidoM: ['',[Validators.pattern("[a-zA-Z ]{2,150}")]],
      email: ['', [
        Validators.required,
        Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ]],
      nClient: ['', [
        Validators.required,
        Validators.pattern("^[0-9]{9}$"),
        Validators.min(1)
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,12}")
      ]],
      password2: ['', [
        Validators.required
      ]]
    }, {validator: this.checkPasswords});
    this.form_register2 = this.form.group({
      phone: ['', [
        Validators.required,
        Validators.pattern("^[0-9]{10}$")
      ]],
      curp: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-ZñÑ]{4}[\d]{6}(H|h|M|m)[a-zA-Z]{5}[a-zA-Z0-9]{2}$/)
      ]],
      dateBirth: ['', [Validators.required]],
      img: [''],
      checkTerm:[false]
    })
  }

  createCount(){
    this.translate.get('WAIT').subscribe(
      value => {
        this.presentLoading(value+"...");
      }
    )
    this.userService.register(this.form_register1.value,this.form_register2.value).toPromise().then(response => {
      //Guardar local
      //let lol= localStorage.setItem("user", JSON.stringify(response));
      this.storage.set('user', JSON.stringify(response)).finally(()=>{
        this.sendCode();
        this.translate.get(["MORESTEP",'SEND',"RESEND","CHECKMESSAGES","INFOREGISTER","CANCEL","CODEAUTHENTICATION"]).subscribe(
          value => {
            this.presentAlertPhone(value);
          }
        ) 
      });   
    }).catch( err => {
        this.loading.dismiss();
        this.translate.get("BADDATA").subscribe(
          value => {
            this.presentAlert('Error!',value);
          }
        )
      }).finally(() =>{
      })
  }

  tomarFoto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      targetWidth: 350,
      targetHeight: 350,
      correctOrientation: true,
      cameraDirection: this.camera.Direction.FRONT
    }
    this.camera.getPicture(options).then((imageData) => {
      this.form_register2.get("img").setValue(imageData);
      this.image = 'data:image/jpeg;base64,' + imageData      
      setTimeout(() => this.detect(), 200);
    }, (err) => {
      this.translate.get('LOADINGPHOTO').subscribe(
        value => {
          this.presentAlert('Ups!',value);
        }
      )
    });
  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('password').value;
    let confirmPass = group.get('password2').value;
    if(pass === confirmPass){
      return group.get('password2').setErrors(null)
    }else{
      return group.get('password2').setErrors({notEquivalent: true})
    }    
  }

  sendCode(){
    this.userService.sendCode(this.form_register2.get("phone").value).toPromise().then(response => {

    }).catch( err => {
      this.translate.get('TRYAGAIN').subscribe(
        value => {
          this.presentAlert('Error!',value);
        }
      )
    }).finally(() => {
      this.loading.dismiss();
    })
  }

  verificationCode(code){
    this.userService.verificationCode(code.code,this.form_register2.get("phone").value).toPromise().then(response => {      
      this.translate.get(['CREATEUSER','CORRECTDATA']).subscribe(
        value => {
          this.presentAlert(value.CORRECTDATA+"!",value.CREATEUSER);
        }
      ) 
      this.router.navigate(['/login']);
    }).catch( err => {
      this.translate.get(["MORESTEP",'SEND',"RESEND","CHECKMESSAGES","INFOREGISTER","CANCEL","CODEAUTHENTICATION"]).subscribe(
        value => {
          this.presentAlertPhone(value);
        }
      )
      this.translate.get('BADCODE').subscribe(
        value => {
          this.presentAlert('Error!',value);
        }
      )
    }).finally(() => {
      
    })
  }

//Face api
  async detect() {
    this.showBar = true;
    const urlImg = document.getElementById('img-photo');
    const options = this.getFaceDetectorOptions();
    let fullFaceDescriptions = await faceapi.detectAllFaces(urlImg,options);

    //Ver si es cara con un 90%
    if(fullFaceDescriptions.length==1){
      this.translate.get('SELFIEOK').subscribe(
        value => {
          this.mensajeSelfi = value;
        }
      )
      this.showBtnSelfi=2;
      this.isFace=true;
      this.translate.get(['SELFIEOK','ISFACE']).subscribe(
        value => {
          this.presentAlert(value.SELFIEOK+"!",value.ISFACE);
        }
      )
    }else{
      this.form_register2.get("img").setValue("");
      this.showBtnSelfi=3;
      this.isFace=false;
      this.translate.get('SELFIEERROR').subscribe(
        value => {
          this.mensajeSelfi = value;
        }
      )
      this.translate.get('NOTFACE').subscribe(
        value => {
          this.presentAlert('Error!',value);
        }
      )
    }
    this.showBar = false;
  }

  async loadModels() {
    const deviceMemory = (navigator as any).deviceMemory;
    if (deviceMemory && deviceMemory >= 1) {
      await faceapi.nets.ssdMobilenetv1.load(await faceapi.fetchNetWeights('../../../assets/face-api/ssd_mobilenetv1.weights'));
    }  
  }

  getFaceDetectorOptions() {
    return new faceapi.SsdMobilenetv1Options({ minConfidence: this.minConfidence })
  }


  //Alertas
  async presentAlert(header,msj) {
    const alert = await this.alertController.create({
      header: header,
      message: msj,
      buttons: ['OK']
    });

    await alert.present();
  }
 
  async presentAlertPhone(wordTra) {
    const alert = await this.alertController.create({
      header: wordTra.MORESTEP,
      subHeader: wordTra.CHECKMESSAGES+'!',
      message: wordTra.INFOREGISTER,
      cssClass: "alertcss",
      inputs: [
        {
          name: 'code',
          type: 'text',
          placeholder: wordTra.CODEAUTHENTICATION
        }
      ],
      buttons: [
        {
          text: wordTra.SEND,
          cssClass: 'btn-alert btn-success-alert',
          handler: (data) => {
            this.verificationCode(data);
            alert.dismiss();
          }
        },
        {
          text: wordTra.CANCEL,
          role: 'cancel',
          cssClass: 'btn-alert btn-success-cancelar'
        }, {
          text: wordTra.RESEND,
          cssClass: 'btn-alert btn-success-resend',
          handler: () => {
            this.sendCode();
          }
        }
      ]
    });

    await alert.present();
  }

  async presentLoading(message) {
    this.loading = await this.loadingController.create({
      message,
      cssClass: 'custom-class custom-loading'
    });
    return this.loading.present();
  }

  get name(){
    return this.form_register1.get('name')
  }
  get apellidoP(){
    return this.form_register1.get('apellidoP')
  }
  get apellidoM(){
    return this.form_register1.get('apellidoM')
  }
  get email(){
    return this.form_register1.get('email')
  }
  get nClient(){
    return this.form_register1.get('nClient')
  }
  get password(){
    return this.form_register1.get('password')
  }
  get password2(){
    return this.form_register1.get('password2')
  }
  get phone(){
    return this.form_register2.get('phone')
  }
  get curp(){
    return this.form_register2.get('curp')
  }
}