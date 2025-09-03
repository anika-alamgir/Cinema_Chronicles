import { connectDB } from "../config/db.js";

let connection;

export async function searchMovie(req, res) {
    const query = req.params.query;

    if (!query || query.trim() === "") {
        return res.status(400).json({ error: "Search query cannot be empty" });
    }

    try {
        if (!connection) {
            connection = await connectDB();
        }

        const [result] = await connection.query(
            `SELECT * FROM movies WHERE title LIKE ?`,
            [`%${query}%`]
        );

        if (result.length === 0) {
            return res.status(404).json({ success: false, message: "Cholbe?" });
        }

        res.status(200).json({ success: true, content: result });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
}

export async function searchMovieByGenre(req, res) {
    const query = req.params.query;

    try {
        if (!connection) {
            connection = await connectDB();
        }

        const [result] = await connection.query(
            `SELECT m.*
        FROM movies m
        JOIN movie_genre mg ON m.movie_id = mg.movie_id
        JOIN genre g ON mg.genre_id = g.id
        WHERE g.name = ?`,
            [query]
        );

        if (result.length === 0) {
            return res.status(404).send(null);
        }

        res.status(200).json({ success: true, content: result });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
}

export async function searchMovieByActor(req, res) {
    const query = req.params.query;

    try {
        if (!connection) {
            connection = await connectDB();
        }

        const [result] = await connection.query(
            `SELECT m.*
        FROM movies m
        JOIN movie_cast mc ON m.movie_id = mc.movie_id
        JOIN actors a ON mc.actor_id = a.actor_id
        WHERE a.full_name LIKE ?`,
            [`%${query}%`]
        );

        if (result.length === 0) {
            return res.status(404).send(null);
        }

        res.status(200).json({ success: true, content: result });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
}

export async function searchMovieByDirector(req, res) {
    const query = req.params.query;

    try {
        if (!connection) {
            connection = await connectDB();
        }

        const [result] = await connection.query(
            `SELECT m.*
        FROM movies m
        JOIN directors d ON m.director_id = d.director_id
        WHERE d.full_name LIKE ?`,
            [`%${query}%`]
        );

        if (result.length === 0) {
            return res.status(404).send(null);
        }

        res.status(200).json({ success: true, content: result });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
}
