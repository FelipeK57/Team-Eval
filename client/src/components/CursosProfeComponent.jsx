import PropTypes from 'prop-types';
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';
import './CursosProfeComponent.css'
function CursosProfeComponent(props) {

    CursosProfeComponent.propTypes = {
        Estado: PropTypes.array.isRequired,
        configurarCurso: PropTypes.func,
        nombreCurso: PropTypes.string
    }

    return (
        <div>
            {props.Estado ? <div className="cardex3">
                <div className="cardex32"><h1>{props.nombreCurso}</h1>
                    <hr className='line-horizonte' />
                    <div className="buttonsCursosProfeComponent">
                        <button>
                            <GroupsIcon sx={{ fontSize: 43 }} />
                        </button>
                    </div>
                </div>
            </div> : <div className="cardex3 NoCompleted">
                <div className="cardex42"><h1>{props.nombreCurso}</h1>
                    <hr className='line-horizonte' />
                    <div className="buttonsCursosProfeComponent">
                        <button className="button1" onClick={props.configurarCurso} >
                            <SettingsIcon sx={{ fontSize: 43 }} />
                        </button>
                        <button className="button2" >
                            <GroupsIcon sx={{ fontSize: 43 }} />
                        </button>
                    </div>
                </div>
            </div>}
            
        </div>
    );
}

export default CursosProfeComponent;