import PropTypes from 'prop-types';
import "./ListEstDes.css"
import ReplayIcon from '@mui/icons-material/Replay';

function ListEstDes(props) {
    ListEstDes.propTypes = {
        Nombre1: PropTypes.string.isRequired,
        Codigo1: PropTypes.string.isRequired,
        Apellido1: PropTypes.string.isRequired,
        onClickRestored: PropTypes.func,
        Buttons: PropTypes.bool.isRequired
    }
    return (
        <div className="ListDesEst">
            <div className='ItemContainerEstDes'>
                <div className='LeftListEstDes'>
                    <div className="NombreListEstDes">
                        <h2>{props.Nombre1}</h2>
                        <h2>{props.Apellido1}</h2>
                    </div>
                    <div className='CodeListEstDes'>
                        <h2>{props.Codigo1}</h2>
                    </div>
                </div>
                {props.Buttons ? <div className='RightListEstDes'>
                    <ReplayIcon  className='IconRestored' sx={{ fontSize: "3rem", margin: "0 10%" }} onClick={props.onClickRestored} />
                </div> : null}
            </div>
        </div>
    );
}

export default ListEstDes;
