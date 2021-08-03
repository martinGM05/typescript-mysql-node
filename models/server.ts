import express, {Application} from 'express';
import userRoutes from '../routes/usuario';
import cors from 'cors'
import db from '../db/connection';

class Server{
    
    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';

        // Metodos iniciales
        this.dbConnection();
        this.middlewares();
        // Definir mis rutas
        this.routers();
    }

    async dbConnection(){
        try {
            await db.authenticate();
            console.log('Database online')
        } catch (error) {
            throw new Error(error);
        }
    }

    middlewares(){
        // Configurar CORS
        this.app.use(cors());

        // Lectura del body
        this.app.use(express.json());

        // Caperta publica
        this.app.use(express.static('public'));
    }

    routers(){
        this.app.use(this.apiPaths.usuarios, userRoutes);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en el puerto ${this.port}`);
        })
    }

}

export default Server;