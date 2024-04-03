/*
CREATE TABLE Messages (
    id SERIAL PRIMARY KEY,
    participant_id UUID NOT NULL REFERENCES Participants(participant_id),
    message_id INT NOT NULL,
    userName VARCHAR(255) NOT NULL,nv
    content TEXT NOT NULL,
    timestamp TEXT NOT NULL);
*/

import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

interface Message {
    id: number;
    user: string;
    content: string;
    timestamp: string;
}

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
    connectionString: process.env.POSTGRES_URL,
    ssl: { rejectUnauthorized: false },
});


// We could have an big issue with an bad Actor try to enforce an SQL-Injection this could fuck us pretty hard, we should think over an solution for this before setting live.
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const {
            participant_id,
            messages
        }: {participant_id: string, messages: Message[]} = req.body;
        try {
            const client = await pool.connect();

            // Loop through all messages and insert them accordingly.
            for (const message of messages) {
                await client.query(`INSERT INTO Messages (participant_id, message_id, userName, content, timestamp)
                                    VALUES ($1, $2, $3, $4, $5)`,
                                    [participant_id, message.id, message.user, message.content, message.timestamp])
            }
            client.release();
            res.status(201).json({message: 'Messages inserted succesfully '});
        } catch (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    
};

export default handler;