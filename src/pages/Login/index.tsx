import React, {FormEvent, useState} from "react";
import {FiArrowRight} from "react-icons/fi";
import {Link, useHistory} from "react-router-dom";
import api from "../../services/api";


const Login   = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const history = useHistory();

    async function handleLogin(e: FormEvent){
        e.preventDefault();

        try {
            const response = await api.post("login", { email, pass })
            console.log(response);
            localStorage.setItem("id", response.data.id);
            localStorage.setItem("name", response.data.name);

            history.push("/timeline")

        }catch (e) {
            alert("Falha no Login, tente novamente!")
        }
    }

    return (
      <div>

          <form onSubmit={handleLogin}>
              <fieldset>
                  <legend>
                      <h2>Acesse a aplicação!</h2>
                  </legend>
                  <label htmlFor="email">E-mail</label>
                  <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)}/>
                  <label htmlFor="pass">Senha</label>
                  <input type="password" id="pass" value={pass} onChange={e => setPass(e.target.value)}/>
              </fieldset>
              <button type="submit">Entrar</button>
          </form>
          <Link to="/add-acount">
              <FiArrowRight />
              Crie sua conta!
          </Link>
      </div>
    );
}

export default Login;