let starships = [];


export const getStarships = () => {
    return fetch("https://swapi.dev/api/starships/")
    .then(response => response.json())
    .then(parsedData => {
        // API only returns 10 results at a time with pagination
        // get page count based on total results / 10 and round up
        const pageCount = Math.ceil(parsedData.count / 10)

        // create empty array to hold individual fetch calls for each page of results
        const fetchPageUrls = []

        // for every page in the page count, create a fetch call and parse the results for that page
        for ( let i = 1; i <= pageCount; i++ ) {
            fetchPageUrls.push(fetch(`https://swapi.dev/api/starships/?page=${i}`).then(data => data.json()))
        }

        // Promise.all takes an array of promises and then provides an array of the resulting responses when they've all resolved
        return Promise.all(fetchPageUrls)
        .then(resultsData => {
            console.log('resultsData: ', resultsData);


            // resultsData is an array containing the data for each resolved fetch call
            // reduce allows you to iterate the resulting data and put them into a single array
            const allResults = resultsData.reduce((acc, cv) => acc.concat(cv.results), [])

            // check to see if it worked!
            console.log('allResults: ', allResults);

            // set starships array equal to the allResults from fetch calls
            starships = allResults
        })
})
}

export const useStarships = () => {
    return starships.slice()
}