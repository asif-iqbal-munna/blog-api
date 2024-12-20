import express, {
  // ErrorRequestHandler,
  // NextFunction,
  Request,
  Response,
} from 'express';
// import routes from './routes';
// import { globalErrorHandler } from './middlewares/globalErrorHandler';
const app = express();

app.use(express.json());

// app.use("/api", routes);

app.get('/api/health-check', (req: Request, res: Response) => {
  res.send('Health OK!');
});

// 404
app.use((req: Request, res: Response) => {
  res.status(404).send('Route Not Found');
});

// app.use(
//   (
//     err: ErrorRequestHandler,
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => {
//     globalErrorHandler(err, req, res, next);
//   }
// );

export default app;
