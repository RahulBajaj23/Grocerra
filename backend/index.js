const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const { default: Stripe } = require("stripe")
const dotenv = require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json({ limit: "10mb" }))

const PORT = process.env.PORT || 8080

// Mongodb
mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGODB_URL, { useUnifiedTopology: true }).then(() => {
    console.log("Database connected");
}).catch((err) => {
    console.log(err);
});


//schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    Cpassword: String,
    image: String
})

//model
const userModel = mongoose.model("user", userSchema)

// API

app.get("/", (req, res) => {
    res.send("server is running")
})

const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return passwordRegex.test(password);
};

//signup

app.post("/signup", async (req, res) => {
    console.log("Received signup request");
    // console.log(req.body);
    const { email, password } = req.body;

    try {
        const result = await userModel.findOne({ email: email, password: password });

        if (result) {
            res.status(400).send({ message: "Email is already registered", alert: false });
        } else {
            const newUser = new userModel(req.body);
            const savedUser = await newUser.save();
            res.send({ message: "Successfully registered", alert: true });
        }
    } catch (err) {
        console.error("Error during signup:", err);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

//login
app.post("/login", async (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email: email });

        if (user && user.password === password) {
            const datasend = {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                image: user.image
            };
            // console.log(datasend);
            res.send({ message: "login successful", alert: true, data: datasend });
        } else {
            res.send({ message: "Email or password is not correct", alert: false });
        }
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

//product

const productSchema = mongoose.Schema({
    name: String,
    category: String,
    image: String,
    price: String,
    description: String,
})

const productModel = mongoose.model('product', productSchema)

//product api

app.post("/uploadProduct", async (req, res) => {
    // console.log(req.body);
    const data = await productModel(req.body)
    const datasave = await data.save()

    res.send({ message: "Uploaded Successfully" })
})
// Update product
app.put("/updateProduct/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(id, req.body, { new: true });
        res.send({ message: "Product updated successfully", updatedProduct });
    } catch (err) {
        res.status(500).send({ message: "Error updating product", error: err });
    }
});

// Delete product
app.delete("/deleteProduct/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await productModel.findByIdAndDelete(id);
        res.send({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: "Error deleting product", error: err });
    }
});


app.get("/product", async (req, res) => {
    const data = await productModel.find({})
    res.send(JSON.stringify(data))
})

// payment gateway

// console.log(process.env.STRIPE_SECRET_KEY);

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)

app.post("/checkout-payment",async(req,res)=>{
    // console.log(req.body);

    try{
        const params={
            submit_type:'pay',
            mode:'payment',
            payment_method_types :['card'],
            name:['name'],
            billing_address_collection:'auto',
            shipping_options:[{shipping_rate:'shr_1NvfnzSHepQMBRKVXS4fQp6w'}],

            line_items:req.body.map((item)=>{
                return{
                    price_data:{
                        currency:'inr',
                        product_data:{
                            name:item.name,
                            // images:[item.image]
                        },
                        unit_amount:item.price*100,
                    },
                    adjustable_quantity:{
                        enabled:true,
                        minimum:1,
                    },
                    quantity:item.qty
                }
                
            }),
                success_url:`${process.env.FRONTEND_URL}/success`,
                cancel_url:`${process.env.FRONTEND_URL}/cancel`,

        }

        const session=await stripe.checkout.sessions.create(params)
        res.status(200).json(session.id)

    }
    catch (err){
        res.status(err.statusCode || 500).json(err.message)
    }
})

if(process.env.NODE_ENV=="production"){
    app.use(express.static("frontend/build"))
}

//port
app.listen(PORT, () => {
    console.log("server is running at port no:" + PORT);
})