// File: routes/handymen.js

let HandyMan = require('../model/handyman');

/**
 * GET /api/handymans
 * Returns all handymen.
 */
function getAll(req, res) {
    HandyMan.find().then((handymen) => {
        res.send(handymen);
    }).catch((err) => {
        res.send(err);
    });
}

/**
 * GET /api/handymans/:id
 * Returns a single handyman by ID.
 */
function getOne(req, res) {
    let id = req.params.id;
    HandyMan.findById(id)
        .then((handyman) => {
            if (!handyman) {
                res.status(404).send('handyman not found');
            } else {
                res.send(handyman);
            }
        })
        .catch((err) => {
            res.send(err);
        });
}

/**
 * POST /api/handymans
 * Creates a new handyman.
 */
function create(req, res) {
    let handyman = new HandyMan();
    handyman.name = req.body.name;
    handyman.avatarUrl = req.body.avatarUrl;
    handyman.aboutMe = req.body.aboutMe;
    handyman.phone = req.body.phone;
    handyman.address = req.body.address;
    handyman.isFavorite = req.body.isFavorite;
    handyman.webSite = req.body.webSite;

    handyman.save()
        .then((handyman) => {
            res.json({ message: `${handyman.name} saved with id ${handyman.id}!` });
        })
        .catch((err) => {
            res.send('cant post handyman ', err);
        });
}

/**
 * PUT /api/handymans/:id
 * Updates a handyman by ID.
 */
async function update(req, res) {
    try {
        const handyman = await HandyMan.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!handyman) {
            return res.status(404).json({ message: 'handyman not found' });
        }
        res.json({ message: 'Updated successfully', handyman: handyman });
    } catch (err) {
        console.error('Error updating handyman:', err);
        res.status(500).send(err);
    }
}

/**
 * DELETE /api/handymans/:id
 * Deletes a handyman by ID.
 */
async function deleteOne(req, res) {
    try {
        const handyman = await HandyMan.findByIdAndDelete(req.params.id);
        if (!handyman) {
            return res.status(404).json({ message: 'handyman not found' });
        }
        res.json({ message: `${handyman.name} deleted successfully` });
    } catch (err) {
        console.error('Error deleting handyman:', err);
        res.status(500).send(err);
    }
}

/**
 * PATCH /api/handymans/:id/favorite
 * Toggles the 'isFavorite' field of a handyman.
 */
async function toggleFavorite(req, res) {
    try {
        const handyman = await HandyMan.findById(req.params.id);
        if (!handyman) {
            return res.status(404).json({ message: 'handyman not found' });
        }
        handyman.isFavorite = !handyman.isFavorite;
        await handyman.save();
        res.json({ message: `Favorite set to ${handyman.isFavorite}`, handyman });
    } catch (err) {
        console.error('Error toggling favorite:', err);
        res.status(500).send(err);
    }
}

module.exports = {
    getAll,
    create,
    getOne,
    update,
    deleteOne,
    toggleFavorite
};
