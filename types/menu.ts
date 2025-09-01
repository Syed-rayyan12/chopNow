// types/menu.ts
export interface MenuItem {
    
    id: string; // always keep it consistent (string OR number, not both)
    name: string;
    price: number;
    description: string; // optional if some items don’t have description
    available: boolean;
    image: string;
    category: string;
  }