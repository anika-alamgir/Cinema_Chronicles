import { connectDB } from "../config/db.js";

let connection;

export async function postFeedback(req, res) {
    const movie_id = req.params.id;
    const { rating, review } = req.body;
    const user_id = req.user.users_id;

    try {
        if (!connection) {
            connection = await connectDB();
        }

        if (!rating) {
            return res
                .status(400)
                .json({ success: false, msg: "Rating is required" });
        }

        if (rating < 0 || rating > 10) {
            return res
                .status(400)
                .json({
                    success: false,
                    msg: "Rating must be between 0 and 10",
                });
        }

        const [ratingExists] = await connection.query(
            "SELECT * FROM reviews WHERE movie_id = ? AND user_id = ?",
            [movie_id, user_id]
        );

        if (ratingExists.length > 0) {
            await connection.query(
                "UPDATE reviews SET rating = ?, review = ? WHERE movie_id = ? AND user_id = ?",
                [rating, review, movie_id, user_id]
            );
        } else {
            await connection.query(
                "INSERT INTO reviews (movie_id, user_id, rating, review) VALUES (?, ?, ?, ?)",
                [movie_id, user_id, rating, review]
            );
        }

        res.status(200).json({ success: true, msg: "Rating submitted" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
}

export async function getWatchlist(req, res) {
    try {
        if (!connection) {
            connection = await connectDB();
        }

        const [result] = await connection.query(
            `SELECT * FROM watchlist WHERE user_id = ?`,
            [req.user.users_id]
        );

        res.status(200).json({ success: true, content: result });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
}

export async function addToWatchlist(req, res) {
    const { id } = req.params;

    try {
        if (!connection) {
            connection = await connectDB();
        }

        const [movieExists] = await connection.query(
            `SELECT * FROM watchlist WHERE movie_id = ? AND user_id = ?`,
            [id, req.user.users_id]
        );

        if (movieExists.length > 0) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Movie already in watchlist",
                });
        }

        const [result] = await connection.query(
            `INSERT INTO watchlist (movie_id, user_id) VALUES (?, ?)`,
            [id, req.user.users_id]
        );

        res.status(200).json({
            success: true,
            message: "Added to Your Watchlist",
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
}

export async function deleteItemFromWatchlist(req, res) {
    const { id } = req.params;

    try {
        if (!connection) {
            connection = await connectDB();
        }

        const [result] = await connection.query(
            `DELETE FROM watchlist WHERE movie_id = ? AND user_id = ?`,
            [id, req.user.users_id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).send("Item not found");
        }

        res.status(200).json({ success: true, message: "Item removed" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
}
