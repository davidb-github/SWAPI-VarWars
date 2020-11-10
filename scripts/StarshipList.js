import { Starship } from "./Starship.js"
import { getStarships, useStarships } from "./SwapiProvider.js"

const starshipContainer = document.querySelector(".content-body")

export const StarshipList = () => {
    getStarships()
    .then(() => {
        const starships = useStarships()
        console.log('starships: ', starships);
        render(starships)
    })
}

const render = (starshipArray) => {
    starshipContainer.innerHTML += starshipArray.map(starship => Starship(starship)).join("")
}