import React from 'react';
import ReactDOM from 'react-dom';

const LittleCard = (props) =>{
    return(
        <>  
            <div className="card text-black bg-warning container-flex" 
            style={{width: '20rem', minHeight:'15rem', margin: '1rem 1rem 1rem 1rem' }}>
                <div className="card-header" style={{height:'auto', width:'auto'}}>
                    {props.planeta.name}
                </div>
                <div className="card-body" style={{height:'100%'}}>
                    <p className="card-text" >Population: {props.planeta.population}</p>
                    <p className="card-text" >Climate: {props.planeta.climate}</p>
                    <p className="card-text" >Terrain: {props.planeta.terrain}</p>
                    {props.filmes.map((film, key)=>{
                        return <p>{film}</p>
                    })}
                </div>
            </div>
        </>
    );
}
  
  export default LittleCard;