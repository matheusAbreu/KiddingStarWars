import React from "react";
import LittleCard from '../../Components/LittleCard';
import {Spinner, Col, Row} from 'react-bootstrap' ;
const REACT_APP_API_SW = process.env.REACT_APP_API_SW;

class Profile extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            films: undefined,
            totalPlanetas: 0,
            tituloDosFilmesPlaneta: [],
            error:'',
            totalAutualizado:false,
            planeta: undefined
        }
        this.MudarPlaneta = this.MudarPlaneta.bind(this);
        this.BuscandoPlaneta = this.BuscandoPlaneta.bind(this);
    }
    GerandoNumeroAleatorio = () =>
    {
        var randomNumber;

        randomNumber = Math.trunc(Math.random()*100);

        if(randomNumber > this.state.totalPlanetas )
        {
            return this.GerandoNumeroAleatorio();
        }else if(randomNumber < 1)
        {
            randomNumber = 1;
        }
        return randomNumber;
    }
    InformandoNomeFilme = (url) =>
    {
        if(this.state.films !== undefined)
        {
            for(var i = 0;i < this.state.films.results.length;i++)
                if(this.state.films.results[i].url === url)
                    return this.state.films.results[i].title;

        }
        return '';
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
    async MudarPlaneta()
    {
        this.setState({...this.state,
            planeta: undefined,
        });
        await this.BuscandoPlaneta();        
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
        {
            await this.BuscandoTotalPlanetas();
            await this.BuscandoFilms();
            this.setState({...this.state, totalAutualizado:true});
        }
          
        let planetaRamdom = await this.GerandoNumeroAleatorio();
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
           this.BuscandoPlaneta();

        return(
            <Row>
            <Col md={4} />
              <Col >
                {(this.state.planeta !== undefined )?(
                        <div style={{width:'auto'}}>
                            <>
                                <LittleCard planeta={this.state.planeta} onClick={this.MudarPlaneta}
                                 filmes={this.state.planeta.films.map((movie)=> this.InformandoNomeFilme(movie))} />
                            </>
                        </div>
                    ):(
                        <div >
                            <Spinner variant='warning' as="span" animation="border" role="status" aria-hidden="true" />
                        </div>
                    )}
              </Col>
              <Col md={4} />
            </Row>
        );
    }
}
export default Profile;