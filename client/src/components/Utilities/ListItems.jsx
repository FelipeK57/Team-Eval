import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import PropTypes from 'prop-types';
import "./ListItems.css"

function ListItems(props) {
    ListItems.propTypes = {
        Nombre1: PropTypes.string.isRequired,
        Nombre2: PropTypes.string.isRequired,
        Codigo1: PropTypes.string.isRequired,
        onClickEdit: PropTypes.func,
        onClickDelete: PropTypes.func,
        Buttons: PropTypes.bool.isRequired
    }
    return (
        <div className="List">
            <div className='ItemContainer'>
                <div className='LeftList'>
                    <div className="NombreList">
                        <h2>{props.Nombre1}</h2>
                        <h2>{props.Nombre2}</h2>
                    </div>
                    <div className='CodeList'>
                        <h2>{props.Codigo1}</h2>
                    </div>
                </div>
                {props.Buttons ? <div className='RightList'>
                    <CreateIcon className='CreateIconList' sx={{ fontSize: "3rem", margin: "0 10%" }} onClick={props.onClickEdit} />
                    <DeleteIcon className='CreateIconList' sx={{ fontSize: "3rem", color: "red" }} onClick={props.onClickDelete}  />
                </div> : null}
            </div>
        </div>
    );
}

export default ListItems;