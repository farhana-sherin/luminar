import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "../components/Card";

export default function Collections() {
    const location = useLocation();
    const [initialCategory, setInitialCategory] = useState("All");

    useEffect(() => {
        if (location.state && location.state.category) {
            setInitialCategory(location.state.category);
        }
    }, [location.state]);

    return (
        <div className="min-h-screen">
            <Card externalCategory={initialCategory} showFilters={true} />
        </div>
    );
}
