import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import logo from "../../assets/logo.png";
import {Link, useHistory} from "react-router-dom";
import {FiArrowLeft} from "react-icons/fi";
import axios from "axios";
import api from "../../services/api";
import "./styles.css";

interface IBGEUFResponse {
    sigla: string;
}

interface IBGECityResponse {
    nome: string;
}

const CreateDelivery = () => {

    const [ufsOrigin, setUfsOrigin] = useState<string[]>([]);
    const [citiesOrigin, setCitiesOrigin] = useState<string[]>([]);
    const [ufsDestiny, setUfsDestiny] = useState<string[]>([]);
    const [citiesDestiny, setCitiesDestiny] = useState<string[]>([]);

    const [height, setHeight] =  useState("");
    const [width, setWidth] = useState("");
    const [length, setLength] = useState("");
    const [weight, setWeight] = useState("");
    const [observation, setObservation] = useState("");

    const user_id = localStorage.getItem("id");

    const [selectedUfOrigin, setSelectedUfOrigin] = useState('0');
    const [selectedCityOrigin, setSelectedCityOrigin] = useState('0');
    const [selectedUfDestiny, setSelectedUfDestiny] = useState('0');
    const [selectedCityDestiny, setSelectedCityDestiny] = useState('0');

    const history = useHistory();

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const ufInicials = response.data.map(uf => uf.sigla);

            setUfsOrigin(ufInicials);
        });
    }, []);

    useEffect(() =>{
        if (selectedUfOrigin === '0'){
            return;
        }

        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUfOrigin}/municipios`).then(response => {
            const cityNames = response.data.map(city => city.nome);

            setCitiesOrigin(cityNames);
        });
    }, [selectedUfOrigin]);

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const ufInicials = response.data.map(uf => uf.sigla);

            setUfsDestiny(ufInicials);
        });
    }, []);

    useEffect(() =>{
        if (selectedUfDestiny === '0'){
            return;
        }

        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUfDestiny}/municipios`).then(response => {
            const cityNames = response.data.map(city => city.nome);

            setCitiesDestiny(cityNames);
        });
    }, [selectedUfDestiny]);

    function handleSelectUfOrigin(event: ChangeEvent<HTMLSelectElement>) {
        const ufOrigin = event.target.value;

        setSelectedUfOrigin(ufOrigin);
    }

    function handleSelectCityOrigin(event: ChangeEvent<HTMLSelectElement>) {
        const cityOrigin = event.target.value;

        setSelectedCityOrigin(cityOrigin);
    }

    function handleSelectUfDestiny(event: ChangeEvent<HTMLSelectElement>) {
        const ufDestiny = event.target.value;

        setSelectedUfDestiny(ufDestiny);
    }

    function handleSelectCityDestiny(event: ChangeEvent<HTMLSelectElement>) {
        const cityDestiny = event.target.value;

        setSelectedCityDestiny(cityDestiny);
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const data = {
            uf_origin: selectedUfOrigin,
            city_origin: selectedCityOrigin,
            uf_destiny: selectedUfDestiny,
            city_destiny: selectedCityDestiny,
            height,
            width,
            length,
            weight,
            observation,
            user_id
        }
        try {
            await api.post('add-delivery', data);

            history.push('/timeline');
        }catch (e) {
            alert("Erro ao cadastrar nova entrega");
        }
    }

    async function handleClosed(){
        localStorage.clear();
        history.push("/")
    }

    if (localStorage.id === undefined) {
        history.push("/")
    }

    return (
        <div className="container-delivery">
            <header>
                <div>
                    <img src={logo} alt="Wetake" />
                </div>
                <div>
                    <div className="exit">
                        <Link onClick={handleClosed} to="/" >
                            <FiArrowLeft />
                            Sair
                        </Link>
                    </div>
                    <div>
                        <Link to="/timeline" >
                            <FiArrowLeft />
                            Voltar para Timeline
                        </Link>
                    </div>
                </div>
            </header>
            <form onSubmit={handleSubmit}>
                <fieldset className="title">
                    <legend>
                        <h2>Endereço de origem</h2>
                    </legend>
                    <div className="origin">
                        <div>
                            <label htmlFor="ufOrigin">Estado (UF)</label>
                            <select name="ufOrigin" id="ufOrigin" value={selectedUfOrigin} onChange={handleSelectUfOrigin}>
                                <option value="0">Selecione uma UF</option>
                                {ufsOrigin.map(uf => (
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="city">Cidade</label>
                            <select name="cityOrigin" id="cityOrigin" value={selectedCityOrigin} onChange={handleSelectCityOrigin}>
                                <option value="0">Selecione uma cidade</option>
                                {citiesOrigin.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                </fieldset>

                <fieldset className="title">
                    <legend>
                        <h2>Endereço de destino</h2>
                    </legend>
                    <div className="destiny">
                        <div>
                    <label htmlFor="ufDestiny">Estado (UF)</label>
                    <select name="ufDestiny" id="ufDestiny" value={selectedUfDestiny} onChange={handleSelectUfDestiny}>
                        <option value="0">Selecione uma UF</option>
                        {ufsDestiny.map(uf => (
                            <option key={uf} value={uf}>{uf}</option>
                        ))}
                    </select>
                        </div>
                        <div>
                    <label htmlFor="cityDestiny">Cidade</label>
                    <select name="cityDestiny" id="cityDestiny" value={selectedCityDestiny} onChange={handleSelectCityDestiny}>
                        <option value="0">Selecione uma cidade</option>
                        {citiesDestiny.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset className="title">
                    <legend>
                        <h2>Dimensões</h2>
                        <span>Sempre em metros!</span>
                    </legend>
                    <div className="dimension">
                        <div className="row">
                            <label htmlFor="height">Altura</label>
                            <input type="number" name="height" id="height" value={height} onChange={e => setHeight(e.target.value)}/>

                            <label htmlFor="width">Largura</label>
                            <input type="number" name="width" id="width" value={width} onChange={e => setWidth(e.target.value)}/>
                        </div>
                        <div className="row">
                            <label htmlFor="length">Comprimento</label>
                            <input type="number" name="length" id="length" value={length} onChange={e => setLength(e.target.value)}/>

                            <label htmlFor="weight">Peso</label>
                            <input type="number" name="weight" id="weight" value={weight} onChange={e => setWeight(e.target.value)}/>
                        </div>
                    </div>
                </fieldset>

                <fieldset className="title">
                    <legend>
                        <h2>Observação</h2>
                        <span>Adicione informações adicionais</span>
                    </legend>

                    <textarea name="observation" id="observation" value={observation} onChange={e => setObservation(e.target.value)}> </textarea>
                </fieldset>
                <button type="submit">Cadastrar Entrega!</button>
            </form>
        </div>
    );
}


export default CreateDelivery;