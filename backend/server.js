const express = require('express');
const app = express();
const dotenv = require('dotenv').config()
const dbConfig = require("./Config/db")
const cors = require("cors")
dbConfig()
const port = process.env.PORT || 8000;

app.use(express.json())
app.use(express.urlencoded())
app.use(cors({
    credentials : true,
    origin : ["http://localhost:5173"]
}))


// import routing 

const categoryRoute = require('./Routes/category.route')
const subCategoryRoute = require('./Routes/subcategory.route')
const product = require('./Routes/product.route')


// api routing  

app.use('/api/category', categoryRoute)
app.use('/api/subcategory', subCategoryRoute)
app.use('/api/product', product)



app.get("/", (req, res) => {
    res.send("Server Start");
});
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
}); 