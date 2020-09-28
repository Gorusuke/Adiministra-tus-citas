import React, { Fragment, useState } from 'react';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    // Crear state de citas
    const [cita, setCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora:'',
        sintomas: ''
    });

    const [error, setError] = useState(false)

    // Funcion que se ejecuta cada que un usuario escribe en un input
    const actualizarState = (e) => {
        setCita({
            ...cita,
            [e.target.name]: e.target.value 
        })
    }

    // Extraer los valores
    const {mascota, propietario, fecha, hora, sintomas} = cita;

    // Cuando el usuario envia el formulario
    const submitCita = (e) => {
        e.preventDefault();

        // Validar los campos
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
           setError(true);
           return;
        }

        // Eliminar el mensaje del IF
        setError(false);

        // Asiganr un ID
        cita.id = uuid();

        // Crear la cita
        crearCita(cita);

        // Reiniciar el form
        setCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora:'',
            sintomas: ''
        })
    }

    return ( 
        <Fragment>
            <h2>Crear Cita</h2>

            {error ? <p className="alerta-error">Todos Los Campos Son Obligatorios</p> : null}

            <form 
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={mascota}
                />
                <label>Nombre Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre dueño de la macota"
                    onChange={actualizarState}
                    value={propietario}
                />
                <label>Fecha:</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />
                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />
                <label>Sintomas</label>
                <textarea
                    name="sintomas"
                    className="u-full-width"
                    placeholder="Escribe aqui los sintomas"
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>
                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>

            </form>
        </Fragment>
    );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}
export default Formulario;