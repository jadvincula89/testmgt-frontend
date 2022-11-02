import axios from 'axios';
import Cookies from 'universal-cookie';

export function GetData(endpoint, isEnableToken){
    const cookies = new Cookies();

    let BaseUrl = process.env.REACT_APP_API_URL_ROOT;
    
    const config = (isEnableToken !== true) ? {} : { headers: { Authorization: `Bearer ${cookies.get('accessToken')}` } };
    
    return new Promise((resolve, reject) => {
        axios.get(BaseUrl+endpoint, config)
        .then((response) => {
            resolve(response);
        })
        .catch((error) => {
            resolve(error.response);
        });
    });
    
}