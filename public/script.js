

let cardsContainer;
const createCard = (car) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const carImage = document.createElement('img');
    carImage.src = car.image;
    carImage.alt = car.name;

    const carName = document.createElement('h3');
    carName.textContent = car.name;

    const carDescription = document.createElement('p');
    carDescription.textContent = car.description;

    card.appendChild(carImage);
    card.appendChild(carName);
    card.appendChild(carDescription);

    cardsContainer.appendChild(card);
}

document.addEventListener('DOMContentLoaded', async () => {
    // Initialize the modal
    const modals = document.querySelectorAll('.modal');
    const modalInstances = M.Modal.init(modals);

    // Get the image element
    const image = document.getElementById('save-car');
    
    // Add click event to the image to open the modal
    image.addEventListener('click', () => {
        modalInstances[0].open(); // Open the first modal
    });
    const fetchCarData = async () => {
        try {
            const data = await fetch('/api/getCars', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return JSON.parse(await data.text());
        } catch (error) {
            console.log("RRRRRR::", error);
        }
    }

    let carsDataRaw = await fetchCarData();
    let carsData = carsDataRaw.data;
    console.log(carsData, typeof(carsData));

    cardsContainer = document.getElementById('cards-container');


    carsData.forEach(car => {
        createCard(car);
    });

    const socket =  io();

    socket.on('time', (data) => {
        console.log(`Data from server through socket, connection time: ${data}`);
    });

    socket.on('password', (data) => {
        console.log(`Random password from server through socket: ${data}`);
    });

    socket.on('status', (data) => {
        console.log(`Server status through socket: ${data}`);
    });

});


const addCar = () => {
    const carNameEle = document.getElementById("car-name");
    const carDescriptionEle = document.getElementById("car-description");
    const carImageEle = document.getElementById("car-image");

    const car = { "name": carNameEle.value, "description": carDescriptionEle.value, "image": carImageEle.value }
    addCarToDB(car)

    carNameEle.value = null;
    carDescriptionEle.value = null;
    carImageEle.value = null;
}

const addCarToDB = async (car) => {
    try {
        const data = await fetch('/api/addCar', {
            method: 'POST',
            body: JSON.stringify(car),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const result = JSON.parse(await data.text());

        console.log(typeof(result), result);
        if (result?.statusCode == 201) {
            createCard(car)
        }
    
    } catch (error) {
        console.log("RRRRRR::", error);
    }
}
