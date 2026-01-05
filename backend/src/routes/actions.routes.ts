import { Router } from 'express';
import { analyzeWaste } from '../services/waste.service.js';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Analyze waste image
router.post('/analyze', async (req, res) => {
    try {
        const { imageBase64 } = req.body;

        if (!imageBase64) {
            return res.status(400).json({ success: false, error: 'Image required' });
        }

        const analysis = await analyzeWaste(imageBase64);

        res.json({ success: true, wasteSorting: analysis });
    } catch (error: any) {
        console.error('Analysis error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Submit waste action
router.post('/submit', async (req, res) => {
    try {
        const { userId, actionType, description, imageBase64, sortingAnalysis } = req.body;

        // Here you would upload the image to MinIO and get the URL
        // For now we'll just use a placeholder
        const imageUrl = "https://placeholder.co/image.jpg";

        const action = await prisma.ecoAction.create({
            data: {
                userId,
                actionType,
                description,
                imageUrl,
                aiAnalysis: JSON.stringify(sortingAnalysis),
                pointsEarned: 10, // Default points, should be calculated based on analysis
                status: 'approved' // Auto-approve for demo
            }
        });

        // Update user points
        await prisma.user.update({
            where: { id: userId },
            data: {
                totalPoints: {
                    increment: 10
                }
            }
        });

        res.json({ success: true, data: action });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;
