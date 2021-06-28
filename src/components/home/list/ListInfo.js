import {React} from 'react';
import './ListInfo.css';
import ListItem from './ListItem/ListItem'



const ListInfo = ({ data, setData}) => {
    
    const deleteHandle = async (id) => {
        await fetch("http://localhost:8000/data/" + id, {
          method: "DELETE",
        });
        const newItem = data.filter((info) => info.id !== id);
        setData(newItem);
    };
   
    return (
        <div>
          
            <table>
                <thead>
                <tr className="table-sheet">
                    <th>Name</th>
                    <th>Number</th>
                    <th>Age</th>
                    <th>Delete</th>
                </tr>
                </thead>
                {data.map((item) => (
                <ListItem item={item} deleteHandle={deleteHandle}  key={item.id}/>
                ))}
            </table>
        </div>
    )
}
export default ListInfo