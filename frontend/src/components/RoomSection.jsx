import "./RoomSection.css";

const rooms = [
  {
    name: "Living Room",
    image: "/rooms/living-room.png",
  },
  {
    name: "Bedroom",
    image: "/rooms/bedroom.png",
  },
  {
    name: "Study Room",
    image: "/rooms/study-room.png",
  },
  {
    name: "Balcony",
    image: "/rooms/balcony.png",
  },
];

function RoomSection() {
  return (
    <section className="room-section">

      <div className="section-heading">
        <div>
          <p className="section-label">FIND YOUR STYLE</p>
          <h2>Shop by Room</h2>
        </div>

        <button>View All →</button>
      </div>

      <div className="room-grid">
        {rooms.map((room) => (
          <div className="room-card" key={room.name}>

            <img
              src={room.image}
              alt={room.name}
            />

            <div className="room-overlay">
              <h3>{room.name}</h3>
              <span>Explore →</span>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}

export default RoomSection;