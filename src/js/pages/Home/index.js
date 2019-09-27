import React from "react";
import LittleCard from '../../Components/LittleCard';
import {Spinner, Button} from 'react-bootstrap' ;
const REACT_APP_API_SW = process.env.REACT_APP_API_SW;

class Profile extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            films: undefined,
            totalPlanetas: 0,
            error:'',
            totalAutualizado:false,
            planeta: undefined
        }
    }
    GerandoNumeroAleatorio = () =>
    {
        var randomNumber;

        randomNumber = Math.trunc(Math.random()*100);

        if(randomNumber > this.state.totalPlanetas )
            randomNumber -= this.state.totalPlanetas;

        return randomNumber;
    }
    BuscandoTotalPlanetas = () =>
    {
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
                    totalPlanetas: response.count,
                    totalAutualizado: true
                });
                return true;
            }
        throw new Error("Houve um erro ao carregar a quantidade de planetas...");
        })
        .catch(e => {
            this.setState({...this.state, error: e.message});
         }); 
    }
    MudarPlaneta = () =>
    {
        this.setState({...this.state, planeta: undefined, films:[]});
        this.BuscandoPlaneta();
    }
    BuscandoFilms()
    {
        const requestInfo = {
            method: 'GET',
            body: JSON.stringify()
        };
        fetch(REACT_APP_API_SW + '/films/', requestInfo)
        .then(response => response.json())
        .then(response => {
            if(response.title !== '')
            {
                this.setState({...this.state, films: response});
                return true;
            }
        throw new Error("Houve um erro ao carregar o filme...");
        })
        .catch(e => {
            this.setState({...this.state, error: e.message});
         }); 
    }
    async BuscandoPlaneta() {
        if(!this.state.totalAutualizado)
           await this.BuscandoTotalPlanetas()

        let planetaRamdom = this.GerandoNumeroAleatorio();
        const requestInfo = {
            method: 'GET',
            body: JSON.stringify()
        };
        fetch(REACT_APP_API_SW + '/planets/' + planetaRamdom.toString()+ '/', requestInfo)
        .then(response => response.json())
        .then(response => {
            if(response.name !== '')
            {
                this.setState({
                    ...this.state,
                    planeta: response,
                });
                return true;
            }

        throw new Error("Houve um erro ao carregar o planeta...");
        })
        .catch(e => {
            this.setState({...this.state, error: e.message});
         }); 
    }   
    render(){
        if(!this.state.totalAutualizado)
        {   
            this.BuscandoFilms();
            this.BuscandoPlaneta();
        }
           
          
        return(
            <div>
                 <div className='row'>
                    <br/>
                    {(this.state.planeta !== undefined )?(
                        <div>
                            <LittleCard planeta={this.state.planeta} filmes={this.state.filmesPlaneta} />
                            <Button variant='warning' onClick={this.MudarPlaneta} >Next</Button>
                        </div>
                    ):(
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