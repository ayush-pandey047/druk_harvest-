import products from '../data/products.json';
import farmers from '../data/farmers.json';
import recipes from '../data/recipes.json';
import faq from '../data/faq.json';
import { seasonStatus } from './season.js';

export { products, farmers, recipes, faq };

export const CATEGORIES = [
  { id: 'all', label: 'Everything' },
  { id: 'vegetables', label: 'Vegetables' },
  { id: 'fruits', label: 'Fruits' },
  { id: 'grains', label: 'Grains' },
  { id: 'honey', label: 'Honey' },
  { id: 'local-goods', label: 'Local Goods' },
];

export const productById = (id) => products.find((p) => p.id === id);
export const farmerById = (id) => farmers.find((f) => f.id === id);
export const recipeById = (id) => recipes.find((r) => r.id === id);

const rank = { in: 0, soon: 1, out: 2 };
export const bySeason = (list) => [...list].sort((a, b) => rank[seasonStatus(a)] - rank[seasonStatus(b)]);

export const ORIGINS = [...new Set(products.map((p) => p.origin.split(', ').pop()))].sort();

export const formatNu = (n) => `Nu. ${n.toLocaleString('en-IN')}`;

export const CONTACT = {
  phone: '+975 17 00 00 00',
  phoneHref: 'tel:+97517000000',
  whatsapp: '97517000000',
  email: 'hello@drukharvest.example',
  address: 'Placeholder address, Changzamtog, Thimphu',
};

export const DELIVERY = [
  { area: 'Thimphu', days: 'Tuesday & Friday', note: 'Order by the evening before' },
  { area: 'Paro', days: 'Wednesday', note: 'Order by Monday' },
  { area: 'Punakha & Wangdue', days: 'Saturday', note: 'Order by Thursday' },
];
