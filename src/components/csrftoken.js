import React, {useState, useEffect} from "react";
import axios from 'axios';

export const CSRFToken = () => {
    const [csrftoken, setCsrftoken] = useState('');
    
    useEffect(() => {
        const fetchData = async () => {
            try  {
                await axios({
                    withCredentials: true,
                    method: 'get',
                    url: `${process.env.NEXT_PUBLIC_MIDSERVER_URL}/authbackend/getcsrftoken/`,
                    mode: 'same-origin'
                }).then(function (response) {
                    setCsrftoken(response.data);
                }
                );
            } catch(err) {
                console.log('csrf token error: \n' + err);
            }
        }
        fetchData();
    }, [])

    return(
        <input type='hidden' name='csrfmiddlewaretoken' value={csrftoken}/>      
    );
}

