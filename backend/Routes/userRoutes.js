const express = require("express");
const router = express.Router();
const pool = require("../db/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "your_secret_key"; // Use a secure key in production

// 🔹 Middleware for authentication
const authenticate = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
        req.user = decoded; // Attach user data to request
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};

// 🔹 Route to register a new user
router.post("/adduser", async (req, res) => {
    const { Name, Email, Password, Role, City, District, Department_ID } = req.body;

    if (!Name || !Email || !Password || !Role) {
        return res.status(400).json({ message: "Please provide all required fields" });
    }

    try {
        const hashedPassword = await bcrypt.hash(Password, 10);
        
        pool.query(
            "INSERT INTO user (Name, Email, Password, Role, City, District, Department_ID) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [Name, Email, hashedPassword, Role, City, District, Department_ID],
            (err, result) => {
                if (err) {
                    console.error("Error adding user:", err);
                    return res.status(500).json({ message: "Error adding user", error: err.message });
                }
                res.status(201).json({ message: "User added successfully", userId: result.insertId });
            }
        );
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// 🔹 Route for user login (Generates Token)
router.post("/login", (req, res) => {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
        return res.status(400).json({ message: "Email and Password are required" });
    }

    pool.query("SELECT * FROM user WHERE Email = ?", [Email], async (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        if (results.length === 0) {
            console.log("No user found with email:", Email);
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const user = results[0];

        console.log("User found:", user); // Debugging info

        try {
            const passwordMatch = await bcrypt.compare(Password, user.Password);

            console.log("Password match:", passwordMatch); // Debugging info

            if (!passwordMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign({ id: user.User_ID, role: user.Role }, JWT_SECRET, { expiresIn: "1h" });

            res.status(200).json({ message: "Login successful", token });
        } catch (error) {
            console.error("Error comparing passwords:", error);
            res.status(500).json({ message: "Server error" });
        }
    });
});


// 🔹 Protected Route (Only for authenticated users)
router.get("/users", authenticate, (req, res) => {
    pool.query("SELECT * FROM user", (err, results) => {
        if (err) {
            console.error("Error fetching users:", err);
            return res.status(500).json({ message: "Error fetching users" });
        }
        res.json(results);
    });
});
// ✅ Route to update a user
router.put("/update-user", (req, res) => {
    const { User_ID, Name, Email, Role, City, District, Department_ID } = req.body;

    if (!User_ID || !Name || !Email || !Role) {
        return res.status(400).json({ message: "Please provide all required fields" });
    }

    pool.query(
        "UPDATE user SET Name = ?, Email = ?, Role = ?, City = ?, District = ?, Department_ID = ? WHERE User_ID = ?",
        [Name, Email, Role, City, District, Department_ID, User_ID],
        (err, result) => {
            if (err) {
                console.error("❌ Error updating user:", err);
                return res.status(500).json({ message: "Error updating user" });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json({ message: "✅ User updated successfully" });
        }
    );
});

// ✅ Route to delete a user
router.delete("/delete-user", (req, res) => {
    const { User_ID } = req.body;

    if (!User_ID) {
        return res.status(400).json({ message: "User ID is required" });
    }

    pool.query("DELETE FROM user WHERE User_ID = ?", [User_ID], (err, result) => {
        if (err) {
            console.error("❌ Error deleting user:", err);
            return res.status(500).json({ message: "Error deleting user" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "✅ User deleted successfully" });
    });
});


module.exports = router;