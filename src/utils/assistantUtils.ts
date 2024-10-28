import { Product } from '../types';

interface ProductRecommendation {
  product: Product;
  relevanceScore: number;
  conversionProbability: number;
}

interface CustomerIntent {
  type: 'research' | 'purchase' | 'support' | 'comparison';
  confidence: number;
  keywords: string[];
}

const responses = {
  en: {
    research: {
      prefix: "I'd be happy to help you learn more about our products. Here's what you might find interesting:",
      suffix: "\nWould you like more detailed specifications or to see customer reviews for any of these products?"
    },
    purchase: {
      prefix: "Great choice! Here are our best-selling products that match your needs:",
      suffix: "\nI can help you complete your purchase right away. Would you like to add any of these to your cart?"
    },
    support: {
      prefix: "I'll help you find the right solution. Here are some options that might address your needs:",
      suffix: "\nIf you need any clarification or have questions about installation, I'm here to help!"
    },
    comparison: {
      prefix: "Let me help you compare the options. Here are the best matches:",
      suffix: "\nWould you like to see a detailed comparison of any of these products?"
    },
    notFound: "I want to help you find exactly what you need. Could you please tell me more about what you're looking for? I can help with:\n- Finding specific parts\n- Checking compatibility\n- Shipping information\n- Returns and warranty",
    products: (count: number) => `We have ${count} quality parts in stock. What type of part are you looking for? I can help narrow down the options based on your needs.`
  },
  zh: {
    research: {
      prefix: "我很乐意帮您了解更多关于我们产品的信息。以下是您可能感兴趣的产品：",
      suffix: "\n您想了解这些产品的详细规格或查看客户评价吗？"
    },
    purchase: {
      prefix: "很好的选择！以下是符合您需求的畅销产品：",
      suffix: "\n我可以立即帮您完成购买。您想将其中任何产品添加到购物车吗？"
    },
    support: {
      prefix: "我会帮您找到合适的解决方案。以下是一些可能满足您需求的选项：",
      suffix: "\n如果您需要任何说明或有安装问题，我随时为您服务！"
    },
    comparison: {
      prefix: "让我帮您比较一下这些选项。以下是最佳匹配：",
      suffix: "\n您想查看这些产品的详细对比吗？"
    },
    notFound: "我想帮您找到您需要的产品。您能告诉我更多关于您在寻找什么的信息吗？我可以帮助您：\n- 查找特定配件\n- 检查兼容性\n- 运输信息\n- 退货和保修",
    products: (count: number) => `我们有${count}个优质配件库存。您在寻找哪种类型的配件？我可以根据您的需求帮您筛选选项。`
  },
  ru: {
    research: {
      prefix: "Я с удовольствием помогу вам узнать больше о наших продуктах. Вот что может вас заинтересовать:",
      suffix: "\nХотите узнать более подробные характеристики или посмотреть отзывы покупателей о любом из этих товаров?"
    },
    purchase: {
      prefix: "Отличный выбор! Вот наши самые популярные товары, соответствующие вашим потребностям:",
      suffix: "\nЯ могу помочь вам совершить покупку прямо сейчас. Хотите добавить что-нибудь из этого в корзину?"
    },
    support: {
      prefix: "Я помогу вам найти правильное решение. Вот несколько вариантов, которые могут удовлетворить ваши потребности:",
      suffix: "\nЕсли вам нужны разъяснения или у вас есть вопросы по установке, я готов помочь!"
    },
    comparison: {
      prefix: "Позвольте помочь вам сравнить варианты. Вот лучшие совпадения:",
      suffix: "\nХотите увидеть подробное сравнение этих товаров?"
    },
    notFound: "Я хочу помочь вам найти именно то, что вам нужно. Не могли бы вы рассказать подробнее, что вы ищете? Я могу помочь с:\n- Поиском конкретных запчастей\n- Проверкой совместимости\n- Информацией о доставке\n- Возвратом и гарантией",
    products: (count: number) => `У нас есть ${count} качественных запчастей на складе. Какой тип запчастей вы ищете? Я могу помочь сузить варианты на основе ваших потребностей.`
  },
  ar: {
    research: {
      prefix: "يسعدني مساعدتك في معرفة المزيد عن منتجاتنا. إليك ما قد تجده مثيرًا للاهتمام:",
      suffix: "\nهل ترغب في معرفة المواصفات التفصيلية أو مشاهدة تقييمات العملاء لأي من هذه المنتجات؟"
    },
    purchase: {
      prefix: "اختيار رائع! إليك منتجاتنا الأكثر مبيعًا التي تناسب احتياجاتك:",
      suffix: "\nيمكنني مساعدتك في إتمام عملية الشراء على الفور. هل ترغب في إضافة أي من هذه المنتجات إلى سلة التسوق؟"
    },
    support: {
      prefix: "سأساعدك في العثور على الحل المناسب. إليك بعض الخيارات التي قد تلبي احتياجاتك:",
      suffix: "\nإذا كنت بحاجة إلى أي توضيح أو لديك أسئلة حول التركيب، أنا هنا للمساعدة!"
    },
    comparison: {
      prefix: "دعني أساعدك في مقارنة الخيارات. إليك أفضل التطابقات:",
      suffix: "\nهل ترغب في رؤية مقارنة تفصيلية لأي من هذه المنتجات؟"
    },
    notFound: "أريد مساعدتك في العثور على ما تحتاجه بالضبط. هل يمكنك إخباري المزيد عما تبحث عنه؟ يمكنني المساعدة في:\n- العثور على قطع غيار محددة\n- التحقق من التوافق\n- معلومات الشحن\n- الإرجاع والضمان",
    products: (count: number) => `لدينا ${count} قطعة غيار عالية الجودة في المخزون. ما نوع القطع التي تبحث عنها؟ يمكنني المساعدة في تضييق الخيارات بناءً على احتياجاتك.`
  },
  fr: {
    research: {
      prefix: "Je serai ravi de vous aider à en savoir plus sur nos produits. Voici ce qui pourrait vous intéresser :",
      suffix: "\nSouhaitez-vous des spécifications plus détaillées ou voir les avis clients pour l'un de ces produits ?"
    },
    purchase: {
      prefix: "Excellent choix ! Voici nos produits les plus vendus qui correspondent à vos besoins :",
      suffix: "\nJe peux vous aider à finaliser votre achat immédiatement. Souhaitez-vous ajouter l'un de ces articles à votre panier ?"
    },
    support: {
      prefix: "Je vais vous aider à trouver la bonne solution. Voici quelques options qui pourraient répondre à vos besoins :",
      suffix: "\nSi vous avez besoin de précisions ou des questions sur l'installation, je suis là pour vous aider !"
    },
    comparison: {
      prefix: "Permettez-moi de vous aider à comparer les options. Voici les meilleures correspondances :",
      suffix: "\nSouhaitez-vous voir une comparaison détaillée de ces produits ?"
    },
    notFound: "Je veux vous aider à trouver exactement ce dont vous avez besoin. Pourriez-vous me dire plus précisément ce que vous recherchez ? Je peux vous aider avec :\n- La recherche de pièces spécifiques\n- La vérification de compatibilité\n- Les informations d'expédition\n- Les retours et la garantie",
    products: (count: number) => `Nous avons ${count} pièces de qualité en stock. Quel type de pièce recherchez-vous ? Je peux vous aider à affiner les options selon vos besoins.`
  },
  de: {
    research: {
      prefix: "Ich helfe Ihnen gerne, mehr über unsere Produkte zu erfahren. Hier ist, was Sie interessieren könnte:",
      suffix: "\nMöchten Sie detailliertere Spezifikationen oder Kundenbewertungen zu einem dieser Produkte sehen?"
    },
    purchase: {
      prefix: "Ausgezeichnete Wahl! Hier sind unsere meistverkauften Produkte, die Ihren Anforderungen entsprechen:",
      suffix: "\nIch kann Ihnen helfen, Ihren Kauf sofort abzuschließen. Möchten Sie eines dieser Produkte in den Warenkorb legen?"
    },
    support: {
      prefix: "Ich helfe Ihnen, die richtige Lösung zu finden. Hier sind einige Optionen, die Ihren Bedürfnissen entsprechen könnten:",
      suffix: "\nWenn Sie Klärungsbedarf haben oder Fragen zur Installation haben, bin ich für Sie da!"
    },
    comparison: {
      prefix: "Lassen Sie mich Ihnen beim Vergleich der Optionen helfen. Hier sind die besten Übereinstimmungen:",
      suffix: "\nMöchten Sie einen detaillierten Vergleich dieser Produkte sehen?"
    },
    notFound: "Ich möchte Ihnen helfen, genau das zu finden, was Sie brauchen. Könnten Sie mir mehr darüber erzählen, wonach Sie suchen? Ich kann Ihnen helfen bei:\n- Der Suche nach spezifischen Teilen\n- Der Überprüfung der Kompatibilität\n- Versandinformationen\n- Rückgabe und Garantie",
    products: (count: number) => `Wir haben ${count} Qualitätsteile auf Lager. Nach welcher Art von Teil suchen Sie? Ich kann Ihnen helfen, die Optionen basierend auf Ihren Bedürfnissen einzugrenzen.`
  }
};

function analyzeCustomerIntent(query: string): CustomerIntent {
  const keywords = query.toLowerCase().split(' ');
  
  const intentPatterns = {
    research: ['how', 'what', 'why', 'difference', 'compare', 'learn', 'info'],
    purchase: ['buy', 'price', 'cost', 'order', 'purchase', 'shipping', 'available'],
    support: ['help', 'issue', 'problem', 'return', 'warranty', 'broken'],
    comparison: ['vs', 'versus', 'better', 'difference', 'compare', 'which']
  };

  let maxConfidence = 0;
  let detectedIntent: CustomerIntent['type'] = 'research';

  Object.entries(intentPatterns).forEach(([intent, patterns]) => {
    const confidence = patterns.reduce((score, pattern) => 
      score + (keywords.includes(pattern) ? 1 : 0), 0) / patterns.length;
    
    if (confidence > maxConfidence) {
      maxConfidence = confidence;
      detectedIntent = intent as CustomerIntent['type'];
    }
  });

  return {
    type: detectedIntent,
    confidence: maxConfidence,
    keywords: keywords
  };
}

function findRelevantProducts(query: string, products: Product[], language: string): ProductRecommendation[] {
  const searchTerms = query.toLowerCase().split(' ');
  const customerIntent = analyzeCustomerIntent(query);
  
  return products
    .map(product => {
      let score = 0;
      let conversionProbability = 0.5;
      
      const name = (product.translations?.[language]?.name || product.name).toLowerCase();
      const description = (product.translations?.[language]?.description || product.description).toLowerCase();
      const category = (product.translations?.[language]?.category || product.category).toLowerCase();
      
      searchTerms.forEach(term => {
        if (name.includes(term)) score += 3;
        if (description.includes(term)) score += 2;
        if (category.includes(term)) score += 1;
      });

      if (customerIntent.type === 'purchase') {
        conversionProbability += 0.2;
      }
      if (product.stock < 20) {
        conversionProbability += 0.1;
      }
      if (score > 5) {
        conversionProbability += 0.15;
      }

      return { 
        product, 
        relevanceScore: score,
        conversionProbability: Math.min(conversionProbability, 1)
      };
    })
    .filter(item => item.relevanceScore > 0)
    .sort((a, b) => {
      const aScore = (a.relevanceScore * 0.7) + (a.conversionProbability * 0.3);
      const bScore = (b.relevanceScore * 0.7) + (b.conversionProbability * 0.3);
      return bScore - aScore;
    })
    .slice(0, 3);
}

function formatPrice(price: number, language: string): string {
  const currencyMap: { [key: string]: string } = {
    en: 'USD',
    zh: 'CNY',
    ru: 'RUB',
    ar: 'SAR',
    fr: 'EUR',
    de: 'EUR'
  };

  const currency = currencyMap[language] || 'USD';
  const locale = language === 'en' ? 'en-US' : language;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(price);
}

function formatProductRecommendation(recommendation: ProductRecommendation, language: string): string {
  const { product } = recommendation;
  const translations = responses[language as keyof typeof responses] || responses.en;
  
  const name = product.translations?.[language]?.name || product.name;
  const description = product.translations?.[language]?.description || product.description;
  const price = formatPrice(product.price, language);
  
  let message = `${name} - ${price}\n${description}`;
  
  if (product.stock < 20) {
    const stockMessage = {
      en: `⚠️ Only ${product.stock} units left in stock!`,
      zh: `⚠️ 库存仅剩 ${product.stock} 件！`,
      ru: `⚠️ Осталось только ${product.stock} единиц на складе!`,
      ar: `⚠️ بقي فقط ${product.stock} وحدات في المخزون!`,
      fr: `⚠️ Plus que ${product.stock} unités en stock !`,
      de: `⚠️ Nur noch ${product.stock} Einheiten auf Lager!`
    };
    message += `\n${stockMessage[language as keyof typeof stockMessage] || stockMessage.en}`;
  }

  return message;
}

export function generateResponse(
  input: string,
  language: string,
  products: Product[]
): string {
  const customerIntent = analyzeCustomerIntent(input);
  const relevantProducts = findRelevantProducts(input, products, language);
  const currentLang = responses[language as keyof typeof responses] || responses.en;
  
  if (relevantProducts.length > 0) {
    const intentType = customerIntent.type;
    const { prefix, suffix } = currentLang[intentType];
    const productRecommendations = relevantProducts
      .map(rec => formatProductRecommendation(rec, language))
      .join('\n\n');

    return `${prefix}\n\n${productRecommendations}\n\n${suffix}`;
  }

  return products.length > 0 
    ? currentLang.products(products.length)
    : currentLang.notFound;
}