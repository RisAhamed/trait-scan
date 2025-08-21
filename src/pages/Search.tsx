// src/pages/Search.tsx
import React from 'react';
import { Search as SearchIcon } from 'lucide-react';

const Search = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
      <SearchIcon className="h-16 w-16 text-accent mx-auto mb-4" />
      <h1 className="text-4xl font-bold">Search Library</h1>
      <p className="text-xl text-muted-foreground mt-2">
        This feature is coming soon. You'll be able to search a library of public personas.
      </p>
    </div>
  );
};

export default Search;