import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Row, Col } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";

export default function Favourites() {
    const [favouritesList] = useAtom(favouritesAtom);

    return (
        <div>
            <h2>Favourites</h2>
            {favouritesList.length > 0 ? (
                <Row className="gy-4">
                    {favouritesList.map((objectID) => (
                        <Col lg={3} key={objectID}>
                            <ArtworkCard objectID={objectID} />
                        </Col>
                    ))}
                </Row>
            ) : (
                <p>Nothing Here. Try adding some new artwork to the list.</p>
            )}
        </div>
    );
}
