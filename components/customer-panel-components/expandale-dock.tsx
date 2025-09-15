import React from 'react'
import ExpandableDock from '../ui/expandable-dock';
import { Search } from 'lucide-react';

const expandaleDock = () => {
    return (
        <ExpandableDock
            headerContent={
                <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold">Search restaurant and cuisine</span>
                    <Search className="w-5 h-5" />
                </div>
            }
            className="max-w-lg"
        />
    )
}

export default expandaleDock;
