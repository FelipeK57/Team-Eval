import './InfoMessage.css';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import PropTypes from 'prop-types';
import { useState } from 'react';

function InfoMessage(props) {

    const [message,setMessage] = useState(false);

    InfoMessage.propTypes = {
        Message: PropTypes.string
    }

    return (
        <div className="Info">
            <button className="InfoButtonRubricas" onClick={() => setMessage(true)} onBlur={() => setMessage(false)}>
                <PriorityHighIcon sx={{ fontSize: 20 }} />
            </button>
            <div className={message ? "InfoMessage show" : "InfoMessage hide"}>
                <p>{props.Message}</p>
            </div>
        </div>
    );
}

export default InfoMessage