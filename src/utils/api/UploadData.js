
import Cookies from 'universal-cookie';

export function UploadData(endpoint, userData, isEnableToken){
    const cookies = new Cookies();

    let BaseUrl = process.env.REACT_APP_API_URL_ROOT;
   
    const config = (isEnableToken !== true) ? {} : { headers: { Authorization: `Bearer ${cookies.get('accessToken')}` } };

    return new Promise((resolve, reject) => {
        fetch(BaseUrl+endpoint,{
            method: 'POST',
            headers: {
            
                'Authorization': 'Bearer ' + cookies.get('accessToken'),
            },
            body: userData
        })
        .then((response) => response.json())
        .then((responseJson) =>{
            resolve(responseJson);
        })
        .catch((error) => {
            reject();
        })
    });

}