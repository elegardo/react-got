import { useState, useEffect } from 'react'
import axios from 'axios';

axios.interceptors.request.use((config) => {
    config.baseURL = 'https://api.got.show/api/show'
    return config
})

export function useGOT(){

    const additional_characters = [
        {_id: "0", name: "Beric Dondarrion", slug: "Beric_Dondarrion", alive: false, house: "", pagerank:{rank:0}, titles:[],  updatedAt: "2019-04-29T07:00:00.001Z" , image: "https://vignette.wikia.nocookie.net/gameofthrones/images/a/ab/BericDondarrionBeyondtheWallRhllorSpeech.png/revision/latest?cb=20190215205301" },
        {_id: "1", name: "Little Sam", slug: "Little_Sam", alive: true, house: "", pagerank:{rank:0}, titles:[],  updatedAt: "2019-04-10T07:16:16.842Z" , image: "https://vignette.wikia.nocookie.net/gameofthrones/images/1/12/Sam_at_Oldtown.jpg/revision/latest?cb=20170808102046" }
    ]

    const got_challenge = [
        "Jon_Snow", "Sansa_Stark", "Arya_Stark", "Bran_Stark", "Cersei_Lannister", "Jaime_Lannister", "Tyrion_Lannister",
        "Daenerys_Targaryen", "Yara_Greyjoy", "Theon_Greyjoy", "Melisandre", "Jorah_Mormont", "Sandor_Clegane", 
        "Gregor_Clegane", "Samwell_Tarly", "Gilly", "Beric_Dondarrion", "Varys", "Brienne_of_Tarth", "Davos_Seaworth",
        "Bronn", "Podrick_Payne", "Tormund", "Grey_Worm", "Gendry", "Little_Sam", "Euron_Greyjoy",
    ]

    const dead_character = [
        "Theon_Greyjoy", "Melisandre", "Jorah_Mormont", "Beric_Dondarrion",
        "Cersei_Lannister", "Jaime_Lannister", "Daenerys_Targaryen", "Theon_Greyjoy", 
        "Melisandre", "Jorah_Mormont", "Sandor_Clegane", "Gregor_Clegane",
        "Beric_Dondarrion", "Varys", "Euron_Greyjoy",
    ]
    
    //states
    const [alive, setAlive] = useState([])
    const [dead, setDead] = useState([])

    //functions
    const getCharacters = () => {
        return axios.get(`/characters`)
                    .then(res => res.data)
                    .then((res) => {
                        res.push(additional_characters[0])
                        res.push(additional_characters[1])
                        return res
                    })
                    .catch((err) => console.log(err));
    }

    useEffect(() => {
        getCharacters()
        .then((res) => {
            let vivos = []
            let muertos = [] 
            res.map((item) => {
                if(got_challenge.indexOf(item.slug) > -1){
                    if (dead_character.indexOf(item.slug) > -1) 
                        muertos.push(item)
                    else if(item.image) 
                        vivos.push(item)    
                }
            })

            setAlive(vivos.sort((a, b) => b.pagerank.rank - a.pagerank.rank))
            setDead(muertos.sort((a, b) => b.pagerank.rank - a.pagerank.rank))
        })
        .catch((err) => console.log(err));
    }, [])

    return [alive, dead]
}