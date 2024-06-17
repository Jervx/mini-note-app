import 'dotenv/config';
import app from "./app";
import { dbPool } from "./lib/database";

const port = process.env.PORT || 8000;

const startServer = async () => {
    try {
        await dbPool.promise().getConnection();
        app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
    } catch (error) {
        console.error("Failed to start task manager API : 😥 \n", error);
    }
}

startServer();
