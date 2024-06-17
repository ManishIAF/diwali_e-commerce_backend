const ethnicPajamaData = [
    {
      name: 'Men Cotton Ethnic Pajama',
      description: "Stay comfortable with this Cotton Ethnic Pajama, crafted from soft cotton fabric. Ideal for casual wear and lounging.",
      price: 899,
      images: ['https://example.com/image-url.jpg'],
      attributes: {
        Fabric: "Cotton",
        Type: "Ethnic Pajama",
        "Sales Package": "Pajama",
        Pattern: "Solid",
        Color: "White",
        Occasion: "Casual",
        "Fabric care": "Machine Wash"
      },
      stockQuantity: 20
    },
    {
      name: 'Men Silk Ethnic Pajama',
      description: "Feel luxurious in this Silk Ethnic Pajama, made from smooth silk fabric. Perfect for special occasions and relaxed evenings.",
      price: 1499,
      images: ['https://example.com/image-url.jpg'],
      attributes: {
        Fabric: "Silk",
        Type: "Ethnic Pajama",
        "Sales Package": "Pajama",
        Pattern: "Solid",
        Color: "Black",
        Occasion: "Formal, Evening",
        "Fabric care": "Dry Clean Only"
      },
      stockQuantity: 15
    },
    {
      name: 'Men Linen Ethnic Pajama',
      description: "Stay cool and stylish with this Linen Ethnic Pajama, featuring breathable linen fabric. Perfect for casual outings and summer wear.",
      price: 1299,
      images: ['https://example.com/image-url.jpg'],
      attributes: {
        Fabric: "Linen",
        Type: "Ethnic Pajama",
        "Sales Package": "Pajama",
        Pattern: "Striped",
        Color: "Blue, White",
        Occasion: "Casual, Summer",
        "Fabric care": "Machine Wash"
      },
      stockQuantity: 18
    },
    {
      name: 'Men Velvet Ethnic Pajama',
      description: "Indulge in comfort with this Velvet Ethnic Pajama, crafted from soft velvet fabric. Ideal for winter evenings and lounging at home.",
      price: 1799,
      images: ['https://example.com/image-url.jpg'],
      attributes: {
        Fabric: "Velvet",
        Type: "Ethnic Pajama",
        "Sales Package": "Pajama",
        Pattern: "Solid",
        Color: "Maroon",
        Occasion: "Winter, Casual",
        "Fabric care": "Dry Clean Only"
      },
      stockQuantity: 12
    },
    {
      name: 'Men Printed Ethnic Pajama',
      description: "Add a touch of style with this Printed Ethnic Pajama, featuring vibrant prints on comfortable fabric. Perfect for casual wear and relaxed settings.",
      price: 999,
      images: ['https://example.com/image-url.jpg'],
      attributes: {
        Fabric: "Cotton",
        Type: "Ethnic Pajama",
        "Sales Package": "Pajama",
        Pattern: "Printed",
        Color: "Multicolor",
        Occasion: "Casual",
        "Fabric care": "Machine Wash"
      },
      stockQuantity: 20
    },
    {
        name: 'Men Khadi Ethnic Pajama',
        description: "Embrace simplicity with this Khadi Ethnic Pajama, crafted from traditional khadi fabric. Ideal for casual outings and everyday wear.",
        price: 1099,
        images: ['https://example.com/image-url.jpg'],
        attributes: {
          Fabric: "Khadi",
          Type: "Ethnic Pajama",
          "Sales Package": "Pajama",
          Pattern: "Solid",
          Color: "Beige",
          Occasion: "Casual",
          "Fabric care": "Hand Wash"
        },
        stockQuantity: 15
      },
      {
        name: 'Men Printed Cotton Ethnic Pajama',
        description: "Stay comfortable and stylish with this Printed Cotton Ethnic Pajama, featuring vibrant prints on soft cotton fabric. Perfect for casual wear and lounging.",
        price: 899,
        images: ['https://example.com/image-url.jpg'],
        attributes: {
          Fabric: "Cotton",
          Type: "Ethnic Pajama",
          "Sales Package": "Pajama",
          Pattern: "Printed",
          Color: "Navy Blue, White",
          Occasion: "Casual",
          "Fabric care": "Machine Wash"
        },
        stockQuantity: 20
      },
      {
        name: 'Men Silk Blend Ethnic Pajama',
        description: "Step into luxury with this Silk Blend Ethnic Pajama, crafted from a blend of silk and other fabrics. Perfect for evening wear and special occasions.",
        price: 1499,
        images: ['https://example.com/image-url.jpg'],
        attributes: {
          Fabric: "Silk Blend",
          Type: "Ethnic Pajama",
          "Sales Package": "Pajama",
          Pattern: "Solid",
          Color: "Black",
          Occasion: "Formal, Evening",
          "Fabric care": "Dry Clean Only"
        },
        stockQuantity: 18
      },
      {
        name: 'Men Linen Blend Ethnic Pajama',
        description: "Stay cool and comfortable with this Linen Blend Ethnic Pajama, featuring a blend of linen and other fabrics. Ideal for casual wear and summer evenings.",
        price: 1299,
        images: ['https://example.com/image-url.jpg'],
        attributes: {
          Fabric: "Linen Blend",
          Type: "Ethnic Pajama",
          "Sales Package": "Pajama",
          Pattern: "Striped",
          Color: "Grey, White",
          Occasion: "Casual, Summer",
          "Fabric care": "Machine Wash"
        },
        stockQuantity: 16
      },
      {
        name: 'Men Woolen Ethnic Pajama',
        description: "Stay warm and cozy with this Woolen Ethnic Pajama, crafted from soft wool fabric. Perfect for winter wear and lounging at home.",
        price: 1699,
        images: ['https://example.com/image-url.jpg'],
        attributes: {
          Fabric: "Wool",
          Type: "Ethnic Pajama",
          "Sales Package": "Pajama",
          Pattern: "Solid",
          Color: "Brown",
          Occasion: "Winter, Casual",
          "Fabric care": "Dry Clean Only"
        },
        stockQuantity: 14
      },
      {
        name: 'Men Printed Silk Ethnic Pajama',
        description: "Add a touch of elegance with this Printed Silk Ethnic Pajama, featuring intricate prints on luxurious silk fabric. Ideal for formal evenings and special occasions.",
        price: 1799,
        images: ['https://example.com/image-url.jpg'],
        attributes: {
          Fabric: "Silk",
          Type: "Ethnic Pajama",
          "Sales Package": "Pajama",
          Pattern: "Printed",
          Color: "Blue, Gold",
          Occasion: "Formal, Evening",
          "Fabric care": "Dry Clean Only"
        },
        stockQuantity: 12
      },
      {
        name: 'Men Brocade Ethnic Pajama',
        description: "Dress up in style with this Brocade Ethnic Pajama, featuring intricate brocade work and a luxurious feel. Perfect for festive occasions and celebrations.",
        price: 1899,
        images: ['https://example.com/image-url.jpg'],
        attributes: {
          Fabric: "Brocade",
          Type: "Ethnic Pajama",
          "Sales Package": "Pajama",
          Pattern: "Brocade",
          Color: "Red, Gold",
          Occasion: "Festive",
          "Fabric care": "Dry Clean Only"
        },
        stockQuantity: 16
      },
      {
        name: 'Men Velvet Ethnic Pajama',
        description: "Indulge in comfort with this Velvet Ethnic Pajama, crafted from plush velvet fabric. Ideal for winter evenings and relaxed settings.",
        price: 1999,
        images: ['https://example.com/image-url.jpg'],
        attributes: {
          Fabric: "Velvet",
          Type: "Ethnic Pajama",
          "Sales Package": "Pajama",
          Pattern: "Solid",
          Color: "Navy Blue",
          Occasion: "Winter, Casual",
          "Fabric care": "Dry Clean Only"
        },
        stockQuantity: 14
      },
      {
        name: 'Men Chanderi Silk Ethnic Pajama',
        description: "Elevate your ensemble with this Chanderi Silk Ethnic Pajama, featuring intricate Chanderi silk fabric and a regal look. Perfect for weddings and special occasions.",
        price: 2199,
        images: ['https://example.com/image-url.jpg'],
        attributes: {
          Fabric: "Chanderi Silk",
          Type: "Ethnic Pajama",
          "Sales Package": "Pajama",
          Pattern: "Solid",
          Color: "Cream, Gold",
          Occasion: "Wedding, Festive",
          "Fabric care": "Dry Clean Only"
        },
        stockQuantity: 12
      },
      {
        name: 'Men Jacquard Silk Ethnic Pajama',
        description: "Make a statement with this Jacquard Silk Ethnic Pajama, featuring intricate jacquard weaving and a luxurious feel. Perfect for formal events and celebrations.",
        price: 2299,
        images: ['https://example.com/image-url.jpg'],
        attributes: {
          Fabric: "Jacquard Silk",
          Type: "Ethnic Pajama",
          "Sales Package": "Pajama",
          Pattern: "Jacquard",
          Color: "Black, Gold",
          Occasion: "Formal, Evening",
          "Fabric care": "Dry Clean Only"
        },
        stockQuantity: 10
      },
      {
        name: 'Men Embroidered Linen Ethnic Pajama',
        description: "Add elegance to your attire with this Embroidered Linen Ethnic Pajama, featuring intricate embroidery on lightweight linen fabric. Perfect for casual evenings and relaxed settings.",
        price: 1699,
        images: ['https://example.com/image-url.jpg'],
        attributes: {
          Fabric: "Linen",
          Type: "Ethnic Pajama",
          "Sales Package": "Pajama",
          Pattern: "Embroidered",
          Color: "White, Gold",
          Occasion: "Casual, Evening",
          "Fabric care": "Dry Clean Only"
        },
        stockQuantity: 15
      },
      {
        name: 'Men Printed Khadi Ethnic Pajama',
        description: "Stay comfortable and stylish with this Printed Khadi Ethnic Pajama, featuring traditional prints on breathable khadi fabric. Perfect for casual wear and lounging.",
        price: 1099,
        images: ['https://example.com/image-url.jpg'],
        attributes: {
          Fabric: "Khadi",
          Type: "Ethnic Pajama",
          "Sales Package": "Pajama",
          Pattern: "Printed",
          Color: "Red, White",
          Occasion: "Casual",
          "Fabric care": "Hand Wash"
        },
        stockQuantity: 18
      },
      {
        name: 'Men Satin Ethnic Pajama',
        description: "Feel luxurious with this Satin Ethnic Pajama, crafted from smooth satin fabric. Perfect for special occasions and evening wear.",
        price: 1599,
        images: ['https://example.com/image-url.jpg'],
        attributes: {
          Fabric: "Satin",
          Type: "Ethnic Pajama",
          "Sales Package": "Pajama",
          Pattern: "Solid",
          Color: "Blue",
          Occasion: "Formal, Evening",
          "Fabric care": "Dry Clean Only"
        },
        stockQuantity: 16
      },
      {
        name: 'Men Embroidered Velvet Ethnic Pajama',
        description: "Enhance your look with this Embroidered Velvet Ethnic Pajama, featuring intricate embroidery on plush velvet fabric. Ideal for weddings and formal occasions.",
        price: 1899,
        images: ['https://example.com/image-url.jpg'],
        attributes: {
          Fabric: "Velvet",
          Type: "Ethnic Pajama",
          "Sales Package": "Pajama",
          Pattern: "Embroidered",
          Color: "Maroon, Gold",
          Occasion: "Wedding, Reception",
          "Fabric care": "Dry Clean Only"
        },
        stockQuantity: 14
      },
      {
        name: 'Men Jacquard Ethnic Pajama',
        description: "Make a statement with this Jacquard Ethnic Pajama, featuring intricate jacquard weaving and a luxurious feel. Perfect for formal events and celebrations.",
        price: 2199,
        images: ['https://example.com/image-url.jpg'],
        attributes: {
          Fabric: "Jacquard",
          Type: "Ethnic Pajama",
          "Sales Package": "Pajama",
          Pattern: "Jacquard",
          Color: "Black, Silver",
          Occasion: "Formal, Evening",
          "Fabric care": "Dry Clean Only"
        },
        stockQuantity: 12
      },
      {
        name: 'Men Linen Silk Blend Ethnic Pajama',
        description: "Combine comfort and luxury with this Linen Silk Blend Ethnic Pajama, featuring a blend of linen and silk fabrics. Perfect for casual outings and special occasions.",
        price: 1699,
        images: ['https://example.com/image-url.jpg'],
        attributes: {
          Fabric: "Linen, Silk Blend",
          Type: "Ethnic Pajama",
          "Sales Package": "Pajama",
          Pattern: "Solid",
          Color: "White, Beige",
          Occasion: "Casual, Formal",
          "Fabric care": "Dry Clean Only"
        },
        stockQuantity: 15
      },
      {
        name: 'Men Chanderi Cotton Ethnic Pajama',
        description: "Experience elegance with this Chanderi Cotton Ethnic Pajama, featuring traditional Chanderi cotton fabric and a comfortable fit. Ideal for festive occasions and celebrations.",
        price: 1299,
        images: ['https://example.com/image-url.jpg'],
        attributes: {
          Fabric: "Chanderi Cotton",
          Type: "Ethnic Pajama",
          "Sales Package": "Pajama",
          Pattern: "Solid",
          Color: "Pink, Gold",
          Occasion: "Festive, Casual",
          "Fabric care": "Dry Clean Only"
        },
        stockQuantity: 18
      },
      {
        name: 'Men Printed Silk Blend Ethnic Pajama',
        description: "Add vibrancy to your attire with this Printed Silk Blend Ethnic Pajama, featuring colorful prints on a blend of silk and other fabrics. Perfect for casual wear and outings.",
        price: 1499,
        images: ['https://example.com/image-url.jpg'],
        attributes: {
          Fabric: "Silk Blend",
          Type: "Ethnic Pajama",
          "Sales Package": "Pajama",
          Pattern: "Printed",
          Color: "Multicolor",
          Occasion: "Casual, Summer",
          "Fabric care": "Machine Wash"
        },
        stockQuantity: 16
      },
      {
        name: 'Men Velvet Embroidered Ethnic Pajama',
        description: "Achieve a royal look with this Velvet Embroidered Ethnic Pajama, featuring intricate embroidery on plush velvet fabric. Perfect for weddings and formal occasions.",
        price: 1999,
        images: ['https://example.com/image-url.jpg'],
        attributes: {
          Fabric: "Velvet",
          Type: "Ethnic Pajama",
          "Sales Package": "Pajama",
          Pattern: "Embroidered",
          Color: "Black, Gold",
          Occasion: "Wedding, Reception",
          "Fabric care": "Dry Clean Only"
        },
        stockQuantity: 14
      },
      {
        name: 'Men Embroidered Banarasi Silk Ethnic Pajama',
        description: "Exude sophistication with this Embroidered Banarasi Silk Ethnic Pajama, featuring intricate embroidery on luxurious Banarasi silk fabric. Ideal for weddings and grand celebrations.",
        price: 2299,
        images: ['https://example.com/image-url.jpg'],
        attributes: {
          Fabric: "Banarasi Silk",
          Type: "Ethnic Pajama",
          "Sales Package": "Pajama",
          Pattern: "Embroidered",
          Color: "Royal Blue, Gold",
          Occasion: "Wedding, Festive",
          "Fabric care": "Dry Clean Only"
        },
        stockQuantity: 12
      },
      {
        name: 'Men Embellished Ethnic Pajama',
        description: "Dress up in style with this Embellished Ethnic Pajama, featuring intricate embellishments and a luxurious feel. Perfect for weddings and special celebrations.",
        price: 2599,
        images: ['https://example.com/image-url.jpg'],
        attributes: {
          Fabric: "Silk",
          Type: "Ethnic Pajama",
          "Sales Package": "Pajama",
          Pattern: "Embellished",
          Color: "Cream, Gold",
          Occasion: "Wedding, Reception",
          "Fabric care": "Dry Clean Only"
        },
        stockQuantity: 10
      },
      {
        name: 'Men Printed Chanderi Silk Ethnic Pajama',
        description: "Add charm to your attire with this Printed Chanderi Silk Ethnic Pajama, featuring vibrant prints on lightweight Chanderi silk fabric. Perfect for festive occasions and celebrations.",
        price: 1899,
        images: ['https://example.com/image-url.jpg'],
        attributes: {
          Fabric: "Chanderi Silk",
          Type: "Ethnic Pajama",
          "Sales Package": "Pajama",
          Pattern: "Printed",
          Color: "Red, Gold",
          Occasion: "Festive, Casual",
          "Fabric care": "Dry Clean Only"
        },
        stockQuantity: 14
      },
      {
        name: 'Men Embroidered Velvet Silk Ethnic Pajama',
        description: "Step into elegance with this Embroidered Velvet Silk Ethnic Pajama, featuring intricate embroidery on a blend of velvet and silk fabrics. Perfect for weddings and special occasions.",
        price: 2199,
        images: ['https://example.com/image-url.jpg'],
        attributes: {
          Fabric: "Velvet, Silk Blend",
          Type: "Ethnic Pajama",
          "Sales Package": "Pajama",
          Pattern: "Embroidered",
          Color: "Maroon, Gold",
          Occasion: "Wedding, Reception",
          "Fabric care": "Dry Clean Only"
        },
        stockQuantity: 12
      },
      {
        name: 'Men Embroidered Brocade Ethnic Pajama',
        description: "Make a statement with this Embroidered Brocade Ethnic Pajama, featuring intricate embroidery on luxurious brocade fabric. Perfect for weddings and grand celebrations.",
        price: 2399,
        images: ['https://example.com/image-url.jpg'],
        attributes: {
          Fabric: "Brocade",
          Type: "Ethnic Pajama",
          "Sales Package": "Pajama",
          Pattern: "Embroidered",
          Color: "Green, Gold",
          Occasion: "Wedding, Festive",
          "Fabric care": "Dry Clean Only"
        },
        stockQuantity: 10
      },
];

export default ethnicPajamaData;