import './LargeButton.css'
import PropTypes from 'prop-types'
import '@mui/icons-material'

function LargeButton(props) {
    LargeButton.propTypes = {
        text: PropTypes.string.isRequired,
        OnClick: PropTypes.func.isRequired,
        icon: PropTypes.string,
    }
    return (
        <div className="LargeButton" style={props.text ? null: {padding: " 0 "}}>
            {props.text ? <h1 className="TitleLargeButton">{props.text}</h1>: null}
            {props.text ? <hr />: null}
            <button className="ButtonLarge" onClick={props.OnClick} style={props.text ? null: {marginLeft: "8vw", marginRight: "8vw"}}>
                {props.icon}
            </button>
        </div>
    );
}
export default LargeButton