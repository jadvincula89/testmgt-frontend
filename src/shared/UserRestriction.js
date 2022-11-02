
export async function UserRestriction(type, subtype) {
    var allowed = 0;
      var UserAccess= await JSON.parse(localStorage.getItem('UserAccess'));
      
    if(localStorage.getItem('UserAccess')){
    //this.props.UserAccess["Maintenance"].sub_modules
    var nav_name = "";
  
    var nav_access = "";
    if (type === subtype) {
        var UserAccess=JSON.parse(localStorage.getItem('UserAccess'));
  
    
    } else {
      for (var i = 0; i < UserAccess[type].sub_modules.length; i++) {
        nav_name = Object.keys(
          UserAccess[type].sub_modules[i]
        ).toString();
        nav_access = Object.values(
          UserAccess[type].sub_modules[i]
        ).toString();
      
        if (nav_name === subtype) {
          allowed=nav_access;
        } 
      
      }
    }
return allowed; 
}
else
    return allowed;
  }