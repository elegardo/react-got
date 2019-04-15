import { useState, useEffect } from 'react'
import axios from 'axios';

axios.interceptors.request.use((config) => {
    config.baseURL = 'https://api.got.show/api/show'
    return config
})

export function useGOT(){

    const exceptions = [
        {_id: "0", name: "Beric Dondarrion", house: "", pagerank:{rank:0}, titles:[],  updatedAt: "2019-04-10T07:16:16.842Z" , image: "https://vignette.wikia.nocookie.net/gameofthrones/images/a/ab/BericDondarrionBeyondtheWallRhllorSpeech.png/revision/latest?cb=20190215205301" },
        {_id: "1", name: "Little Sam", house: "", pagerank:{rank:0}, titles:[],  updatedAt: "2019-04-10T07:16:16.842Z" , image: "https://vignette.wikia.nocookie.net/gameofthrones/images/1/12/Sam_at_Oldtown.jpg/revision/latest?cb=20170808102046" }
    ]

    const availables = [
        "5cad9840b0c0ef00108e6530",
        "5cad9840b0c0ef00108e652c",
        "5cad9840b0c0ef00108e652d",
        "5cad9840b0c0ef00108e652e",
        "5cad9840b0c0ef00108e654c",
        "5cad9840b0c0ef00108e654d",
        "5cad9840b0c0ef00108e654e",
        "5cad9840b0c0ef00108e65df",
        "5cad9840b0c0ef00108e6579",
        "5cad9840b0c0ef00108e6532",
        "5cad9840b0c0ef00108e6560",
        "5cad9840b0c0ef00108e65e0",
        "5cad9840b0c0ef00108e6554",
        "5cad9840b0c0ef00108e6555",
        "5cad9840b0c0ef00108e6575",
        "5cad9840b0c0ef00108e65c4",

        "5cad9840b0c0ef00108e659d",
        "5cad9840b0c0ef00108e6565",
        "5cad9840b0c0ef00108e6561",
        "5cad9840b0c0ef00108e6591",
        "5cad9840b0c0ef00108e6552",
        "5cad9840b0c0ef00108e65c8",
        "5cad9840b0c0ef00108e65ed",
        "5cad9840b0c0ef00108e65a5",

        "5cad9840b0c0ef00108e657a",
    ]

    //states
    const [alive, setAlive] = useState([])
    const [dead, setDead] = useState([])

    //functions
    const getCharacters = () => {
        return axios.get(`/characters`)
                    .then(res => res.data)
                    .then((res) => {
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
                if(availables.indexOf(item._id) > -1){
                    if (item.alive===true && item.image) vivos.push(item)
                    else if(item.image) muertos.push(item)    
                }
            })

            vivos.push(exceptions[0])
            vivos.push(exceptions[1])

            setAlive(vivos.sort((a, b) => b.pagerank.rank - a.pagerank.rank))
            setDead(muertos.sort((a, b) => b.pagerank.rank - a.pagerank.rank))
        })
        .catch((err) => console.log(err));
    }, [])

    return [alive, dead]
}