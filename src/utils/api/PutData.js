import axios from 'axios';
import Cookies from 'universal-cookie';

export function PutData(type, userData, isEnableToken){
    const cookies = new Cookies();

    let BaseUrl = process.env.REACT_APP_API_URL_ROOT;
    
    const config = (isEnableToken !== true) ? {} : { headers: { Authorization: `Bearer ${cookies.get('accessToken')}` } };

    return new Promise((resolve, reject) => {
        axios.put(BaseUrl+type, userData, config)
        .then((response) => {
            resolve(response);
        })
        .catch((error) => {
            resolve(error.response);
        });
    });
    
}