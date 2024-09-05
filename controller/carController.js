const appModel = require('../model/carModel');

const getCars = async (req, res) => {
    const data = req.body;
    try {
        const result = await appModel.getAllCars();
        if (!result) {
            return res.status(400).send({ statusCode: 400, data: 'Data cannot be added' });
        }
        res.status(201).send({ statusCode: 200, data: result });
    } catch (error) {
        res.status(500).send({ data: 'Internal Server Error' });
    }
};

const addCar = async (req, res) => {
    const data = req.body;
    console.log("Controler called", data);
    try {
        const result = await appModel.addCar(data);
        if (!result) {
            return res.status(400).send({ statusCode: 400, data: 'Data cannot be added' });
        }
        res.status(201).send({ statusCode: 201, data: 'Car data added.' });
    } catch (error) {
        res.status(500).send({ data: 'Internal Server Error' });
    }
};

module.exports = {
    addCar,
    getCars
};
