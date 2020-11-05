export class ResetPassword {
    private account_no:String;
    private newPassword:String;
    private curp:String;
    private codigo:String;

    set setAccountNo(text:string){
        this.account_no=text;
    }

    set setNewPassword(text:string){
        this.newPassword=text;
    }
    set setCurp(text:string){
        this.curp=text.toUpperCase();
    }

    set setCode(text:string){
        this.codigo=text;
    }
}