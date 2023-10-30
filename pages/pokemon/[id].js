import {useRouter} from "next/router";
import React, { useState, useEffect } from "react";
import Head from 'next/head'
import Link from "next/link";
import styles from '../../styles/Details.module.css'

const Details = () => {
    const {
        query: {id}
    } = useRouter()

    const [pokemon, setPokemon] = useState(null)

    useEffect( () => {
        async function getPokemon(){
            const response = await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`)
            setPokemon(await response.json())
        }
        if(id){
            void getPokemon()
        }
    }, [id])

    if(!pokemon) {
        return <h1 className='loading'>Loading ...</h1>
    }

    return (
        <div>
            <Head>
                {pokemon.name}
            </Head>
            <div>
                <Link href='/'>
                    Back to home
                </Link>
            </div>
            <div className={styles.layout}>
                <div>
                    <img
                        className={styles.picture}
                        src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                        alt={pokemon.name.english}
                    />
                </div>
                <div className={styles.pokemonData}>
                    <div className={styles.name}>{pokemon.name}</div>
                    <div className={styles.type}>{pokemon.type.join(', ')}</div>
                    <table>
                        <thead className={styles.header}>
                             <tr>
                                <th>Name</th>
                                <th>Value</th>
                             </tr>
                        </thead>
                        <tbody>
                        {pokemon.stats?.map(({ name,value }) => (
                            <tr key={name}>
                                <td className={styles.attribute}>{name}</td>
                                <td>{value}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Details