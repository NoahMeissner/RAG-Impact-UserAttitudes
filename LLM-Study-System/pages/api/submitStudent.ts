// TODO: Logic for Student submit -> Put in StudentTable -> First & Last Name, Martikelnummer email?
/* Neds to hand over:
    CREATE TABLE Credits (
    id SERIAL PRIMARY KEY,
    matrikel INT NOT NULL,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    degreeprogramme TEXT NOT NULL,
    time TEXT NOT NULL);
*/

import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';


// This should probably be its own file later
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
        const { matrikel, firstname, lastname, degreeProgramm, time }:
            {
                matrikel: string,
                firstname: string,
                lastname: string,
                degreeProgramm: string,
                time: string // I am not sure what type suits better
            } = req.body;
        try {
            const client = await pool.connect();

            await client.query(`INSERT INTO Credits  (matrikel, firstname, lastname, degreeprogramme, time)
                                VALUES ($1, $2, $3, $4, $5)`,
                                [matrikel, firstname, lastname, degreeProgramm, time])

            client.release();
            res.status(201).json({ message: 'Student inserted succesfully ' });
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