import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './config/mongoDB.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';
import helmet from 'helmet';

const PORT = process.env.PORT || 3000

// Initialize database connection first
const initServer = async () => {
  await connectDB();

  const app = express();


  // Security middleware
  app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
  }));

  const corsOptions = {
    origin: (origin, callback) => {
      // Allow requests without origin (e.g., mobile apps, curl)
      if (!origin) return callback(null, true);

      // Allow anything on port 5173
      if (/^http?:\/\/.*:5173$/.test(origin)) {
        return callback(null, true);
      }

      // Block other origins
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true, // allow cookies, tokens
  };

  app.use(cors(corsOptions));


  // Parse JSON bodies (as sent by API clients)
  app.use(express.json());

  // Parse URL-encoded bodies (as sent by HTML forms)  
  app.use(express.urlencoded({ extended: false }));

  // Debug middleware to log requests
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    console.log('Content-Type:', req.get('Content-Type'));
    console.log('Body:', JSON.stringify(req.body));
    next();
  });

  return app;
};

const app = await initServer();

app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

app.get('/', (req, res) => res.send("API is ondffverv"))

app.listen(PORT, () => console.log('Server is on at ' + PORT));