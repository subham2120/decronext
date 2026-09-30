import { Link } from "react-router-dom";
import "./Rooms.css";

const rooms = [
  {
    name: "Living Room",
    image: "/rooms/living-room.png",
    subtitle: "Sofas, Decor, Lighting & More",
    category: "Living Room Collection",
  },
  {
    name: "Bedroom",
    image: "/rooms/bedroom.png",
    subtitle: "Beds, Bedding, Lamps & More",
    category: "Bedroom Collection",
  },
  {
    name: "Study Room",
    image: "/rooms/study-room.png",
    subtitle: "Study Tables, Chairs, Storage & More",
    category: "Study Room Collection",
  },
  {
    name: "Balcony",
    image: "/rooms/balcony.png",
    subtitle: "Plants, Outdoor Decor & More",
    category: "Balcony Collection",
  },
];

function Rooms() {
  return (
    <div className="rooms-page">

      <section className="rooms-hero">
        <p>DECORNEXT</p>

        <h1>Decorate Every Room</h1>

        <span>
          Find beautiful pieces designed to make
          every corner of your home feel special.
        </span>
      </section>

      <section className="rooms-section">

        <div className="rooms-heading">
          <div>
            <p>SHOP BY ROOM</p>
            <h2>Find Your Perfect Space</h2>
          </div>
        </div>

        <div className="rooms-grid">

          {rooms.map((room) => (
            <div className="room-card" key={room.name}>

              <img
                src={room.image}
                alt={room.name}
              />

              <div className="room-overlay"></div>

              <div className="room-content">
                <p>{room.category}</p>

                <h3>{room.name}</h3>

                <span>{room.subtitle}</span>

                <Link to="/shop" className="room-button">
                  Explore Room
                  <span>→</span>
                </Link>
              </div>

            </div>
          ))}

        </div>

      </section>

    </div>
  );
}

export default Rooms;