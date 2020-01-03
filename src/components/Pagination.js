import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Pagination = ({active, perPage, total, paginate}) => {
    const pageNumbers=[];
    for(let i=1; i<= Math.ceil(total/perPage);i++){
        pageNumbers.push(i);
    }
    return(
        <nav className="pagination">
            {pageNumbers.map(number=>{
                if(number==active){
                    return (<li key={number} className="page-item active">
                        <a onClick={()=>paginate(number)} className='page-link'>
                            {number}
                        </a>
                    </li>);
                } else {
                    return(<li key={number} className="page-item">
                        <a onClick={()=>paginate(number)} className='page-link'>
                            {number}
                        </a>
                    </li>
                    );
                }
            })}
        </nav>
    )
}
export default Pagination;