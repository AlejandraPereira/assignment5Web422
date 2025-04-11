import { useRouter } from "next/router";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "../store"; 

export default function AdvancedSearch() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom); 

    const submitForm = (data) => {
        let queryString = `searchBy=${encodeURIComponent(data.searchBy)}`;

        if (data.geoLocation) {
            queryString += `&geoLocation=${encodeURIComponent(data.geoLocation)}`;
        }
        if (data.medium) {
            queryString += `&medium=${encodeURIComponent(data.medium)}`;
        }
        queryString += `&isOnView=${data.isOnView ? "true" : "false"}`;
        queryString += `&isHighlight=${data.isHighlight ? "true" : "false"}`;
        queryString += `&q=${encodeURIComponent(data.q)}`;

        // Add the search query to history
        setSearchHistory((current) => [...current, queryString]);

        router.push(`/artwork?${queryString}`);
    };

    return (
        <Form onSubmit={handleSubmit(submitForm)}>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Search Query</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter search query"
                            {...register("q", { required: "Search query is required" })}
                            className={errors.q ? "is-invalid" : ""}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <Form.Label>Search By</Form.Label>
                    <Form.Select {...register("searchBy")} className="mb-3">
                        <option value="title">Title</option>
                        <option value="tags">Tags</option>
                        <option value="artistOrCulture">Artist or Culture</option>
                    </Form.Select>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>Geo Location</Form.Label>
                        <Form.Control type="text" {...register("geoLocation")} />
                        <Form.Text className="text-muted">
                            Case Sensitive (ie &quot;Europe&quot;, &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.), with multiple values separated by the | operator
                        </Form.Text>
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>Medium</Form.Label>
                        <Form.Control type="text" {...register("medium")} />
                        <Form.Text className="text-muted">
                            Case Sensitive (ie: &quot;Ceramics&quot;, &quot;Furniture&quot;, &quot;Paintings&quot;, &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with multiple values separated by the | operator
                        </Form.Text>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Check type="checkbox" label="Highlighted" {...register("isHighlight")} />
                    <Form.Check type="checkbox" label="Currently on View" {...register("isOnView")} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <br />
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}
