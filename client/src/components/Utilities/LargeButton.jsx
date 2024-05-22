import './LargeButton.css'
import PropTypes from 'prop-types'
import '@mui/icons-material'

function LargeButton(props) {
    LargeButton.propTypes = {
        text: PropTypes.string.isRequired,
        onClick: PropTypes.func,
        icon: PropTypes.string
    }
    return (
        <div className="LargeButton">
            <h1 className="TitleLargeButton">{props.text}</h1>
            <hr />
            <button className="ButtonLarge" onClick={props.OnClick}>
                {props.icon}
            </button>
        </div>
    );
}
export default LargeButton