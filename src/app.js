import express from 'express';
import { productsRouter } from './routers/products.router.js';
import { cartsRouter } from './routers/carts.router.js';
import { viewsRouter } from './routers/views.router.js';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';

const app = express();

const PORT = 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('src/public'));


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', 'src/views');

app.use((req, res, next) => { 
    req.io = io;
    next();
});
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

const server = app.listen(PORT, () => {
    console.log(`🔥 Listening on port ${PORT}`);
});

server.on("error", (err) => console.log(err));

const io = new Server(server)

io.on('connection', (socket) => {
    console.log(`Nueva conexion desde el id: ${socket.id}`);

    socket.on('disconnect', (socket) => {
        console.log(`Cierre de conexion`);
    })
})