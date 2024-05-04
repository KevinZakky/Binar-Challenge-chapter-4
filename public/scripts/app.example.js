class App {
  constructor() {
    this.clearButton = document.getElementById("clear-btn");
    this.loadButton = document.getElementById("load-btn");
    this.carContainerElement = document.getElementById("cars-container");
    this.filterCarButton = document.getElementById("filter-car-button");
    this.driverType = document.getElementById("driver-type");
    this.date = document.getElementById("date");
    this.time = document.getElementById("pickup-time");
    this.passengerCount = document.getElementById("passenger-count");
  }

  async init() {
    await this.load();

    // this.filterCarButton.onclick = this.run();
    this.filterCarButton.disabled = true;
    this.filterCarButton.addEventListener("click", () => {
      this.run();
    });

    // inisialisasi disable filter
    this.driverType.addEventListener("change", this.disabledFilterButton);
    this.date.addEventListener("change", this.disabledFilterButton);
    this.time.addEventListener("change", this.disabledFilterButton);
  }

  run = () => {
    const selectedDriverType = parseInt(this.driverType.value);
    const selectedDate = this.date.value;
    const selectedTime = this.time.value;
    const selectedPassengerCount = this.passengerCount.value;
    // Clear previous results
    this.clear();
    this.disabledFilterButton();

    const filteredCars = Car.list.filter((car) => {
      if (selectedDriverType === 1) {
        if (!car.available) {
          return false;
        }
      } else if (selectedDriverType === 2) {
        if (car.available) {
          return false;
        }
      }

      const availableAtDate = new Date(car.availableAt);
      const selectedDateTime = new Date(`${selectedDate}T${selectedTime}`);
      return (
        availableAtDate > selectedDateTime &&
        car.capacity >= selectedPassengerCount
      );
    });

    filteredCars.forEach((car) => {
      const node = document.createElement("div");
      node.innerHTML = car.render();
      this.carContainerElement.appendChild(node);
    });
  };

  disabledFilterButton = () => {
    const isTypeDriver = this.driverType.value !== "";
    const isDate = this.date.value !== "";
    const isTime = this.time.value !== "";

    this.filterCarButton.disabled = !(isTypeDriver && isDate && isTime);
  };

  formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  async load() {
    const cars = await Binar.listCars();
    cars.forEach((car) => {
      car.rentPerDay = this.formatCurrency(car.rentPerDay);
    });
    Car.init(cars);
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}
