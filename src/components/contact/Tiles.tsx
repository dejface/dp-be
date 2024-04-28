import SocialsTile from "@/src/components/contact/SocialsTile";
import ContactTile from "@/src/components/contact/ContactTile";
import TileWrapper from "@/src/components/contact/TileWrapper";

const Tiles = () => {
    return (
        <div className="container">
            <div className="columns mb-3">
                <TileWrapper>
                    <SocialsTile />
                </TileWrapper>
                <TileWrapper>
                    <ContactTile />
                </TileWrapper>
            </div>
        </div>
    );
};

export default Tiles;
