import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
    return (
        <footer className="ms-auto mt-4 py-3 bg-dark text-white">
            <Container>
                <Row>
                    <Col className="text-center">
                        <p>&copy; {new Date().getFullYear()} WarrantySmart. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}