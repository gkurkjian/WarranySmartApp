import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from './useSession';
import { Container, Spinner } from 'react-bootstrap';

/**
 * Higher-Order Component to protect routes
 * Redirects to /login if user is not authenticated
 */
export function requireAuth(Component) {
  return function ProtectedRoute(props) {
    const { session, loading } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !session) {
        router.push('/login');
      }
    }, [session, loading, router]);

    // Show loading spinner while checking auth
    if (loading) {
      return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Container>
      );
    }

    // Don't render the component until we confirm user is authenticated
    if (!session) {
      return null;
    }

    // User is authenticated, render the protected component
    return <Component {...props} />;
  };
}
