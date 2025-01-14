const db = require('../db');

// Tambah profile
exports.createProfile = (req, res) => {
    const { name, email, password, profile_image, phone_number, address } = req.body;
    const sql = `INSERT INTO profile (name, email, password, profile_image, phone_number, address) 
                 VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(sql, [name, email, password, profile_image, phone_number, address], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Profile created successfully', id: result.insertId });
    });
};

// Get atau melihat semua profile
exports.getAllProfiles = (req, res) => {
    const sql = `SELECT * FROM profile`;
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Lihat Profile berdasarkan ID
exports.getProfileById = (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM profile WHERE id = ?`;
    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json(results[0]);
    });
};

// edit profile
exports.updateProfile = (req, res) => {
    const { id } = req.params;
    const { name, email, password, profile_image, phone_number, address } = req.body;
    const sql = `UPDATE profile SET name = ?, email = ?, password = ?, profile_image = ?, phone_number = ?, address = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
    db.query(sql, [name, email, password, profile_image, phone_number, address, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json({ message: 'Profile updated successfully' });
    });
};

// hapus Profile
exports.deleteProfile = (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM profile WHERE id = ?`;
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json({ message: 'Profile deleted successfully' });
    });
};
