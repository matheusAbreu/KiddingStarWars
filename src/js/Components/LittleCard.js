import React from 'react';

const LittleCard = (props) =>(
    <>  
        <div className="card text-white bg-success container-flex" 
        style={{width: '20rem', minHeight:'15rem', margin: '1rem 1rem 1rem 1rem' }}>
            <div className="card-header" style={{height:'auto', width:'auto'}}>
                {props.title}
            </div>
            <div className="card-body" style={{height:'100%'}}>
                <p className="card-text" >{props.text}</p>
            </div>
        </div>
    </>
);
  
  export default LittleCard;