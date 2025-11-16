import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Container from "../components/Container";
import PrimaryBtn from "../components/PrimaryBtn";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";
import { useRef } from "react";

const Coverage = () => {
  const position = [23.685, 90.3563];
  const serviceCenters = useLoaderData();
  const mapRef = useRef(null)

  const handleSearch=(e)=>{
    e.preventDefault()
    console.log('hello');
    const location = e.target.location.value 
    const districts = serviceCenters.find(center => center.district.toLowerCase().includes(location.toLowerCase()));
    if(districts){
        const coOrdinate = [districts.latitude,districts.longitude]
        mapRef.current.flyTo(coOrdinate,12)
    }

  }

  return (
    <Container>
      <section className="py-20 bg-white rounded-xl mt-8">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-second text-center mb-12">
          We are available in <span className="text-main">64 districts</span>
        </h2>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-16">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="Search your district..."
              className="outline flex-1 rounded-full px-6 py-2.5 text-base"
              name="location"
            />
            <input type="submit" value="Search" className="font-semibold rounded-full bg-main border border-main py-2.5 px-6 cursor-pointer" />
          </form>
        </div>

        {/* Subtitle */}
        <h3 className="text-xl md:text-2xl font-semibold text-second text-center mb-10">
          We deliver almost all over Bangladesh
        </h3>

        {/* map  */}
        <div className="w-11/12 mx-auto h-[700px] rounded-xl overflow-hidden">
          <MapContainer
            center={position}
            zoom={7.5}
            scrollWheelZoom={false}
            className="h-[700px]"
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {serviceCenters.map((center, index) => (
              <Marker
                key={index}
                position={[center.latitude, center.longitude]}
              >
                <Popup>
                  <strong>{center.district}</strong>
                  <br /> Service Area: {center.covered_area.join(",  ")}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </section>
    </Container>
  );
};

export default Coverage;
