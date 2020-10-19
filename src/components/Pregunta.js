import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import Error from './Error';

const Pregunta = ({guardarRestante, guardarPresupuesto, actualizarPregunta}) => {

    const [ cantidad, guardarCantidad] = useState(0);
    const [ error, guardarError] = useState(false);

    // Función que lee el presupuesto
    const definirPresupuesto = e => {
        guardarCantidad( parseInt(e.target.value, 10) )
    }

    const agregarPresupuesto = e => {
        e.preventDefault();

        if(cantidad < 1 || isNaN( cantidad )){
            guardarError(true);
            return;
        }
        guardarError(false);
        guardarPresupuesto(cantidad);
        guardarRestante(cantidad);
        actualizarPregunta(false);
    }
     
    return ( 
        <Fragment>
            <h2>Coloca tu presupuesto</h2>

            { error ? <Error mensaje="Presupuesto erroneo"/> : null}

            <form
                onSubmit={agregarPresupuesto}
            >

                <input
                    type="number"
                    className="u-full-width"
                    placeholder="Coloca tu presupuesto"
                    onChange={definirPresupuesto}
                />

                <input
                    type="submit"
                    className="button-primary u-full-width"
                    value="Definir Presupuesto"
                />  
            </form>


        </Fragment>
     );
}

PropTypes.propTypes = {
    guardarRestante: PropTypes.func.isRequired,
    guardarPresupuesto: PropTypes.func.isRequired,
    actualizarPregunta: PropTypes.func.isRequired
}
 
export default Pregunta;