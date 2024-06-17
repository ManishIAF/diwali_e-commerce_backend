const sareeData = [
    {
      name: 'Traditional Silk Saree',
      description: "Elegant silk saree with intricate zari work, perfect for weddings and special occasions.",
      price: 4999,
      images: ['https://example.com/image-url.jpg'],
      attributes: {
        Fabric: "Silk",
        Type: "Traditional Saree",
        "Sales Package": "Saree with Blouse Piece",
        Pattern: "Zari",
        Color: "Red, Gold",
        Occasion: "Wedding, Festive",
        "Fabric care": "Dry Clean Only"
      },
      stockQuantity: 15
    },
    {
      name: 'Embroidered Georgette Saree',
      description: "Georgette saree with delicate embroidery, ideal for formal gatherings and evening events.",
      price: 2999,
      images: ['https://example.com/image-url.jpg'],
      attributes: {
        Fabric: "Georgette",
        Type: "Embroidered Saree",
        "Sales Package": "Saree with Blouse Piece",
        Pattern: "Embroidered",
        Color: "Blue, Silver",
        Occasion: "Formal, Evening",
        "Fabric care": "Dry Clean Only"
      },
      stockQuantity: 20
    },
    {
      name: 'Kanjivaram Silk Saree',
      description: "Traditional Kanjivaram silk saree with rich border and pallu, perfect for South Indian weddings.",
      price: 7999,
      images: ['https://example.com/image-url.jpg'],
      attributes: {
        Fabric: "Kanjivaram Silk",
        Type: "Traditional Saree",
        "Sales Package": "Saree with Blouse Piece",
        Pattern: "Contrast Border",
        Color: "Green, Gold",
        Occasion: "Wedding, Bridal",
        "Fabric care": "Dry Clean Only"
      },
      stockQuantity: 12
    },
    {
      name: 'Printed Cotton Silk Saree',
      description: "Comfortable cotton silk saree with floral prints, suitable for casual and daily wear.",
      price: 1499,
      images: ['https://example.com/image-url.jpg'],
      attributes: {
        Fabric: "Cotton Silk",
        Type: "Printed Saree",
        "Sales Package": "Saree with Blouse Piece",
        Pattern: "Printed",
        Color: "Yellow, Pink",
        Occasion: "Casual, Daily Wear",
        "Fabric care": "Hand Wash"
      },
      stockQuantity: 25
    },
    {
      name: 'Chiffon Embellished Saree',
      description: "Chiffon saree with stone embellishments, perfect for parties and evening occasions.",
      price: 3999,
      images: ['https://example.com/image-url.jpg'],
      attributes: {
        Fabric: "Chiffon",
        Type: "Embellished Saree",
        "Sales Package": "Saree with Blouse Piece",
        Pattern: "Embellished",
        Color: "Black, Silver",
        Occasion: "Party, Evening",
        "Fabric care": "Dry Clean Only"
      },
      stockQuantity: 18
    },
    {
      name: 'Bhagalpuri Silk Saree',
      description: "Bhagalpuri silk saree with intricate prints, suitable for festive occasions and celebrations.",
      price: 2499,
      images: ['https://example.com/image-url.jpg'],
      attributes: {
        Fabric: "Bhagalpuri Silk",
        Type: "Printed Saree",
        "Sales Package": "Saree with Blouse Piece",
        Pattern: "Printed",
        Color: "Orange, Blue",
        Occasion: "Festive, Party",
        "Fabric care": "Dry Clean Only"
      },
      stockQuantity: 22
    },
    {
      name: 'Bandhani Cotton Saree',
      description: "Bandhani cotton saree with tie-and-dye patterns, ideal for traditional events and cultural gatherings.",
      price: 1899,
      images: ['https://example.com/image-url.jpg'],
      attributes: {
        Fabric: "Cotton",
        Type: "Bandhani Saree",
        "Sales Package": "Saree with Blouse Piece",
        Pattern: "Bandhani",
        Color: "Pink, Yellow",
        Occasion: "Traditional, Cultural",
        "Fabric care": "Dry Clean Only"
      },
      stockQuantity: 20
    },
    {
      name: 'Tussar Silk Saree',
      description: "Tussar silk saree with golden motifs, perfect for formal gatherings and festive occasions.",
      price: 3499,
      images: ['https://example.com/image-url.jpg'],
      attributes: {
        Fabric: "Tussar Silk",
        Type: "Embroidered Saree",
        "Sales Package": "Saree with Blouse Piece",
        Pattern: "Embroidered",
        Color: "Cream, Gold",
        Occasion: "Formal, Festive",
        "Fabric care": "Dry Clean Only"
      },
      stockQuantity: 16
    },
    {
      name: 'Printed Linen Saree',
      description: "Linen saree with printed motifs, ideal for casual wear and everyday outings.",
      price: 1699,
      images: ['https://example.com/image-url.jpg'],
      attributes: {
        Fabric: "Linen",
        Type: "Printed Saree",
        "Sales Package": "Saree with Blouse Piece",
        Pattern: "Printed",
        Color: "White, Blue",
        Occasion: "Casual, Daily Wear",
        "Fabric care": "Hand Wash"
      },
      stockQuantity: 24
    },
    {
      name: 'Banarasi Silk Saree',
      description: "Banarasi silk saree with intricate weaving and golden zari work, perfect for weddings and grand celebrations.",
      price: 8999,
      images: ['https://example.com/image-url.jpg'],
      attributes: {
        Fabric: "Banarasi Silk",
        Type: "Traditional Saree",
        "Sales Package": "Saree with Blouse Piece",
        Pattern: "Zari",
        Color: "Purple, Gold",
        Occasion: "Wedding, Bridal",
        "Fabric care": "Dry Clean Only"
      },
      stockQuantity: 10
    },
    {
        name: 'Kota Doria Silk Saree',
        description: "Lightweight Kota Doria silk saree with intricate thread work, perfect for summer weddings and daytime events.",
        price: 3799,
        images: ['https://example.com/image-url.jpg'],
        attributes: {
          Fabric: "Kota Doria Silk",
          Type: "Thread Work Saree",
          "Sales Package": "Saree with Blouse Piece",
          Pattern: "Thread Work",
          Color: "Peach, Gold",
          Occasion: "Daytime Wedding, Summer",
          "Fabric care": "Dry Clean Only"
        },
        stockQuantity: 18
      },
      {
        name: 'Chanderi Cotton Saree',
        description: "Chanderi cotton saree with golden zari border, suitable for festive occasions and cultural celebrations.",
        price: 2599,
        images: ['https://example.com/image-url.jpg'],
        attributes: {
          Fabric: "Chanderi Cotton",
          Type: "Zari Border Saree",
          "Sales Package": "Saree with Blouse Piece",
          Pattern: "Zari Border",
          Color: "Pink, Silver",
          Occasion: "Festive, Cultural",
          "Fabric care": "Dry Clean Only"
        },
        stockQuantity: 16
      },
      {
        name: 'Kalamkari Cotton Saree',
        description: "Kalamkari cotton saree with hand-painted motifs, ideal for artistic events and traditional gatherings.",
        price: 2999,
        images: ['https://example.com/image-url.jpg'],
        attributes: {
          Fabric: "Kalamkari Cotton",
          Type: "Hand-painted Saree",
          "Sales Package": "Saree with Blouse Piece",
          Pattern: "Hand-painted",
          Color: "Multi-color",
          Occasion: "Artistic, Traditional",
          "Fabric care": "Dry Clean Only"
        },
        stockQuantity: 20
      },
      {
        name: 'Embroidered Tussar Silk Saree',
        description: "Tussar silk saree with intricate embroidery, perfect for formal events and evening parties.",
        price: 4299,
        images: ['https://example.com/image-url.jpg'],
        attributes: {
          Fabric: "Tussar Silk",
          Type: "Embroidered Saree",
          "Sales Package": "Saree with Blouse Piece",
          Pattern: "Embroidered",
          Color: "Beige, Gold",
          Occasion: "Formal, Evening",
          "Fabric care": "Dry Clean Only"
        },
        stockQuantity: 14
      },
      {
        name: 'Bollywood Style Saree',
        description: "Designer Bollywood-style saree with sequin and mirror work, ideal for glamorous events and red carpet occasions.",
        price: 6599,
        images: ['https://example.com/image-url.jpg'],
        attributes: {
          Fabric: "Georgette",
          Type: "Designer Saree",
          "Sales Package": "Saree with Blouse Piece",
          Pattern: "Sequin and Mirror Work",
          Color: "Silver, Black",
          Occasion: "Glamorous Events, Red Carpet",
          "Fabric care": "Dry Clean Only"
        },
        stockQuantity: 12
      },
      {
        name: 'Handloom Khadi Saree',
        description: "Handloom khadi saree with minimalist design, suitable for eco-friendly fashion enthusiasts and cultural events.",
        price: 1999,
        images: ['https://example.com/image-url.jpg'],
        attributes: {
          Fabric: "Handloom Khadi",
          Type: "Minimalist Saree",
          "Sales Package": "Saree with Blouse Piece",
          Pattern: "Plain",
          Color: "Off-White",
          Occasion: "Cultural, Eco-friendly",
          "Fabric care": "Hand Wash"
        },
        stockQuantity: 22
      },
      {
        name: 'Mysore Silk Saree',
        description: "Classic Mysore silk saree with traditional motifs and golden zari, perfect for South Indian weddings and festive celebrations.",
        price: 7499,
        images: ['https://example.com/image-url.jpg'],
        attributes: {
          Fabric: "Mysore Silk",
          Type: "Traditional Saree",
          "Sales Package": "Saree with Blouse Piece",
          Pattern: "Zari",
          Color: "Royal Blue, Gold",
          Occasion: "Wedding, Festive",
          "Fabric care": "Dry Clean Only"
        },
        stockQuantity: 8
      },
      {
        name: 'Printed Silk Crepe Saree',
        description: "Silk crepe saree with digital prints, ideal for modern fashionistas and chic evening events.",
        price: 3199,
        images: ['https://example.com/image-url.jpg'],
        attributes: {
          Fabric: "Silk Crepe",
          Type: "Printed Saree",
          "Sales Package": "Saree with Blouse Piece",
          Pattern: "Digital Prints",
          Color: "Green, Pink",
          Occasion: "Modern, Evening",
          "Fabric care": "Dry Clean Only"
        },
        stockQuantity: 18
      },
      {
        name: 'Linen Jamdani Saree',
        description: "Linen jamdani saree with intricate jamdani weaving, perfect for summer weddings and cultural gatherings.",
        price: 4399,
        images: ['https://example.com/image-url.jpg'],
        attributes: {
          Fabric: "Linen",
          Type: "Jamdani Saree",
          "Sales Package": "Saree with Blouse Piece",
          Pattern: "Jamdani Weave",
          Color: "White, Gold",
          Occasion: "Summer Wedding, Cultural",
          "Fabric care": "Dry Clean Only"
        },
        stockQuantity: 14
      },
      {
        name: 'Kashmiri Embroidered Saree',
        description: "Kashmiri embroidered saree with intricate Kashmiri embroidery, suitable for traditional events and winter festivities.",
        price: 4999,
        images: ['https://example.com/image-url.jpg'],
        attributes: {
          Fabric: "Georgette",
          Type: "Embroidered Saree",
          "Sales Package": "Saree with Blouse Piece",
          Pattern: "Kashmiri Embroidery",
          Color: "Red, Gold",
          Occasion: "Traditional, Winter Festive",
          "Fabric care": "Dry Clean Only"
        },
        stockQuantity: 16
      }
  ];
  

export default sareeData;
  