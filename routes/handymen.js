let HandyMan = require('../model/handyman');

function getAll(req, res) {
    HandyMan.find().then((handymen) => {
        res.send(handymen);
    }).catch((err) => {
        res.send(err);
    });
}

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

function create(req, res) {
    let handyman = new HandyMan();
    handyman.name = req.body.name;
    handyman.avatarUrl = req.body.avatarUrl;
    handyman.aboutMe = req.body.aboutMe;
    handyman.phone = req.body.phone;
    handyman.address = req.body.address;
    handyman.isFavorite = req.body.isFavorite;
    handyman.webSite = req.body.webSite;

    console.log(handyman)

    handyman.save()
        .then((handyman) => {
                res.json({message: `${handyman.name} saved with id ${handyman.id}!`});
            }
        ).catch((err) => {
        res.send('cant post handyman ', err);
    });
}

async function update(req, res) {
    console.log(req.body);
    try {
        const handyman = await HandyMan.findByIdAndUpdate(req.params.id, req.body, {new: true});

        if (!handyman) {
            return res.status(404).json({message: 'handyman not found'});
        }

        res.json({message: 'Updated successfully', handyman: handyman});
    } catch (err) {
        console.error('Error updating handyman:', err);
        res.status(500).send(err);
    }


}

async function deleteOne(req, res) {
    try {
        const handyman = await HandyMan.findByIdAndDelete(req.params.id);

        if (!handyman) {
            return res.status(404).json({message: 'handyman not found'});
        }

        res.json({message: `${handyman.name} deleted successfully`});
    } catch (err) {
        console.error('Error deleting handyman:', err);
        res.status(500).send(err);
    }

}


module.exports = {getAll, create, getOne, update, deleteOne};
