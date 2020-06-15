import React, { Component } from "react";
import api from "../../services/api";
import {FiArrowLeft, FiArrowRight} from "react-icons/fi";
import {Link} from "react-router-dom";
import logo from "../../assets/logo.png";
import "./styles.css"

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
        return (<div className="container-timeline">
                <header>
                    <div>
                        <img src={logo} alt="Wetake" />
                    </div>
                    <div>
                        <div className="exit">
                            <Link onClick={this.handleClosed} to="/">
                                <FiArrowLeft />
                                Sair
                            </Link>
                        </div>
                        <div>
                            <Link to="/add-delivery">
                                <FiArrowRight />
                                Cadastrar nova entrega!
                            </Link>
                        </div>
                    </div>
                </header>
                    {props.map(repository => (
                    <fieldset key={repository.id}>
                        <legend>
                            <h2 className="title">Entrega</h2>
                        </legend>
                        <div className="location">
                            <div>
                                <span className="subTitle">Origem</span><br/>
                                <span>{repository.uf_origin}</span><br/>
                                <span>{repository.city_origin}</span><br/><br/>
                            </div>
                            <div>
                                <span className="subTitle">Destino</span><br/>
                                <span>{repository.uf_destiny}</span><br/>
                                <span>{repository.city_destiny}</span><br/><br/>
                            </div>
                        </div>

                        <div className="infos">
                            <div>
                                <span className="subTitle">Dimensões</span><br/>
                                <span>Altura: {repository.height} m</span><br/>
                                <span>Largura: {repository.width} m</span><br/>
                                <span>Comprimento: {repository.length} m</span><br/>
                                <span>Peso: {repository.weight} KG</span><br/><br/>
                            </div>
                            <div>
                                <span className="subTitle">Contato</span><br/>
                                <span>Nome: {repository.name}</span><br/>
                                <span>E-mail: {repository.email}</span><br/>
                                <span>Telefone: {repository.phone}</span><br/><br/>
                            </div>
                        </div>

                        <div className="obs">
                            <span className="subTitle">Observações</span><br/>
                            <span>{repository.observation}</span>
                        </div>
                    </fieldset>
                    ))}
            </div>
        );
     }
}

export default Timeline;