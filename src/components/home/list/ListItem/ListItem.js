import React from 'react';
import './ListItem.css';
import trash from '../../../../images/trash.svg';
import edit from '../../../../images/edit.svg';
import {Link} from 'react-router-dom';

const Info = ({ item, setEdit, deleteHandle}) => {
    return (
        <tbody>
            <tr className="row">
               <td><Link className="link" to={`/history/${item.id}`}>{item.patient_name}</Link></td>
                <td> <Link className="link" to={`/history/${item.id}`}>{item.patient_phone_number}</Link></td>
                <td><Link className="link" to={`/history/${item.id}`}>{item.patient_age}</Link></td>
                <td><img onClick={() => deleteHandle(item.id)} style={{ width: "20px", cursor: "pointer" }} src={trash} alt="delete" /></td>
            </tr>

        </tbody>
    )
}
export default Info