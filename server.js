const express= require('express');
const cors= require('cors');
const env= require('dotenv');
const path= require('path');
const fs= require('fs');
env.config();
const port = process.env.PORT || 3000;


const app= express();

app.use(cors());
app.use(express.json());
const sysPrompt= fs.readFileSync(path.join(__dirname, 'systemPrompt.md'), 'utf-8');
const Portfolio = fs.readFileSync(
            path.join(__dirname, 'Himanshu_Pahilajani_Resume_with_ranka.md'),
            'utf-8'
        );
app.post('/api/chat', async (req, res) => {
    try {
        const question = req.body.question;


        const systemPrompt =
            `${sysPrompt}\n\nHere is the portfolio of the person you are talking about:\n${Portfolio}`;

        const response = await fetch(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'llama-3.3-70b-versatile',
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: question }
                    ]
                })
            }
        );

        if (!response.ok) {
            throw new Error(
                `Groq API Error: ${response.status} ${response.statusText}`
            );
        }

        const groqData = await response.json();

        if (
            !groqData.choices ||
            !groqData.choices[0] ||
            !groqData.choices[0].message
        ) {
            throw new Error('Unexpected response format from Groq');
        }

        const answer = groqData.choices[0].message.content;

        res.json({ answer });

    } catch (error) {
        console.error('Chat API Error:', error);

        res.status(500).json({
            answer:
                "Sorry, I'm having trouble accessing the portfolio assistant right now. Please try again in a few moments."
        });
    }
});

app.get('/', (req, res) => {
    res.send('Portfolio AI Backend Running');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


