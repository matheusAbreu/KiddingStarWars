import React from "react";
import LittleCard from '../../Components/LittleCard';
import {Spinner} from 'react-bootstrap' ;
const REACT_APP_API_SW = process.env.REACT_APP_API_SW;

class Profile extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            planetasCarregados: [],
            error:'',
            listaAtualizada:false
        }
    }
    BuscandoProjetos = () => {
        const requestInfo = {
            method: 'GET',
            body: JSON.stringify()
        };
        fetch(REACT_APP_API_SW + '/planets/', requestInfo)
        .then(response => response.json())
        .then(response => {
            if(response.count > 0)
            {
                this.setState({
                    ...this.state,
                    planetasCarregados: response.results,
                    listaAtualizada: true
                });
                return true;
            }
        throw new Error("Houve um erro ao carregar os projetos...");
        })
        .catch(e => {
            this.setState({...this.state, error: e.message});
         }); 
    }   
    render(){
        if(!this.state.listaAtualizada)
           this.BuscandoProjetos();
          
        return(
            <div>
                 <div className='row' >
                    <br/>
                    {(this.state.listaAtualizada )?(
                        this.state.planetasCarregados.map((planetas, index) =>{
                        return <LittleCard key={index} title={planetas.name} text={''} />
                    })):(
                        <div className='col-12' style={{alignItems: 'center', display:'flex', justifyContent:'center'}} >
                            <Spinner variant='success' as="span" animation="border" role="status" aria-hidden="true" />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
export default Profile;

/*
    {(this.state.listaAtualizada === false)?(
                        this.state.planetasCarregados.map((projeto, index) =>{
                        return <LittleCard key={index} title={projeto.name} text={projeto.diameter} />
                    })):(
                        <div className='col-12' style={{alignItems: 'center', display:'flex', justifyContent:'center'}} >
                            <Spinner variant='success' as="span" animation="border" role="status" aria-hidden="true" />
                        </div>
                    )}
*/