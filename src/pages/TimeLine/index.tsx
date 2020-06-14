import React, { Component } from "react";
import api from "../../services/api";
import {FiArrowLeft, FiArrowRight} from "react-icons/fi";
import {Link} from "react-router-dom";

interface Repository {
    id: number
    name: string
    uf_origin: string
    uf_destiny: string
    city_origin: string
    city_destiny: string
    height: number
    width: number
    length: number
    weight: number
    observation: string
    email: string
    phone: string
}

interface Props {
    repositories: Repository[]
}


class Timeline extends Component<Props> {


    state = {
        props: [ {
            id: 0,
            name: '',
            uf_origin: '',
            uf_destiny: '',
            city_origin: '',
            city_destiny: '',
            height: 0,
            width: 0,
            length: 0,
            weight: 0,
            observation: '',
            email: '',
            phone: '',
        } ],
    }

    async componentDidMount() {
        const response = await api.get("timeline");
        console.log(response.data);
        this.setState({ props: response.data });
    }


    handleClosed = () => {
        localStorage.clear();
    }

    render(){
        const { props } = this.state;
        return (<div>
                <Link to="/add-delivery">
                    <FiArrowRight />
                    Cadastrar nova entrega!
                </Link>
                <Link onClick={this.handleClosed} to="/">
                    <FiArrowLeft />
                    Sair
                </Link>
                    {props.map(repository => (
                    <fieldset key={repository.id}>
                        <legend>
                            <h2>Entrega</h2>
                        </legend>
                        <span>Origem</span><br/>
                        <span>{repository.uf_origin}</span><br/>
                        <span>{repository.city_origin}</span><br/><br/>

                        <span>Destino</span><br/>
                        <span>{repository.uf_destiny}</span><br/>
                        <span>{repository.city_destiny}</span><br/><br/>

                        <span>Dimensões</span><br/>
                        <span>{repository.height}</span><br/>
                        <span>{repository.width}</span><br/>
                        <span>{repository.length}</span><br/>
                        <span>{repository.weight}</span><br/><br/>

                        <span>Contato</span><br/>
                        <span>{repository.name}</span><br/>
                        <span>{repository.email}</span><br/>
                        <span>{repository.phone}</span><br/><br/>

                        <span>{repository.observation}</span>
                    </fieldset>
                    ))}
            </div>
        );
     }
}

export default Timeline;