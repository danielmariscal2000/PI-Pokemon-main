import React from "react";
import { Link,useParams} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getDetailPromise, cleanDetail, cleanPokemons } from "../../actions";
import { useEffect } from "react";
import noImage from '../../img/noImage.png';
import Loading from "../Loading/Loading";
import styles from './Detail.module.css'

export default function Detail (props) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const myPokemon = useSelector((state) => state.pokeDetail)
    console.log(myPokemon);
    useEffect(() => {
        dispatch(getDetailPromise(id))
        return () => {
            dispatch(cleanDetail(dispatch), cleanPokemons(dispatch))
        }
    }, [dispatch,id])

    console.log(myPokemon);
    return ( 
        <div>
            {
                myPokemon.length > 0 ?
                <div className={styles.container}>
                    <div className={styles.card}>
                        <h2 className={styles.h2}>{myPokemon[0].name.charAt(0).toUpperCase() + myPokemon[0].name.slice(1)}</h2>
                        <p className={styles.p}>#{myPokemon[0].id}</p>
                        <img className={styles.image} src={myPokemon[0].img ? myPokemon[0].img : noImage} alt="img not found" height="250px" width="200px" />
                        <div className={styles.typesContainer}>
                            {myPokemon[0].types?.map((e, k) => {
                                    return (
                                        <div className={styles.types} key={k}>
                                            <img className={styles.typesImg} src={e.img>0?e.img:`https://storage.googleapis.com/nianticweb-media/pokemongo/types/${e.name}.png?cb=1`} alt='X' />
                                            <p className={styles.text}>{e.name.charAt(0).toUpperCase() + e.name.slice(1)}</p>
                                        </div>
                                    )
                                })}
                        </div>
                        <h5 className={styles.h5}>HP:  {myPokemon[0].hp}</h5>
                        <h5 className={styles.h5}>Attack:  {myPokemon[0].attack}</h5>
                        <h5 className={styles.h5}>Defense:  {myPokemon[0].defense}</h5>
                        <h5 className={styles.h5}>Speed:  {myPokemon[0].speed}</h5>
                        <h5 className={styles.h5}>Height:  {myPokemon[0].height}</h5>
                        <h5 className={styles.h5}>Weight:  {myPokemon[0].weight}</h5>
                    </div>
                </div> : 
                <div>
                    <Loading />
                </div>
            }
            <div>
            <Link to='/home'>
                <button className={styles.btn}>Go back</button>
            </Link>
            </div>
        </div>
        
     );
}
