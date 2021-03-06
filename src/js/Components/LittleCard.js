import React from 'react';
import {Button, Card} from 'react-bootstrap' ;
import '../../css/App.css';

const LittleCard = (props) =>{
    return(
        <>
            <Card bg='warning' style={{width: '100%', minHeight:'15rem', margin: '1rem 0rem 1rem 0rem' }}>
                <Card.Header style={{fontSize:'30px', fontStyle:'oblique'}} >{props.planeta.name}</Card.Header>
                <Card.Body style={{fontSize:'18px'}} >
                        <p>Population: {props.planeta.population}</p>
                        <p>Climate: {props.planeta.climate}</p>
                        <p>Terrain: {props.planeta.terrain}</p>
                        <p>Movies:  
                            {props.filmes.map((film) => <><br/>{film}</> )}
                        </p>
                </Card.Body>
            </Card>
            <Button variant='outline-warning' onClick={props.onClick}>
                Next
            </Button>
        </>
    );
}
export default LittleCard;