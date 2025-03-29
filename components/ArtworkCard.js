import useSWR from 'swr';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import Error from 'next/error';


export default function ArtworkCard({ objectID }) {
    const {data, error} = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)

    if (error) {
        return <Error statusCode={404} />;
    }
    if (!data) {
        return null;
    }

    const { primaryImageSmall, title, objectDate, classification, medium } = data;
    return(
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={primaryImageSmall || 'https://placehold.co/600x400?text=Photo+Not+Available'} />
        <Card.Body>
          <Card.Title>{title || 'N/A'}</Card.Title>
          <Card.Text>
            <p>{objectDate || 'N/A'}</p>
            <p>{classification || 'N/A'}</p>
            <p>{medium || 'N/A'}</p>
          </Card.Text>
          <Link passHref href={`/artwork/${objectID}`}>
          <Button variant="primary">{objectID}</Button>
          </Link>
          
        </Card.Body>
      </Card>

    );
}