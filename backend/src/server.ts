import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import actionRoutes from './routes/actions.routes.js';

console.log("ROUTES LOADED - Auth routes imported");
console.log("ROUTES LOADED - Action routes imported");

config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:3000',
        process.env.CORS_ORIGIN || ''
    ].filter(Boolean),
    credentials: true
}));

const limiter = rateLimit({
    windowMs: 900000,
    max: 100,
    message: { success: false, error: 'Too many requests' }
});
app.use(limiter);
app.use(express.json({ limit: '10mb' }));

app.get('/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

console.log("SERVER BOOTED");

app.use((req, res, next) => {
    console.log("INCOMING:", req.method, req.url);
    next();
});

app.use('/api/auth', authRoutes);
app.use('/api/actions', actionRoutes);

console.log("ROUTES MOUNTED - /api/auth mounted");
console.log("ROUTES MOUNTED - /api/actions mounted");

// Debug: Print all registered routes
console.log("REGISTERED ROUTES:");
app._router.stack.forEach((middleware: any) => {
    if (middleware.route) {
        console.log(`  ${Object.keys(middleware.route.methods).join(',')} ${middleware.route.path}`);
    }
});

app.listen(PORT, () => {
    console.log(`🚀 SaveRaks 2.0 Backend running on port ${PORT}`);
});

export default app;
