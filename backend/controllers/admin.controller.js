import { connectDB } from "../config/db.js";

let connection;

export async function getUsers(req, res) {
    try {
        if (!connection) {
            connection = await connectDB();
        }

        let [users] = await connection.query("SELECT * FROM users");

        if (users.length === 0) {
            return res
                .status(404)
                .json({ success: false, msg: "No users found" });
        }
        users = users.filter((user) => user.users_id !== req.user.users_id);

        res.status(200).json({ success: true, content: users });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
}

export async function deleteUser(req, res) {
    try {
        if (!connection) {
            connection = await connectDB();
        }

        const { id } = req.params;

        const [user] = await connection.query(
            "SELECT * FROM users WHERE users_id = ?",
            [id]
        );

        if (user.length === 0) {
            return res
                .status(404)
                .json({ success: false, msg: `No user found with id ${id}` });
        }

        await connection.query("DELETE FROM users WHERE users_id = ?", [id]);

        res.status(200).json({
            success: true,
            msg: `User with id ${id} deleted`,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
}

export async function getMovies(req, res) {
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

export async function addMovies(req, res) {
    try {
        if (!connection) {
            connection = await connectDB();
        }

        const {
            title,
            box_office,
            description,
            budget,
            genre,
            director,
            trailer,
            release_year,
            language,
            duration,
            posterUrl,
        } = req.body;

        await connection.query(
            "INSERT INTO movies (title, box_office, description, budget, genre, director, trailer, release_year, language, duration, posterUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                title,
                box_office,
                description,
                budget,
                genre,
                director,
                trailer,
                release_year,
                language,
                duration,
                posterUrl,
            ]
        );

        res.status(201).json({
            success: true,
            msg: `Movie added Successfully`,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
}

export async function deleteMovies(req, res) {
    try {
        if (!connection) {
            connection = await connectDB();
        }

        const { id } = req.params;

        const [movie] = await connection.query(
            "SELECT * FROM movies WHERE movie_id = ?",
            [id]
        );

        if (movie.length === 0) {
            return res
                .status(404)
                .json({ success: false, msg: `No movie found with id ${id}` });
        }

        await connection.query("DELETE FROM movies WHERE movie_id = ?", [id]);

        res.status(200).json({
            success: true,
            msg: `Movie deleted Successfully`,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
}

export async function updateMovie(req, res) {
    try {
        if (!connection) {
            connection = await connectDB();
        }

        const { id } = req.params;

        const {
            title,
            box_office,
            description,
            budget,
            genre,
            director,
            trailer,
            release_year,
            language,
            duration,
            posterUrl,
        } = req.body;

        const [movie] = await connection.query(
            "SELECT * FROM movies WHERE movie_id = ?",
            [id]
        );

        if (movie.length === 0) {
            return res
                .status(404)
                .json({ success: false, msg: `No movie found with id ${id}` });
        }

        await connection.query(
            "UPDATE movies SET title = ?, box_office = ?, description = ? ,budget = ?, genre= ?, director= ?, trailer = ?, release_year = ?, language = ?, duration = ?, posterUrl = ? WHERE movie_id = ?",
            [
                title,
                box_office,
                description,
                budget,
                genre,
                director,
                trailer,
                release_year,
                language,
                duration,
                posterUrl,
                id,
            ]
        );

        res.status(200).json({
            success: true,
            msg: `Movie updated Successfully`,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
}
