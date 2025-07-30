import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { dbConnect } from './MongoDatabase/Connect.js';
import authRoutes from './Routes/AuthRoutes.js'; 
import skillRoutes from './Routes/skillRoutes.js'; 
import LanguageRoutes from './Routes/LanguageRoutes.js'; 
import skillGigRoutes from './Routes/skillGigRoutes.js'; 




dotenv.config();

const app = express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(cookieParser());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('hey')
})
app.use('/api/auth', authRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/language',LanguageRoutes)
app.use('/api/skillGig',skillGigRoutes)



const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await dbConnect();
        app.listen(PORT, () => console.log(`server running on port ${PORT}`)
        )
    } catch (error) {
        console.log('error', error);

    }
}
startServer();