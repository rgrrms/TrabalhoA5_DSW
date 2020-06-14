import React, {FormEvent, useState} from "react";
import logo from "../../assets/logo.png";
import {Link, useHistory} from "react-router-dom";
import {FiArrowLeft} from "react-icons/fi";
import api from "../../services/api";





const CreateAcount = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [pass, setPass] = useState("");

    const history = useHistory();

    async function handleCreatedAccount(event: FormEvent) {
        event.preventDefault();

        const data = {
            name,
            email,
            phone,
            pass
        }

        try {
            await api.post("/create-account", data);

            history.push('/');
        }catch (e) {
            alert("Erro ao cadastrar usuario");
        }
    }

    return (
        <div>
            <header>
                <img src={logo} alt="Wetake" />

                <Link to="/">
                    <FiArrowLeft />
                    Voltar para o Login
                </Link>
            </header>
            <form onSubmit={handleCreatedAccount}>
                <fieldset>
                    <legend>
                        <h2>Crie sua conta!</h2>
                        <span>voltar ao login</span>
                    </legend>

                    <label htmlFor="name">Nome</label>
                    <input type="text" name="name" id="name" value={name} onChange={e => setName(e.target.value)}/>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <label htmlFor="phone">Telefone</label>
                    <input type="text" name="phone" id="phone" value={phone} onChange={e => setPhone(e.target.value)}/>
                    <label htmlFor="pass">Senha</label>
                    <input type="password" name="pass" id="pass" value={pass} onChange={e => setPass(e.target.value)}/>

                    <button type="submit">Criar conta</button>
                </fieldset>
            </form>
        </div>
    );
}

export default CreateAcount;