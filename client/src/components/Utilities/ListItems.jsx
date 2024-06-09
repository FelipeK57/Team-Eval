import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import "./ListItems.css";

function ListItems(props) {
    return (
        <div className="List">
            <div className='ItemContainer'>
                <div className='LeftList'>
                    <div className="NombreList">
                        <h2>{props.Nombre1}</h2>
                        {props.Nombre2 && <h2>{props.Nombre2}</h2>}
                    </div>
                    <div className='CodeList'>
                        <h2>{props.Codigo1}</h2>
                    </div>
                </div>
                {props.Buttons && (
                    <div className='RightList'>
                        {props.Btn1 && (
                            <CreateIcon className='CreateIconList' sx={{ fontSize: "3rem", margin: "0 10%" }} onClick={props.onClickEdit} />
                        )}
                        {props.Btn2 && (
                             <DeleteIcon className='CreateIconList' sx={{ fontSize: "3rem", color: "red",  }} onClick={props.onClickDelete} />
                        )}
                        {props.Btn3 && (
                            <AddIcon className='CreateIconList'
                            sx={{ fontSize: "3rem", color: "black" }} onClick={props.onClickAdd}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

ListItems.propTypes = {
    Nombre1: PropTypes.string.isRequired,
    Nombre2: PropTypes.string,
    Codigo1: PropTypes.string.isRequired,
    onClickEdit: PropTypes.func,
    onClickDelete: PropTypes.func,
    onClickAdd: PropTypes.func,
    Buttons: PropTypes.bool.isRequired,
    onClick2: PropTypes.func,
    Btn1: PropTypes.bool,
    Btn2: PropTypes.bool,
    Btn3: PropTypes.bool,
};

export default ListItems;
