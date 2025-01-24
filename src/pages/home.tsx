import {Link} from "react-router-dom";

export function Home() {
    return (
        <>
            <h1>Elegir super</h1>
            <Link to="/searchProducts">
                <img alt="Carrefour Logo" className="w-56" src="./src/assets/carrefour-logo.png" />
            </Link>
        </>
    );
}
