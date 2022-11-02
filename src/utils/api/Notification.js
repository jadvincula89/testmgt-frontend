import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
export function Notification(message, type='default',position='top-right'){
   switch(type) {
    case 'success':
         toast.success(message, {
            position: position,
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            break;
    case 'warning':
       toast.warning(message, {
            position: position,
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
             break;
     case 'error':
        toast.error(message, {
            position: position,
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
             break;
     case 'info':
           toast.info(message, {
                  position: position,
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  });     
                  break;     
      case 'default':
           toast(message, {
                   position: position,
                   autoClose: 2000,
                   hideProgressBar: false,
                   closeOnClick: true,
                   pauseOnHover: true,
                   draggable: true,
                   progress: undefined,
                    });     
                     break;      
    default: 
           console.error("Unhandled Type of Notification")
   }
    
    
}