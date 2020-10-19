import React, {useState} from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Error from './Error';


const Formulario = ({guardarGasto, guardarCrearGasto, restante}) => {

    const [nombre, guardarNombre] = useState('');
    const [cantidad, guardarCantidad] = useState();
    const [error, guardarError] = useState(false);
    const [nopresupuesto, guardarNoPresupuesto] = useState(false);

    const agregarGasto = e => {
        e.preventDefault();

        if (restante <= 0) {
            guardarNoPresupuesto(true);
        };

        if(cantidad < 1 || isNaN( cantidad ) || nombre.trim() === ''){
            guardarError(true);
            return;
        };
        guardarError(false);

        const gasto = {
            nombre, 
            cantidad,
            id: shortid.generate()
        };
        console.log(gasto);
        guardarGasto(gasto);
        guardarCrearGasto(true);

        guardarNombre('');
        guardarCantidad(0);
    }
    

    return ( 
        <form onSubmit={agregarGasto}>

            <h2>Agrega tu presupuesto:</h2>

            {error ? (<Error mensaje="Ambos campos son obligatorios"/>) : null}
            {nopresupuesto ? (<Error mensaje="No queda presupuesto"/>) : null}

            <div className="campo">
                <label>Nombre del gasto:</label>
                <input
                    type="text"
                    className="u-full-width"
                    placeholder="Ej. Luz"
                    value={nombre}
                    onChange={e => guardarNombre(e.target.value)}
                />
            </div>

            <div className="campo">
                <label>Gasto:</label>
                <input
                    type="number"
                    className="u-full-width"
                    placeholder="Ej. 250"
                    value={cantidad}
                    onChange={e => guardarCantidad(parseInt( e.target.value, 10 ))} 
                />
            </div>

            <input
                type="submit"
                className="button-prumary u-full-width"
                value="Agregar Gasto"
            />
        </form>
     );
}

Formulario.propTypes = {
    guardarGasto: PropTypes.func.isRequired,
    guardarCrearGasto: PropTypes.func.isRequired
}
 
export default Formulario;