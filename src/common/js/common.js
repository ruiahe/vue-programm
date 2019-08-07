export const common = {
    back: function(){
        console.log(document.referrer);
        if(document.referrer){
            window.history.go(-1);
        }
    }
}