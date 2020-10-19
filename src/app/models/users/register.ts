export class Register{
    private account_no: String;
    private apellido_materno: String;
    private apellido_paterno: String;
    private nombre: String;
    private selfi: String;
    private clave_ine: String;
    private serie_ine: String;
    private curp: String;
    private fecha_nacimiento: Date;
    private email: String;
    private password: String;
    private numero_movil: String;

    set setAccountNo(text:string){
        this.account_no=text;
    }
    set setApellidoPaterno(text:string){
        this.apellido_paterno=text.toUpperCase();
    }
    set setApellidoMaterno(text:string){
        this.apellido_materno=text.toUpperCase();
    }
    set setName(text:string){
        this.nombre=text.toUpperCase();
    }
    set setSelfie(text:string){
        this.selfi=text;
    }
    set setIneKey(text:string){
        this.clave_ine=text;
    }
    set setIneSeries(text:string){
        this.serie_ine=text;
    }
    set setCurp(text:string){
        this.curp=text.toUpperCase();
    }
    set setDateBirth(text:Date){
        this.fecha_nacimiento=text;
    }
    set setEmail(text:string){
        this.email=text;
    }
    set setPassword(text:string){
        this.password=text;
    }
    set setPhone(text:string){
        this.numero_movil=text;
    }
}
//Ejemplo de como se usa
//let r = new Register();
//r.accountNo = "00000000";