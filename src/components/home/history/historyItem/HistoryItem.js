import React from 'react';
import './HistoryItem.css';
import trash from '../../../../images/trash.svg';
import edit from '../../../../images/edit.svg';
import {Link} from 'react-router-dom';



const HistoryItem = ({ item, data, deleteHandle}) => {

    console.log(item.result_date)
    console.log(typeof(item.result_date))

    return (
        <tbody>
            <tr className="row">
               <td> <Link className="link" to={`/history/details/${item.id}&${data.id}&${item.result_date}`}>{data.patient_name}</Link></td>
               <td> <Link className="link" to={`/history/details/${item.id}&${data.id}&${item.result_date}`}>{item.result_date}</Link></td>
                <td><Link to={`/history/edit/${item.id}&${data.id}`}><img  style={{ width: "20px", cursor: "pointer" }} src={edit} alt="edit" /></Link></td>
                <td><img onClick={() => deleteHandle(item.id)} style={{ width: "20px", cursor: "pointer" }} src={trash} alt="delete" /></td>
            </tr>
        </tbody>
    )
}
export default HistoryItem