import { ReactNode } from "react";

interface TileWrapperProps {
    children: ReactNode;
}

const TileWrapper = ({ children }: TileWrapperProps) => {
    return (
        <div className="column is-6">
            <div className="card is-shadowless contact-tile">
                <div className="card-content">
                    <div className="content">
                        <div className="columns is-gapless is-centered">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TileWrapper;
