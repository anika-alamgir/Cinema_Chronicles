import { connectDB } from "../config/db.js";

let connection;

export async function getTrendingMovie(req, res) {
    try {
        if (!connection) {
            connection = await connectDB();
        }

        const [movies] = await connection.query("SELECT * FROM movies");

        if (movies.length === 0) {
            return res
                .status(404)
                .json({ success: false, msg: "No movies found" });
        }

        const randomMovie = movies[Math.floor(Math.random() * movies?.length)];

        const [reviews] = await connection.query(
            "SELECT * FROM reviews WHERE movie_id = ?",
            [randomMovie.movie_id]
        );

        res.status(200).json({
            success: true,
            content: randomMovie,
            review: reviews,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
}

export async function getAllMovies(req, res) {
    try {
        if (!connection) {
            connection = await connectDB();
        }

        const [movies] = await connection.query("SELECT * FROM movies");

        if (movies.length === 0) {
            return res
                .status(404)
                .json({ success: false, msg: "No movies found" });
        }

        res.status(200).json({ success: true, content: movies });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
}

export async function getMovieDetails(req, res) {
    const { id } = req.params;

    try {
        if (!connection) {
            connection = await connectDB();
        }

        const [movie] = await connection.query(
            "SELECT * FROM movies WHERE movie_id = ?",
            [id]
        );

        const [reviews] = await connection.query(
            "SELECT * FROM reviews WHERE movie_id = ?",
            [movie[0].movie_id]
        );

        res.status(200).json({
            success: true,
            content: movie,
            review: reviews,
        });
    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }
        res.status(500).send("Server Error");
    }
}

export async function getActorDetails(req, res) {
    const { id } = req.params;

    try {
        if (!connection) {
            connection = await connectDB();
        }

        const [actor] = await connection.query(
            `SELECT a.actor_id, a.full_name, a.dob, a.nationality, a.gender, a.net_worth, a.active_years
        FROM actors a
        JOIN movie_cast mc ON a.actor_id = mc.actor_id
        WHERE mc.movie_id = ?;`,
            [id]
        );

        if (actor.length === 0) {
            return res
                .status(404)
                .json({ success: false, msg: "Actor not found" });
        }

        res.status(200).json({ success: true, content: actor });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
}
