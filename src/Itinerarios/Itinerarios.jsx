import { useEffect, useState } from "react";
import { useCookies} from "react-cookie";



function Itinerarios() {
    const [rutas, setRutas] = useState([]);
    const [cookies, setCookie, removeCookie ] = useCookies('session')

    useEffect(() => {
        let body = JSON.stringify({
            token: (cookies.session ? cookies.session.token : '')
        })
        fetch('http://127.0.0.1:8000/get-rutas', { method: "post",
        body:body,
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        }, })
            .then(response => response.json())
            .then(data => setRutas(data.data));
    }, []);



}


export default Itinerarios