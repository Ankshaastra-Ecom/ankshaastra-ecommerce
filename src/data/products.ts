// Yantra images
import chandraYantra from '@/assets/yantras/chandra-yantra.webp';
import ketuYantra from '@/assets/yantras/ketu-yantra.webp';
import kuberYantra from '@/assets/yantras/kuber-yantra.webp';
import rahuYantra from '@/assets/yantras/rahu-yantra.webp';
import shreeYantra from '@/assets/yantras/shree-yantra.webp';
import shukraYantra from '@/assets/yantras/shukra-yantra.webp';
import suryaYantra from '@/assets/yantras/surya-yantra.webp';

// Bracelet images
import amazonite1 from '@/assets/bracelets/amazonite-1.webp';
import amazonite2 from '@/assets/bracelets/amazonite-2.webp';
import amazonite3 from '@/assets/bracelets/amazonite-3.webp';
import amazonite4 from '@/assets/bracelets/amazonite-4.webp';
import amazonite5 from '@/assets/bracelets/amazonite-5.webp';
import amazonite6 from '@/assets/bracelets/amazonite-6.webp';
import redJasper1 from '@/assets/bracelets/red-jasper-1.webp';
import redJasper2 from '@/assets/bracelets/red-jasper-2.webp';
import redJasper3 from '@/assets/bracelets/red-jasper-3.webp';
import redJasper4 from '@/assets/bracelets/red-jasper-4.webp';

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  rating: number;
  reviews: number;
  description: string;
  benefits: string[];
  specifications: Record<string, string>;
  inStock: boolean;
  featured?: boolean;
  bestSeller?: boolean;
}

const yantraImageMap: Record<string, string> = {
  'Surya Yantra': suryaYantra,
  'Chandrama Yantra': chandraYantra,
  'Ketu Yantra': ketuYantra,
  'Laxmi-Ganesh-Kuber Yantra': kuberYantra,
  'Rahu Yantra': rahuYantra,
  'Shree Yantra': shreeYantra,
  'Shukra Yantra': shukraYantra,
};

const braceletImageMap: Record<string, { image: string; images: string[] }> = {
  'Natural Amazonite Bracelet': {
    image: amazonite1,
    images: [amazonite1, amazonite2, amazonite3, amazonite4, amazonite5, amazonite6]
  },
  'Red Jasper Bracelet': {
    image: redJasper1,
    images: [redJasper1, redJasper2, redJasper3, redJasper4]
  },
};

export const categories = [
  {
    id: 'rudraksha',
    name: 'Rudraksha',
    description: 'Sacred seeds of Lord Shiva for spiritual awakening',
    image: '/placeholder.svg',
    items: [
      '1 Mukhi', '2 Mukhi', '3 Mukhi', '4 Mukhi', '5 Mukhi', '6 Mukhi',
      '7 Mukhi', '8 Mukhi', '9 Mukhi', '10 Mukhi', '11 Mukhi', '12 Mukhi',
      '13 Mukhi', '14 Mukhi', '15 Mukhi', '16 Mukhi', '17 Mukhi', '18 Mukhi',
      'Gauri Garbh Rudraksha', 'Ganesh Rudraksha', 'Gauri Shankar Rudraksha'
    ]
  },
  {
    id: 'crystals',
    name: 'Crystal Bracelets',
    description: 'Healing crystals for balance and positive energy',
    image: '/placeholder.svg',
    items: [
      'Blood Stone', 'Tiger Eye Blue', 'Mother of Pearl', 'Howlite',
      'Natural Turquoise', 'Natural Amazonite', 'Black Agate', '7 Chakra',
      'Green Jade', 'Green Aventurine', 'Rose Quartz', 'Dragon Vein',
      'Cats Eye Black', 'Azurite', 'Amethyst', 'Red Jasper',
      'Pyrite', 'Citrine', 'Sunstone', 'Dhan Yog'
    ]
  },
  {
    id: 'mala',
    name: 'Mala',
    description: 'Sacred prayer beads for meditation and chanting',
    image: '/placeholder.svg',
    items: [
      'Kamal Gatta 108 Bead Chanting Mala',
      'Tulsi 108 Bead Chanting Mala',
      'Lapis Lazuli 108 Bead Chanting Mala',
      'Rudraksha 108 Bead Chanting Mala'
    ]
  },
  {
    id: 'gemstones',
    name: 'Gemstones',
    description: 'Precious stones for astrological remedies',
    image: '/placeholder.svg',
    items: [
      'Ruby', 'Pearl', 'Red Coral', 'Emerald', 'Yellow Sapphire',
      'Diamond', 'Blue Sapphire', 'Hessonite', 'Cats Eye'
    ]
  },
  {
    id: 'yantra',
    name: 'Yantra',
    description: 'Sacred geometric diagrams for divine blessings',
    image: '/placeholder.svg',
    items: [
      'Surya Yantra', 'Chandrama Yantra', 'Guru Yantra', 'Rahu Yantra',
      'Buddha Yantra', 'Shukra Yantra', 'Ketu Yantra', 'Shani Yantra',
      'Mangal Yantra', 'Shree Yantra', 'Ganesh Yantra', 'Laxmi-Ganesh Yantra',
      'Laxmi-Ganesh-Kuber Yantra', 'Hanuman Yantra', 'Baglamukhi Yantra'
    ]
  },
  {
    id: 'miscellaneous',
    name: 'Miscellaneous',
    description: 'Spiritual tools and accessories',
    image: '/placeholder.svg',
    items: [
      'Kush Asan', 'Black Tourmaline Tower', 'Selenite 7 Chakra Charging Plate'
    ]
  }
];

const generateProducts = (): Product[] => {
  const products: Product[] = [];
  let id = 1;

  // Rudraksha products
  const rudrakshaItems = [
    { name: '1 Mukhi Rudraksha', price: 15000, benefits: ['Supreme consciousness', 'Liberation from sins', 'Spiritual enlightenment'] },
    { name: '2 Mukhi Rudraksha', price: 2500, benefits: ['Unity and harmony', 'Relationship healing', 'Emotional balance'] },
    { name: '3 Mukhi Rudraksha', price: 1800, benefits: ['Release of past karma', 'Self-confidence', 'Fire element balance'] },
    { name: '4 Mukhi Rudraksha', price: 1500, benefits: ['Knowledge and wisdom', 'Communication skills', 'Creative expression'] },
    { name: '5 Mukhi Rudraksha', price: 800, benefits: ['Health and wellbeing', 'Peace of mind', 'Protection from negativity'] },
    { name: '6 Mukhi Rudraksha', price: 1200, benefits: ['Emotional stability', 'Willpower', 'Focus and concentration'] },
    { name: '7 Mukhi Rudraksha', price: 1800, benefits: ['Wealth and prosperity', 'Good fortune', 'Success in ventures'] },
    { name: '8 Mukhi Rudraksha', price: 3500, benefits: ['Obstacle removal', 'Success in endeavors', 'Wisdom and intelligence'] },
    { name: '9 Mukhi Rudraksha', price: 4500, benefits: ['Energy and power', 'Fearlessness', 'Dynamic personality'] },
    { name: '10 Mukhi Rudraksha', price: 5500, benefits: ['Protection from evil', 'Peace and harmony', 'Divine blessings'] },
    { name: '11 Mukhi Rudraksha', price: 6500, benefits: ['Wisdom and adventure', 'Protection during travel', 'Yogic powers'] },
    { name: '12 Mukhi Rudraksha', price: 7500, benefits: ['Leadership qualities', 'Radiance and brilliance', 'Administrative skills'] },
    { name: '13 Mukhi Rudraksha', price: 12000, benefits: ['Materialistic pleasures', 'Hypnotic attraction', 'Fulfillment of desires'] },
    { name: '14 Mukhi Rudraksha', price: 18000, benefits: ['Third eye activation', 'Divine intuition', 'Supreme protection'] },
    { name: '15 Mukhi Rudraksha', price: 25000, benefits: ['Inner peace', 'Emotional healing', 'Compassion'] },
    { name: '16 Mukhi Rudraksha', price: 35000, benefits: ['Victory over enemies', 'Fearlessness', 'Protection from harm'] },
    { name: '17 Mukhi Rudraksha', price: 45000, benefits: ['Unexpected gains', 'Fortune and luck', 'Material abundance'] },
    { name: '18 Mukhi Rudraksha', price: 55000, benefits: ['Health and prosperity', 'Earth energy connection', 'Grounding'] },
    { name: 'Gauri Garbh Rudraksha', price: 8500, benefits: ['Fertility blessings', 'Motherly protection', 'Family harmony'] },
    { name: 'Ganesh Rudraksha', price: 9500, benefits: ['Obstacle removal', 'New beginnings', 'Success in ventures'] },
    { name: 'Gauri Shankar Rudraksha', price: 4500, benefits: ['Relationship harmony', 'Marital bliss', 'Unity and love'] },
  ];

  rudrakshaItems.forEach(item => {
    products.push({
      id: `rud-${id++}`,
      name: item.name,
      category: 'rudraksha',
      price: item.price,
      originalPrice: Math.round(item.price * 1.2),
      image: '/placeholder.svg',
      rating: 4.5 + Math.random() * 0.5,
      reviews: Math.floor(Math.random() * 100) + 20,
      description: `Authentic ${item.name} sourced from Nepal. This sacred bead is blessed and energized for maximum spiritual benefits.`,
      benefits: item.benefits,
      specifications: {
        'Origin': 'Nepal',
        'Size': '15-20mm',
        'Certification': 'Lab Certified',
        'Energization': 'Puja Performed'
      },
      inStock: true,
      featured: Math.random() > 0.7,
      bestSeller: Math.random() > 0.8
    });
  });

  // Crystal Bracelets
  const crystalItems = [
    { name: 'Blood Stone Bracelet', price: 1200, benefits: ['Courage and vitality', 'Blood purification', 'Grounding energy'] },
    { name: 'Tiger Eye Blue Bracelet', price: 1100, benefits: ['Calm and soothing', 'Clear thinking', 'Stress relief'] },
    { name: 'Mother of Pearl Bracelet', price: 1300, benefits: ['Intuition enhancement', 'Emotional healing', 'Feminine energy'] },
    { name: 'Howlite Bracelet', price: 834, benefits: ['Patience and calm', 'Insomnia relief', 'Anger reduction'] },
    { name: 'Natural Turquoise Bracelet', price: 2500, benefits: ['Protection and healing', 'Communication', 'Spiritual grounding'] },
    { name: 'Natural Amazonite Bracelet', price: 834, benefits: ['Wealth, Luck & Success', 'Emotional Healing', 'Throat & Heart Chakra'] },
    { name: 'Black Agate Bracelet', price: 834, benefits: ['Protection', 'Grounding', 'Courage'] },
    { name: '7 Chakra Bracelet', price: 834, benefits: ['Energy balance', 'Chakra alignment', 'Holistic healing'] },
    { name: 'Green Jade Bracelet', price: 834, benefits: ['Luck and prosperity', 'Heart chakra', 'Emotional balance'] },
    { name: 'Green Aventurine Bracelet', price: 834, benefits: ['Luck and opportunity', 'Heart healing', 'Optimism'] },
    { name: 'Rose Quartz Bracelet', price: 834, benefits: ['Unconditional love', 'Self-love', 'Emotional healing'] },
    { name: 'Dragon Vein Bracelet', price: 1600, benefits: ['Courage and strength', 'Life force energy', 'Creativity'] },
    { name: 'Cats Eye Black Bracelet', price: 2200, benefits: ['Protection from evil eye', 'Intuition', 'Grounding'] },
    { name: 'Azurite Bracelet', price: 2800, benefits: ['Third eye activation', 'Psychic abilities', 'Insight'] },
    { name: 'Amethyst Bracelet', price: 1200, benefits: ['Spiritual protection', 'Intuition', 'Stress relief'] },
    { name: 'Red Jasper Bracelet', price: 834, benefits: ['Stamina and endurance', 'Root chakra', 'Grounding'] },
    { name: 'Pyrite Bracelet', price: 1400, benefits: ['Wealth attraction', 'Protection', 'Willpower'] },
    { name: 'Citrine Bracelet', price: 1600, benefits: ['Abundance and joy', 'Solar plexus chakra', 'Confidence'] },
    { name: 'Sunstone Bracelet', price: 1500, benefits: ['Joy and vitality', 'Leadership', 'Independence'] },
    { name: 'Dhan Yog Bracelet', price: 2000, benefits: ['Wealth attraction', 'Financial success', 'Abundance'] },
    { name: "Tiger's Eye Bracelet", price: 834, benefits: ['Courage and confidence', 'Protection', 'Grounding'] },
  ];

  // Custom descriptions for specific bracelets
  const braceletDescriptions: Record<string, string> = {
    'Natural Amazonite Bracelet': 'The Amazonite crystal bracelet is crafted from high-quality crystal beads, showcasing soothing shades of mint-green to bluish-green. These carefully polished 8mm beads are arranged on a durable, stretchable band, ensuring a comfortable fit for daily wear. Known for its calming energy, this original Amazonite bracelet promotes balance, attracts good fortune, and enhances overall well-being.',
  };

  crystalItems.forEach(item => {
    const braceletImages = braceletImageMap[item.name];
    products.push({
      id: `cry-${id++}`,
      name: item.name,
      category: 'crystals',
      price: item.price,
      originalPrice: Math.round(item.price * 1.15),
      image: braceletImages?.image || '/placeholder.svg',
      images: braceletImages?.images,
      rating: 4.3 + Math.random() * 0.7,
      reviews: Math.floor(Math.random() * 80) + 15,
      description: braceletDescriptions[item.name] || `Beautiful ${item.name} made with genuine natural crystals. Each bead is carefully selected for its healing properties.`,
      benefits: item.benefits,
      specifications: {
        'Bead Size': '8mm',
        'Wrist Size': 'Adjustable',
        'Material': 'Premium AAA-Quality Crystal Bracelet',
        'String': 'Elastic',
        'Pre-Charged': 'Yes'
      },
      inStock: true,
      featured: Math.random() > 0.75,
      bestSeller: Math.random() > 0.85
    });
  });

  // Mala items
  const malaItems = [
    { name: 'Kamal Gatta 108 Bead Chanting Mala', price: 550, benefits: ['Lakshmi blessings', 'Prosperity', 'Spiritual growth'] },
    { name: 'Tulsi 108 Bead Chanting Mala', price: 450, benefits: ['Protection', 'Devotion', 'Purification'] },
    { name: 'Lapis Lazuli 108 Bead Chanting Mala', price: 3500, benefits: ['Wisdom', 'Truth', 'Inner vision'] },
    { name: 'Rudraksha 108 Bead Chanting Mala', price: 1200, benefits: ['Meditation aid', 'Spiritual awakening', 'Peace'] },
  ];

  malaItems.forEach(item => {
    products.push({
      id: `mal-${id++}`,
      name: item.name,
      category: 'mala',
      price: item.price,
      originalPrice: Math.round(item.price * 1.1),
      image: '/placeholder.svg',
      rating: 4.6 + Math.random() * 0.4,
      reviews: Math.floor(Math.random() * 60) + 10,
      description: `Traditional ${item.name} crafted for meditation and mantra chanting. 108 beads with a guru bead.`,
      benefits: item.benefits,
      specifications: {
        'Beads': '108 + 1 Guru Bead',
        'Length': '40 inches',
        'Material': 'Natural',
        'Hand-knotted': 'Yes'
      },
      inStock: true,
      featured: Math.random() > 0.6,
      bestSeller: Math.random() > 0.7
    });
  });

  // Gemstones
  const gemstoneItems = [
    { name: 'Ruby (Manik)', price: 8500, benefits: ['Sun energy', 'Leadership', 'Vitality'] },
    { name: 'Pearl (Moti)', price: 3500, benefits: ['Moon energy', 'Emotional balance', 'Intuition'] },
    { name: 'Red Coral (Moonga)', price: 2500, benefits: ['Mars energy', 'Courage', 'Vitality'] },
    { name: 'Emerald (Panna)', price: 12000, benefits: ['Mercury energy', 'Intelligence', 'Communication'] },
    { name: 'Yellow Sapphire (Pukhraj)', price: 15000, benefits: ['Jupiter blessings', 'Wisdom', 'Prosperity'] },
    { name: 'Diamond (Heera)', price: 45000, benefits: ['Venus energy', 'Love', 'Luxury'] },
    { name: 'Blue Sapphire (Neelam)', price: 18000, benefits: ['Saturn energy', 'Discipline', 'Protection'] },
    { name: 'Hessonite (Gomed)', price: 4500, benefits: ['Rahu energy', 'Clarity', 'Success'] },
    { name: 'Cats Eye (Lehsunia)', price: 5500, benefits: ['Ketu energy', 'Intuition', 'Protection'] },
  ];

  gemstoneItems.forEach(item => {
    products.push({
      id: `gem-${id++}`,
      name: item.name,
      category: 'gemstones',
      price: item.price,
      originalPrice: Math.round(item.price * 1.25),
      image: '/placeholder.svg',
      rating: 4.7 + Math.random() * 0.3,
      reviews: Math.floor(Math.random() * 50) + 25,
      description: `Natural certified ${item.name} for astrological purposes. Each gemstone is carefully selected and comes with certification.`,
      benefits: item.benefits,
      specifications: {
        'Weight': '5-7 Carats',
        'Cut': 'Oval/Round',
        'Certification': 'Govt. Lab Certified',
        'Treatment': 'Untreated'
      },
      inStock: true,
      featured: Math.random() > 0.5,
      bestSeller: Math.random() > 0.6
    });
  });

// Yantras
  const yantraItems = [
    { name: 'Surya Yantra', price: 396, benefits: ['Sun blessings', 'Success', 'Health'] },
    { name: 'Chandrama Yantra', price: 396, benefits: ['Moon blessings', 'Peace', 'Emotional balance'] },
    { name: 'Guru Yantra', price: 396, benefits: ['Jupiter blessings', 'Wisdom', 'Prosperity'] },
    { name: 'Rahu Yantra', price: 396, benefits: ['Rahu pacification', 'Success', 'Protection'] },
    { name: 'Buddha Yantra', price: 396, benefits: ['Mercury blessings', 'Intelligence', 'Business success'] },
    { name: 'Shukra Yantra', price: 396, benefits: ['Venus blessings', 'Love', 'Luxury'] },
    { name: 'Ketu Yantra', price: 396, benefits: ['Ketu pacification', 'Spiritual growth', 'Liberation'] },
    { name: 'Shani Yantra', price: 396, benefits: ['Saturn pacification', 'Discipline', 'Justice'] },
    { name: 'Mangal Yantra', price: 396, benefits: ['Mars blessings', 'Courage', 'Victory'] },
    { name: 'Shree Yantra', price: 396, benefits: ['Wealth', 'Prosperity', 'Abundance'] },
    { name: 'Ganesh Yantra', price: 396, benefits: ['Obstacle removal', 'Success', 'Wisdom'] },
    { name: 'Laxmi-Ganesh Yantra', price: 396, benefits: ['Wealth', 'Success', 'Prosperity'] },
    { name: 'Laxmi-Ganesh-Kuber Yantra', price: 396, benefits: ['Maximum wealth', 'Abundance', 'Fortune'] },
    { name: 'Hanuman Yantra', price: 396, benefits: ['Protection', 'Strength', 'Courage'] },
    { name: 'Baglamukhi Yantra', price: 396, benefits: ['Victory over enemies', 'Protection', 'Power'] },
  ];

  yantraItems.forEach(item => {
    products.push({
      id: `yan-${id++}`,
      name: item.name,
      category: 'yantra',
      price: item.price,
      originalPrice: Math.round(item.price * 1.2),
      image: yantraImageMap[item.name] || '/placeholder.svg',
      rating: 4.5 + Math.random() * 0.5,
      reviews: Math.floor(Math.random() * 40) + 20,
      description: `Sacred ${item.name} engraved on pure copper plate. Energized with proper Vedic mantras for maximum effectiveness.`,
      benefits: item.benefits,
      specifications: {
        'Material': 'Pure Copper',
        'Size': '3x3 inches',
        'Energization': 'Vedic Mantras',
        'Finish': 'Gold Plated'
      },
      inStock: true,
      featured: Math.random() > 0.65,
      bestSeller: Math.random() > 0.75
    });
  });

  // Miscellaneous
  const miscItems = [
    { name: 'Kush Asan', price: 850, benefits: ['Meditation aid', 'Grounding', 'Positive energy'] },
    { name: 'Black Tourmaline Tower', price: 2500, benefits: ['EMF protection', 'Negativity shield', 'Grounding'] },
    { name: 'Selenite 7 Chakra Charging Plate', price: 1800, benefits: ['Crystal cleansing', 'Chakra alignment', 'Energy amplification'] },
  ];

  miscItems.forEach(item => {
    products.push({
      id: `mis-${id++}`,
      name: item.name,
      category: 'miscellaneous',
      price: item.price,
      originalPrice: Math.round(item.price * 1.15),
      image: '/placeholder.svg',
      rating: 4.4 + Math.random() * 0.6,
      reviews: Math.floor(Math.random() * 30) + 10,
      description: `High-quality ${item.name} for spiritual practices. Sourced from authentic suppliers.`,
      benefits: item.benefits,
      specifications: {
        'Material': 'Natural',
        'Quality': 'Premium Grade',
        'Origin': 'Authentic Source'
      },
      inStock: true,
      featured: Math.random() > 0.5,
      bestSeller: Math.random() > 0.6
    });
  });

  return products;
};

export const products = generateProducts();

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(p => p.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.featured).slice(0, 8);
};

export const getBestSellers = (): Product[] => {
  return products.filter(p => p.bestSeller).slice(0, 8);
};
