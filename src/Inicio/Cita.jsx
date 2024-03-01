import * as React from 'react';
import ComillasApertura from "../img/comillasAper.png";
import ComillasCierre from "../img/comillasCierre.png";

export default function Cita() {
    return (
        <div style={{ marginTop: '20px' }}>
            <img src={ComillasApertura} style={{ width: '100px', display: 'block', margin: '0 auto' }} />
            <figure className="text-center">
                <div style={{ width: '75%' , margin: '0 auto'}}>
                    <blockquote className="blockquote">
                        <p style={{ fontSize: '2rem' }}>El Naranco, testigo silente de historias reales que se entretejen con la bruma de la leyenda, forjando relatos que perduran en la memoria.</p>
                    </blockquote>
                    <figcaption className="blockquote-footer">
                        M. A. Macía
                    </figcaption>
                </div>
            </figure>
            <img src={ComillasCierre} style={{ width: '100px', display: 'block', margin: '0 auto' }} />
        </div>
    );
}
