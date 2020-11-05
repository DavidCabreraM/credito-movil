export class ChangePassword {
    private viejo_password:String;
    private nuevo_password:String;

    set setOldPassword(text:string){
        this.viejo_password=text;
    }

    set setNewpassword(text:string){
        this.nuevo_password=text;
    }
}
