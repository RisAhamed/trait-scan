import React from 'react';
import { Users } from 'lucide-react';

const Personas = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
      <Users className="h-16 w-16 text-accent mx-auto mb-4" />
      <h1 className="text-4xl font-bold">My Personas</h1>
      <p className="text-xl text-muted-foreground mt-2">
        This page is under construction. Your saved personas will appear here.
      </p>
    </div>
  );
};

export default Personas;
