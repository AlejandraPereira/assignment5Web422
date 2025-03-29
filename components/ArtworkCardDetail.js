import useSWR from 'swr';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import Error from 'next/error';


export default function ArtworkCardDetail({ objectID }) {
    const {data, error} = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)

    if (error) {
        return <Error statusCode={404} />;
    }
    if (!data) {
        return null; 
    }

    const { primaryImage, title, objectDate, classification, medium, artistDisplayName, creditLine, dimensions, artistWikidata_URL  } = data;
    
    return(
        <Card style={{ width: '18rem' }}>
        {primaryImage && 
        <Card.Img variant="top" src={primaryImage || 'https://placehold.co/600x400?text=Photo+Not+Available'} />
        }
        <Card.Body>
          <Card.Title>{title || 'N/A'}</Card.Title>
          <Card.Text>
            <p>{objectDate || 'N/A'}</p>
            <p>{classification || 'N/A'}</p>
            <p>{medium || 'N/A'}</p>
            <br />
            <br />
            {artistDisplayName && (
                <p>
                    Artist: <a href={artistWikidata_URL} target="_blank" rel="noreferrer">Wiki</a>
                </p>
            )}
            <p>{creditLine || 'N/A'}</p>
            <p>{dimensions || 'N/A'}</p>
          </Card.Text>
          <Link passHref href={`/artwork/${objectID}`}>
          <Button variant="primary">{objectID}</Button>
          </Link>
          
        </Card.Body>
      </Card>

    );
}