import axios from 'axios';

/* verificar si hay una session abierta en una cookie llamada jwt*/
export const isLogged = () => {
    /* verificar si esta con sesion abierta: apiprueba-production-93dc.up.railway.app/api/auth/user con get*/
    
    axios.get('apiprueba-production-93dc.up.railway.app/api/auth/user', {headers: {'Authorization': `Bearer ${jwt}`}})
    .then(res => {
        console.log(res);
        return true;
    })
    .catch(err => {
        console.log(err);
        return false;
    });
}
 // Aquí puedes hacer lo que desees con el token
