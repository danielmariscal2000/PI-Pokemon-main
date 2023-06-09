import React  from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import styles from './LandingPage.module.css'
import { useEffect } from 'react';
export default function LandingPage() {
  async function agregarTypes() {
    const dataTypes=await axios.get("http://localhost:3001/types");
    const res = await axios.post("http://localhost:3001/types", {
      types:dataTypes.data
    });
  }
  agregarTypes();
  return (
    <div className={styles.bg}>
  {/* <img src={pokemonImg} alt="img not found" className={styles.image} /> */}
    <Link to='/home'>
      <button className={styles.btnHome}>
        <img src="../../img/home-solid-48.png" alt="" />
        Home</button>
    </Link>
</div>
 )
}
