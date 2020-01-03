import React, { Component } from 'react'
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Person from './Person';
import Film from './Film.js';
import Planet from './Planet';
import Vehicle from './Vehicle';
import StarShip from './StarShip';
import Species from './Species';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
  });

const getPerson = (pageNo) =>{
    
    const all  = gql`
    query{
        
        getEveryPerson(page: ${pageNo}){

            results{
                name
                gender
                skin_color
                birth_year
                eye_color
                hair_color
                mass
                films{
                    title
                }
                starships{
                    name
                }
                vehicles{
                    name
                }

            }
        }

        
    }
    `;

    return all;
    
}

const getFilm = () =>{

    const all = gql`
    query{
        getEveryFilm{
            count
            results{
                episode_id
                title
                director
                release_date
                created 
                producer
                
            }
        }
    }
    `;
    return all;
}

const getPlanet = (pageNo) =>{
    
    const all  = gql`
    query{
        
        getEveryPlanet(page: ${pageNo}){

            results{
                name
                population
                gravity
                climate
                created
                diameter
                surface_water
                terrain
            }
        }

        
    }
    `;

    return all;
    
}

const getVehicle = (pageNo) =>{
    
    const all  = gql`
    query{
        
        getEveryVehicle(page: ${pageNo}){

            results{
                cargo_capacity
                cost_in_credits
                created
                crew
                model
                name
                passengers
            }
        }

        
    }
    `;

    return all;
    
}

const getStarShip = (pageNo) =>{
    
    const all  = gql`
    query{
        
        getEveryStarShip(page: ${pageNo}){

            results{
                cargo_capacity
                cost_in_credits
                created
                crew
                model
                name
                passengers
                MGLT
                hyperdrive_rating
                manufacturer

            }
        }

        
    }
    `;

    return all;
    
}

const getSpecies = (pageNo) =>{
    
    const all  = gql`
    query{
        
        getEverySpecies(page: ${pageNo}){

            results{
                name
                classification
                average_height
                homeworld
                homeworldData{
                    name
                }
                language
            }
        }

        
    }
    `;

    return all;
    
}

export class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {          
            people: null,
            film: null,
            planet: null,
            Vehicle: null,
            StarShip: null,
            Species: null,       
        }
    }

    QueryPeople = async pageNo =>{
        await client.query({
                    query: getPerson(pageNo)
                        })
                        .then(result => {
                            const data = result.data   
                            this.setState({
                                people: data.getEveryPerson.results
                                })
                                    
                        });
    }

    QueryFilm = async () =>{
        await client.query({
                    query: getFilm()
                            })
                            .then(result => {
                                 const data = result.data
                                this.setState({
                                    film: data.getEveryFilm.results
                                })
                            });
    }

    QueryPlanet = async pageNo =>{
        await client.query({
                    query: getPlanet(pageNo)
                            })
                            .then(result => {
                                const data = result.data  
                                this.setState({
                                    planet: data.getEveryPlanet.results
                                })
                                    
                            });
    }

    QueryVehicle = async pageNo =>{
        await client.query({
                    query: getVehicle(pageNo)
                            })
                            .then(result => {
                                const data = result.data  
                                this.setState({
                                    Vehicle: data.getEveryVehicle.results
                                })
                                    
                            });
    }

    QueryStarShip = async pageNo =>{
        await client.query({
                    query: getStarShip(pageNo)
                            })
                            .then(result => {
                                const data = result.data  
                                this.setState({
                                    StarShip: data.getEveryStarShip.results
                                })
                                    
                            });
    }

    QuerySpecies = async pageNo =>{
        await client.query({
                    query: getSpecies(pageNo)
                            })
                            .then(result => {
                                const data = result.data  
                                this.setState({
                                    Species: data.getEverySpecies.results
                                })
                                    
                            });
    }

    async setData(point,pageNo){
        if(point == 'person'){
            await this.QueryPeople(pageNo);
        }
        if(point == 'planet'){
            await this.QueryPlanet(pageNo);
        }
        if(point == 'vehicle'){
            await this.QueryVehicle(pageNo);
        }
        if(point == 'starship'){
            await this.QueryStarShip(pageNo);
        }
        if(point == 'species'){
            await this.QuerySpecies(pageNo);
        }
    
        
    }
    async componentDidMount(){
        await this.setData('person',1);
        await this.setData('planet',1);
        await this.setData('vehicle',1);
        await this.setData('starship',1);
        await this.setData('species',1);
        await this.QueryFilm();
        
    }
    
    render() {

        let { classes } = this.props;

        return (
        
            <div className={classes.home}>
            
            <ApolloProvider client={client}>


                <div className={classes.people}>

                    <h1 className={classes.title}>PLANETS</h1>

                    {(() => {
                            if(this.state.planet == null){
                                return (
                                    <div className={classes.loading}>
                                        <LinearProgress />
                                    </div>
                                )
                            }else{
                                return(
                                    
                                <Planet planet={this.state.planet} />
                            )}
                    })()}
                    
                        <ul className={classes.list}>
                            <li className={classes.listitem}><Button onClick={() => this.setData('planet',1)}>1</Button></li>
                            <li className={classes.listitem}><Button onClick={() => this.setData('planet',2)}>2</Button></li>
                            <li className={classes.listitem}><Button onClick={() => this.setData('planet',3)}>3</Button></li>
                            <li className={classes.listitem}><Button onClick={() => this.setData('planet',4)}>4</Button></li>
                            <li className={classes.listitem}><Button onClick={() => this.setData('planet',5)}>5</Button></li>
                            <li className={classes.listitem}><Button onClick={() => this.setData('planet',6)}>6</Button></li>
                            <li className={classes.listitem}><Button onClick={() => this.setData('planet',7)}>7</Button></li>
                        </ul>

                </div>
                
                <div className={classes.people}>

                    <h1 className={classes.title}>CHARACTERS</h1>
                    {(() => {
                            if(this.state.people == null){
                                return (
                                    <div className={classes.loading}>
                                        <LinearProgress />
                                    </div>
                                )
                            }else{
                                return(
                                <Person people={this.state.people} />
                            )}
                    })()}
                        
                        
                        <ul className={classes.list}>
                            <li className={classes.listitem}><Button className={classes.listButton} onClick={() => this.setData('person',1)}>1</Button></li>
                            <li className={classes.listitem}><Button onClick={() => this.setData('person',2)}>2</Button></li>
                            <li className={classes.listitem}><Button onClick={() => this.setData('person',3)}>3</Button></li>
                            <li className={classes.listitem}><Button onClick={() => this.setData('person',4)}>4</Button></li>
                            <li className={classes.listitem}><Button onClick={() => this.setData('person',5)}>5</Button></li>
                            <li className={classes.listitem}><Button onClick={() => this.setData('person',6)}>6</Button></li>
                            <li className={classes.listitem}><Button onClick={() => this.setData('person',7)}>7</Button></li>
                            <li className={classes.listitem}><Button onClick={() => this.setData('person',8)}>8</Button></li>
                            <li className={classes.listitem}><Button onClick={() => this.setData('person',9)}>9</Button></li>
                        </ul>

                </div>

                <div className={classes.people}>
                    <h1 className={classes.title}>Films</h1>
                    {(() => {
                            if(this.state.film == null){
                                return (
                                    <div className={classes.loading}>
                                        <LinearProgress />
                                    </div>
                                )
                            }else{
                                return(
                                    <Film film={this.state.film} />
                            )}
                    })()}
                        
                </div>


                <div className={classes.people}>

                    <h1 className={classes.title}>Vehicles</h1>
                    {(() => {
                            if(this.state.Vehicle == null){
                                return (
                                    <div className={classes.loading}>
                                        <LinearProgress />
                                    </div>
                                )
                            }else{
                                return(
                                    
                                    <Vehicle vehicle={this.state.Vehicle} />
                            )}
                    })()}
                        
                        <ul className={classes.list}>
                            <li className={classes.listitem}><Button onClick={() => this.setData('vehicle',1)}>1</Button></li>
                            <li className={classes.listitem}><Button onClick={() => this.setData('vehicle',2)}>2</Button></li>
                            <li className={classes.listitem}><Button onClick={() => this.setData('vehicle',3)}>3</Button></li>
                            <li className={classes.listitem}><Button onClick={() => this.setData('vehicle',4)}>4</Button></li>
                        </ul>

                </div>

                <div className={classes.people}>

                    <h1 className={classes.title}>StarShips</h1>
                    {(() => {
                            if(this.state.StarShip == null){
                                return (
                                    <div className={classes.loading}>
                                        <LinearProgress />
                                    </div>
                                )
                            }else{
                                return(
                                    
                                    <StarShip starship={this.state.StarShip} />
                            )}
                    })()}
                        
                        <ul className={classes.list}>
                            <li className={classes.listitem}><Button onClick={() => this.setData('starship',1)}>1</Button></li>
                            <li className={classes.listitem}><Button onClick={() => this.setData('starship',2)}>2</Button></li>
                            <li className={classes.listitem}><Button onClick={() => this.setData('starship',3)}>3</Button></li>
                            <li className={classes.listitem}><Button onClick={() => this.setData('starship',4)}>4</Button></li>
                        </ul>

                </div>

                <div className={classes.people}>

                    <h1 className={classes.title}>Species</h1>
                    {(() => {
                            if(this.state.Species == null){
                                return (
                                    <div className={classes.loading}>
                                        <LinearProgress />
                                    </div>
                                )
                            }else{
                                return(
                                    
                                    <Species species={this.state.Species} />
                            )}
                    })()}
                        
                        <ul className={classes.list}>
                            <li className={classes.listitem}><Button onClick={() => this.setData('species',1)}>1</Button></li>
                            <li className={classes.listitem}><Button onClick={() => this.setData('species',2)}>2</Button></li>
                            <li className={classes.listitem}><Button onClick={() => this.setData('species',3)}>3</Button></li>
                            <li className={classes.listitem}><Button onClick={() => this.setData('species',4)}>4</Button></li>
                        </ul>

                </div>
                </ApolloProvider>
            </div>
        
        )
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styles = theme=> ({
    
    poster:{
        width: '100%',
        height: '600px'
    },
    home:{
        margin: '70px',
        paddingTop: '100px',
    },
    people:{
        padding: '50px',
    },
    loading: {
        textAlign: 'center'
    },
    title:{
        
        padding: '15px',
        color: '#FFE81F',
        
        backgroundColor: 'black',
        textAlign: 'center'
    },
    card:{
        margin: '10px',
        color: '#FFE81F',
        backgroundColor: 'black'
    },
    name:{

        borderBottom: '2px white'
    },
    list:{
        textAlign: 'center',
        backgroundColor: 'white',
        marginTop: '10px',

        display: 'flex',
        flexDirection: 'row',
        padding: 10,
    },
    listitem:{
        fontSize: '14px',
        margin: '8px',
        backgroundColor: '#F0F0F0',
        border: '2px black',
        listStyle: 'none'
    },
    listButton:{
        
        border: '2px black'
    }
})

export default withStyles(styles)(Home);