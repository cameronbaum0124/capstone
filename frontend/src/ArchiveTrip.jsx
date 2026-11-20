import { useEffect, useState} from "react";
import { Trash } from 'lucide-react';

export default function ArchiveTrip({triggerFetch, id}) {

    async function archive() {

        const archiveString = {
            "archived": "true"
        };

        const response = await fetch(`/api/trips/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(archiveString),
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Archive successful!");
        }

        triggerFetch();
    }

    return (
        <Trash className="button" onClick={() => archive()} />
    )
}