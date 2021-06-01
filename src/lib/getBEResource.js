export default function(path) {
    const BE = process.env.NODE_ENV == 'development' ? 
                "http://localhost:3000" :
                "https://record-shop-maxim.herokuapp.com"
    console.log("BE", BE)
    const url = new URL(path, BE)
    

    return url
}