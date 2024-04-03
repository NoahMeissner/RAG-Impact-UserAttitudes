// Here we retrieve the current distribution of opinion instances from the database with which the chat system is to argue.
// To do this, we retrieve the number of values: pro, con, neutral from the variable "condition" from the participant table 
// Through the usage of typescript you need also to install: npm install --save @types/pg

import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false },
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT ARRAY[ \
                                        COUNT(CASE WHEN condition = \'pro\' THEN 1 END), \
                                        COUNT(CASE WHEN condition = \'neutral\' THEN 1 END), \
                                        COUNT(CASE WHEN condition = \'con\' THEN 1 END) \
                                        ] AS condition_counts \
                                    FROM Participants;');
    const conditions = result.rows;

    client.release();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ conditions });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;