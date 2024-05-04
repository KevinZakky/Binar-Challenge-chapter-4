class Component {
  constructor() {
    if (new.target === Component) {
      throw new TypeError("Cannot instantiate abstract class");
    }
  }
  render() {
    throw new Error("Method 'render' must be implemented");
  }
}

// Concrete class Car yang mewarisi dari Component
class Car extends Component {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
  }) {
    super();
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
  }

  render() {
    return `
                <div class="col-4">
                    <div class="card">
                        <img src="${this.image}" class="card-img-top" alt="${this.manufacture}">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-type">${this.manufacture} ${this.model}/ ${this.type}</h5>
                            <p class="card-title">${this.rentPerDay} / hari</p>
                            <p class="card-text">${this.description}</p>
                            <p><i class="fa-regular fa-user"></i>${this.capacity} orang</p>
                            <p><i class="fa-solid fa-gear"></i> ${this.transmission}</p>
                            <p><i class="fa-solid fa-calendar"></i>Tahun ${this.year}</p>
                            <a href="#" class="btn btn-choose-car">Pilih
                                Mobil</a>
                        </div>
                    </div>
                </div>
    `;
  }
}
