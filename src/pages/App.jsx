import axios from "axios";
import { useEffect, useState } from "react";
import './App.css';
import { Link } from "react-router-dom";

export default function Home() {
  const API = "https://rickandmortyapi.com/api/character/?status=alive"
  const [buscar, setBuscar] = useState("");
  const [status, setStatus] = useState("Alive");
  const [dados, setDados] = useState([]);

  useEffect(() => {
    axios.get(`${API}`)
      .then(response => {
        setDados(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching API URLs:', error);
      });
  }, [])

  const buscarPesquisa = (e) => {
    setBuscar(e.target.value);
  }

  const mostrarPersonagem = (id) => {
    const ENDPOINT = `https://rickandmortyapi.com/api/character/${id}`
    axios.get(`${ENDPOINT}`)
      .then(response => {
        setPersonagem(response.data);
      })
      .catch(error => {
        console.error('Error fetching API URLs:', error);
      });
    setMostrarDados(true)
  }

  const mudarNome = (nome) => {

    const ENDPOINT = `https://rickandmortyapi.com/api/character/?name=${nome}&status=${status}`
    axios.get(`${ENDPOINT}`)
      .then(response => {
        setDados(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching API URLs:', error);
      });
  }

  const mudarStatus = (event) => {
    setStatus(event.target.value);
    const ENDPOINT = `https://rickandmortyapi.com/api/character/?status=${event.target.value}`
    axios.get(`${ENDPOINT}`)
      .then(response => {
        setDados(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching API URLs:', error);
      });
  };



  return (
    <div className="container" >
      <h1 className="Title" >Rick And Morty App</h1>
      <div className="container_card" >
        <h2>Lista de Personagens</h2>
        <input
          className="input_pesquisar"
          type="text"
          placeholder="Pesquisar por nome"
          value={buscar}
          onChange={buscarPesquisa}
        />
        <button class="botao-pesquisar" onClick={() => mudarNome(buscar)}>Pesquisar</button>

        <select value={status} onChange={mudarStatus}>
          <option value="Alive">Vivo</option>
          <option value="Dead">Morto</option>
          <option value="unknown">Desconhecido</option>
        </select>

        {dados.map((e, index) => (
          <Link className="link" key={index} to={`/personagem/${e.id}`} >
            <div >
              <div className="card" >
                <img className="img" src={e.image} />
                <h1>{e.name}</h1>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div >
  )
}