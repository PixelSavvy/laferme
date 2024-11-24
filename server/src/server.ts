import 'module-alias/register';

import 'dotenv/config';

import cors from 'cors';
import express from 'express';

import connectDB from '@/config/db';
import { customerRoutes, distributionItemRoutes, freezoneItemRoutes, orderRoutes, productRoutes } from '@/routes';
import cookieParser from 'cookie-parser';

import corsOptions from './config/cors';

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// routes
app.use('/api', productRoutes);
app.use('/api', customerRoutes);
app.use('/api', orderRoutes);
app.use('/api', freezoneItemRoutes);
app.use('/api', distributionItemRoutes);

app.listen(PORT, async () => {
  console.log(`Server is running on PORT ${PORT}`);

  await connectDB();
});
