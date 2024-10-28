import { ProductFormData } from '../../types';

const MOCK_PRODUCTS: ProductFormData[] = [
  {
    name: "High-Performance Spark Plugs",
    description: "Iridium spark plugs for improved ignition and fuel efficiency",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3",
    category: "Ignition",
    compatibility: ["Universal Fit"],
    stock: 120,
    translations: {
      zh: {
        name: "高性能火花塞",
        description: "铱金火花塞，提供更好的点火性能和燃油效率",
        category: "点火系统"
      },
      ru: {
        name: "Высокопроизводительные свечи зажигания",
        description: "Иридиевые свечи зажигания для улучшенного зажигания и экономии топлива",
        category: "Система зажигания"
      },
      ar: {
        name: "شمعات إشعال عالية الأداء",
        description: "شمعات إشعال من الإيريديوم لإشعال محسن وكفاءة في استهلاك الوقود",
        category: "نظام الإشعال"
      },
      fr: {
        name: "Bougies d'allumage haute performance",
        description: "Bougies d'allumage à l'iridium pour une meilleure ignition et efficacité énergétique",
        category: "Système d'allumage"
      },
      de: {
        name: "Hochleistungs-Zündkerzen",
        description: "Iridium-Zündkerzen für verbesserte Zündung und Kraftstoffeffizienz",
        category: "Zündsystem"
      }
    }
  },
  {
    name: "LED Headlight Kit",
    description: "Ultra-bright LED headlight conversion kit with cooling fan",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1635773054018-22c8ad65b85a",
    category: "Lighting",
    compatibility: ["Universal Fit"],
    stock: 80,
    translations: {
      zh: {
        name: "LED大灯套件",
        description: "超亮LED大灯转换套件，配备冷却风扇",
        category: "照明系统"
      },
      ru: {
        name: "Комплект светодиодных фар",
        description: "Сверхъяркий комплект для переоборудования фар со светодиодами и охлаждающим вентилятором",
        category: "Освещение"
      },
      ar: {
        name: "طقم مصابيح LED أمامية",
        description: "طقم تحويل مصابيح LED فائقة السطوع مع مروحة تبريد",
        category: "الإضاءة"
      },
      fr: {
        name: "Kit de phares LED",
        description: "Kit de conversion de phares LED ultra-lumineux avec ventilateur de refroidissement",
        category: "Éclairage"
      },
      de: {
        name: "LED-Scheinwerfer-Set",
        description: "Ultra-helles LED-Scheinwerfer-Umrüstset mit Kühlventilator",
        category: "Beleuchtung"
      }
    }
  },
  {
    name: "Heavy-Duty Floor Mats",
    description: "All-weather floor mats with anti-slip backing",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1635773054018-22c8ad65b85a",
    category: "Interior",
    compatibility: ["Universal Fit"],
    stock: 150,
    translations: {
      zh: {
        name: "重型地垫",
        description: "全天候地垫，带防滑底层",
        category: "内饰"
      },
      ru: {
        name: "Прочные напольные коврики",
        description: "Всепогодные напольные коврики с противоскользящей подложкой",
        category: "Интерьер"
      },
      ar: {
        name: "دواسات أرضية متينة",
        description: "دواسات أرضية لجميع الأحوال الجوية مع ظهر مانع للانزلاق",
        category: "الداخلية"
      },
      fr: {
        name: "Tapis de sol robustes",
        description: "Tapis de sol toutes saisons avec support antidérapant",
        category: "Intérieur"
      },
      de: {
        name: "Schwerlast-Fußmatten",
        description: "Allwetter-Fußmatten mit rutschfester Rückseite",
        category: "Innenraum"
      }
    }
  }
];

export async function fetchAmazonProducts(): Promise<ProductFormData[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock products with randomized prices
  return MOCK_PRODUCTS.map(product => ({
    ...product,
    price: Number((product.price * (0.85 + Math.random() * 0.3)).toFixed(2)),
    stock: Math.floor(Math.random() * 200) + 50
  }));
}