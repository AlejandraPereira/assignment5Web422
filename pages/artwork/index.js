import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Row, Col, Pagination, Card } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';
import Error from 'next/error';



const PER_PAGE = 12;

export default function ArtworkPage(){

    const [artworkList, setArtworkList] = useState(null);
    const [page, setPage] = useState(1);
    const router = useRouter();

    let finalQuery = router.asPath.split('?')[1];

    const {data, error} = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);

    useEffect(()=>{
        if (data){
            const result =[];
            for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
                const chunk = data?.objectIDs.slice(i, i + PER_PAGE);
                result.push(chunk);
              }
              
              setArtworkList(result);
            setPage(1)              
        }
    },[data]);

    const previousPage = () => {
        if (page > 1) 
        setPage(page - 1);
    };
    
      const nextPage = () => {
        setPage(page + 1);
    };

    if (error) {
        return <Error statusCode={404} />;
    }

    if (!artworkList) return null;

    return(
        <>
        <Row className="gy-4">
        {artworkList.length > 0 ? (
          artworkList[page - 1].map((currentObjectID) => (
            <Col lg={3} key={currentObjectID}>
              <ArtworkCard objectID={currentObjectID} />
            </Col>
          ))
        ) : (
          <Card>
            <Card.Body>
              <h4>Nothing Here</h4> Try searching for something else.
            </Card.Body>
          </Card>
        )}
      </Row>
      {artworkList.length > 0 && (
        <Row>
          <Col>
            <Pagination>
              <Pagination.Prev onClick={previousPage} />
              <Pagination.Item>{page}</Pagination.Item>
              <Pagination.Next onClick={nextPage} />
            </Pagination>
          </Col>
        </Row>
      )}
      </>
    );
}