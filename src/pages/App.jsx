import axios from "axios";
import { useEffect, useState } from "react";
import './App.css';
import { Link } from "react-router-dom";

export default function Home() {

  const [person, setPerson] = useState([]);
  const [buscar, setBuscar] = useState("");

  useEffect(() => {

    const buscarPerson = async (buscar) => {
      try {
        const API = buscar
          ? `https://rickandmortyapi.com/api/character/?name=${buscar}`
          : "https://rickandmortyapi.com/api/character";
        const res = await axios.get(API);
        const dados = (res.data.results);
        setPerson(dados);
      }
      catch (error) {
        console.error('Error', error);
      }
    }

    buscarPerson(buscar);

  }, [buscar])

  const buscarPesquisa = (e) => {
    setBuscar(e.target.value);
  }

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
        {person && person.map((e, index) => (
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